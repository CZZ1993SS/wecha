// pages/news.js
var data = require("../../static/news-data.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: ["../../images/news/timg.jpeg",
                   "../../images/news/huawei.jpeg",
                   "../../images/news/ai.jpeg",
                   "../../images/news/5g.jpeg"],
    
    newsList: data.newsData

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

  },

  /**
   * 点击跳转详情页
   */
  onOpenNewsDetail: function (event) {
    // debugger 小技巧;
    var index = event.currentTarget.dataset.index;

    wx.navigateTo({
      url: './news-detail?index=' + index,
    })
  }

})