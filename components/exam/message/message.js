// components/message/message.js
Component({
  properties:{
    status:{
      type:Number,
      value:0
    },
    sureGo:{
      type:Number,
      value:true
    },
    isSure:{
      type:Boolean,
      value:false
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    process:['面试','一轮考核','二轮考核','笔试'],
    processStatus:['未决定','前往','请假'],
    state:[
      [
        {
          name:"收集中",
          button:[],
          states:['未提交','已提交']
        },
        {
          name:"审核中",
          button:[],
          states:['正在审核','已通过']
        }
      ],
      [
        {
          name:"面试通知",
          button:['参加','缺席'],
          states:['待确认','确认参加','确认参加']
        },
        {
          name:"面试签到",
          button:['签到'],
          states:['待签到','已签到']
        },
        {
          name:"面试叫号",
          button:[],
          states:['等待叫号']
        },
        {
          name:"面试中",
          button:[],
          states:['面试中']
        },
        {
          name:"面试结束",
          button:[],
          states:['已结束']
        }
      ],
      [
        {
          name:"笔试通知",
          button:['参加','缺席'],
          states:['待确认','确认参加','确认参加']
        },
        {
          name:"笔试签到",
          button:['签到'],
          states:['待签到','已签到']
        },
        {
          name:"笔试交卷",
          button:['交卷'],
          states:['未交卷','已交卷']
        }
      ],
      [
        {
          name:"等待叫号",
          button:[],
          states:['等待叫号']
        },
        {
          name:"等待第二志愿面试",
          button:[],
          states:['等待面试']
        }
      ],
      [
        {
          name:"录取结果",
          button:[],
          states:['已录用','未录用']
        }
      ]
    ]
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
  methods:{
    formSubmit(e){
      // console.log("用户信息提交");
      //用户已经提交了信息，应当发送事件到test页面让页面提交网络请求
      this.triggerEvent("Sure",{value:e.detail.value},{})
    }
  }
})