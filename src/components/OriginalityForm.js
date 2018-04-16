import React from 'react';

import 'styles/originalityForm.less';

class OriginalityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      importance: props.urgency.importance,
      time: props.urgency.time,
      id: props.id,
      submitBtn: '提交'
    }

    if (props.submitBtn) {
      this.state.submitBtn = props.submitBtn
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault()
    let data = {
      text: this.state.text,
      id: this.state.id,
      urgency: {
        importance: this.state.importance,
        time: this.state.time
      }
    }
    this.props.handleSubmit(data)
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="component-originality-form">
        <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
          <fieldset>
            <legend>你的创意 OR 你的任务</legend>
            <input id="input-text" type="text" name="text" value={this.state.text} onChange={this.handleChange} />

            <select className="form-box" value={this.state.importance} name="importance" onChange={this.handleChange}>
              <option value="A">重要</option>
              <option value="B">较为重要</option>
              <option value="C">还好</option>
              <option value="D">无关紧要</option>
            </select>

            <select className="form-box" value={this.state.time} name="time" onChange={this.handleChange}>
              <option value="1">紧急 时限迫近</option>
              <option value="2">还好 时间适中</option>
              <option value="3">轻松 时间充裕</option>
            </select>

            <input type="hidden" name="id" value={this.state.id} />

            <button type="submit" className="pure-button pure-button-primary btn-submit">{this.state.submitBtn}</button>
          </fieldset>
        </form>
      </div>
    )
  }
}
 
export default OriginalityForm;