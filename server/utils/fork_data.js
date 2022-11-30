const { fork } = require("child_process");

const task = [];

/** 子线程加载文件创建订阅 * */
exports.sub_with_file = async function sub_with_file(filepath, input_params) {
  const content = await new Promise((resolve) => {
    const sub_node = fork(filepath);
    task.push();
    sub_node.send(input_params || {});
    sub_node.on("message", (content) => {
      resolve(content);
      sub_node.kill();
    });
  });
  return content;
};

/** 开发模式下文件中发布计算结果 * */
exports.publish = function publish(callback) {
  process.on("message", async (message) => {
    try {
      const render_content = await callback(message || {});
      process.send(render_content);
    } catch (error) {
      console.log(error);
      process.send(error.message);
    }
  });
  return callback;
}
