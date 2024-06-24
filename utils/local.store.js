function storeToLocal(mfaInfos) {
  const fs = wx.getFileSystemManager();
  console.log('要写入的数据:', mfaInfos);
  fs.writeFile({
    filePath: `${wx.env.USER_DATA_PATH}/user_data.json`,
    data: JSON.stringify(mfaInfos),
    encoding: 'utf8',
    success(res) {
      console.log('文件写入成功', res);
    },
    fail(err) {
      console.log('文件写入失败', err);
      console.log(err);
    }
  });
}

function storeOpenId(openId) {
  const fs = wx.getFileSystemManager();
  fs.writeFile({
    filePath: `${wx.env.USER_DATA_PATH}/user_info.json`,
    data: openId,
    encoding: 'utf8',
    success(res) {
      console.log('文件写入成功', res);
    },
    fail(err) {
      console.log('文件写入失败', err);
      console.log(err);
    }
  });
}

function readOpenId() {
  const fs = wx.getFileSystemManager()
  // 同步接口
  const res = fs.readFileSync(`${wx.env.USER_DATA_PATH}/user_info.json`, 'utf8')
  return res;
}

function readByLocal() {
  const fs = wx.getFileSystemManager()
  let readSuccess = true;
  // 同步接口
  try {
    const res = fs.readFileSync(`${wx.env.USER_DATA_PATH}/user_data.json`, 'utf8')
    console.log(res)
    if (!res) {
      return {
        readSuccess,
        data: []
      };
    }
    return {
      readSuccess,
      data: JSON.parse(res)
    };
  } catch (e) {
    console.error(e)
    readSuccess = false;
    return {
      readSuccess,
      data: []
    };
  }


}
module.exports = {
  storeToLocal,
  readByLocal,
  readOpenId,
  storeOpenId
}