import SectionPrototype from "./SectionPrototype";
import PlayerMatches from "./PlayerMatches";
const apiPath = "https://localhost:6001";
export default class FileMaster {
    constructor(accessToken) {
      this.accessToken = accessToken;
    }
    addSomeData(data, url) {
      console.log("Bearer " + this.accessToken)
      try{
        return fetch(url, {
          method: "Post",
          headers: {
            'Authorization': "Bearer " + this.accessToken,
            "Accept": "application/json",
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }).then(response => response.json());
      }
      catch (error) {
        console.error("Uneble to add item.", error);
      }
    }
    addGame(game) {
      return this.addSomeData({
        LinesCount: game.linesCount,
        WinLine: game.winLine,
        GameTime: new Date(new Date() - game.startGameTime)
      }, apiPath + "/api" + "/Game")//"https://localhost:6001/api/Game"
    }
    async addGamePlayers(wonPlayerName, game, gameId) {
      let res = await gameId;
      const res1 = this.addSomeData({
        Figure: game.gamePlayer1.figure,
        IsWon: wonPlayerName === game.gamePlayer1.name ? true : false,
        PlayerId: game.gamePlayer1.name,
        GameId: res
      }, apiPath + "/api" + "/GamePlayer");//"https://localhost:6001/api/GamePlayer"
      const res2 = this.addSomeData({
        Figure: game.gamePlayer2.figure,
        IsWon: wonPlayerName === game.gamePlayer2.name ? true : false,
        PlayerId: game.gamePlayer2.name,
        GameId: res
      }, apiPath + "/api" + "/GamePlayer");//"https://localhost:6001/api/GamePlayer"
      return {
        gamePlayer1Id: res1,
        gamePlayer2Id: res2
      };
    }
    async addSections(game, playerIDs) {
      const res = await playerIDs;
      const res1 = await res.gamePlayer1Id;
      const res2 = await res.gamePlayer2Id;
      const GamePlayerSections1 = game.gamePlayer1
        .selectedSections.map(section => new SectionPrototype(section[0], section[1], res1));
      this.addSomeData(GamePlayerSections1, apiPath + "/api" + "/GamePlayerSection");//"https://localhost:6001/api/GamePlayerSection"
      const GamePlayerSections2 = game.gamePlayer2
        .selectedSections.map(section => new SectionPrototype(section[0], section[1], res2));
      this.addSomeData(GamePlayerSections2, apiPath + "/api" + "/GamePlayerSection");//"https://localhost:6001/api/GamePlayerSection"
    }
    getSomeData(url) {
      console.log("Bearer " + this.accessToken)
      try{
        return fetch(url, {
          method: "Get",
          headers: {
            'Authorization': "Bearer " + this.accessToken,
            "Accept": "application/json",
            'Content-Type': 'application/json'
          },
        }).then(response => response.json());
      }
      catch (error) {
        console.error("Uneble to add item.", error);
      }
    }
    async getPlayerMatches() {
      return (await this.getSomeData(apiPath + "/api" + "/PlayerMatches"))//"https://localhost:6001/api/PlayerMatches"
        .map(item => new PlayerMatches(item.name, item.gamesCount, item.wonGamesCount));
      // console.log(res);
    }
}
