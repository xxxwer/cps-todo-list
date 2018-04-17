'use strict';

import util from './util';

let store = {}

// 创意收集
store.getOriginality = function(id) {
  let str = localStorage.getItem('originalityList')
  if (!str) {
    return false
  }
  let result = JSON.parse(str)
  if (!id) {
    return result
  }
  return result[id]
}
store.pushOriginality = function(item) {
  let data = store.getOriginality() || {}
  data[item.id] = item
  let str = JSON.stringify(data)

  localStorage.setItem('originalityList', str)
}
store.deleteOriginality = function (id) {
  let data = store.getOriginality() || {}
  if (!data[id]) {
    return
  }
  delete data[id]
  let str = JSON.stringify(data)

  localStorage.setItem('originalityList', str)
}
store.getOriginalityOrderBy = function(type) {
  if (!type) {
    type = store.getConfig('originalityOrder')
  }
  let items = store.getOriginality()
  let temp1items = {}
  if (type != 'importance' && type != 'time') {
    return util.sortObj(items, true)
  }
  for (let index in items) {
    let newIndex = store.getOriginalityNewSortableKey(items[index], type)
    temp1items[newIndex] = items[index]
  }
  return util.sortObj(temp1items)
}
store.getOriginalityNewSortableKey = function (item, type) {
  let trans = { 'A': '1', 'B': '2', 'C': '3', 'D': '4' }
  let timeVal = item.urgency.time
  let importanceVal = trans[item.urgency.importance]
  let newIndex = ''
  if (type == 'time') {
    newIndex += timeVal + importanceVal
  }
  else if (type == 'importance') {
    newIndex += importanceVal + timeVal
  }
  newIndex = newIndex + item.id
  return parseInt(newIndex)
}

// 行动规划
store.getAction = function (id) {
  let str = localStorage.getItem('action')
  if (!str) {
    return false
  }
  let result = JSON.parse(str)
  if (!id) {
    return result
  }
  return result[id]
}
store.setAction = function (id, actions) {
  let allAction = store.getAction() || {}
  allAction[id] = actions
  let str = JSON.stringify(allAction)
  localStorage.setItem('action', str)
}
store.deleteAction = function (id) {
  let allAction = store.getAction() || {}
  if (!allAction[id]) {
    return
  }
  delete allAction[id]
  let str = JSON.stringify(allAction)
  localStorage.setItem('action', str)
}

// 用户配置
store.getConfig = function(key) {
  let str = localStorage.getItem('userConfig')
  if (!str) {
    return false
  }
  let result = JSON.parse(str)
  if (!key) {
    return result
  }
  return result[key]
}
store.setConfig = function(key, value) {
  let data = store.getConfig() || {}
  data[key] = value
  let str = JSON.stringify(data)

  localStorage.setItem('userConfig', str)
}

// 获取所有 数据
store.getAllData = function() {
  let result = {}
  result['originalityList'] = store.getOriginality()
  result['action'] = store.getAction()
  result['userConfig'] = store.getConfig()
  return result
}
// 替换 保存所有数据
store.setAllData = function(data) {
  let setF = (key) => {
    let str = JSON.stringify(data[key])
    localStorage.setItem(key, str)
  }
  setF('originalityList')
  setF('action')
  setF('userConfig')
}

export default store;