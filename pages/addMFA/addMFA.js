import { Form } from 'antd-mini/Form/form';
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
    this.form = new Form();  
    if (this.formRefList) {
      this.formRefList.forEach((ref) => {
          this.form.addItem(ref);
      });
  }
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
  handleRef(ref) {
    if (!this.formRefList) {
      this.formRefList = [];
  }
  this.formRefList.push(ref.detail);
  },
  async submit() {
    const values = await this.form.submit();
    console.log(values);
    const account = values.account;
    const secret = values.secret;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('saveData', {account,secret});
    wx.navigateBack();
  }
})