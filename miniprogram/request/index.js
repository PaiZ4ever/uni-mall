export const request = (parmas) => {
    return new Promise((resolve, request) => {
        wx.request({
            // url: parmas.url,
            ...parmas,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}