// pages/setting/setting.js
let app = getApp()
const {showToast} = require("../../utils/toast.util");
const Route = require("../../utils/route.util");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    configs:{
      version: "v1.0.1"
    }
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
  onSyncData(){
    app.globalData.syncStatus = true
    showToast('数据已经同步');

  },
  showFeatureIntroduction() {
    // 展示功能介绍的具体实现
    Route.navigateTo({
      url: '/pages/settings/feature-introduction/feature-introduction'
    });
  },
  showAboutUs() {
    // 展示关于我们的具体实现
    Route.navigateTo({
      url: '/pages/settings/about-us/about-us'
    });
  },
  onClientVersion(){
    showToast(this.data.configs.version);
  }
})