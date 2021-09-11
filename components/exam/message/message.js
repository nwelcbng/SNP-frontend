// components/message/message.js
Component({
  properties:{
    stateCode:{
      type:Array,
      value:[]
    },
    position:{
      type:String,
      value:'教五502晚上17:00'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    state:[
      [
        {
          name:"收集中",
          button:[[],[]],
          states:['未提交','已提交']
        },
        {
          name:"审核中",
          button:[[],[]],
          states:['正在审核','已通过']
        }
      ],
      [
        {
          position:"",
          name:"面试通知",
          button:[
            [{
              name:"参加",
              method:"go"
            },
            {
              name:"缺席",
              method:"absent"
            }],
            [],[]
          ],
          states:['待确认','确认参加','确认参加']
        },
        {
          name:"面试签到",
          button:[
            [{
              name:"签到",
              method:"go"
            }],
            []
          ],
          states:['待签到','已签到']
        },
        {
          name:"面试叫号",
          button:[[]],
          states:['等待叫号']
        },
        {
          name:"面试中",
          button:[[]],
          states:['面试中']
        },
        {
          name:"面试结束",
          button:[[]],
          states:['已结束']
        }
      ],
      [
        {
          name:"笔试通知",
          button:[
            [{
              name:"参加",
              method:"go"
            },
            {
              name:"缺席",
              method:"absent"
            }],
            [],[]
          ],
          states:['待确认','确认参加','确认缺席']
        },
        {
          name:"笔试签到",
          button:[
            [{
              name:"签到",
              method:"go"
            }],
            []
          ],
          states:['待签到','已签到']
        },
        {
          name:"笔试交卷",
          button:[
            [{
              name:"交卷",
              method:"go"
            }],
            []
          ],
          states:['未交卷','已交卷']
        }
      ],
      [
        {
          name:"等待叫号",
          button:[[]],
          states:['等待叫号']
        },
        {
          name:"第二志愿",
          button:[[]],
          states:['等待面试']
        }
      ],
      [
        {
          name:"录取结果",
          button:[[],[]],
          states:['已录用','未录用']
        }
      ]
    ],
    remark:''
  },

  methods:{
    go(){
      console.log("走")
      // console.log("用户信息提交");
      //用户已经提交了信息，应当发送事件到test页面让页面提交网络请求
      this.triggerEvent("SureGo",{remark:this.data.remark},{})
    },
    absent(){
      console.log("跑路")
      // console.log("用户信息提交");
      //用户已经提交了信息，应当发送事件到test页面让页面提交网络请求
      this.triggerEvent("SureAb",{remark:this.data.remark},{})
    },
    onchange(e){
      this.setData({
        remark:e.detail.value
      })
    }
  }
})