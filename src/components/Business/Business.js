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
        <hr></hr>
        <div className="Business-information">
          <div className="Business-address">
            <p>
              <a
                className="addy"
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
            <p>Phone:{business.phone}</p>
            <a
              href={business.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="rating"
            >
              {business.rating} stars / {business.reviewCount} reviews
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
