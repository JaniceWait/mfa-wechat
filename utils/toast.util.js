function showToast(msg){
    wx.showToast({
      type: 'success',
      title: msg,
      duration: 2000,
      success: () => {
      },
    });
  }
  module.exports = {
    showToast,
  }
  