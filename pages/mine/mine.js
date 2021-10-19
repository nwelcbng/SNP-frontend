// pages/mine/mine.js
// var appInstance = getApp()
// console.log(appInstance.globalData)
import {scanQRcodeRe} from '../../services/network/scanQRcode'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,

    // canIUseGetUserProfile: false,
    // canIUseOpenData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserProfile();
    const userInfo = wx.getStorageSync('userInfo'); //取出缓存里面的用户信息
    if(userInfo){
      this.setData({
        hasUserInfo:true,
        userInfo:userInfo
      })
    }
  // console.log(this.data.userInfo)
  },

  /**
   * 用户点击右上角分享
   */
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
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo);
        wx.setStorageSync('userInfo',res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scanQRcode(value){
    scanQRcodeRe({uuid:value.detail.uuid}).then(res => {
      console.log(res)
      if(res.code == 1){
        wx.showToast({
          title: '扫码成功',
          icon:'success',
          duration:1500
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'error',
          duration:1500
        })
      }
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '网络错误',
        icon:'error',
        duration:1500
      })
    })
  }
})