import React from "react"
import Oidc from "oidc-client"
import Connector from "./Connector"
import FileMaster from "./FileMaster"
import FormBoard from "./FormBoard";
import PlayerWins from "./PlayerWins";
import StartGameForm from "./StartGameForm";
import PlayersInformations from "./PlayersInformation";
import Congratulations from "./Congratulations";
import Board from "./Board";
import Api from "./Api"
import GamePlayer from "./GamePlayer";

var maxLinesCount = 100;
var maxWinLine = 5;
const config = {
authority: "https://localhost:5001",
client_id: "js",
redirect_uri: "http://localhost:3000/callback.html",
response_type: "id_token token",
scope: "openid profile api1",
post_logout_redirect_uri: "http://localhost:3000",
};
//
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mgr: new Oidc.UserManager(config),
      gamePlayer1: null,
      gamePlayer2: null,
      playerName: null,
      startGameTime: null,
      currentPlayer: null,
      isMyMove: false,
      mustSaveData: false,
      isLogin: false,
      accessToken: null,
      fileMaster: null,
      api: null,
      displayFormBoard: true,
      displayPlayerWins: false,
      displayStartGameForm: false,
      displayPlayersInformation: false,
      displayCongratulations: false,
      displayBoard: true,
      winLine: null,
      linesCount: null,
      groupName: null,
      playerMatches: null,
    };
    this.handleChangeWinLine = this.handleChangeWinLine.bind(this);
    this.handleChangeLinesCount = this.handleChangeLinesCount.bind(this);
    this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
    this.handleSubmitFormBoard = this.handleSubmitFormBoard.bind(this);
    this.handleSubmitAllPlayers = this.handleSubmitAllPlayers.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }
  login() {
    this.state.mgr.signinRedirect();
    // this.checkLogin();
  }
  logout() {
    this.state.mgr.signoutRedirect();
    // this.checkLogin();
  }
  componentDidMount() {
    this.checkLogin();
  }
  checkLogin() {
    this.state.mgr.getUser().then((user) => {
      console.log("check");
      if (user) {
        console.log("User logged in");
        this.setState({ isLogin: true });
        this.setState({ accessToken: user.access_token });
        this.setState({ playerName: user.profile.name });
        this.setState({ fileMaster: new FileMaster(user.access_token) });
        this.setState({ api: new Api(user.access_token) });
      }
      else {
        console.log("User not logged in");
        this.setState({isLogin: false});
      }
    });
  }
  handleChangeLinesCount(event) {
    const value = event.target.value;
    console.log("line count" + value);
    this.checkValue(value) && this.checkNumber(value, maxLinesCount) ?
      this.setState({ linesCount: value }) :
      this.setState({ linesCount: null });
  }
  handleChangeWinLine(event) {
    const value = event.target.value;
    console.log("win line" + value);
    this.checkValue(value) && this.checkNumber(value, maxWinLine) ?
      this.setState({ winLine: value }) :
      this.setState({ winLine: null });
  }
  handleChangeGroupName(event) {
    const value = event.target.value;
    console.log("group name" + value);
    this.checkValue(value) ?
      this.setState({ groupName: value }) :
      this.setState({ groupName: null });
  }
  handleSubmitFormBoard(event) {
    if (this.state.linesCount === null || this.state.winLine === null || this.state.groupName === null) {
      console.log("ohh")
    }
    else {
      this.state.api.joinToGroup(this.state.groupName, this.state.playerName);
      this.state.api.startGameAsPlayer1(this.startGame.bind(this),
        this.state.playerName,
        this.state.groupName,
        this.state.api);
      this.connectionMaster.startGameAsPlayer2(
        this.startGame.bind(this),
        this.state.playerName);
      this.setState({displayFormBoard: false});
      this.setState({displayStartGameForm: true});
    }
    event.preventDefault();
  }
  startGame(player1Name, player2Name) {
    this.setState({gamePlayer1: GamePlayer.initializePlayer(player1Name, "o")});
    this.setState({gamePlayer2: GamePlayer.initializePlayer(player2Name, "x")});
    this.setState({ startGameTime: Date.now() });
    this.setState({ currentPlayer: "player1" });
    this.setState({ isMyMove: this.state.playerName == player1Name });
    this.setState({ mustSaveData: this.state.playerName == player1Name });

    // this.setState({player1Name: player1Name});
  }
  handleSubmitAllPlayers(event) {
    this.setState({displayFormBoard: false});
    this.setState({ displayPlayerWins: true });
    this.initializePlayerResults();
    event.preventDefault();
  }
  handleClickBack() {
    this.setState({displayFormBoard: true});
    this.setState({displayPlayerWins: false});
    this.setState({ playerMatches: null });
    console.log("handleSubmitBack")
  }
  checkValue(value) { return value !== undefined && value !== ""; };
  checkNumber(value, count) { return Number.parseInt(value, 10) !== NaN && value <= count && value > 2; };

  async initializePlayerResults() {
      // Deleter.removeAllData();
    this.setState({
      playerMatches:
        (await this.state.fileMaster.getPlayerMatches()).sort((a, b) => b.wonGamesCount - a.wonGamesCount)
    });
      
    // for (let playerMatches of playersMatches) {
    //     let playerMatchesDiv = document.createElement("div")
    //     playerMatchesDiv.classList = "row flex-column m-1"
    //     playerMatchesDiv.style.border = "solid";
    //     playerMatchesDiv.appendChild(this.createTextCenterP(`Player name: ${playerMatches.name}`));
    //     playerMatchesDiv.appendChild(this.createTextCenterP(`Player won games count: ${playerMatches.wonGamesCount}`));
    //     playerMatchesDiv.appendChild(this.createTextCenterP(`Player games count: ${playerMatches.gamesCount}`));
    // }
    
      // document.querySelector("#playersWinsBack").onclick = () => {
      //   location.reload();
      // };
  }




  //-------------------------------------------------------------------------------------------------------
  render() {
    return (
      <section className="row flex-column align-items-center m-0 mainContainer" id = "mainContainer">
        <Connector
          isLogin={this.state.isLogin}
          onClickLogin={() => this.login()}
          onClickLogout={() => this.logout()}
        />
        <FormBoard
          display={this.state.displayFormBoard}
          onChangeLinesCount={this.handleChangeLinesCount}
          onChangeWinLine={this.handleChangeWinLine}
          onChangeGroupName={this.handleChangeGroupName}
          onSubmit={this.handleSubmitFormBoard}
          onSubmitAllPlayers={this.handleSubmitAllPlayers}
        />
        <PlayerWins
          display={this.state.displayPlayerWins}
          playerMatches={this.state.playerMatches}
          onClick={this.handleClickBack}
        />
        <StartGameForm display={this.state.displayStartGameForm} />
        <PlayersInformations display={this.state.displayPlayersInformation}/>
        <Congratulations display={this.state.displayCongratulations} />
        <Board display={this.state.displayBoard}/>
      </section>
    );
  };
}