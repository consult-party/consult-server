
module.exports = async function get_initial_value() {
  await new Promise((resolve) => setTimeout(resolve));
  return { test: true, data: "sadasdd" };
};
