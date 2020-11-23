// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    type: '',
    modalHidden: true,
    picUrl: '',
    flag: false,
    phone_width:1,
    pic_width:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this = this
    this.type = options.type
    this.ctx = wx.createCameraContext()

    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        _this.setData({
          phone_width: clientWidth
        });
    }})

    wx.request({
      url: 'http://api.ai.huadong.net/api/detect/base64/ai/record',
      data: {
        "detectType": this.type,
        "openid": wx.getStorageSync('openid')
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success(e) {
        console.log(e)
        let listResult = e.data.rows
        let list = _this.data.list;
        for (let i = 0; i < listResult.length; i++) {
          let obj = {};
          obj.id = listResult[i].id
          obj.recTim = listResult[i].recTim
          let array = listResult[i].response.result.rect
          obj.picUrl = 'https://wx.ai.huadong.net/api/detect/imgReader/' + listResult[i].id + '?type=0'

          //////

          for (let i = 0; i < array.length; i++) {
            let rect = array[i].rect

            let scale = 1 //_this.data.phone_width/_this.data.pic_width

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
        


          /////

          list.push(obj)
        }
        _this.setData({ list })
      }
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

  itemClick: function (item) {
    console.log(item)

  }
})