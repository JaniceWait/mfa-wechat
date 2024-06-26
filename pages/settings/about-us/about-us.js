// pages/settings/about-us/about-us.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giteeVisible: false,
    githubVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleGiteeVisibleChange(e) {
      this.setData({ giteeVisible:e.detail });
  },
  handleGithubVisibleChange(e) {
    this.setData({ githubVisible:e.detail  });
  },
  onTapGitee(){
    this.onClipboard('https://gitee.com/wuhun0301/mfa')
    this.setData({ giteeVisible:false });

  },
  onTapGithub(){
    this.onClipboard('https://github.com/baiyang0910/MFA')
    this.setData({ githubVisible:false });
  },onClipboard(content){
    wx.setClipboardData({
      data: content,
      success (res) {
        
      }
    })
  }
})