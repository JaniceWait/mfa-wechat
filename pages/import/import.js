// pages/import/import.js
const {resolveEventValue} = require("../../utils/util");
const {showToast} = require("../../utils/toast.util");

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  }
  ,
    handleRef(input) {
        this.input = resolveEventValue(input);
    },
    submitByImportRef(){
      let otpauthText = this.input.getValue();
      console.log(otpauthText)
      if (!otpauthText){
        this.showToast("请输入内容")
        return
      }
      this.input.update('')
      let otpauthURLs = otpauthText.trim().split('\n').filter(Boolean);
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('improtData', otpauthURLs);
      wx.navigateBack();
    }

})