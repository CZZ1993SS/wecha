// pages/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: [
      "../../images/news/timg.jpeg",
      "../../images/news/huawei.jpeg",
      "../../images/news/ai.jpeg",
      "../../images/news/5g.jpeg"],
      intheatersList: [],
      commingSoonList: [],
      top250List: [],
      searchList: [],
      showLoading: false,
      isSearching: false,
      isSearchEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    
    _this.getInTheatersList();

    _this.getCommingSoonList();

    _this.getTop250List();
  },

  /**
   * 打开电影详情页
   */
  openDetail: function(event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movie/movie-detail?movieId=' + movieId,
    })
  },

  getInTheatersList: function(){

    var _this = this;

    wx.request({
      url: "http://t.yushu.im/v2/movie/in_theaters",
      data: {
        count: 5
      },
      success: function (data) {
        _this.setData({
          intheatersList: data.data.subjects
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

  getCommingSoonList: function () {

    var _this = this;

    wx.request({
      url: "http://t.yushu.im/v2/movie/coming_soon",
      data: {
        count: 3
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

   
  getTop250List: function () {

    var _this = this;
    var start = _this.data.top250List.length;

    wx.request({
      url: "http://t.yushu.im/v2/movie/top250",
      data: {
        start: start,
        count: 9
      },
      success: function (data) {
        var tempList = _this.data.top250List;
        for (var i = 0; i < data.data.subjects.length; i++) {
          tempList.push(data.data.subjects[i])
        }
        _this.setData({
          top250List: tempList,
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

  getSearchList: function (queryValue) {

    var _this = this;

    wx.request({
      url: "http://t.yushu.im/v2/movie/search",
      data: {
        q: queryValue
      },
      success: function (data) {

        var searchList = data.data.subjects;
        var isSearchEmpty = false;

        if (searchList.length == 0){
          isSearchEmpty = true;
        }else{
          isSearchEmpty = false;
        }


        _this.setData({
          searchList: data.data.subjects,
          isSearching: true,
          isSearchEmpty: isSearchEmpty
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

  openMore:function(event){
     wx.navigateTo({
       url: '/pages/movie/movie-more',
     })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function (event) {
    this.setData({
      showLoading: true
    })
    this.getTop250List();
  },

  onImageError: function(event){

    var index = event.currentTarget.dataset.index;

    var top250List = this.data.top250List;

    var movieItem = top250List[index];

    movieItem.images.large = "../../images/error_img.jpg";

    top250List[index] = movieItem;
    
    this.data.top250List[index] = movieItem;

    this.setData({
      top250List: top250List
    })
  },

  onSearch:function(event){

    if (event.detail.value){
      this.getSearchList(event.detail.value);
    }else{
      this.setData({
        isSearching: false
      })
    }
    

  }


})