// pages/movie/movie-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commingSoonList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getCommingSoonList();
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

  getCommingSoonList: function () {

    var _this = this;

    wx.request({
      url: "http://t.yushu.im/v2/movie/coming_soon",
      data: {
        count: 9
      },
      success: function (data) {
        _this.setData({
          commingSoonList: data.data.subjects
        })
      },

      fail: function (data) {
        wx.showToast({
          title: "网络请求失败！",
          icon: "none"
        })
      }

    })


  },

  /**
 * 打开电影详情页
 */
  openDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movie/movie-detail?movieId=' + movieId,
    })
  },

  onPreviewImage: function (event) {
    var imageUrl = event.currentTarget.dataset.imageUrl;
    wx.previewImage({
      urls: [imageUrl] // 需要预览的图片http链接列表
    })
  }


})