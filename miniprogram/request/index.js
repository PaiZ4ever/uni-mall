export const request = (parmas) => {
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
            }
        });
    })
}