import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bool, string, func } from 'prop-types';

import Login from './layout';

import { actionCreators as authActions } from '~redux/Auth/actions';
import { USER_TARGET } from '~redux/Auth/constants';

class LoginContainer extends Component {
  handleSubmit = values => this.props.login(values);

  render() {
    const { authLoading, errorMessage } = this.props;
    return <Login onSubmit={this.handleSubmit} loading={authLoading} errorMessage={errorMessage} />;
  }
}

LoginContainer.propTypes = {
  authLoading: bool.isRequired,
  login: func.isRequired,
  errorMessage: string
};

const mapStateToProps = store => ({
  errorMessage: store.auth[`${USER_TARGET}Error`],
  authLoading: store.auth[`${USER_TARGET}Loading`]
});

const mapDispatchToProps = dispatch => ({
  login: authData => dispatch(authActions.login(authData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
