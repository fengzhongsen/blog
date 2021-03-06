module.exports = {
  title: `Sunny`,
  description: '我有故人抱剑去 斩尽春风未肯归',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "57x57", href: "https://cdn.fblog.top/favicons/apple-icon-57x57.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "60x60", href: "https://cdn.fblog.top/favicons/apple-icon-60x60.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "72x72", href: "https://cdn.fblog.top/favicons/apple-icon-72x72.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "76x76", href: "https://cdn.fblog.top/favicons/apple-icon-76x76.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "114x114", href: "https://cdn.fblog.top/favicons/apple-icon-114x114.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "120x120", href: "https://cdn.fblog.top/favicons/apple-icon-120x120.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "144x144", href: "https://cdn.fblog.top/favicons/apple-icon-144x144.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "152x152", href: "https://cdn.fblog.top/favicons/apple-icon-152x152.png" }],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "https://cdn.fblog.top/favicons/apple-icon-180x180.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "192x192", href: "https://cdn.fblog.top/favicons/android-icon-192x192.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "https://cdn.fblog.top/favicons/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "https://cdn.fblog.top/favicons/favicon-96x96.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "https://cdn.fblog.top/favicons/favicon-16x16.png" }],
    // ['link', { rel: 'icon', href: 'https://cdn.fblog.top/blog/images/favicons.png' }],
    ['link', { rel: "manifest", href: "/manifest.json" }],
    ['meta', { name: "msapplication-TileColor", content: "#ffffff" }],
    ['meta', { name: "msapplication-TileImage", content: "https://cdn.fblog.top/favicons/ms-icon-144x144.png" }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['script', { src: './wpa.js', defer: true }],
    // ['script', { src: 'https://cdn.fblog.top/blog/animationFrame.js', defer: true }],
    // ['script', { src: 'https://cdn.fblog.top/blog/animation.js', defer: true }],
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    mode: 'light',
    // 导航
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' },
      { text: 'About', link: 'https://fblog.top/me/', icon: 'reco-account' },
      { text: 'Github', link: 'https://github.com/fengzhongsen/', icon: 'reco-github' },
    ],
    friendLink: [
      {
        title: 'Tony Xu',
        desc: '我是一名软件工程师，热爱尝试和分享最新科技',
        logo: 'https://tonyxu.io/images/square-logo.webp',
        link: 'https://tonyxu.io/zh/'
      },
      {
        title: '午后杂南',
        desc: 'Enjoy when you can, and endure when you must.',
        logo: 'https://www.recoluan.com/head.png',
        link: 'https://www.recoluan.com/'
      },
      {
        title: 'Popo',
        desc: `The programmer who doesn't want to be a good driver is not a good cook. 💫`,
        logo: 'https://popo706.cn/popo706.github.io/profile.jpg',
        link: 'https://popo706.cn/'
      },
      {
        title: '黄可锰',
        desc: 'CALL HIM HUANGKEMENG HE LOVE YOU',
        logo: 'https://i-tech.tech/img/avatar.jpeg',
        link: 'https://i-tech.tech/'
      },
      // {
      //     title: 'John',
      //     desc: 'John Stark',
      //     logo: 'http://johnzz.top/images/20180828144419.png',
      //     link: 'http://johnzz.top/'
      // },
    ],
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认文案 “标签”
      }
    },
    // 评论
    valineConfig: {
      appId: 'GW5t3rc1EOk3R1x0Gv7TlY4s-gzGzoHsz',// your appId
      appKey: '9mu1GyxfVTr7PJc7iusIkcQQ', // your appKey
    },
    // 侧边栏
    sidebar: 'auto',
    // displayAllHeaders: true,

    // 首页相关配置
    author: 'Sunny',
    authorAvatar: 'https://cdn.fblog.top/blog/images/favicons.png',
    logo: 'https://cdn.fblog.top/blog/images/favicons.png',
    record: '晋IPC备19007704号-1',
    recordLink: 'https://beian.miit.gov.cn/',
    startYear: '2016',
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress-reco/vuepress-plugin-kan-ban-niang', {
      theme: ['whiteCat', 'blackCat', 'haru1', 'haru2',
        'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      // clean: true,
    }],
    ['@vuepress-reco/vuepress-plugin-bgm-player', {
      autoShrink: true,
      audios: [{
        name: '你的姑娘',
        artist: '隔壁老樊',
        url: 'https://cdn.fblog.top/blog/music/1.mp3',
        cover: 'https://cdn.fblog.top/blog/music/1.jpg'
      }, {
        name: '慢慢喜欢你',
        artist: '莫文蔚',
        url: 'https://cdn.fblog.top/blog/music/3.mp3',
        cover: 'https://cdn.fblog.top/blog/music/3.jpg'
      }, {
        name: 'Moon River',
        artist: 'Audrey Hepburn',
        url: 'https://cdn.fblog.top/blog/music/2.mp3',
        cover: 'https://cdn.fblog.top/blog/music/2.jpg'
      }]
    }],
    ['vuepress-plugin-dynamic-title', {
      // showIcon: "/favicon.png",
      // showText: "(/≧▽≦/)咦！又好了！",
      // hideIcon: "/failure.png",
      // hideText: "(●—●)喔哟，崩溃啦！",
      // recoverTime: 2000
    }]
  ]
}