const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const { server_render } = require("../../assets/server");

const html_template_path = path.resolve(__dirname, "../../assets/index.html");

let render_template = "";

module.exports = async (context, next) => {
  try {
    // const { API_TOKEN } = context.cookie = {};
    // console.log("当前身份令牌==>", API_TOKEN);
    const return_values = await next();
    render_template = await promisify(fs.readFile)(html_template_path, "utf-8");
    const { language = "zh", seo_option = {}, initial_value } = return_values || {};
    const render_html = await server_render({
      language,
      dev_inject: {},
      basename: "/",
      initial_value,
      location: context.path,
      html_template: render_template,
      seo_option: {
        ...seo_option,
        title: seo_option.title || "私人专线",
        keywords: seo_option.keywords || "cyber,chimera,project,",
        description: seo_option.description || "this is chimera-project",
      }
    });
    context.response.status = 200;
    context.response.body = render_html;
  } catch (error) {
    console.log(error);
    context.response.body = `<pre>${error.message}</pre>`;
  };
};