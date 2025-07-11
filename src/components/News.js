import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', pageSize = 6, category = 'general', apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const fetchNews = async () => {
    try {
      setProgress(10);
      const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&topic=${category}&token=${apiKey}&max=${pageSize}&page=${page}`;
      setLoading(true);
      const data = await fetch(url);
      setProgress(30);
      const parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalArticles || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    fetchNews();
    // eslint-disable-next-line
  }, [category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${country}&topic=${category}&token=${apiKey}&max=${pageSize}&page=${nextPage}`;
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalArticles || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <div className="container my-3" style={{ overflowX: 'hidden' }}>
      <h2 className="text-center" style={{ margin: '90px 0 40px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {Array.isArray(articles) && articles.map((element, index) => (
            element && (
              <div className="col-md-4 mb-4" key={element.url || index}>
                <NewsItem
                  title={element.title || 'No Title'}
                  description={element.description || 'No Description'}
                  imageurl={element.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  newsurl={element.url}
                  author={element.source?.name || 'Unknown'}
                  date={element.publishedAt}
                  category={category}
                  source={element.source?.name || 'Unknown'}
                />
              </div>
            )
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;