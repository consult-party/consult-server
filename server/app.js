/* eslint-disable import/no-extraneous-dependencies */
const Koa = require("koa");
const Redis = require("ioredis");
const proxy = require("koa-proxies");
const koa_static = require("koa-static");
const cookieParser = require("koa-cookie");
const bodyParser = require("koa-bodyparser");

// const render = require("./middlewares/render");
const index_page = require("./routers/index_page");
const proxy_list = require("../configs/proxy_list");

const io = require("./socket");

const static_cache_config = {
  "local": 0,
  "test": 1000 * 60 * 24 * 30,
  "prod": 1000 * 60 * 24 * 30,
};

const app = new Koa();

const cache_data = new Redis({
  port: 26379,
  host: "0.0.0.0",
  keyPrefix: "room:"
});


io.on("connection", async (socket) => {
  const { room_id, user_id } = (socket.handshake.query);

  if (await cache_data.llen(room_id)) {
    const records = await cache_data.lrange(room_id, 0, -1);
    const record_list = records.map((every_element) => JSON.parse(every_element));
    socket.emit("load_record", record_list);
  }

  socket.broadcast.emit("user_login", JSON.stringify({ user_id }));

  socket.on("emit_message", async (params) => {
    socket.emit("message", params);
    socket.broadcast.emit("message", params);
    await cache_data.rpush(room_id, params);
    await cache_data.expire("5", 60 * 60 * 24 * 30 * 1000);
  });

  socket.on("input_focus", (params) => {
    socket.broadcast.emit("input_focus", params);
  });

  socket.on("input_blur", (params) => {
    socket.broadcast.emit("input_blur", params);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user_leave", JSON.stringify({ user_id }));
  });

});

app.use(koa_static("./assets/", {
  index: false,
  maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
}));

app.use(koa_static("./public/", {
  index: false,
  maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
}));

/** 本地开发模式需要代理 * */
if (process.env.CHIMERA_RUNTIME === "local") {
  Object.keys(proxy_list).map((current_proxy_path) => app.use(proxy(current_proxy_path, proxy_list[current_proxy_path])));
};

app.use(cookieParser.default());
app.use(bodyParser());
app.use(index_page);
app.listen(8090, () => console.log("server is runing 8090"));



