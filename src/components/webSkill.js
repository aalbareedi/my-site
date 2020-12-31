import React from "react";

class WebSkill extends React.Component {
  state = { isOpen: false };
  render() {
    return (
      <div
        id={this.props.id}
        className={
          "aboutWebSkill scrollRevealX " +
          (this.state.isOpen == true ? "openIconBox" : "")
        }
      >
        <img className="newHtmlIcon" src={this.props.iconImg} />
        <div className="newIconTitle">{this.props.iconTitle}</div>
        <a
          href="#"
          className="newIconOpenBtn"
          onClick={(event) => {
            event.preventDefault();
            this.setState({ isOpen: !this.state.isOpen });
          }}
        >
          <i className="fas fa-angle-down arrowDown"></i>
        </a>

        <div className="iconDropdown">{this.props.children}</div>
      </div>
    );
  }
}

export default WebSkill;
