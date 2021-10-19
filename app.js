// app.js
import {registerRe,loginRe} from "./services/network/login"
import {base64_decode} from "./services/DecodeJWT/jwtUncode"

App({
  data:{

  },
  onLoad() {

  },
  onLaunch() {
    let token = wx.getStorageSync('token');
    if(!token){
      //没有token的情况
      this.register();
    }
    else{
      loginRe(token).then(res => {
        if(res.code == 1){
          wx.setStorageSync('token', res.data);
          let tokenStr = base64_decode(res.data);
          console.log(tokenStr)
          wx.setStorageSync('phone',tokenStr.indexOf("true") != -1);
        }else{
          // wx.showToast({
          //   title: res.msg,
          //   icon:'error'
          // })
          console.log('jwt过期了')
          this.register();
        }
      }).catch(err => {
        console.log(err)
      })
    }
    // console.log(DecodeJWT(wx.getStorageSync('token'))) 
  },
  register(){
    console.log('注册')
      wx.login({
        success: res => {
          console.log(res.code)
          registerRe({
            code:res.code
          }).then(res => {
            console.log(res)
            if(res.code == 1){
              wx.setStorageSync('token', res.data);
              let tokenStr = base64_decode(res.data);
              console.log(tokenStr)
              wx.setStorageSync('phone',tokenStr.indexOf("true") != -1);
            }else{
              wx.showToast({
                title: res.msg,
                icon:'error'
              })
            }
          },err => {
            console.log(err)
          })
        },
        fail: err =>{
          console.log(err)
        }
      })
  },
  
  globalData: {
    valid:false
  }
})
