import React from 'react';

import 'styles/userConfig.less'
import util from './util';
import store from './store';

class UserConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    let field = this.props.match.params.field
    this.state.config = {
      [field]: store.getConfig(field)
    }
    this.handleSimpleConfigBtnClick = this.handleSimpleConfigBtnClick.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleImport = this.handleImport.bind(this)
  }

  componentDidMount() {
    util.scrollToId('#' + this.props.match.params.field)
  }

  handleSimpleConfigBtnClick(field, value, e) {
    e.preventDefault()
    this.state.config[field] = value
    this.setState({
      config: this.state.config
    })
    store.setConfig(field, value)

    this.props.history.push('/originality/list')
  }

  handleExport(e) {
    e.preventDefault()
    let data = store.getAllData()
    let aLink = document.getElementById('downloadLink')
    util.downloadFile('cps-todo-list-data.json', JSON.stringify(data), aLink)
    aLink.text = '请点击 下载保存'
  }

  handleImport(e) {
    e.preventDefault()
    let f = (data) => {
      let userData = JSON.parse(data)
      if (typeof userData === 'object' && userData.hasOwnProperty('originalityList')) {
        store.setAllData(userData)
      }
    }
    util.localFileReader(e.target, f)
  }

  render() {
    let originalityOrderJSX = () => {
      let items = [
        { name: 'create-time', text: '创建时间排序' },
        { name: 'importance', text: '重要程度排序' },
        { name: 'time', text: '紧急程度排序' }
      ]
      let result = []
      if (!this.state.config.originalityOrder) {
        this.state.config.originalityOrder = 'create-time'
      }
      for (let index in items) {
        let classNameStr = 'pure-button pure-u-3-4'
        if (this.state.config.originalityOrder === items[index].name) {
          classNameStr += ' pure-button-primary'
        }
        let tmp = <div key={`btn-originalityOrder-${items[index].name}`}>
          <button
            className={classNameStr}
            onClick={this.handleSimpleConfigBtnClick.bind(this, 'originalityOrder', items[index].name)}>
            {items[index].text}
          </button>
        </div>
        result.push(tmp)
      }
      return result
    }

    let exportImportJSX = () => {
      let result = <div>
        <legend>导出记录</legend>
        <button
          className='pure-button pure-u-3-4'
          onClick={this.handleExport.bind(this)}>
          生成文件
        </button>
        <a href="javascript:;" className='pure-u-3-4 padding-top-1' id="downloadLink">请先点击 生成文件</a>
        <legend>导入记录</legend>
        <input type="file" onChange={this.handleImport} className='padding-top-1' />
      </div>

      return result
    }

    return (
      <div className="component-user-config">
        <div id="originalityOrder" className="config-field">
          <legend>创意收集 排序</legend>
          {originalityOrderJSX()}
        </div>
        <div id="originalityOrder" className="config-field">
          {exportImportJSX()}
        </div>
      </div>
    )
  }
}

export default UserConfig;