import React from "react"



export default class Connector extends React.Component{
  // constructor(props) {
  //   super(props);
  // }
  render() {
    // const isLogin = this.props.isLogin();
    console.log(this.props.isLogin)
    if (this.props.isLogin === false) {
      console.log("okey");
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
      console.log("okey2");
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
    // document.getElementById("login").addEventListener("click", this.login, false);
    // document.getElementById("logout").addEventListener("click", this.logout, false);
    // mgr.getUser().then(function (user) {
    //     if (user) {
    //         console.log("User logged in");
    //         // log("User logged in", user.profile);
    //         // start(user);
    //     }
    //     else {
    //         console.log("User not logged in");
    //         // log("User not logged in");
    //     }
    // });
    // return mgr;
  }
}

// function log() {
//     document.getElementById('results').innerText = '';

//     Array.prototype.forEach.call(arguments, function (msg) {
//         if (msg instanceof Error) {
//             msg = "Error: " + msg.message;
//         }
//         else if (typeof msg !== 'string') {
//             msg = JSON.stringify(msg, null, 2);
//         }
//         document.getElementById('results').innerText += msg + '\r\n';
//     });
// }







// function api() {
//     mgr.getUser().then(function (user) {
//         var url = "https://localhost:6001/identity";

//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", url);
//         // xhr.withCredentials = true;
//         xhr.onload = function () {
//             log(xhr.status, JSON.parse(xhr.responseText));
//         }
//         xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
//         xhr.send();
//     });
// }