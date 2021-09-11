// app.js
import request from "./services/network/request"
import DecodeJWT from "./services/DecodeJWT/jwtUncode"

App({
  data:{

  },
  onLoad() {
  },
  onLaunch() {
    // 展示本地存储能力
    let token = wx.getStorageSync('token') || []
    if(token == null || token.length == 0||!this.checkToken()){
      //没有token的情况

      this.login().then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err)
      })
    }
    wx.setStorageSync('phone',false);
    // console.log(DecodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"));
  

  },
  login(){
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          //拿到code
          console.log(res.code);
          request({
            url:"http://localhost:4000/main",
            data:{
              code:res.code
            }
          }).then(res => {
            //拿到token

            // DecodeJWT(res)
            let unCodeJWT = DecodeJWT(res.data.data)
            if(unCodeJWT.phone == true){
              wx.setStorageSync('phone', true);
            }else{
              wx.setStorageSync('phone', false);
            }
            console.log(res.data);
            wx.setStorageSync('token', res.data)
            resolve("登录成功");

          }).catch(err =>{
            reject(err);
            // this.login();
          })
        },
        fail: err =>{
          reject(err)
        }
      })
    })
  },


  checkToken(){
    let token = wx.getStorageSync('token');
    let valid = false;
    // request({
    //   url:"",
    //   data:{
    //     token
    //   },
    //   success: res =>{
    //     console.log(res);
    //     //检验token是否过期

    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
    return valid;
  },
  
  globalData: {
    valid:false
  }
})
