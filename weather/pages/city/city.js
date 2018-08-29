var app = getApp();
var city = require('cityjson.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //cities:city.cjson
    cur_id: app.globalData.curid,
    cur_name:"",
    citylist:[],
    displaylist:[],
    displayleaderlist: [],
    anglelist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //that.citylist = city.cjson;
    that.getlist(city.cjson);
    that.getname(that.data.cur_id);//函数内部that.data.cur_id undefined·
  },
  getlist: function (json){
    var that = this;
    that.cityjson = [];
    var arr = [];
    json.forEach(function(val,i){
      var tobj = {
        id:val.id,
        cityname:val.cityZh,
        province:val.provinceZh,
        leader:val.leaderZh
      }
      that.cityjson.push(tobj);
    });
    //that.setData({ citylist:that.cityjson});
    that.creatarr();
  },
  creatarr:function(){
    var that = this;
    var arr = [];
    var displayarr = [];
    var anglearr=[];
    var j = 0, k = 0;  //省、市的指针
    that.cityjson.forEach(function (val, i) {
      if (i === 0) {
        arr.push({ province: val.province, larr: [{ leader: val.leader, cityarr: [{ city: val.cityname, id: val.id }] }] });
        displayarr.push("block");
        anglearr.push(180);
      } else {
        let n = 0;
        for (; n <= j; n++) {
          if (arr[n].province === val.province) {
            let m = 0;
            for (; m <= k; m++) {
              if (arr[n].larr[m].leader === val.leader) {
                arr[n].larr[m].cityarr.push({ city: val.cityname, id: val.id });
                break;
              }
            }
            if (m > k) {
              k++;
              arr[n].larr.push({ leader: val.leader, cityarr: [{ city: val.cityname, id: val.id }] })
            }
            break;
          }
        }
        if (n > j) {
          j++;
          k=0;    //不同省、市从0开始搜索；否则，k累加，同省不同市时索引越界，leader未定义
          arr.push({ province: val.province, larr: [{ leader: val.leader, cityarr: [{ city: val.cityname, id: val.id }] }] });
          displayarr.push("none");
          anglearr.push(0);
          //displayarr.push([{ display: "block" }, { angle: 0 }]);
        }
      }
    });
    //that.setData({citylist:arr});
    that.cobj = arr;
    that.setData({ citylist: that.cobj });
    that.setData({displaylist:displayarr});
    that.setData({anglelist:anglearr});
  },

  hideLeader:function(e){
    var that = this;
    console.log(e);
    var temp = that.data.displaylist;
    var angletemp = that.data.anglelist;
    if (that.data.displaylist[e.currentTarget.dataset.id] === "block") {

      temp[e.currentTarget.dataset.id] = 'none';   
      angletemp[e.currentTarget.dataset.id]=0; 
    } else {
      temp[e.currentTarget.dataset.id] = 'block';
      angletemp[e.currentTarget.dataset.id] = 180; 
    }
    that.setData({ displaylist: temp });
    that.setData({ anglelist: angletemp });
  },

  hideCity:function(e){

  },
  getname:function(id){
    var that = this;
    that.cityjson.forEach(function(val,i){
      if(val.id === id){
        that.setData({  cur_name: val.cityname });
        return;
      }
    });
  },

  selecttap:function(e){
    var that = this;
    app.globalData.curid = e.currentTarget.id;
    app.setlocal('curid', app.globalData.curid);
    wx.switchTab({
      url: '../weather/weather',
    });
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