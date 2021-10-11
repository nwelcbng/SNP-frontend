import request from"./request.js"
export function scanQRcodeRe(data){
  return request({
    url:"/user/loginByCode",
    method:"POST",
    header:{
      Authorization:wx.getStorageSync('token')
    },
    data
  })
}