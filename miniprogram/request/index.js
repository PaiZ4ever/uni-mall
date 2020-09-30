//主页请求调用多次，这时关闭加载图标不严谨
let ajaxTime = 0;

export const request = (parmas) => {
    ajaxTime++;

    //显示加载中效果
    wx.showLoading({
        title: '正在加载',
        mask: true
    });

    //定义公共url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, request) => {
        wx.request({
            // url: parmas.url,
            ...parmas,
            url: baseUrl + parmas.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime === 0) {
                    //关闭显示图标
                    wx.hideLoading();
                }
            }
        });
    })
}