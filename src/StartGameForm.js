import React from "react"
import Input from "./Input"

export default class StartGameForm extends React.Component{
  render() {
    const classList = ["row", "flex-column", "startGameForm", "m-3", "p-3", this.props.display ? "d-inline" : "d-none"]
    return (
      <div className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
        <Input type="submit" class="m-1" value="start game" id="startGameInput"/>
      </div>
    )
  }
}