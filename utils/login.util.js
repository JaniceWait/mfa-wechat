const CloudStroe = require('./cloud.store');
const LocalStroe = require("./local.store");

async function login(){
  try {
    let openId = LocalStroe.readOpenId()
    console.log(openId, "openId")
    return openId;
  } catch (e) {
    console.error(e)
  }
  // 不存在本地openId 则从线上换取
  // 登录
  let loginRes = await wx.login();
  console.log(loginRes)
  let openId = await CloudStroe.code2Session(loginRes.code);
  LocalStroe.storeOpenId(openId)
  return openId;
}

module.exports = {
  login,
}
