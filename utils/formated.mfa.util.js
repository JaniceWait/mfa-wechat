const OTPAuthUtils = require("./otpauth.util.js");

function calculateTimeAndProgress(totp){
  let second = (totp.period * (1 - ((Date.now() / 1000 / totp.period) % 1))) | 0;
  let progress = Math.round((second / 30) * 100);
  return {second,progress}
}

function convertFormatedMFAInfos(mfaInfos){
    if(!mfaInfos){
      return []
    }
    let formatedMFAInfos = [];
    for (let i = 0 ; i < mfaInfos.length; i++){
      let mfaInfo = mfaInfos[i];
      let formatedMFAInfo = convertFormatedMFAInfo(mfaInfo);
      formatedMFAInfos.push(formatedMFAInfo)
    }
   return formatedMFAInfos;
  }

  function convertFormatedMFAInfo(mfaInfo){
    let totp = OTPAuthUtils.parse(mfaInfo.url);
    let {second,progress} = calculateTimeAndProgress(totp)
    return {
      'second': second,
      'progress': progress,
      'totp': totp,
      'code': OTPAuthUtils.generate(totp),
      'title': mfaInfo.title,
      'joinTime': mfaInfo.joinTime
  }
  }


  module.exports = {
    calculateTimeAndProgress,
    convertFormatedMFAInfos,
    convertFormatedMFAInfo,
  }
  