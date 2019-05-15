// pages/movie/movie-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commingSoonList: [],
    showLoading: false
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
  onReachBottom: function (event) {
    this.setData({
      showLoading: true
    })
    this.getCommingSoonList();
  },

  getCommingSoonList: function () {

    var _this = this;
    var start = _this.data.commingSoonList.length;

    wx.request({
      url: "http://t.yushu.im/v2/movie/coming_soon",
      data: {
        start: start,
        count: 12
      },
      success: function (data) {
        var tempList = _this.data.commingSoonList;
        for (var i=0; i<data.data.subjects.length; i++){
          tempList.push(data.data.subjects[i])
        }
        _this.setData({
          commingSoonList: tempList,
          showLoading: false
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