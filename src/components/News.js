import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    pageSize: 10,
    category: "",
    apiKey: "", // Added apiKey prop with default value
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string, // Added apiKey prop
    setProgress: PropTypes.func.isRequired, // Added setProgress prop with function validation
  };

  state = {
    articles: [],
    loading: true,
    page: 1,
    totalResults: 0,
    error: null,
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { page, pageSize, category, apiKey } = this.props; // Destructure apiKey from props
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    if (category) {
      url += `&category=${category}`;
    }

    url += `&page=${page}&pageSize=${pageSize}`;
    this.props.setProgress(25);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const parsedData = await response.json();
      this.props.setProgress(50);
      if (parsedData.articles) {
        this.setState({
          articles: parsedData.articles,
          loading: false,
          totalResults: parsedData.totalResults,
          error: null,
        });
        this.props.setProgress(75);
      } else {
        throw new Error("No articles found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ error: error.message, loading: false });
    }
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    const { page } = this.state;
    const { pageSize, category, apiKey } = this.props; // Destructure apiKey from props

    this.setState({ page: page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    if (category) {
      url += `&category=${category}`;
    }

    url += `&page=${page + 1}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const parsedData = await response.json();
      if (parsedData.articles) {
        this.setState((prevState) => ({
          articles: [...prevState.articles, ...parsedData.articles],
          loading: false,
          totalResults: parsedData.totalResults,
          error: null,
        }));
      } else {
        throw new Error("No articles found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { articles, loading, error } = this.state;
    console.log(loading);
    const { pageSize, setProgress } = this.props; // Destructure setProgress from props
    console.log(setProgress);
    const totalPage = Math.ceil(this.state.totalResults / pageSize);
    console.log(totalPage);
    return (
      <>
        <h2 className="text-center" style={{ margin: "30px 0px" }}>
          NewsMonkey - Get Latest {" "}
          
          <strong>{ this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}</strong>{" "}

          News
        </h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
              {articles.map(
                ({
                  url,
                  title,
                  description,
                  urlToImage,
                  author,
                  publishedAt,
                  source,
                }) => (
                  <div className="col" key={url}>
                    <NewsItem
                      title={title ? title.slice(0, 40) : "No Title Available"}
                      description={
                        description
                          ? description.slice(0, 80) + "..."
                          : "No Description Available"
                      }
                      imgUrl={
                        urlToImage
                          ? urlToImage
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUumyb5_gZE6BFmEGm1tFqZ9lOAeOxM98jKIIXnmvqWw&s"
                      }
                      url={url ? url : " "}
                      author={author ? `${author}` : "Unknown"}
                      date={publishedAt}
                      source={source.name}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
