module.exports = {
    title: `老冯博客`,
    description: 'Enjoy when you can, and endure when you must.',
    head: [
        ['link', { rel: 'icon', href: '/favicons.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        // 导航
        nav: [
            { text: '主页', link: '/', icon: 'reco-home' },
            { text: '历史', link: '/timeLine/', icon: 'reco-date' },
            { text: '简历', link: '/resume/', icon: 'reco-account' },
            { text: 'Github', link: 'https://github.com/fengzhongsen/', icon: 'reco-github' },
            {
                text: '友链',
                icon: 'reco-other',
                items: [
                    // { text: 'Orican', link: 'https://oricanis.github.io/' },
                    { text: '黄可锰', link: 'https://i-tech.tech/' },
                    { text: 'John', link: 'http://xzzdll.cn/' },
                    { text: 'Popo', link: 'https://popo706.cn/' }
                ]
            }
        ],
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
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
        author: '冯忠森',
        record: '晋IPC备19007704号-1',
        startYear: '2016',
    },
    markdown: {
        lineNumbers: true
    }
}