import React from "react"



export default class Connector extends React.Component{
  render() {
    if (this.props.isLogin === false) {
      return (
      <div>
        <button
        id="login"
        onClick={this.props.onClickLogin}>
        Login
        </button>
      </div>
      );
    }
    else {
      return (
        <div>
          <button
            id="logout"
            onClick={this.props.onClickLogout}>
            Logout
        </button>
        </div>
      );
    }
  }
}