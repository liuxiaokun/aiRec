// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas_width: 0,
    canvas_height: 0,
    pic_width: 1,
    phone_width: 1,
    count: "",
    mycanvas: {},
    woodArray: [],
    imagesrc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    let _this = this;
    wx.getSystemInfo({
      success: res => {
        console.log('手机分辨率：' + res.windowHeight + "x" + res.windowWidth)
        this.setData({
          canvas_width: res.windowWidth,
          canvas_height: res.windowHeight
        })
      },
    })

    this.mycanvas = wx.createCanvasContext('my_canvas')
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: res => {
        console.log(res)
        _this.setData({ imagesrc: res.tempFilePaths[0] })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success(response) {
            console.log("图片的分辨率: " + response.height + "x" + response.width);
            _this.setData({
              pic_width: response.width
            })

            //_this.mycanvas.drawImage(res.tempFilePaths[0], 0, 0, response.width, response.height, 0, 0, response.width, response.height)
          }
        })
        //ctx.draw()

        wx.getSystemInfo({
          success: function (res) {
            let clientHeight = res.windowHeight;
            let clientWidth = res.windowWidth;
            let changeHeight = 750 / clientWidth;
            let height = clientHeight * changeHeight;
            _this.setData({
              phone_width: clientWidth
            });
          }
        })

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: resp => {
            console.log('data:image/png;base64,', resp.data)
            wx.setStorage({
              key: "woodPic",
              data: resp.data
            })
            wx.showLoading({ title: '识别中' })
            wx.request({
              url: 'https://wx.ai.huadong.net/api/detect/base64/ai/7', //路由
              data: {
                "img": resp.data
              },
              method: "POST",
              header: {
                "content-type": "application/json"
              },
              success(e) {
                wx.hideLoading()
                console.log(e.data)
                let array = e.data.data.result;
                let code = e.data.code

                if(code === '-1') {
                  wx.showToast({
                    title: '服务暂不可用',
                    icon: 'success',
                    duration: 1000,
                    mask: true
                  })
                  return
                }

                _this.setData({
                  count: array.length
                })
                // wx.setStorage({
                //   key: "woodArray",
                //   data: woodArray
                // })
                console.log(_this.data.phone_width + ":::::" + _this.data.pic_width)
                for (let i = 0; i < array.length; i++) {
                  let rect = array[i].rect
                  let type = array[i].type

                  let scale = _this.data.phone_width / _this.data.pic_width

                  let centerX = (rect[0] + rect[2]) / 2 * scale
                  let centerY = (rect[1] + rect[3]) / 2 * scale

                  //线束的长短
                  let lenX = (rect[2] - rect[0]) / 2 / 2 * scale
                  let lenY = (rect[3] - rect[1]) / 2 / 2 * scale
                  _this.mycanvas.setStrokeStyle('red')
                  _this.mycanvas.setLineWidth(2)

                  //竖线
                  _this.mycanvas.moveTo(centerX, centerY - lenY)
                  _this.mycanvas.lineTo(centerX, centerY + lenY)
                  //横线
                  _this.mycanvas.moveTo(centerX - lenX, centerY)
                  _this.mycanvas.lineTo(centerX + lenX, centerY)

                  _this.mycanvas.stroke()
                }
                _this.mycanvas.draw()
              }
            })
          }

        })
      }
    })
  },
  fail: function () {
    // fail
  },
  complete: function () {
    // complete
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

  },

  touchStart(e) {
    console.log("touchStart", e)

    let x = e.touches[0].x;
    let y = e.touches[0].y;

    console.log("x: " + x + ", y: " + y)

    //   let _this = this
    //   let deleteIndex
    //   let woodArray = wx.getStorageSync('woodArray');

    //   for (let i = 0; i < woodArray.length; i++) {
    //     let arr = woodArray[i]

    //     console.log(arr)
    //     debugger
    //     if (x > arr[0] && x < arr[2] && y > arr[1] && y < arr[3]) {
    //       debugger
    //       console.log("find ...")
    //       deleteIndex = i
    //       let centerX = (rect[0] + rect[2]) / 2
    //       let centerY = (rect[1] + rect[3]) / 2
    //       let lenX = (rect[2] - rect[0]) / 2 / 2
    //       _this.mycanvas.arc(centerX, centerY, lenX, 0, 2 * Math.PI)
    //       _this.mycanvas.draw()
    //       break
    //     }

    //     woodArray.splice(deleteIndex, 1)
    //   }
    //   _this.setData({
    //     count: woodArray.length
    //   })
    //   wx.setStorage({
    //     key: "woodArray",
    //     data: woodArray
    //   })
  }
})