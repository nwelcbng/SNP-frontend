// pages/home/home.js
import request from "../../services/network/request.js"

Page({
  data: {
    // indicatorDots: true,
    // vertical: false,
    // autoplay: true,
    // interval: 3000,
    // duration: 1000,
    banners:[], //轮播图数组
    list:[
      {
        title:"网宣部",
        introduce:"网宣部是电协对外日常宣传的一个端口，万千技能集一身，统筹着协会的各项宣传工作。主要负责运营协会的微信公众平台，将协会期望表达的东西传递给大家，同时运用Ps、Pr、Ae，制作活动海报、宣传单、宣传视频等。"
      },
      {
        title:"秘书部",
        introduce:"秘书部在日常中主要负责电协会员课的课室申请；比赛物资的准备；协会内部会议流程的记录；配合网宣部提供新闻稿、通讯稿的文案；还有负责协会论坛的监督。在招新期间负责招新摊位的申请，公共横幅的申请。年末负责社团的年审与红旗社团评比。"
      },
      {
        title:"外联部",
        introduce:"外联部主要负责策划主办各种大会和内建活动，包括策划案的编写，活动组织，选择主持人；对接赞助商，供应商，确保各项活动物资与资金得到保障；与老师进行项目对接，及时为电协人提供各项目的信息；负责加强协会与国内其它高校社团间的密切合作与联系。"
      },
      {
        title:"项目部",
        introduce:"项目部的工作主要有协会每年众多项目申请的审核；有各类比赛时赛前赛后的资料收集；协会存放在不同的平台的大量资源的管理，还肩负着管理协会平台的重任。"
      },
      {
        title:"实践部",
        introduce:"实践部负责的工作主要有协会会员工具的采购与分发；部分科技比赛及其流程的策划与安排；部分摆摊的人员安排和策划以及协助开课组做好会员课开课的准备。"
      },
      {
        title:"维修部",
        introduce:"维修部的日常工作是维护电协元件库，将摆放不整齐的元器件归位；组织校内外义修，以及修理学校驿站收集的故障家电；进行家电维修的培训。"
      }
    ], //部门数据
    party:{
      title:"电子科技协会",
      introduce:`广东工业大学电子科技协会（简称广工电协）是由在校电子技术爱好者于2002年11月组织成立的。广工电协是广东工业大学最大型的学术性社团，协会拥有两个专用实验室，实验室配备了一批先进的设备仪器。

      在近18年中的发展中，协会不断突破自我，技术水平不断沉淀，自主研发室内机器人定位导航系统、基于PID算法的高效开关电源变换器、基于卷积神经网络的自动垃圾分类系统、实时数据流人脸识别的门禁系统，自主开发STM8和STM32开发板。
      
      广工电协在各类学科竞赛，项目开发上均有不错的成绩，在全国大学生电子设计大赛，挑战杯，全美大学生数学建模竞赛，飞思卡尔等大赛中取得瞩目的成绩，而在各类电子竞赛中电协成员更是独领风骚，省级奖项校级奖项不可胜数。在项目开发上，电协拥有3个国家级大创项目，省级项目若干个。其中拥有自主专利6项，电协的毕业生更是深入到行业领头羊：华为，联发科，大疆，CVTE，bigo等，在学术领域，我们的毕业生师兄到清华研究院,中大研究院，华工研究院，电科大，哈工大等。
      
      电协成员学习能力强，技术能力扎实，深受各大工作室，创新团队，创新实验室的喜爱。我们在校内开设电子培训课程及单片机应用设计课程，在校外与各大高校合作，举办义修活动，为大学生服务。
      
      同时电协开设贝尔组：分别在机器学习领域、嵌入式领域、光电视觉领域、硬件领域、网络领域进行深入研究与开发。
      
      电协的理念是让平凡的人成为优秀的人，让优秀的人更加优秀。爱电子，爱生活。电协欢迎广大电子爱好者的加入，我们与你们共成长！`
    },
    tops:[],
    depTop:0,
    scrollTop:500,
    showOneButtonDialog: false,
    buttons: [{text: '确定'}],
  },



  onLoad: function (options) {
    wx.setStorageSync("userInfo","Tan");
    request({
      url:"http://152.136.185.210:7878/api/m5/home/multidata"
    }).then(res => {
      this.setData({
        banners:res.data.data.banner.list
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery();
    query.select('#dep').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => {
      // this.changeTop(res[0].top);
      this.setData({
        depTop:res[0].top
      })
      //res[1].scrollTop // 显示区域的竖直滚动位置
    });


    //取得各个box的距顶高度
    const query2 = wx.createSelectorQuery();
    query2.selectAll('.box').boundingClientRect();
    query2.exec(res => {
      console.log(res[0]);
      const tops = [];
      for(let i = 0;i < res[0].length;i++){
        tops.push(res[0][i].top)
      }
      this.setData({
        tops:tops
      })
    });
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
  onPageScroll(position){
    this.setData({
      scrollTop:position.scrollTop + 500
    })
    // console.log(this.data.tops)
    // console.log(this.data.scrollTop)
  },
  showDate(){
    console.log(this.data)
  },
  scrollToDep(){
    wx.pageScrollTo({
      duration: 500,
      scrollTop:this.data.depTop
    })
  },
  joinDialog(){
    this.setData({
      showOneButtonDialog: !this.data.showOneButtonDialog,
    })
  }
})