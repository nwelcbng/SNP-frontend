import request from "./request"
export function getExamData(){
  return request({
    url: '/user/appGetstatus',
    method:"GET",
    header:{
      Authorization:wx.getStorageSync('token')
    }
  })
}

export function giveUp(data){
  return request({
    url:'/user/appGiveUpFirstAudition',
    method:'POST',
    header:{
      Authorization:wx.getStorageSync('token')
    },
    data
  })
}

export function SignIn(data){
  return request({
    url:'/user/signIn',
    method:'POST',
    header:{
      Authorization:wx.getStorageSync('token')
    },
    data
  })
}