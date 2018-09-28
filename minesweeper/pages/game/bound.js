function Bound(){
  this.flag = 0;    //标志 0未翻开 1翻开 2 标记
  this.status = 0;  //状态 0无炸弹 1有炸弹
  this.nabar = 0;   //周围的炸弹数量
  this.color = "";
  this.shownabar = shownabar;
}
function shownabar() {
  console.log(this.nabar);
  switch (this.nabar) {
    case 1: this.color = "darkblue"; break;
    case 2: this.color = "green"; break;
    case 3: this.color = "red"; break;
    case 4: this.color = "blue"; break;
    case 5: this.color = "maroon"; break;
    case 6: this.color = "lightseagreen"; break;
    case 7: this.color = "black"; break;
    case 8: this.color = "gray"; break;
    default: break;
  }
  // switch(this.nabar){
  //   case 1: this.ForeColor = Color.DarkBlue;; break;
  //   case 2: this.ForeColor = Color.Green; break;
  //   case 3: this.ForeColor = Color.Red; break;
  //   case 4: this.ForeColor = Color.Blue; break;
  //   case 5: this.ForeColor = Color.Maroon; break;
  //   case 6: this.ForeColor = Color.LightSeaGreen; break;
  //   case 7: this.ForeColor = Color.Black; break;
  //   case 8: this.ForeColor = Color.Gray; break;
  //   default: break;
  // }
}


module.exports.Bound = Bound;