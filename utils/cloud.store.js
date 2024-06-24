const cloud = require('@alipay/faas-web-sdk');
const {
  storeToLocal
} = require("./local.store");


let aliContext;

async function initAliCloud() {
  // 引入sdk包
  const sdk = new cloud.Cloud({
    endpoint: 'https://env-00jxgxc98heg.api-hz.cloudbasefunction.cn', // 控制台，环境管理 - 环境概览中，网关地址
    secretId: 'SyBVeyfpkn86v2TW', // 控制台，环境管理 - 环境概览中，AK
    secretKey: 'Nw2gbetw5GkS2Emm', // 控制台，环境管理 - 环境概览中，SK
    appId: '2021004153638623', // appId，字段名也可以使用 resourceAppid
    envId: 'env-00jxgxc98heg', // 目标环境 id，字段名也可以使用 resourceEnv
    // 运行环境，浏览器或支付宝小程序中，可不填，微信小程序中使用时，需要设置为 'WEICHAT_MINI'
    runtime: 'WEICHAT_MINI',
    // 请求函数，可不填，默认在浏览器中使用原生 fetch 方法，支付宝小程序中使用 my.request，微信小程序中使用 wx.request
    fetch: '',
  });
  // 初始化
  await sdk.init();
  console.log("初始化完成")
  return sdk;
}

async function init() {
  if (aliContext) {
    return aliContext;
  }
  const sdk = await initAliCloud();
  aliContext = sdk;
  return aliContext;
}

async function storeToCloud(mfaInfos,openId) {
  console.log(openId)
  let sdk = await init();
  console.log("写入云函数", mfaInfos)
  sdk.callFunction({
    // 调用云函数的名称
    name: 'sync',
    data: {
      mfaInfos,
      openId
    },
    success: function (res) {
      console.log("更新成功", res)
    },
    fail: function (res) {
      console.log("更新失败", res)
    }
  });
}

async function code2Session(auth_code){
  let sdk = await init();
  const res = await sdk.callFunction({
    // 调用云函数的名称
    name: 'code2Session',
    data: {"auth_code":auth_code}
  });
  console.log(res.result)
  return res.result;
}

async function readByCloud(openId) {
  let sdk = await init();
  let readSuccess = true;
  // 同步接口
  try {
    const res = await sdk.callFunction({
      // 调用云函数的名称
      name: 'get',
      data: {openId}
    });
    console.log(res);
    if (!res.result) {
      return {
        readSuccess,
        data: []
      };
    }
    console.log(res,"cloud-res")
    let mfaInfos = res?.result?.mfaInfos;
    storeToLocal(mfaInfos);
    return {
      readSuccess,
      data: mfaInfos
    };
  } catch (e) {
    console.error(e)
    readSuccess = false;
    return {
      readSuccess,
      data: []
    };
  }
}

module.exports = {
  storeToCloud,
  readByCloud,
  code2Session
}