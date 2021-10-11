import request from"./request.js"
export function getForm(){
  return request({
    url:"/user/getform",
    method:"GET",
    header:{
      Authorization:wx.getStorageSync('token')
    },
  })
}

export function PostPhone(data){
  return request({
    url:"/user/appGetPhone",
    method:"POST",
    header:{
      'Content-Type':'application/x-www-form-urlencoded',
      Authorization:wx.getStorageSync('token')
    },
    data
  })
}

export function PostCode(data){
  return request({
    url:"/user/appCheckCode",
    method:"POST",
    header:{
      'Content-Type':'application/x-www-form-urlencoded',
      Authorization:wx.getStorageSync('token')
    },
    data:data
  })
}

export function PostForm(data){
  return request({
    url:"/user/appsign",
    method:"POST",
    header:{
      'Content-Type':'application/x-www-form-urlencoded',
      Authorization:wx.getStorageSync('token')
    },
    data:data
  })
}
