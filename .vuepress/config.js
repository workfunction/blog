const { mdConf, themeConf, localesConf } = require("./config/");

module.exports = {
  locales: localesConf,
  markdown: mdConf,
  themeConfig: themeConf,
  plugins: [
    require("./plugins/my-router"),
    require("./plugins/my-loader"),
    require("vuepress-plugin-viewer"),
    "@vuepress/back-to-top",
    ["@vuepress/google-analytics", { ga: "UA-69357257-2" }],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "有新內容更新囉！",
          buttonText: "重新整理"
        }
      }
    ],
    [
      "vuepress-plugin-comment",
      {
        choosen: "gitalk",
        options: {
          clientID: "ae110df0ee4eef495fb3",
          clientSecret: process.env.CLIENT_SECRET || "",
          repo: "workfunction.github.io",
          owner: "workfunction",
          admin: ["workfunction"],
          id: "<%- frontmatter.commentid || frontmatter.permalink %>", // Ensure uniqueness and length less than 50
          distractionFreeMode: false, // Facebook-like distraction free mode
          labels: ["Gitalk", "Comment"],
          title: "「評論」<%- frontmatter.title %>",
          body:
            "<%- frontmatter.title %>：<%- window.location.origin %><%- frontmatter.to.path || window.location.pathname %>"
        }
      }
    ]
  ]
};
