require('normalize.css/normalize.css');

import 'styles/App.less';
import React from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import Originality from './Originality';
import AddOriginality from './AddOriginality';
import OriginalityDetail from './OriginalityDetail';
import UserConfig from './UserConfig';
import ActionAdd from './ActionAdd';
import Action from './Action';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeLinkActive: {}
    }

    this.setLinkActive = this.setLinkActive.bind(this)
  }
  setLinkActive (link) {
    if (this.linkActive(link) === 'active') {
      return
    } else {
      this.setState({
        routeLinkActive: {[link]: true}
      })
    }
  }
  linkActive(link) {
    if (this.state.routeLinkActive[link]) {
      return 'active'
    }
    return ''
  }
  render() {
    return (
      <Router history={browserHistory} basename='/test'>
        <div>
          <Header title={'cps todo-list'} />
          <div className="pure-menu pure-menu-horizontal pure-menu-scrollable">
            <Link to="/originality/list" className={`pure-menu-link pure-menu-heading ${this.linkActive('/originality/list')}`}>创意收集</Link>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link className={`pure-menu-link ${this.linkActive('/actions')}`} to="/actions">行动规划</Link>
              </li>
            </ul>
          </div>

          {/* 首页跳转 */}
          <Route exact path="/" render={() =>
            <Redirect to='/originality/list' />
          } />

          {/* 创意收集的路由 */}
          {/* <Route path="/originality/list" component={Originality} /> */}
          <Route path="/originality/list" component={(props) => <Originality {...props} setLinkActive={this.setLinkActive} />} />
          <Route path="/originality/add" component={AddOriginality} />
          <Route path="/originality/detail/:id" component={OriginalityDetail} />

          {/* 相关设置的路由 */}
          <Route path="/config/:field" component={UserConfig} />

          {/* 行动规划编辑 */}
          <Route path="/action/add/:originalityId" component={ActionAdd} />

          {/* 行动规划展示 */}
          <Route path="/actions" component={(props) => <Action {...props} setLinkActive={this.setLinkActive} />} />
        </div>
      </Router>
    )
  }
}

export default App;
