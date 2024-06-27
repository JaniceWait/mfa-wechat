function navigateTo(route){
  wx.navigateTo({
    url: route.url,
    events: route.events
  });
}
module.exports = {
  navigateTo,
}
