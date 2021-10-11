import request from "./request"
export function registerRe(data){
  console.log(123)
  return request({
    url: '/user/register',
    method:"POST",
    data
  })
}
export function loginRe(token){
  return request({
    url: '/user/applogin',
    header:{
      Authorization:token
    },
    method:"POST"
  })
}