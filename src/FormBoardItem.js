import React from "react"
import FormBoardItemLabel from "./FormBoardItemLabel"
import FormBoardItemInput from "./FormBoardItemInput"
export default class FormBoardItem extends React.Component{
  render() {
    return (
      <div className="row needWrap m-1 p-0">
        <FormBoardItemLabel
          for={this.props.inputName}
          value={this.props.labelValue}/>
        <FormBoardItemInput
          type={this.props.inputType}
          name={this.props.inputName}
          id={this.props.inputName}
          value={this.props.inputValue === undefined ? "" : this.props.inputValue}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}