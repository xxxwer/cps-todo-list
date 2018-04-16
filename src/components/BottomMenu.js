import React from 'react';

import 'styles/bottomMenu.less';

class BottomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="component-bottom-menu pure-menu pure-menu-horizontal pure-menu-scrollable bottom">
        <ul className="pure-menu-list">
          {this.props.menu}
        </ul>
      </div>
    )
  }
}
 
export default BottomMenu;