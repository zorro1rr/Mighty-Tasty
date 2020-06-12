import React from "react";
import "./Business.css";

class Business extends React.Component {
  render() {
    const { business } = this.props;
    return (
      <div className="Business">
        <div className="image-container">
          <a href={business.imageSrc} target="_blank" rel="noopener noreferrer">
            <img src={business.imageSrc} alt="business img" />
          </a>
        </div>
        <h2>{business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={
                  "https://www.google.com/maps/place/" +
                  business.address +
                  "," +
                  business.city +
                  ",+" +
                  business.state +
                  "+" +
                  business.zipCode +
                  "/"
                }
              >
                {business.address} <br></br>
                {business.city + ", "} <br></br>{" "}
                {business.state + " " + business.zipCode}
              </a>
            </p>
          </div>
          <div className="Business-reviews">
            <h3>{business.category}</h3>
            <h3 className="rating">{business.rating} stars</h3>
            <p>{business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
