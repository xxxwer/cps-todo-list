import React from 'react';
import store from './store';
import OriginalityForm from './OriginalityForm';
import BottomMenu from './BottomMenu';
import { Link } from 'react-router-dom';

class OriginalityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    }
    this.state.item = store.getOriginality(this.state.id)

    this.handleData = this.handleData.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleData(data) {
    store.pushOriginality(data)
    this.props.history.push('/originality/list')
  }

  handleBack(e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  handleDelete(e) {
    e.preventDefault()
    let originalityId = this.state.id
    store.deleteAction(originalityId)
    store.deleteOriginality(originalityId)
    this.props.history.goBack()
  }

  render() {
    let item = this.state.item
    let menu = []
    menu.push(<li key="originality-add" className="pure-menu-item">
      <Link className="pure-menu-link" to={`/action/add/${this.state.id}`}>规划</Link>
    </li>)
    menu.push(<li key="delete" className="pure-menu-item">
      <a className="pure-menu-link" onClick={this.handleDelete} href="javascript:;" style={{color:'red'}}>删除</a>
    </li>)
    menu.push(<li key="back" className="pure-menu-item">
      <a className="pure-menu-link" onClick={this.handleBack} href="javascript:;">返回</a>
    </li>)

    return (
      <div>
        <OriginalityForm id={item.id} text={item.text} urgency={item.urgency} handleSubmit={this.handleData} submitBtn={'修改'}/>

        <BottomMenu menu={menu} />
      </div>
    )
  }
}

export default OriginalityDetail;