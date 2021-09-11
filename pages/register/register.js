
// pages/register/register.js
// import request from "../../services/network/request"
import {getForm} from "../../services/network/register"
Page({

  data: {
    valid: getApp().globalData.valid,
    hasPhone:false,
    isFinish:false,
    isTimeout:false,
    isLoged:false,
    Sactive:false,
    Nactive:false,
    Qactive:false,
    Pactive:false,
    formData:null
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
      this.requestData().catch(err => {
        console.log(err)
      })
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
    this.requestData().then(() => {
      wx.stopPullDownRefresh();
    }).catch(err => {
      console.log(err);
      wx.stopPullDownRefresh();
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  requestData(){
    return new Promise((resolve, reject) => {
      console.log("开始请求了")
      this.setData({
        isFinish:false,
        isTimeout:false
      })
      wx.showLoading({
        title: '加载数据中',
      });
      setTimeout(() => {
        // request({
        //   header:{
        //     // cookie:wx.getStorageSync('token')
        //   },
        //   url:'https://mockapi.eolinker.com/DIvEEJG0adff1fcb42ec5c36ec5dba353d96bb5387d1a6b/admin/getbycolle',
        //   timeout:5000
        // }).then(res => {
        //   console.log(res);

        //   //开始操作数据
        //   wx.hideLoading();
        //   this.setData({
        //     isFinish:true
        //   })
        //   resolve();
        // }).catch(err => {
        //   wx.hideLoading();
        //   this.setData({
        //     isTimeout:true,
        //   })
        //   reject(err);
        // })
        getForm().then(res => {
          console.log(res);
          //在这里操作数据
          wx.hideLoading();
          this.setData({
            isFinish:true
          })
            this.setData({
              formData:res.data
            })
            this.setCpnData(res.data);
            resolve();
        }).catch(err => {
          wx.hideLoading();
          this.setData({
            isTimeout:true,
          })
          reject(err);
        })
      }, 1000);
    })
  },
  setCpnData(data){
    this.selectComponent('#register-form').setFormData(data);
  },
  bindPickerChange(event){
    this.setData({
      depIndex:event.detail.value
    })
  },
  bindPickerChangeSec(event){
    this.setData({
      secIndex:event.detail.value
    })
  },
  sexChange(){
    this.setData({
      sex:!this.data.sex
    })
  },
  StextFoucs(){
    this.setData({
      Sactive:true
    })
  },
  StextUnfoucs(event){
    console.log(event)
    if(!event.detail.value){
      this.setData({
        Sactive:false
      })
    }
  },  
  NtextFoucs(){
    this.setData({
      Nactive:true
    })
  },
  NtextUnfoucs(event){
    if(!event.detail.value){
      this.setData({
        Nactive:false
      })
    }
    console.log(this.data.Nactive);
  },  
  QtextFoucs(){
    this.setData({
      Qactive:true
    })
  },
  QtextUnfoucs(event){
    console.log(event)
    if(!event.detail.value){
      this.setData({
        Qactive:false
      })
    }
  },  
  PtextFoucs(){
    this.setData({
      Pactive:true
    })
  },
  PtextUnfoucs(event){
    console.log(event)
    if(!event.detail.value){
      this.setData({
        Pactive:false
      })
    }
  }
})