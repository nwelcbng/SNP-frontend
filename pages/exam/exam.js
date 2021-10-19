// pages/test/test.js
import {getExamData,giveUp,SignIn} from "../../services/network/exam"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinish:false,
    isTimeout:false,
    isLoged:false,
    ExamData:null,
    buttons: [{text: '确定'}],
    showOneButtonDialog:false,
    stateCode:[2,0,0]
  },

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

  onPullDownRefresh: function () {
    this.requestData().finally(() => {
      wx.stopPullDownRefresh();
    })
  },

  checkNum(checkCode) {
    let arr = new String(checkCode);
    return arr.split("").map((item) => {
      return parseInt(item);
    });
  },
  SureGo(event){
    // if(!ExamData){
    //   wx.showToast({
    //     title: '网络错误',
    //     icon:'error',
    //     duration:1500
    //   })
    //   return;
    // }
    // if(ExamData.enroll == 200){
    //   //一面
    // }else if(ExamData.enroll == 300){
    //   //笔试
    // }
    console.log(event);
    console.log("走")

  },
  SureAb(event){
    // if(!ExamData){
    //   wx.showToast({
    //     title: '网络错误',
    //     icon:'error',
    //     duration:1500
    //   })
    //   return;
    // }
    // if(ExamData.enroll == 200){
    //   //一面缺席
    // }
    console.log(event);
    console.log("跑路");
    

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
    return new Promise((resolve,reject) => {
      this.setData({
        isFinish:false,
        isTimeout:false
      })
      wx.showLoading({
        title: '加载数据中',
      });
      setTimeout(() => {     
        getExamData().then(res => {
          wx.hideLoading({
            success: () => {
              if(res.code == 1){
                this.setData({
                  isFinish:true
                })
                  console.log(res.data)
                  this.setData({
                    ExamData:res.data,
                    stateCode:this.checkNum(res.data.enroll)
                  })
                  resolve();
              }else{
                wx.showToast({
                  title: res.msg,
                  icon:'error',
                  duration:1500
                })
                reject();
              }
            },
          })  
        }).catch(err => {
          console.log(err)
          wx.hideLoading({
            success: () => {
              this.setData({
                isTimeout:true,
              })
              wx.showToast({
                title: '网络错误',
                icon:'error'
              })
            
            },
          })
          reject();
        }).finally(() => {
          this.setData({
            isFinish:true
          })
        })
      }, 1000);
    })
  },
  input(event){
    this.setData({
      stateCode:this.checkNum(event.detail.value)
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