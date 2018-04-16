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

    return (
      <div className="component-user-config">
        <div id="originalityOrder" className="config-field">
          <legend>创意收集 排序</legend>
          {originalityOrderJSX()}
        </div>
      </div>
    )
  }
}
 
export default UserConfig;