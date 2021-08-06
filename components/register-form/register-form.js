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
    depList:['小a','小b','小c','小d'],
    secDepList:['小a','小b','小c','小d'],
    depIndex:0,
    secIndex:0,
    sex:0,
    isLoged:false,
    Sactive:false,
    Nactive:false,
    Qactive:false,
    Pactive:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      if(!event.detail.value){
        this.setData({
          Pactive:false
        })
      }
    }
  }
})
