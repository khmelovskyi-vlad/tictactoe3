import React from "react"

export default class Input extends React.Component{
  render() {
    const inputProps = {
      type: this.props.type,
    }
    if (this.props.value) {
      inputProps.value = this.props.value;
    }
    if (this.props.id) {
      inputProps.id = this.props.id;
    }
    if (this.props.class) {
      inputProps.className = this.props.class;
    }
    if (this.props.name) {
      inputProps.name = this.props.name;
    }
    if (this.props.onClick) {
      inputProps.onClick = this.props.onClick;
    }
    return (
      <input {...inputProps}/>
    )
  }
}