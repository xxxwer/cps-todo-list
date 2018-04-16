import React from 'react';
import OriginalityForm from './OriginalityForm';
import store from './store';

import 'styles/addOriginality.less';

class AddOriginality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.getRandomId(),
      text: 'Make Your Idea! MAKE YOUR WORLD！'
    }
    this.handleData = this.handleData.bind(this)
  }
  getRandomId() {
    return (new Date()).getTime() * 1000 + parseInt(Math.random() * 1000);
  }

  handleData(data) {
    store.pushOriginality(data)
    this.props.history.push('/originality/list')
  }

  render() {
    return (
      <div className="component-add-originality">
        <div className="marquee">{this.state.text}</div>
        <OriginalityForm id={this.state.id} text="" urgency={{ importance: 'A', time: '1' }} handleSubmit={this.handleData} />
      </div>
    )
  }
}

export default AddOriginality;