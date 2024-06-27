function scanCode(scanInfo){
  wx.scanCode({
    scanType: 'qrCode',
    success: scanInfo.success,
    fail: scanInfo.fail
  });
}
module.exports = {
  scanCode,
}

