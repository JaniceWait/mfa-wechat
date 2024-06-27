function showLoading(title){
  wx.showLoading({
    title: title,
  })
}

function hideLoading(){
  wx.hideLoading()
}


module.exports = {
  showLoading,
  hideLoading
}
