//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 安全帽识别
   */
  hatRec() {
    wx.navigateTo({
      url: '/pages/hat/hat',
    })
  },

  /**
 * 车牌识别
 */
  cardIdRec() {
    wx.navigateTo({
      url: '/pages/cardId/cardId',
    })
  },

  smokeRec() {
    wx.navigateTo({
      url: '/pages/smoke/smoke',
    })
  },

  clothesRec() {
    wx.navigateTo({
      url: '/pages/clothes/clothes',
    })
  },

  fireRec() {
    wx.navigateTo({
      url: '/pages/fire/fire',
    })
  },

  boxRec() {
    wx.navigateTo({
      url: '/pages/box/box',
    })
  },

  boxFlagRec() {
    wx.navigateTo({
      url: '/pages/boxFlag/boxFlag',
    })
  },


  /**
   * 木材识别
   */
  woodRec() {
    wx.navigateTo({
      url: '/pages/wood/wood',
    })
  },
})
