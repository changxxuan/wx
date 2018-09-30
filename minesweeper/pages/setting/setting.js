// pages/city/city.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    row:app.globalData.row,
    column: app.globalData.column,
    bound: app.globalData.bound
  },
  confirm: function(){
    wx.switchTab({
      url: '../game/game'
    })
  },
  rowChange:function(e){
    app.globalData.row = e.detail.value;
    // var that = this;
    // var row = e.detail.value;
    // that.setData({ row: row});
  },
  columnChange: function (e) {
    app.globalData.column = e.detail.value;
  },
  boundChange: function (e) {
    app.globalData.bound = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})