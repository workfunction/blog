const sidebar = require("./sidebar-auto.js");

module.exports = {
  repo: "workfunction/blog",
  navbar: true,
  editLinks: true,
  editLinkText: "在 GitHub 上編輯",
  lastUpdated: "更新於",
  sidebar,
  nav: [
    {
      text: "最新",
      link: "/guide/"
    },

    /*
    // 前端
    {
      text: "前端",
      items: [
        {
          text: "JavaScript",
          link: "/passages/2019-03-26-javascript-first/"
        },
        {
          text: "React",
          link: "/passages/2019-04-08-react-components-communication/"
        },
        {
          text: "TypeScript",
          link: "/passages/2019-08-27-typescript-notes/"
        },
        { text: "ES6", link: "/passages/2019-04-09-es6/" },
        { text: "HTML5", link: "/passages/2019-04-10-html5-drag-drop/" },
        { text: "浏览器与安全", link: "/passages/2019-05-15-browser/" }
      ]
    },
    // 其它
    {
      text: "其它",
      items: [
        {
          text: "想法",
          link: "/passages/2019-11-25-how-insist-on-learning/"
        },
        {
          text: "学习笔记",
          link: "/passages/2019-10-02-os-base/"
        },
        {
          text: "友情链接",
          link: "/friends/"
        },
        {
          text: "开发工具",
          items: [
            {
              text: "Webpack4",
              link: "/passages/2018-07-29-webpack-demos-introduction/"
            },
            { text: "Git", link: "/passages/2018-09-06-git-tag-and-version/" }
          ]
        }
      ]
    }
    */
  ]
};
