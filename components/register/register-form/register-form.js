
import request from "../../../services/network/request";

// components/register-form/register.form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasPhone:wx.getStorageSync('phone'),
    formData:null,
    btnActive:false,
    depList:['网宣部','秘书部','外联部','项目部','实践部','项目部'],
    GList:['20级','21级'],
    CList:['计算机学院','物理学院'],
    secDepList:['网宣部','秘书部','外联部','项目部','实践部','项目部'],
    GIndex:0,
    CIndex:0,
    depIndex:0,
    secIndex:0,
    sex:0,
    isLoged:false,
    Sactive:false,
    Nactive:false,
    Qactive:false,
    Pactive:false,
    Cactive:false,
    Mactive:false,
    Tactive:false,
    codeBtn:false,
    isSending:false,
    timing:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setFormData(data){
      // 父组件传来的内容
      this.setData({
        formData:data
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
        btnActive:true
      });
      setTimeout(() => {
        this.setData({
          btnActive:false
        })
      },500);
      e.detail.value.sex = this.data.sex;


      this.testData(e.detail.value)
      .then(() => {
        return new Promise((resolve) => {
          console.log('验证通过了')
          this.setData({
            isSending:true
          })
          wx.showLoading({
            title: '提交中',
          });
          resolve();
        })
      })
      .then(() => {
        return request({
          url:"http://localhost:4000/form",
          data:e.detail.value,
          method:"post"
        })
      })
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: "提交成功",  // 标题
          icon: 'success',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: err,  // 标题
          icon: 'none',   // 图标类型，默认success
          duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }).finally(() => {
        this.setData({
          isSending:false
        })
      })
    },
    testData(data){
      return new Promise((resolve ,reject) =>{
        let reg = /^\d{10}$/
        if(!reg.test(data.Sno)){
          //检测学号是否正确
          return reject('学号应该是10位数字哦')
        }
        reg = /^\d{5,10}$/
        if(!reg.test(data.qq)){
          //检测qq是否正确
          return reject('请输入正确的qq号')
        }
        if(!this.hasPhone){
          //检测手机号是否正确
          reg = /^\d{11}$/;
          if(!reg.test(data.phone)){
            return reject('请输入正确的手机号码')
          }
          reg = /^\d{6}$/;
          if(!reg.test(data.testCode)){
            //检测验证码是否正确
            return reject('请输入正确的验证码')
          }
        }
        resolve();
      })

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
    CListChange(event){
      this.setData({
        CIndex:event.detail.value
      })
    },
    GListChange(event){
      this.setData({
        GIndex:event.detail.value
      })
    },
    sexChange(){
      this.setData({
        sex:Number(!this.data.sex)
      })
    },
    StextFoucs(){
      this.setData({
        Sactive:true
      })
    },
    StextUnfoucs(event){
      console.log(this.data.formData.sno)
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
    CtextFoucs(){
      this.setData({
        Cactive:true
      })
    },
    CtextUnfoucs(event){
      if(!event.detail.value){
        this.setData({
          Cactive:false,
          ['formData.class']:""
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
