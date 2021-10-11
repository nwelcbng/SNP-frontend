export default function(config){
  return new Promise((resolve,reject) => {
    wx.request(
      {
        url: 'https://snpapi.gdutelc.com'+config.url,
        method:config.method || 'get',
        data:config.data || [],
        // timeout:1,
        header:config.header,
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          console.log(err)
          reject('网络错误');
        }
    }
    )    
  }) 
}