// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas: {},
    ctx: {},
    imgData: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
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

  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("dddddd:" + res.tempImagePath)
      }
    })
  },

  draw() {
    const ctx = wx.createCanvasContext('myCanvas')
        wx.chooseImage({
          success: function (res) {
            ctx.drawImage("../static/time.jpg", 0, 0, 300, 300)
            ctx.draw()
          }
        })
  }

})