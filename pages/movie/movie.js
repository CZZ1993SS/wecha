// pages/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: ["../../images/news/timg.jpeg",
      "../../images/news/huawei.jpeg",
      "../../images/news/ai.jpeg",
      "../../images/news/5g.jpeg"],
      intheatersList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

     var _this = this;

     wx.request({
       url: "http://t.yushu.im/v2/movie/in_theaters",
       data:{
         count:5
       },
       success:function(data){
         _this.setData({
           intheatersList: data.data.subjects
         })
       },

       fail: function(data){
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
  openDetail: function(event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movie/movie-detail?movieId=' + movieId,
    })
  }

})