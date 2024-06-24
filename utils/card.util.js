const {calculateTimeAndProgress} = require("./formated.mfa.util.js");

function getRefreshCardInfos(formatedList){
  const cardInfos = [];
  if (formatedList.length >= 0){
    for (let i = 0; i < formatedList.length; i ++){
      let formated = formatedList[i]
      cardInfos.push(getRefreshCardInfo(formated))
    }
  }
  return cardInfos;
}


function getRefreshCardInfo(formated){
  let {progress} = calculateTimeAndProgress(formated.totp)
  return {
    progress,
    code:formated.totp.generate(),
    title:formated.title
  }
}

module.exports = {
  getRefreshCardInfos,
}