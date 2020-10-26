import React from "react"
import Oidc from "oidc-client"
import Connector from "./Connector"
import FileMaster from "./FileMaster"
import FormBoard from "./FormBoard";
import PlayerWins from "./PlayerWins";
import StartGameForm from "./StartGameForm";
import Congratulations from "./Congratulations";
import Board from "./Board";
import Api from "./Api"
import GamePlayer from "./GamePlayer";
import WaitingPlayer from "./WaitingPlayer";

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
      boardArray: Array(),
      mgr: new Oidc.UserManager(config),
      gamePlayer1: null,
      gamePlayer2: null,
      playerName: null,
      startGameTime: null,
      currentPlayer: null,
      isMyMove: false,
      mustSaveData: false,
      isLogin: false,
      fileMaster: null,
      api: null,
      displayFormBoard: true,
      displayBadInput: false,
      displayPlayerWins: false,
      displayWaitingPlayer: false,
      displayStartGameForm: false,
      displayCongratulations: false,
      displayBoard: false,
      winLine: null,
      linesCount: null,
      groupName: null,
      playerMatches: null,
      wonPlayerName: null,
    };
    this.handleChangeWinLine = this.handleChangeWinLine.bind(this);
    this.handleChangeLinesCount = this.handleChangeLinesCount.bind(this);
    this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
    this.handleSubmitFormBoard = this.handleSubmitFormBoard.bind(this);
    this.handleSubmitAllPlayers = this.handleSubmitAllPlayers.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickSquare = this.handleClickSquare.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickContinuePlay = this.handleClickContinuePlay.bind(this);
    this.handleClickNewGame = this.handleClickNewGame.bind(this);
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
      if (user) {
        this.setState({ isLogin: true });
        this.setState({ playerName: user.profile.name });
        this.setState({ fileMaster: new FileMaster(user.access_token) });
        this.setState({ api: new Api(user.access_token) });
      }
      else {
      }
    });
  }
  handleChangeLinesCount(event) {
    const value = event.target.value;
    this.checkValue(value) && this.checkNumber(value, maxLinesCount) ?
      this.setState({ linesCount: Number.parseInt(value, 10) }) :
      this.setState({ linesCount: null });
  }
  handleChangeWinLine(event) {
    const value = event.target.value;
    this.checkValue(value) && this.checkNumber(value, maxWinLine) ?
      this.setState({ winLine: Number.parseInt(value, 10) }) :
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
      if (!this.state.displayBadInput) {
        this.setState({ displayBadInput: true })
      }
      // console.log("ohh")
    }
    else {
      // this.setState({ displayBoard: true });
      // this.fillArray();
      this.setState({ displayBadInput: false });
      this.setState({ displayFormBoard: false });
      this.setState({ displayWaitingPlayer: true });
      this.startApi();
    }
    event.preventDefault();
  }
  async startApi() {
    this.state.api.startGameAsPlayer1(this.startGame.bind(this),
      this.state.playerName,
      this.state.groupName,
      this.state.api);
    this.state.api.startGameAsPlayer2(
      this.startGame.bind(this),
      this.state.playerName);
    this.state.api.receiveCoordinates(this.runSectionSessionCoordinates.bind(this));
    this.state.api.reloadPage();
    await this.state.api.start();
    this.state.api.joinToGroup(this.state.groupName, this.state.playerName);
  }
  startGame(player1Name, player2Name) {
    this.setState({ displayWaitingPlayer: false });
    this.setState({ displayStartGameForm: true });
    this.setState({ gamePlayer1: GamePlayer.initializePlayer(player1Name, "o") });
    this.setState({ gamePlayer2: GamePlayer.initializePlayer(player2Name, "x") });
    this.setState({ startGameTime: Date.now() });
    this.setState({ currentPlayer: "player1" });
    this.setState({ isMyMove: this.state.playerName == player1Name });
    this.setState({ mustSaveData: this.state.playerName == player1Name });
    this.fillArray();
  }
  handleClickStart() {
    this.setState({ displayStartGameForm: false });
    this.setState({ displayBoard: true });
  }
  fillArray() {
    const boardArray = Array()
    const count = this.state.linesCount;
    for (let i = 0; i < count; i++) {
      boardArray.push(Array(count).fill(null));       
    }
    this.setState({ boardArray: boardArray });
  }
  handleClickSquare(e) {
    if (this.state.isMyMove && e.target.id) {
      const coordinates = e.target.id.split("-").map(stringCoordinate => Number.parseInt(stringCoordinate, 10));
      const element = this.state.boardArray[coordinates[0]][coordinates[1]];
      const haveCoordinates = element != null;
      if (!haveCoordinates) {
        this.runSectionSession(coordinates);
      }
    }
  }
  runSectionSessionCoordinates(i, j) {
    // const XOElements = ImageMaster.createXOElements();
    // this.runSectionSession(this.getNeedSection(i, j), XOElements.o, XOElements.x);
    this.runSectionSession([i,j]);
  }
  runSectionSession(coordinates) {
    if (this.state.currentPlayer === "player1") {
          this.runSectionFunc(this.state.gamePlayer1, "player2", coordinates);
        } else {
          this.runSectionFunc(this.state.gamePlayer2, "player1", coordinates);
        }
  }
  runSectionFunc (player, anotherPlayerString, coordinates) {
    // this.addImg(section, player, o, x);
    const boardArray = this.state.boardArray;
    boardArray[coordinates[0]][coordinates[1]] = player.figure;
    this.setState({ boardArray: boardArray });
    this.setState({ isMyMove: false });

    player.selectedSections.push(coordinates); // dont knos
    this.state.currentPlayer = anotherPlayerString;
    if (this.state.isMyMove) {
      this.state.api.sendCoordinates(this.state.groupName, coordinates[0], coordinates[1]);
    }
    this.state.isMyMove = !this.state.isMyMove;
    
    console.log("win")
    if (this.checkWin(coordinates, player.selectedSections)) {
      console.log("isWin")
      this.setState({wonPlayerName: player.name});
      if (this.state.mustSaveData) {
        this.addGame();
      }
      this.addCongratulations();
      // this.addContinuations();
    }
  };
  addContinuations() {
    // let continueElement =  document.querySelector("#continue");
    // let createNew = document.querySelector("#createNew");
    // continueElement.onclick = () => {
    //   Deleter.removeAllData();
    //   this.changeGameData();
    //   this.Run();
    // }
  }
  handleClickContinuePlay() {
    // Deleter.removeAllData();
    this.changeGameData();
    this.setState({displayCongratulations: false});
    this.setState({displayBoard: true});
    // this.Run();
  }
  handleClickNewGame() {
    this.changeAllGameData();
    this.setState({displayCongratulations: false});
    this.setState({displayFormBoard: true});
    // createNew.onclick = () => {
    //   location.reload();
    // }
  }
  changeGameData() {
    this.setState({wonPlayerName: null});
    this.setState({startGameTime: Date.now()});
    this.state.gamePlayer1.selectedSections = [];
    this.state.gamePlayer2.selectedSections = [];
    this.fillArray();
  }
  changeAllGameData() {
    this.setState({startGameTime: null});
    this.setState({gamePlayer1: null});
    this.setState({gamePlayer2: null});
    this.setState({boardArray: Array()});
    this.setState({playerName: null});
    this.setState({currentPlayer: null});
    this.setState({isMyMove: false});
    this.setState({mustSaveData: false});
    // this.setState({winLine: null});
    // this.setState({linesCount: null});
    // this.setState({groupName: null});
    this.setState({wonPlayerName: null});
  }
  addGame() {
    const gameId = this.state.fileMaster.addGame(this.state.linesCount, this.state.winLine, this.state.startGameTime);
    const playerIDs = this.state.fileMaster.addGamePlayers(this.state.wonPlayerName,
      this.state.gamePlayer1,
      this.state.gamePlayer2,
      gameId);
    this.state.fileMaster.addSections(this.state.gamePlayer1, this.state.gamePlayer2, playerIDs);
  }
  addCongratulations() {
    // const congratulationsDiv = document.querySelector(".congratulations");
    // congratulationsDiv.appendChild(this.createTextCenterP(`Player ${this.state.wonPlayerName} won`));
    // congratulationsDiv.appendChild(this.createTextCenterP("CONGRATULATIONS!!"));
    this.setState({ displayBoard: false });
    this.setState({ displayCongratulations: true });
  }
  checkWin(currentCoordinates, selectedCoordinates) {
    if (selectedCoordinates.length >= this.state.winLine) {
      if (this.checkCoordinates(currentCoordinates[1],
        selectedCoordinates.filter(coordinates => coordinates[0] === currentCoordinates[0])
          .map(coordinates => coordinates[1])) ||
      
        this.checkCoordinates(currentCoordinates[0],
        selectedCoordinates.filter(coordinates => coordinates[1] === currentCoordinates[1])
            .map(coordinates => coordinates[0])) ||
      
        this.checkCoordinates(currentCoordinates[0], selectedCoordinates.filter(coordinates => coordinates[0] - coordinates[1]
          === currentCoordinates[0] - currentCoordinates[1]).map(coordinates => coordinates[0])) ||
      
          this.checkCoordinates(currentCoordinates[0], selectedCoordinates.filter(coordinates => coordinates[0] + coordinates[1]
          === currentCoordinates[0] + currentCoordinates[1]).map(coordinates => coordinates[0]))) {
        return true;
      }
    }
        return false;
  };
  checkCoordinates (currentCoordinate, selectedCoordinates) {
    let numberOfCoincidences = 0;
    for (let i = currentCoordinate; i < this.state.linesCount; i++){
      if (selectedCoordinates.includes(i)) {
        numberOfCoincidences++;
      }
      else {
        break;
      }
    }
    for (let i = currentCoordinate - 1; i >= 0; i--){
      if (selectedCoordinates.includes(i)) {
        numberOfCoincidences++;
      }
      else {
        break;
      }
    }
    return numberOfCoincidences >= this.state.winLine;
  }






  handleSubmitAllPlayers(event) {
    this.setState({ displayFormBoard: false });
    this.setState({ displayPlayerWins: true });
    this.initializePlayerResults();
    event.preventDefault();
  }
  handleClickBack() {
    this.setState({ displayFormBoard: true });
    this.setState({ displayPlayerWins: false });
    this.setState({ playerMatches: null });
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
          displayBadInput={this.state.displayBadInput}
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
        <WaitingPlayer display={this.state.displayWaitingPlayer} />
        <StartGameForm
          display={this.state.displayStartGameForm}
          onClick={this.handleClickStart}
        />
        <Congratulations
          display={this.state.displayCongratulations}
          wonPlayerName={this.state.wonPlayerName}
          onClickContinuePlay={this.handleClickContinuePlay}
          onClickNewGame={this.handleClickNewGame}
        />
        {
          this.state.displayBoard && 
          <Board
            display={this.state.displayBoard}
            linesCount={this.state.linesCount}
            onSquareClick={this.handleClickSquare}
            boardArray={this.state.boardArray}
            player1Name={this.state.gamePlayer1.name}
            player2Name={this.state.gamePlayer2.name}
          />
        }
      </section>
    );
  };
}