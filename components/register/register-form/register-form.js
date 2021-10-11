import { PostForm,PostPhone,PostCode } from "../../../services/network/register";
// components/register-form/register.form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // hasPhone:{
    //   type:Boolean,
    //   value:true
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasPhone:false,
    formData:null,
    btnActive:false,
    depList:['','维修部','秘书部','网宣部','外联部','实践部','项目部'],
    GList:["","大一","大二","大三","大四","研究生"],
    CList:["","机电工程学院","自动化学院","轻工化工学院","信息工程学院","土木与交通工程学院","管理学院","计算机学院","材料与能源学院","环境科学与工程学院","外国语学院","数学与统计学院","物理与光电工程学院","艺术与设计学院","政法学院","马克思主义学院","建筑与城市规划学院","经济与贸易学院","生物医药学院","微电子学院","国际教育学院","继续教育学院","先进制造学院","其他学院"],
    isLoged:false,
    Sactive:false,
    Nactive:false,
    Qactive:false,
    Pactive:false,
    Cactive:false,
    DOactive:false,
    Mactive:false,
    Tactive:false,
    codeBtn:false,
    isSending:false,
    timing:0,
    phone:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setFormData(data){
      console.log("123")
      // 父组件传来的内容
      console.log(wx.getStorageSync('phone'));
      this.setData({
        formData:data,
        hasPhone:wx.getStorageSync('phone')
      })
    },
    formSubmit(e) {
      if(this.data.isSending){
        wx.showToast({
          title: '请不要频繁操作',  // 标题
          icon: 'none',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
        return ;
      }
      this.setData({
        btnActive:true,
        isSending:true
      });
      setTimeout(() => {
        this.setData({
          btnActive:false
        })
      },500);

      setTimeout(() => {
        this.setData({
          isSending:false
        })
      },5000); 
      
      this.submitDataClass(e.detail.value)
      .then(res => {
        return new Promise((resolve) => {
          console.log('表单填写正确通过了')
          wx.showLoading({
            title: '提交中',
          });
          resolve(res);
        })
      })
      .then(res => {
        if(this.data.hasPhone){
          console.log(res);
          return PostForm(res);
        }else{
          console.log(res);
          return PostCode(res);
        }
      })
      .then(res => {
        console.log(res)
        wx.hideLoading();
        if(res.code == 1){
          this.setData({
            hasPhone:true
          })
          wx.setStorageSync('phone',true);
          wx.setStorageSync('token', res.data);
          wx.showToast({
            title: "提交成功",  // 标题
            icon: 'success',   // 图标类型，默认success
            duration: 1500   // 提示窗停留时间，默认1500ms
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon:'error',
            duration: 1500
          })
        }
      })
      .catch(err => {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          title: err,  // 标题
          icon: 'error',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      })
    },

    submitDataClass(data){
      if(this.data.hasPhone){
        console.log('手机验证通过了11')
        data.gender = this.data.formData.gender;
        return this.testData(data)
      }
      console.log('正在验证手机11')
      return this.testPhone(data)
    },
    
    testPhone(data){
      return new Promise((resolve ,reject) => {
        let reg = /^\d{11}$/;
        if(!reg.test(data.phone)){
          return reject('请输入正确的手机号码')
        }
        reg = /^\d{6}$/;
        if(!reg.test(data.code)){
          //检测验证码是否正确
          return reject('请输入正确的验证码')
        }
        resolve(data);
      })
    },

    testData(data){
      return new Promise((resolve ,reject) =>{
        let reg = /^\d{10}$/
        if(!reg.test(data.sno)){
          //检测学号是否正确
          return reject('学号应该是10位数字哦')
        }
        reg = /^\d{5,10}$/
        if(!reg.test(data.qq)){
          //检测qq是否正确
          return reject('请输入正确的qq号')
        }
        resolve(data);
      })

    },
    bindPickerChange(event){
      this.setData({
        ["formData.dno"]:event.detail.value
      })
    },
    bindPickerChangeSec(event){
      this.setData({
        ["formData.secdno"]:event.detail.value
      })
    }, 
    CListChange(event){
      this.setData({
        ['formData.college']:event.detail.value
      })
    },
    GListChange(event){
      this.setData({
        ['formData.grade']:event.detail.value
      })
    },
    sexChange(){
      this.setData({
        ['formData.gender']:!this.data.formData.gender
      })
    },
    StextFoucs(){
      this.setData({
        Sactive:true
      })
    },
    StextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Sactive:false,
          ['formData.sno']:""
        })
      }
    },  
    NtextFoucs(){
      this.setData({
        Nactive:true
      })
    },
    NtextUnfoucs(event){
      console.log(event.detail)
      if(!event.detail.value){
        this.setData({
          Nactive:false,
          ['formData.name']:""
        })
      }
    },  
    QtextFoucs(){
      this.setData({
        Qactive:true
      })
    },
    QtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Qactive:false,
          ['formData.qq']:""
        })
      }
    },  
    PtextFoucs(){
      this.setData({
        Pactive:true
      })
    },
    PtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Pactive:false
        })
      }
    },
    Pinput(event){
      this.setData({
        phone:event.detail.value
      })
    },
    CtextFoucs(){
      this.setData({
        Cactive:true
      })
    },
    CtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Cactive:false,
          ['formData.userclass']:""
        })
      }
    },
    DOtextFoucs(){
      this.setData({
        DOactive:true
      })
    },
    DOtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          DOactive:false,
          ['formData.domitory']:""
        })
      }
    },
    MtextFoucs(){
      this.setData({
        Mactive:true
      })
    },
    MtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Mactive:false,
          ['formData.major']:""
        })
      }
    },
    TtextFoucs(){
      this.setData({
        Tactive:true
      })
    },
    TtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Tactive:false
        })
      }
    },
    codeBtnTap(){
      if(this.data.codeBtn == true){
        console.log('请不要频繁操作');
        return;
      }
      this.setTiming();
      this.setData({
        codeBtn:true
      })
      PostPhone({phone:this.data.phone}).then(res => {
        console.log(res);
        if(res.code == 1){
          wx.showToast({
            title: '已发送验证码',
            icon:'success',
            duration:1500
          })
        }else{
          wx.showToast({
            title: res.msg,
          })
        }
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '网络错误',
          icon:'error'
        })
      })

      setTimeout(() => {
        this.setData({
          codeBtn:false
        })
      },60000)
    },
    setTiming(){
      this.setData({
        timing:60
      })
      let a = setInterval(() => {
        if(this.data.timing > 0){
          this.setData({
            timing:this.data.timing-1
          })
        }else{
          clearInterval(a)
        }
      },1000);
      
    }
  }
})
