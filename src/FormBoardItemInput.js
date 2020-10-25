import React from "react"

export default class FormBoardItemInput extends React.Component{
  render() {
    const inputProps = {
      type: this.props.type,
      name: this.props.name,
      id: this.props.id,
      onChange: this.props.onChange
    }
    if (this.props.value) {
      inputProps.value = this.props.value;
    }
    return (
      <input {...inputProps}/>
    )
  }
}