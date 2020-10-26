import React from "react"
import Input from "./Input"

export default class DontTouch extends React.Component{
  render() {
    const classList = ["row", "dontTouch", "m-3", "p-3"]
    return (
      <div className={classList.join(" ")}
        style={{ border: "solid", borderRadius: "20px" }}>
        <Input
          type="submit"
          class="m-1"
          value="continue"
          id="continue"
          onClick={this.props.onClickContinuePlay}
        />
        <Input
          type="submit"
          class="m-1"
          value="create new"
          id="createNew"
          onClick={this.props.onClickNewGame}
        />
      </div>
    )
  }
}