import React from 'react';
import { Link } from 'react-router-dom';
import store from './store';
import BottomMenu from './BottomMenu';

import 'styles/originality.less';

class Originality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    let initData = { 1: { id: 1, time: (new Date().toString()), text: '编写加入一个创意、任务、Idea 吧' } }
    this.state.items = store.getOriginalityOrderBy() || initData
  }

  componentDidMount() {
    this.props.setLinkActive('/originality/list')
  }

  render() {
    let divHeight = window.innerHeight - 67 - 50 - 50

    let items = this.state.items
    let odd = 0
    let originalityList = []
    for (let index in items) {
      let item = items[index]
      let trClassName = 'pure-g'
      if (odd % 2 === 1) {
        trClassName += ' pure-table-odd'
      }
      odd++

      originalityList.push(
        <tr key={item.id} className={trClassName}>
          <td className="pure-u-1-1 item-text">
            <div className="pure-u-7-24">
              <button className={`pure-button ${item.urgency.importance}`}>{item.urgency.importance}</button>
              <button className={`pure-button time${item.urgency.time}`}>{item.urgency.time}</button>
            </div>
            <div className="pure-u-15-24">
              <Link to={`/originality/detail/${item.id}`}>{item.text}</Link>
            </div>
          </td>
        </tr>
      )
    }

    let menu = []
    menu.push(<li key="originality-add" className="pure-menu-item">
      <Link className="pure-menu-link" to="/originality/add">添加</Link>
    </li>)
    menu.push(<li key="config-originalityOrder" className="pure-menu-item">
      <Link className="pure-menu-link" to="/config/originalityOrder">排序</Link>
    </li>)

    return (
      <div className="componet-originality" style={{ height: divHeight }}>
        <table className="pure-table table-block">
          <tbody>
            {originalityList}
          </tbody>
        </table>

        <BottomMenu menu={menu} />
      </div>
    )
  }
}

export default Originality;