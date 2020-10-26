import React from "react";
import XOImg from "./XOImg";
import X from "./img/x.jpg";
import O from "./img/o.jpg";

export default class Square extends React.Component{
  render() {
    return (
      <div
        onClick={this.props.onClick}
        id={`${this.props.i}-${this.props.j}`}
        className="section"
        style={{
          paddingTop: this.props.xoElement ? 0 : `${this.props.sidePrecentLength}%`,
          width: `${this.props.sidePrecentLength}%`,
          lineHeight: "0px"
        }}
      >
        {this.props.xoElement === "x" &&
          <XOImg src={X}/>
        }
        {this.props.xoElement === "o" && 
          <XOImg src={O}/>
        }
      </div>
    );
  };
}