import React from "react"
import BadData from "./BadData";
import FormBoardItem from "./FormBoardItem"
import Input from "./Input"

export default class FormBoard extends React.Component{
  render() {
    const classList = ["form", "row", "flex-column", "m-3", "p-3", this.props.display ? "d-inline" : "d-none"]
    return (
      <div
        className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
        <BadData display={this.props.displayBadInput}/>
        <form onSubmit={this.props.onSubmitAllPlayers}>
          <FormBoardItem
            inputType="submit"
            inputName="allPlayers"
            labelValue="If you want to watch all players results, press 'all players'"
            inputValue="all players"
          />
        </form>
        <form onSubmit={this.props.onSubmit}>
          <FormBoardItem
            inputType="text"
            inputName="linesCount"
            labelValue="Write the lines number: "
            onChange={this.props.onChangeLinesCount}
          />
          <FormBoardItem
            inputType="text"
            inputName="winLine"
            labelValue="Write a winning line: "
            onChange={this.props.onChangeWinLine}
          />
          <FormBoardItem
            inputType="text"
            inputName="groupName"
            labelValue="Enter group name: "
            onChange={this.props.onChangeGroupName}
          />
          <Input type="submit" id="names" class="m-1" />
        </form>
      </div>
    );
  }
}