// pages/game/game.js

var app = getApp();
var bound = require('bound.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nabar:"",
    gamearr: [],
    bound: app.globalData.bound,
    sweepBound: 0,
    startButtonText:"开始",
    minute: 0,
    second: 0,
    timer: null,
    showBound: false,
    canGameStart: false,
    flagmark: false,
    success: false,
    failure: false
  },
  onclick: function(e){
    var that = this;
    if (!that.data.canGameStart) { return; }
    console.log("status: " + e.target.dataset.status);
    console.log("nabar: " + e.target.dataset.nabar);
    var arr = that.data.gamearr;
    var boundsRemind = that.data.bound;
    if (arr[e.target.dataset.row][e.target.dataset.column].flag === 0) {
      if(that.data.flagmark){
        arr[e.target.dataset.row][e.target.dataset.column].flag = 2;
        boundsRemind--;
      } else {
        if (arr[e.target.dataset.row][e.target.dataset.column].status === 1) {
          //arr[e.target.dataset.row][e.target.dataset.column].nabar = 99;
          arr[e.target.dataset.row][e.target.dataset.column].flag = 1;
          that.showFailure();
        }else{
          that.sweep(e.target.dataset.nabar,e.target.dataset.row, e.target.dataset.column);
        }
      }      
    } else if (arr[e.target.dataset.row][e.target.dataset.column].flag === 3){
      if (that.data.flagmark) {
        arr[e.target.dataset.row][e.target.dataset.column].flag = 0;
      }
    }
    that.setData({ gamearr: arr, bound: boundsRemind});
    var count = that.data.sweepBound;
    if(that.data.bound === 0){
      for (var i = 0; i < app.globalData.row; i++) {
        for (var j = 0; j < app.globalData.column; j++) {
          if (that.data.gamearr[i][j].status===1 && that.data.gamearr[i][j].flag === 2){
            count++;
          }
        }
        if (count === app.globalData.bound){
          that.showWin();
          break;
        } else if (count !== that.data.sweepBound){
          that.setData({ sweepBound: count});
        }
      }
    }
  },
  sweep: function(nabar, i, j){
    var that = this;
    if (that.data.gamearr[i][j].flag !== 0){
      return;
    }
    that.data.gamearr[i][j].flag = 1;
    if(nabar=== 0){
      if (i - 1 >= 0 && j - 1 >= 0) this.sweep(that.data.gamearr[i - 1][j - 1].nabar,i - 1, j - 1);//左上
      if (i - 1 >= 0) this.sweep(that.data.gamearr[i - 1][j].nabar, i - 1, j);//上
      if (j - 1 >= 0) this.sweep(that.data.gamearr[i][j - 1].nabar, i, j - 1);//左
      if (i + 1 <= app.globalData.row - 1 && j - 1 >= 0) this.sweep(that.data.gamearr[i + 1][j - 1].nabar, i + 1, j - 1);//左下
      if (i + 1 <= app.globalData.row - 1) this.sweep(that.data.gamearr[i + 1][j].nabar, i + 1, j);//下
      if (i - 1 >= 0 && j + 1 <= app.globalData.column - 1) this.sweep(that.data.gamearr[i - 1][j+1].nabar, i - 1, j+1);//右上
      if (j + 1 <= app.globalData.column - 1) this.sweep(that.data.gamearr[i][j + 1].nabar, i, j + 1);//右
      if (i + 1 <= app.globalData.row - 1 && j + 1 <= app.globalData.column - 1) this.sweep(that.data.gamearr[i+1][j + 1].nabar, i+1, j + 1);//右下
    }
  },
  showFailure: function(){
    var that = this;
    clearInterval(that.data.timer);
    that.data.timer = null;
    for (var i = 0; i < app.globalData.row; i++) {
      for (var j = 0; j < app.globalData.column; j++) {
        if (that.data.gamearr[i][j].status === 0 && that.data.gamearr[i][j].flag === 2) {
          that.data.gamearr[i][j].flag = 1;
          that.data.gamearr[i][j].wrongFlag = true;
          that.data.gamearr[i][j].nabar = 'X';
        }
      }
    }
    wx.showToast({
      title: 'Game Over !',
      image: '../../images/emoticon_sad.png',
      mask: true,
      duration: 3000,
      complete: function(){
        that.setData({ failure: true});
        // for (var i = 0; i < app.globalData.row; i++) {
        //   for (var j = 0; j < app.globalData.column; j++) {
        //     if (that.data.gamearr[i][j].status === 0 && that.data.gamearr[i][j].flag === 2) {
        //       that.data.gamearr[i][j].flag = 1;
        //       that.data.gamearr[i][j].nabar = 'X';
        //     }
        //   }
        // }
      }
    })
  },
  showWin: function () {
    var that = this;
    clearInterval(that.data.timer);
    that.data.timer = null;
    wx.showToast({
      title: 'You Win !',
      image: '../../images/emoticon_Happy.png',
      mask: true,
      duration: 3000,
      complete: function () {
        
      }
    })
  },
  deleteflag: function (e) {
    var that = this;
    var arr = that.data.gamearr;
    var boundsRemind = that.data.bound;
    if (that.data.flagmark){
      // switch (arr[e.target.dataset.row][e.target.dataset.column].flag){
      //   case 2: arr[e.target.dataset.row][e.target.dataset.column].flag = 3;break;
      //   case 3: arr[e.target.dataset.row][e.target.dataset.column].flag = 0; break;
      //   default: break;
      // }
      arr[e.target.dataset.row][e.target.dataset.column].flag = 3;
      boundsRemind++;
    }
    that.setData({ gamearr: arr, bound: boundsRemind});
  },

  switchchange: function(e){
    var that = this;
    if (!that.data.canGameStart) { return; }
    that.setData({ flagmark: e.detail.value});
    // if (e.detail.value) {
    //   console.log("checked");
    // }else{
    //   console.log("unchecked");
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var onebound = bound.Bound;
    // var t = new onebound();
    // t.shownabar();
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
    this.initgamearr(app.globalData.row, app.globalData.column, app.globalData.bound);
    this.countnabar(app.globalData.row, app.globalData.column);
    that.setData({ minute: ('00' + 0).slice(-2), second: ('00' + 0).slice(-2) });
  },
  initgamearr: function(row, column, bound){
    var that = this;
    let arrmap = [];
    for(let i = 0; i < row; i++){
      arrmap[i] = [];
      for (let j = 0; j < column; j++){
        arrmap[i][j] = {status:0, flag:0, nabar:0, wrongFlag: false};
      }
    }
    let count=0;
    while(count<bound){
      let i = parseInt(Math.random()*row);
      let j = parseInt(Math.random() * column);
      if(arrmap[i][j].status === 0){
        arrmap[i][j].status = 1;
        count+=1; 
      }
    }
    that.setData({ gamearr: arrmap, bound: app.globalData.bound});
    //console.log(that.data.gamearr);
  },
  countnabar: function(row, column){
    var that = this;
    let arrmap = that.data.gamearr;
    for (let i = 0; i < row; i++)
      for (let j = 0; j < column; j++){
        if (arrmap[i][j].status === 1) {
          if (i - 1 >= 0 && j - 1 >= 0) arrmap[i - 1][j - 1].nabar++;
          if (j - 1 >= 0) arrmap[i][j - 1].nabar++;
          if (i - 1 >= 0) arrmap[i - 1][j].nabar++;
          if (i + 1 <= row - 1 && j - 1 >= 0) arrmap[i + 1][j - 1].nabar++;
          if (i + 1 <= row - 1) arrmap[i + 1][j].nabar++;
          if (i - 1 >= 0 && j + 1 <= column - 1) arrmap[i - 1][j + 1].nabar++;
          if (j + 1 <= column - 1) arrmap[i][ j + 1].nabar++;
          if (i + 1 <= row - 1 && j + 1 <= column - 1) arrmap[i + 1][j + 1].nabar++;
        }
      }
    that.setData({ gamearr: arrmap });
    //console.log(that.data.gamearr);
  },
  restart:function(e){
    var that = this;
    var minute = 0;
    var second = 0;
    if (that.data.timer != null) {
      clearInterval(that.data.timer);
      that.data.timer = null;
    }
    that.initgamearr(app.globalData.row, app.globalData.column, app.globalData.bound);
    that.countnabar(app.globalData.row, app.globalData.column);
    that.setData({ startButtonText: "重新开始", canGameStart: true, failure:false,bound: app.globalData.bound});
    that.data.timer = setInterval(() => {
      second++;
      if(second===60){
        second = 0;
        if(minute<60){
          minute++;
        }else{
          clearInterval(that.data.timer);
        }
      }
      that.setData({ minute: ('00' + minute).slice(-2), second: ('00' + second).slice(-2)});
    }, 1000);
    console.log("restart");
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