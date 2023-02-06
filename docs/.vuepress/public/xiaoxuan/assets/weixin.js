const wxShareInfo = {
    title: '晓璇 生日快乐!',
    desc: '疫情过后，第一个想看见的人是你。',
    link: 'https://fblog.top/xiaoxuan',
    imgUrl: './1.jpeg'
}

function weixinShare({ title, desc, link, imgUrl }) {
    const wx = window.wx;
    wx && wx.ready(function () {
        wx.onMenuShareTimeline({//分享到朋友圈
            title,
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: function () { },
            cancel: function () { }
        });

        wx.onMenuShareAppMessage({//分享到好友
            title, // 分享标题
            desc, // 分享描述
            link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: function () { },
            cancel: function () { }
        });
    });
}

weixinShare(wxShareInfo);