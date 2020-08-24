import React from "react";

class SocialMediaLink extends React.Component {
  render() {
    return (
      <a href={this.props.url} target="_blank" className="socialMediaBtn">
        <i className={"fab " + this.props.icon}></i>
      </a>
    );
  }
}

export default SocialMediaLink;
