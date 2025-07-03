import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageurl, newsurl, author, date, category, source } = props;

  const categoryColors = {
    general: '#f8f9fa',
    business: '#d1ecf1',
    entertainment: '#fce4ec',
    health: '#e8f5e9',
    science: '#e3f2fd',
    sports: '#fff3e0',
    technology: '#ede7f6'
  };

  const bgColor = categoryColors[category] || '#ffffff';

  return (
    <div>
      <div className="card" style={{ backgroundColor: bgColor, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
          <span className="badge rounded-pill bg-danger fs-6 py-1 px-3">
            {source}
          </span>
        </div>
        <img
          src={
            !imageurl || imageurl === "null" || imageurl.trim() === ""
              ? "https://via.placeholder.com/300x200?text=No+Image"
              : imageurl
          }
          className="card-img-top"
          alt="news"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsurl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
