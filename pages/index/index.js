// index.js
const FormatedUtils = require('../../utils/formated.mfa.util.js')
const CardUtils = require('../../utils/card.util.js')
const OTPAuthUtils = require("../../utils/otpauth.util.js");
const LocalStroe = require("../../utils/local.store.js");
const CloudStroe = require("../../utils/cloud.store.js");
const Login = require("../../utils/login.util");

let app = getApp()


Page({
  data: {
    visible: false,
    mfaInfos: [{
      title: "GitHub:baiyang0910",
      joinTime: "2024/06/22 18:32:45",
      url: "otpauth://totp/GitHub:baiyang0910?secret=AMTTPHN3YRPRWJFZ&issuer=GitHub"
    }],
    formateds: [],
    actions: [{
        text: '扫描二维码添加',
        key: 'scan',
      },
      {
        text: '输入激活码添加',
        key: 'input',
      },
      {
        text: '导入',
        key: 'import',
      }
    ],
    cardInfos: [],
    basicShow: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '数据处理中...',
    })
    
    await this.loadPageCardData();
    // 加载页面
    let formateds = FormatedUtils.convertFormatedMFAInfos(this.data.mfaInfos);
    this.data.formateds = formateds;
    this.refreshCardInfos();
    // 开始定时器，每隔1000毫秒（1秒）执行一次tick函数
    const timerId = setInterval(this.refreshCardInfos.bind(this), 1000);
    // 将定时器的 ID 保存到数据中
    this.data.refreshCardInfosTimerId = timerId;
    wx.hideLoading()
  },async loadPageCardData(){
    let localRes = LocalStroe.readByLocal();
    if (localRes.readSuccess){
      console.log(localRes)
      this.data.mfaInfos = localRes.data;
    }else{
      this.data.mfaInfos = await this.loadCloudData()
    }
    return this.data.mfaInfos;
  },
  async loadCloudData(){
    let openId = await this.getOpenId();
      // 从网络上尝试读取
       let cloudRes = await CloudStroe.readByCloud(openId)
       if (cloudRes.readSuccess){
        return cloudRes.data;
       }else{
        return  [];
       }
  },
  addMFAByInput() {
    let that = this;
    wx.navigateTo({
      url: '/pages/addMFA/addMFA',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        saveData: function (data) {
          let mfaInfo = OTPAuthUtils.buildMfaInfoByAddInfo(data);
          console.log(mfaInfo);
          that.addMFAInfo(mfaInfo);
        }
      }
    })
  },
  addMFAByImport() {
    let that = this;
    wx.navigateTo({
      url: '/pages/import/import',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        improtData: function (otpauthURLs) {
          for (let i = 0 ; i < otpauthURLs.length; i++){
            let otpauthURL = otpauthURLs[i]
            console.log(otpauthURL,"otpauthURL====")
            let mfaInfo = OTPAuthUtils.buildMfaInfoByUrl(otpauthURL);
            that.addMFAInfo(mfaInfo);
          }
        }
      }
    })
  },
  addMFAInfo(mfaInfo) {
    // 保存原始信息到当前页面
    this.data.mfaInfos.push(mfaInfo)

    //存档
    this.store();

    let formated = FormatedUtils.convertFormatedMFAInfo(mfaInfo);
    // 保存序列化好的数据到当前页面
    this.data.formateds.push(formated);
    // 存储到本地
    // 存储到远端
    this.refreshCardInfos();
    // 提示添加成功
    wx.showToast({
      type: 'success',
      title: '添加成功',
      duration: 2000,
      success: () => {
        // go back to INDEX page and refresh
        this.setData({
          basicShow: false
        })
      },
    });
  },
  refreshCardInfos() {
    let formateds = this.data.formateds;
    if (formateds.length >= 0) {
      let cardInfos = CardUtils.getRefreshCardInfos(formateds)
      this.setData({
        cardInfos: [...cardInfos]
      });
    }
  },
  addMFAByScanCode() {
    // 从网络上读取数据  并保存到本地文件中
    const that = this; // 保存页面实例的引用  
    wx.scanCode({
      scanType: 'qrCode',
      success: (res) => {
        console.log('扫码成功', res);
        const curOtp = res.result;
        if(curOtp.indexOf("otpauth:") == -1){
          return
        }
        let mfaInfo = OTPAuthUtils.buildMfaInfoByUrl(curOtp);
        console.log(mfaInfo)
        that.addMFAInfo(mfaInfo);

      },
      fail: (res) => {
        console.log('扫码失败', res);
        // 处理扫码失败的逻辑
      }
    });
  },
  handleAction(item, index, e) {
    const [clickItem] = item.detail;
    if (clickItem.key === 'scan') {
      this.addMFAByScanCode()
      return;
    }
    if (clickItem.key === 'input') {
      this.addMFAByInput()
      return;
    }
    
    if (clickItem.key === 'import') {
      this.addMFAByImport()
      return;
    }
  },
  handleCloseBasic(e) {
    this.setData({
      visible: false,
    });
  },
  handleOpenBasic(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      visible: true,
    });
  },
  onChangeSearch(item, e) {
    let value = item.detail
    const searchArray = this.data.mfaInfos.filter(obj => obj.title.includes(value))
    this.data.formateds = FormatedUtils.convertFormatedMFAInfos(searchArray);
    this.refreshCardInfos()
  },
  onUnload() {
    clearInterval(this.data.refreshCardInfosTimerId);
  },
  editRemark(event) {
    console.log("event", event)
    let value = event.detail.value;
    let index = event.detail.index
    this.updateRemark(index, value)
  },
  updateRemark(index, value) {
    this.data.mfaInfos[index].title = value;
    this.store()
    this.data.formateds[index].title = value;
    this.refreshCardInfos();
  },
  deleteItem(event) {
    let index = event.detail.index;
    this.data.mfaInfos.splice(index, 1)
    this.store()
    this.data.formateds.splice(index, 1)
    this.refreshCardInfos();
  },async getOpenId(){
    if (this.data.openId){
      return this.data.openId;
    }else{
      let openId = app.globalData.openId
      if (openId){
        this.data.openId = openId; 
        return this.data.openId;
      }else{
        openId = await Login.login();
        this.data.openId = openId; 
        app.globalData.openId = openId
      }
      return openId;
    }
  },
  handleLink(){
    wx.navigateTo({
      url: '/pages/settings/feature-introduction/feature-introduction'
    });
  }
  ,
  async store() {
    // 本地存储
    LocalStroe.storeToLocal(this.data.mfaInfos);
    // 远程存储
    CloudStroe.storeToCloud(this.data.mfaInfos,await this.getOpenId())
  },
  async onShow(){
    if(app.globalData.syncStatus){
      app.globalData.syncStatus = false
      this.data.mfaInfos = await this.loadCloudData()
          // 加载页面
      let formateds = FormatedUtils.convertFormatedMFAInfos(this.data.mfaInfos);
      this.data.formateds = formateds;
      this.refreshCardInfos();
    }
  }
})