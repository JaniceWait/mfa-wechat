import * as OTPAuth from "otpauth";
const { formatTime } = require("./util.js");

function buildMfaInfoByUrl(url){
  let totp = OTPAuth.URI.parse(url);
  let curData = formatTime(new Date())
  let title = `${totp.issuer}:${totp.label}`; 
  const curMFAData = {
    title : title,
    joinTime: curData,
    url: url
  }
  return curMFAData;
}

function buildMfaInfoByAddInfo(addInfo){
  const curOtp = `otpauth://totp/${addInfo.account}?secret=${addInfo.secret}`;
  return buildMfaInfoByUrl(curOtp)
}

function parse(url){
  return OTPAuth.URI.parse(url);
}

function generate(totp){
  return totp.generate();
}

module.exports = {
  buildMfaInfoByUrl,
  buildMfaInfoByAddInfo,
  parse,
  generate,
}
