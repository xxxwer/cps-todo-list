import React from 'react';
import store from './store';

import 'styles/actionAdd.less';

class ActionAdd extends React.Component {
  constructor(props) {
    super(props);
    let originalityId = props.match.params.originalityId
    this.state = {
      originality: store.getOriginality(originalityId),
      btnText: '添加一个行动步骤',
      hideDeleteBtn: true,
      action: store.getAction(originalityId) || {},
      currentAction: {
        text: '',
        id: (new Date()).getTime()
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleActionValueChange = this.handleActionValueChange.bind(this)
    this.handleActionItemClick = this.handleActionItemClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    let ca = {}
    ca.id = this.state.currentAction.id
    ca.text = this.state.currentAction.text
    if (ca.text === '') {
      alert('输入不能为空')
      return
    }
    this.state.action[ca.id] = ca
    store.setAction(this.state.originality.id, this.state.action)

    this.ResetInput(this.state.action)
  }

  handleDelete(e) {
    e.preventDefault()
    let id = this.state.currentAction.id
    delete this.state.action[id]
    store.setAction(this.state.originality.id, this.state.action)

    this.ResetInput(this.state.action)
  }

  ResetInput(action) {
    this.state.currentAction.id = (new Date()).getTime()
    this.state.currentAction.text = ''
    this.setState({
      action: action,
      currentAction: this.state.currentAction,
      btnText: '添加一个行动步骤',
      hideDeleteBtn: true
    })
  }

  handleActionValueChange(e) {
    let target = e.target
    let value = target.value
    let name = target.name
    this.state.currentAction[name] = value
    this.setState({
      'currentAction': this.state.currentAction
    })
  }

  handleActionItemClick(id, e) {
    e.preventDefault()
    let item = this.state.action[id]

    this.state.currentAction = item
    this.setState({
      currentAction: this.state.currentAction,
      btnText: '修改',
      hideDeleteBtn: false
    })
  }

  render() {
    let actionList = []
    let action = this.state.action
    let originalityId = this.props.match.params.originalityId
    let odd = 0
    for (let index in action) {
      let trClassName = 'pure-g'
      if (odd % 2 === 1) {
        trClassName += ' pure-table-odd'
      }
      odd++

      actionList.push(<tr className={trClassName} key={`${originalityId}_${action[index].id}`} onClick={this.handleActionItemClick.bind(this, action[index].id)}>
        <td className="pure-u-1-1">{action[index].text}</td>
      </tr>)
    }

    let deleteBtn = ''
    if (!this.state.hideDeleteBtn) {
      deleteBtn = <button type="submit" className="pure-button button-error" onClick={this.handleDelete}>删除</button>
    }

    return (
      <div className="component-action-add">
        <legend>{this.state.originality.text}</legend>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="pure-u-1">
              <input type="text" className="pure-input-1" name="text" value={this.state.currentAction.text} onChange={this.handleActionValueChange} />
              <input type="hidden" name="id" value={this.state.currentAction.id} />
            </div>
            <button type="submit" className="pure-button pure-button-primary">{this.state.btnText}</button>
            {deleteBtn}
          </fieldset>
        </form>
        <legend></legend>
        <table className="pure-table table-block">
          <tbody>
            {actionList}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ActionAdd;