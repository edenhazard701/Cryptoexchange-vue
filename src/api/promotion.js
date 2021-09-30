import request from '@/api/request'

export function promNoticeList(data) {
  return request({
    url: '/promNotice/frontNotice/list',
    method: 'post',
    data
  })
}

export function promNoticeDetail(data) {
  return request({
    url: '/promNotice/frontNotice/detail',
    method: 'post',
    data
  })
}

export function promNoticeViews(data) {
    return request({
      url: '/promNotice/frontNotice/views',
      method: 'post',
      data
    })
  }

  export function promPopupList(data) {
    return request({
      url: '/promPopup/frontPopup/list',
      method: 'post',
      data
    })
  }
  
  export function promPopupInfo(data) {
    return request({
      url: '/promPopup/frontPopup/info',
      method: 'post',
      data
    })
  }