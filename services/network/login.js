import request from "./request"
export function login(){
  return request({
    url: 'https://mockapi.eolinker.com/DIvEEJG0adff1fcb42ec5c36ec5dba353d96bb5387d1a6b/user/applogin',
    method:"get",
    timeout: 5000
  })
}