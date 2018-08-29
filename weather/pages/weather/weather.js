var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_id: app.globalData.curid,
    update:"",
    basic:"",
    now:"",
    weatherpng:"",
    hourly:"",
    dailyforcast:"",
    suggestion:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getnow: function (fn) {
    wx.request({//请求服务器，类似ajax
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: { location: app.globalData.curid, key: '01a7798b060b468abdad006ea3de4713' },//和风天气提供用户key，可自行注册获得
      header: { 'Content-Type': 'application/json' },
      success: function (res) { fn(res.data.HeWeather6[0]); }//成功后将数据传给回调函数执行
    })
  },
  gethourly: function (fn) {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/hourly',
      data: { location: app.globalData.curid, key: '01a7798b060b468abdad006ea3de4713' },
      header: { 'Content-Type': 'application/json' },
      success: function (res) { 
        var hourlyarr = [];
        res.data.HeWeather6[0].hourly.forEach(function(val,i){
          hourlyarr.push({time:val.time.split(" ")[1], cond_code:val.cond_code, tmp:val.tmp});
        });
        fn(hourlyarr);
      }
    })
  },

  getdailyforcast: function (fn) {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: { location: app.globalData.curid, key: '01a7798b060b468abdad006ea3de4713' },
      header: { 'Content-Type': 'application/json' },
      success: function (res) { 
        var dailyforcast = [];
        var week = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        res.data.HeWeather6[0].daily_forecast.forEach(function(val,i){
          switch(i){
            case 0: var day = '今天';break;
            case 1: var day = '明天';break;
            case 2: var day = '后天'; break;
            default: var day = week[new Date(val.date).getDay()];
          }
          var date = val.date.split('-')[1] + '.' + val.date.split('-')[2];
          var wind = val.wind_dir + ' ' + val.wind_sc + '级';
          dailyforcast.push({day:day,date:date,cond_txt_d:val.cond_txt_d, cond_txt_n:val.cond_txt_n, wind:wind, tmp_d:val.tmp_max, tmp_n:val.tmp_min});
        });
        fn(dailyforcast);
      }
    })
  },
  //获取生活指数API
  getsuggestion: function (fn) {
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/lifestyle',
      data: { location: app.globalData.curid, key: '01a7798b060b468abdad006ea3de4713' },
      header: { 'Content-Type': 'application/json' },
      success: function (res) { 
        var suggestion = {};
        var temp;
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'comf');
        suggestion.comf = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'cw');
        suggestion.cw = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'drsg');
        suggestion.drsg = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'flu');
        suggestion.flu = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'sport');
        suggestion.sport = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'trav');
        suggestion.trav = { brf: temp.brf, txt: temp.txt };
        temp = that.findsuggestion(res.data.HeWeather6[0].lifestyle, 'uv');
        suggestion.uv = { brf: temp.brf, txt: temp.txt };
        fn(suggestion);
      }
    })
  },
  findsuggestion: function(resdata, suggestiontype){
    let i = 0;
    for(; i < resdata.length; i++){
      if (resdata[i].type === suggestiontype){
        return resdata[i];
      }
    }
  },
  showcity:function(e){
    wx.switchTab({
      url: '../city/city',
    })
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
    var that = this;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })//设置加载模态框
    that.getnow(function (d) {//获取到数据的回调函数
      wx.hideToast();
      var weatherpng = "https://cdn.heweather.com/cond_icon/" + d.now.cond_code + ".png";
      that.setData({ basic: d.basic, now: d.now, update: d.update, weatherpng: weatherpng })//更新数据，视图将同步更新
    })
    that.gethourly(function (d) {
      that.setData({ hourly: d })//更新数据
    })
    that.getdailyforcast(function (d) {
      that.setData({ dailyforcast: d })//更新数据
    })
    that.getsuggestion(function (d) {
      that.setData({ suggestion: d })//更新数据
    })

    console.log("dailyforcast: " + that.data.dailyforcast);
    console.log("suggestion: " + that.data.suggestion);
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