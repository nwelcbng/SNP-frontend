export default function(config){
  return new Promise((resolve,reject) => {
    console.log(config.header);
    wx.request(
      {
        url: config.url,
        method:config.method || 'get',
        data:config.data || [],
        timeout:config.timeout,
        header:config.header,
        success: res => {
          resolve(res.data);
        },
        fail: err => {
          reject('网络错误');
        }
    }
    )    
  }) 
}