// 封装请求

import {errdata} from "api/errdata.js"


// GET
let listing = function(urling){
  return new Promise((resolve,reject)=>{
    uni.request({
      url: urling,
      method:"GET"
    }).then(res=>{
      resolve(res[1].data)
    }).catch(err=>{
      let errs="服务器错误 请稍后重试"
      errdata.errlist(errs)
      reject(err)
    })
  })
}


// post请求
let publicing = function(urling,shopdata){
  return new Promise((resolve,reject)=>{
    uni.request({
      url: urling,
      method:"POST",
      data:shopdata
    }).then(res=>{
      resolve(res[1])
    }).catch(err=>{
      let errs="服务器错误 请稍后重试"
      errdata.errlist(errs)
      reject(err)
    })
  })
}



export {listing, publicing }