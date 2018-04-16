import React from 'react';
import { Link } from 'react-router-dom';
import store from './store';
// import BottomMenu from './BottomMenu';
import 'styles/action.less';

class Action extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    let initData = { 1: { id: 1, time: (new Date().toString()), text: '编写加入一个创意、任务、Idea 吧' } }
    this.state.originality = store.getOriginalityOrderBy() || initData
    this.state.allAction = store.getAction()
    this.handleActionItemClick = this.handleActionItemClick.bind(this)
  }

  componentDidMount() {
    this.props.setLinkActive('/actions')
  }

  handleActionItemClick(originalityId, actionId, e) {
    e.preventDefault()
    let action = this.state.allAction[originalityId]
    let actionItem = action[actionId]
    if (actionItem['complete']) {
      actionItem.complete = false
    } else {
      actionItem.complete = true
    }
    this.setState({
      allAction: this.state.allAction
    })
    store.setAction(originalityId, action)
  }

  actionsJSX(originality) {
    let action = this.state.allAction[originality.id]
    let actionList = []
    let mark = ''
    for (let index in action) {
      if (action[index].complete) {
        mark = '完成'
      } else {
        mark = ''
      }
      actionList.push(
        <tr className="pure-g" key={`${originality.id}_${action[index].id}`} onClick={this.handleActionItemClick.bind(this, originality.id, action[index].id)}>
          <td className="pure-u-1-1 item-action-text">
            <div className="pure-u-7-24">
              {mark}
            </div>
            <div className="pure-u-15-24">
              <a href="javascript:;">{action[index].text}</a>
            </div>
          </td>
        </tr>
      )
    }
    return actionList
  }

  render() {
    let originality = this.state.originality
    let originalityList = []
    for (let index in originality) {
      let item = originality[index]
      let trClassName = 'pure-g pure-table-odd'

      originalityList.push(
        <tr key={item.id} className={trClassName}>
          <td className="pure-u-1-1 item-text">
            <div className="pure-u-15-24">
              <Link to={`/originality/detail/${item.id}`}>{item.text}</Link>
            </div>
            <div className="pure-u-7-24">

            </div>
          </td>
        </tr>
      )
      let actionList = this.actionsJSX(item)
      originalityList = originalityList.concat(actionList)
    }

    return (
      <div className="componet-action">
        <table className="pure-table table-block">
          <tbody>
            {originalityList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Action;