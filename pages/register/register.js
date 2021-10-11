import {getForm} from "../../services/network/register"
Page({

  data: {
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
    this.requestData().finally(() => {
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
      this.setData({
        isFinish:false,
        isTimeout:false
      })
      wx.showLoading({
        title: '加载数据中',
      });
      setTimeout(() => {
        getForm().then(res => {
          wx.hideLoading({
            success: () => {
              if(res.code == 1){
                let data = JSON.parse(res.data);
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
                this.setCpnData({});
                wx.showToast({
                  title: res.msg,
                  icon:'error',
                  duration:1500
                })
                this.setData({
                  isTimeout:true,
                })
              }
            },
          })
        }).catch(err => {
          console.log(err)
          this.setCpnData({});
          wx.hideLoading();
          wx.showToast({
            title: '网络错误',
            icon:'error',
            duration:1500
          })
          this.setData({
            isTimeout:true,
          })
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