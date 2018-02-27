/* global Page */

Page({
  data: {
    submit: false,
    mobile: wx.getStorageSync('mobile')
  },
  getHongbao (event) {
    if (this.data.submit) {
      return
    }
    const {url, mobile} = event.detail.value
    this.setData({submit: true})
    wx.request({
      url: 'https://hongbao.xxooweb.com/hongbao',
      data: {url, mobile},
      method: 'POST',
      success: ({data}) => wx.showModal({
        title: '提示',
        content: data.message,
        showCancel: false
      }),
      fail: () => wx.showModal({
        title: '提示',
        content: '网络繁忙，请稍后重试',
        showCancel: false
      }),
      complete: () => {
        this.setData({submit: false})
        wx.setStorageSync('mobile', mobile)
      }
    })
  },
  onShareAppMessage () {
    return {
      title: '一键领取手气最佳红包（饿了么、美团）',
      path: '/page/index'
    }
  }
})