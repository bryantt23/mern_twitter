import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleSumbit = this.handleSumbit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/login');
    }
    this.setState({ errors: nextProps.errors });
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  handleSumbit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error=${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <div>
            <input
              type='text'
              value={this.state.email}
              onChange={this.update('email')}
              placeholder='Email'
            />
            <br />
            <input
              type='password'
              value={this.state.password}
              onChange={this.update('password')}
              placeholder='Password'
            />
          </div>
          <input type='submit' value='Submit' />
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
