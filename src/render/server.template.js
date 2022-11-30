// import React from "react";
import cheerio from "cheerio";
// import ReactDOM from "react-dom/server";

// import { I18nextProvider } from "react-i18next";
// import { StaticRouter } from "react-router-dom/server";

// import init18n from "@/init18n";
// import MainBlock from "@/entry";
// import { RenderContextProvider } from "./render_context";

export async function server_render({ seo_option, html_template, basename, language, location, dev_inject, initial_value }) {
  const $ = cheerio.load(html_template);
  if (seo_option) {
    $("head").append(`<script>window.seo_option=${JSON.stringify(seo_option)}</script>`);
  };
  if (seo_option.type === "video") {
    $("head").attr("itemprop", "video");
    $("head").attr("itemscope", "");
    $("head").attr("itemtype", "http://schema.org/VideoObject");
    $("head").prepend(`<meta property="og:type" content="video">`);
  };
  if (seo_option.description) {
    $("head").prepend(`<meta itemprop="description" name="description" content="${seo_option.description}">`);
  };
  if (seo_option.keywords) {
    $("head").prepend(`<meta itemprop="keywords" name="keywords" content="${seo_option.keywords}">`);
  };
  if (seo_option.author) {
    $("head").prepend(`<meta itemprop="author" name="author" content="${seo_option.author}">`);
  };
  if (seo_option.uploadDate) {
    $("head").prepend(`<meta itemprop="uploadDate" content="${seo_option.uploadDate}">`);
  };
  if (seo_option.contentUrl) {
    $("head").prepend(`<meta itemprop="contentUrl" content="${seo_option.contentUrl}">`);
  };
  if (seo_option.thumbnailUrl) {
    $("head").prepend(`<meta itemprop="thumbnailUrl" content="${seo_option.thumbnailUrl}">`);
  };
  if (seo_option.image) {
    $("head").prepend(`<meta itemprop="image" content="${seo_option.image}">`);
    $("head").prepend(`<meta property="og:image" content="${seo_option.image}">`);
  };
  if (seo_option.url) {
    $("head").prepend(`<meta itemprop="url" content="${seo_option.url}">`);
    $("head").prepend(`<meta property="og:url" content="${seo_option.url}">`);
  };
  if (seo_option.title) {
    $("head").prepend(`<meta property="og:title" name="title" content="${seo_option.title}">`);
    $("head").prepend(`<meta itemprop="title" name="title" content="${seo_option.title}">`);
    $("head").prepend(`<meta itemprop="name" name="title" content="${seo_option.title}">`);
    $("head").prepend(`<title>${seo_option.title}</title>`);
    $("body").prepend(`<h1 style="display:none">${seo_option.title}</h1>`);
  };
  if (basename) {
    $("head").append(`<script>window.basename="${basename}"</script>`);
  };
  /** 多语言注水 * */
  if (language) {
    $("head").append(`<script>window.language="${language}"</script>`);
  };
  /** 开发模式注水 * */
  if (dev_inject) {
    $("head").append(`<script>window.dev_inject=${JSON.stringify(dev_inject)}</script>`);
  };
  /** 初始值注水 * */
  if (initial_value) {
    $("head").append(`<script>window.initial_value=${JSON.stringify(initial_value)}</script>`);
  };
  /** 服务端渲染结构 * */
  // $("#root").append(ReactDOM.renderToString(
  //   <I18nextProvider i18n={init18n(language)}>
  //     <StaticRouter basename={basename} location={location}>
  //       <RenderContextProvider initial_value={initial_value}>
  //         <MainBlock />
  //       </RenderContextProvider>
  //     </StaticRouter>
  //   </I18nextProvider>
  // ));
  return $.html();
};

