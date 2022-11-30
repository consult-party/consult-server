const Router = require("@koa/router");
const render = require("../middlewares/render");
const get_initial_value = require("../services/get_initial_value");

const router = new Router();

router.get("/", render, async () => {
  const initial_value = await get_initial_value();
  return { initial_value };
});

router.get("/chat", render, async () => {
  const initial_value = await get_initial_value();
  return { initial_value };
});

module.exports = router.routes();