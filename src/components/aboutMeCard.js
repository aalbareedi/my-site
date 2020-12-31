import React from "react";

class AboutMeCard extends React.Component {
  render() {
    return (
      <div className="aboutMeCard">
        <img alt="" src={this.props.imgSrc} className="aboutMeIcon" />
        <div className="aboutCardHeading">{this.props.aboutMeTitle}</div>
        <div className="aboutCardText">{this.props.aboutMeMessage}</div>
      </div>
    );
  }
}

export default AboutMeCard;
