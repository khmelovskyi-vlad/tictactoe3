// import React from "react"
import { HubConnectionBuilder, HttpTransportType, LogLevel } from "@aspnet/signalr"
// export default class Api extends React.Component{
//   // constructor(props) {
//   //   super(props)
//   // }
// }
export default class Api {
  constructor(accessToken) {
      this.valueConnection = this.createConnection(accessToken);
  }
  createConnection(accessToken) {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:6001/tic_tac_toehub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    return connection;
  }
  joinToGroup(groupName, playerName) {
    this.valueConnection.invoke("AddToGroup", groupName, playerName)
        .catch(
            function (err) {
                return console.error(err.toString())
    });
  }
  async start() {
      await this.valueConnection.start().catch(function (e) {
          console.log(e);
    });;
  }
  receiveMessage() {
      this.valueConnection.on("ReceiveMessage", function (message) {
          console.log(message);
    })
  }
  startGameAsPlayer1(startGame, player1Name, groupName, connector) {
      this.valueConnection.on("StartGameAsPlayer1", function (player2Name) {
          // if (player1Name === player2Name) {
          //   connector.reloadPageServer(groupName);
          // }
          // else {
            connector.sendPlayerNameServer(groupName, player1Name);
            startGame(player1Name, player2Name);
          // }
    })
  }
  startGameAsPlayer2(startGame, player2Name) {
      this.valueConnection.on("StartGameAsPlayer2", function (player1Name) {
          startGame(player1Name, player2Name);
    })
  }
  reloadPage() {
      this.valueConnection.on("ReloadPage", function () {
        // location.reload();
    })
  }
  reloadPageServer(groupName) {
      this.valueConnection.invoke("SendReloadPage", groupName);
  }
  sendPlayerNameServer(groupName, player1Name) {
    this.valueConnection.invoke("SendPlayerName", groupName, player1Name);
    //   this.addConsoleError(function (groupName, player1Name) {
    //       this.connection.invoke("SendPlayerName", groupName, player1Name)
    //   }, [groupName, player1Name]);
  }
  addConsoleError(func, ...args){
      func(args).catch(
              function (err) {
                  return console.error(err.toString())
      });
  }
  sendCoordinates(groupName, i, j) {
    this.valueConnection.invoke("SendCoordinates", groupName, i, j).catch(
              function (err) {
                  return console.error(err.toString())
              });
  }
  receiveCoordinates(runSectionSessionCoordinates) {
      this.valueConnection.on("ReceiveCoordinates", function (i, j) {
          runSectionSessionCoordinates(i, j)
    })
  }
}