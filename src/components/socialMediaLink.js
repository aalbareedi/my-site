import React from "react";

class SocialMediaLink extends React.Component {
  render() {
    return (
      <a href={this.props.url} target="_blank" className="socialMediaBtn">
        <div>
          <i className={"fab socialMediaIcon " + this.props.icon}></i>
          <div className="socialMediaText">{this.props.text}</div>
        </div>
      </a>
    );
  }
}

export default SocialMediaLink;
