import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const { title, description, imgUrl, url, author, date, source } = this.props; // Destructure props
    return (
      <div className="card my-3 mx-auto ">
        <div
          style={{
            zIndex: "1",
            display: "flex",
            alignContent: "flex-end",
            position: "absolute",
            left: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            By {author} on {new Date(date).toGMTString()}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noOpener noReferrer"
            className="btn btn-primary btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
