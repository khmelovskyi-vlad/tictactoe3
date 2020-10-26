import React from "react"

export default class BadData extends React.Component{
  
  render() {
    const classList = ["text-center", this.props.display ? "d-inline" : "d-none"];
    return (
      <h3 className={classList.join(" ")} style={{color:"#000fff"}} id="noInput">Write all data</h3>
    );
  }
}