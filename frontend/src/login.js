import React from 'react'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert("Submitted Login Request"); // placeholder functionality
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="username" value={this.state.username} placeholder="username" onChange={this.handleUsernameChange} />
          </label>
          <label>
            <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handlePasswordChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }


}
