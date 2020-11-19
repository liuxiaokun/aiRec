//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    canvas_width: 200,
    canvas_height: 300,
    img: '../static/time.jpg'
  },
  onLoad: function () {
    this.canvas();
  },

  canvas() {
    var ctx = wx.createCanvasContext('my_canvas', this)
    var canvas_width = this.data.canvas_width,
      canvas_height = this.data.canvas_height;
    var img = this.data.img;
    wx.getImageInfo({
      src: img,
      success(res) {
        console.log(res.width, res.height);

        var img_width = res.width,
          img_height = res.height;

        var clip_left, clip_top, //左偏移值，上偏移值，
          clip_width, clip_height; //截取宽度，截取高度

        clip_height = img_width * (canvas_height / canvas_width);
        if (clip_height > img_height) {
          clip_height = img_height;
          clip_width = clip_height * (canvas_width / canvas_height);
          clip_left = (img_width - clip_width) / 2;
          clip_top = 0;
        } else {
          clip_left = 0;
          clip_top = (img_height - clip_height) / 2;
          clip_width = img_width
        }

        var data = {
          clip_left,
          clip_top,
          clip_width,
          clip_height
        }

        ctx.drawImage(img, clip_left, clip_top, clip_width, clip_height, 0, 0, canvas_width, canvas_height);
        ctx.draw();
      }
    })
  }
})
