import React from 'react';
import 'styles/header.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div className="component-header pure-g">
        <h2 className="pure-u-1-1">{this.props.title}</h2>
      </div>
    )
  }
}
 
export default Header;