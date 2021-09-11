// pages/test/test.js
import {getExamData} from "../../services/network/exam"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinish:false,
    isTimeout:false,
    isLoged:false,
    sureGo:0,
    currentStatus:0,
    isSure:false,
    ExamData:null,
    buttons: [{text: '确定'}],
    showOneButtonDialog:false
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
        console.log(err);
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
  sureGo(event){
    this.setData({
      sureGo:event.detail.sureGo
    })
  },
  Sure(res){
    if(this.data.sureGo<0&&(!res.detail.value.reason||!res.detail.value.reason.length)){
      wx.showToast({
        title: '请输入请假理由',
        icon: 'none',
        duration: 1500
      })
      return ;
    }
    const data = {
      check:res.detail.value.reason,
      result:this.data.sureGo
    }
    console.log(data)
    //发送网络请求
    this.setData({
      isSure:true
    })
  },
  dialogShow(){
    this.setData({
      showOneButtonDialog:true
    })
  },
  exitDialog(){
    this.setData({
      showOneButtonDialog:false
    })
  },
  requestData(){
    return new Promise((resolve, reject) => {
      this.setData({
        isFinish:false,
        isTimeout:false
      })
      wx.showLoading({
        title: '加载数据中',
      });
      setTimeout(() => {
        console.log("开始请求了");
       
        getExamData().then(res => {
          console.log(res);
          wx.hideLoading();
          this.setData({
            isFinish:true
          })
            console.log(res.data)
            this.setData({
              ExamData:res.data
            })
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
  }
})