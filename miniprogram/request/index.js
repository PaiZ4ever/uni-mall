export const request = (parmas) => {
    return new Promise((resolve, request) => {
        wx.request({
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