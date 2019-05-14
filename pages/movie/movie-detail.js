// pages/movie/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      movieDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var movieId = options.movieId;
    wx.request({
      url: "http://t.yushu.im/v2/movie/subject/" + movieId,
      success:function(data){
        var movieDetail = data.data;
        var content = movieDetail.summary.replace(/\\n/g,'\n');
        movieDetail.summary = content;
        _that.setData({
          movieDetail: movieDetail
        })
      }

    })
  },

  onPreviewImage: function(event){
    var imageUrl = event.currentTarget.dataset.imageUrl;
    wx.previewImage({
      urls: [imageUrl] // 需要预览的图片http链接列表
    })
  }


})