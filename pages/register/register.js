import {getForm} from "../../services/network/register"
import {registerRe,loginRe} from "../../services/network/login"
import {base64_decode} from "../../services/DecodeJWT/jwtUncode"
Page({

  data: {
    isFinish:false,
    isTimeout:false,
    isLoged:false,
    Sactive:false,
    Nactive:false,
    Qactive:false,
    Pactive:false,
    formData:null,
    hasPhone:wx.getStorageSync('phone')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const isLoged = wx.getStorageSync("userInfo") || null;
    //获取用户登录信息
    if(isLoged == null){
      this.setData({
        isLoged:false
      })
    }else{
      this.setData({
        isLoged:true
      })
    }
    if(isLoged&&!this.data.isFinish){
      //用户已经登录而且数据还未加载
      this.requestData()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.requestData()

  },
  requestData(){
    return this.refreshState().then(() => {
      console.log("123")
        this.setData({
          isFinish:false,
          isTimeout:false
        })
        wx.showLoading({
          title: '加载数据中',
        });
          getForm().then(res => {
            wx.hideLoading({
              success: () => {
                if(res.code == 1){
                  let data = JSON.parse(res.data);
                  data = (data ? data : {});
                  console.log(data)
                  //在这里操作数据
                  this.setData({
                    isFinish:true
                  })
                  this.setData({
                    formData:data
                  })
                  this.setCpnData(data);
                }else{
                  let data = {};
                  this.setCpnData(data);
                  wx.showToast({
                    title: res.msg,
                    icon:'error',
                    duration:1500
                  })
                }
              },
            })
          }).catch(err => {
            console.log(err)
            wx.hideLoading();
            wx.showToast({
              title: '网络错误',
              icon:'error',
              duration:1500
            })
            this.setData({
              isTimeout:true
            })
          }).finally(() => {
            this.setData({
              isFinish:true
            })
          })
    })
  },
  setCpnData(data){
    this.selectComponent('#register-form').setFormData(data);
  },
  refreshState(){
    return new Promise((resolve) => {
      let token = wx.getStorageSync('token');
      console.log('本地已有的token：')
      console.log(base64_decode(token))
      if(!token){
        //没有token的情况
        this.register().finally(() => {
          resolve();
        })
      }
      else{
        console.log('登录')
        loginRe(token).then(res => {
          if(res.code == 1){
            let tokenStr = base64_decode(res.data);
            wx.setStorageSync('token', res.data);
            wx.setStorageSync('phone',tokenStr.indexOf("true") != -1);
            console.log(tokenStr)
            this.setData({
              hasPhone:tokenStr.indexOf("true") != -1
            })
          }else{
            // wx.showToast({
            //   title: res.msg,
            //   icon:'error'
            // })
            console.log('jwt过期了')
            this.register();
          }
          resolve();
        }).catch(err => {
          resolve();
          console.log(err)
        })
      }
    })
    
  },
  register(){
    return new Promise((reslove) => {
      wx.login({
        success: res => {
          console.log(res.code)
          registerRe({
            code:res.code
          }).then(res => {
            if(res.code == 1){
              console.log('注册')
              let tokenStr = base64_decode(res.data);
              wx.setStorageSync('token', res.data);
              wx.setStorageSync('phone',tokenStr.indexOf("true") != -1);
              console.log(tokenStr)
              this.setData({
                hasPhone:tokenStr.indexOf("true") != -1
              })
            }else{
              wx.showToast({
                title: res.msg,
                icon:'error'
              })
            }
            reslove()
          },err => {
            console.log(err)
          }).catch(err => {
            console.log(err)
            this.setData({
              isTimeout:true
            })
            wx.stopPullDownRefresh();
          })
        },
        fail: err =>{
          this.setData({
            isTimeout:true
          })
          wx.stopPullDownRefresh();
          console.log(err)
        }
      })
    })
    
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: 'elc报名小程序'
        })
      }, 2000)
    })
    return {
      title: 'elc报名小程序',
      path: '/page/home/home',
      promise 
    }
  },
  onShareTimeline() {

    return {
      title: 'elc报名小程序'
    }
  },
  
})