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
            { text: '关于', link: '/resume/', icon: 'reco-account' },
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
                title: '黄可锰',
                desc: 'CALL HIM HUANGKEMENG HE LOVE YOU',
                logo: 'https://i-tech.tech/img/avatar.jpeg',
                link: 'https://i-tech.tech/'
            },
            {
                title: 'Popo',
                desc: `The programmer who doesn't want to be a good driver is not a good cook, I am a software engineer who makes delicious food. I am immersed in the world of code world and are committed to making our world a better place through code. The article frightened the wind and rain, the code shaping made the ghosts cry. 💫`,
                logo: 'https://popo706.cn/popo706.github.io/profile.jpg',
                link: 'https://popo706.cn/'
            },
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
        authorAvatar: '/favicons.png',
        logo: '/favicons.png',
        record: '晋IPC备19007704号-1',
        startYear: '2016',
    },
    markdown: {
        lineNumbers: true
    }
}