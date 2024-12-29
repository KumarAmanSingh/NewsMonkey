import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 5,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    if (this.props.setProgress) this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6414f82054fd490caf6b96ae848763ce&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    if (this.props.setProgress) this.props.setProgress(40);
    let parsedData = await data.json();
    if (this.props.setProgress) this.props.setProgress(60);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

    if (this.props.setProgress) this.props.setProgress(100);
  }

  async componentDidMount() {
    await this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6414f82054fd490caf6b96ae848763ce&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
        });
      }
    );
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center" style={{ margin: '30px 0px' }}>
          NewsMonkey - Top Headlines in {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <NewsItem
                      title={elem.title ? elem.title.slice(0, 50) : ''}
                      description={elem.description ? elem.description.slice(0, 88) : ''}
                      url={elem.urlToImage}
                      newsUrl={elem.url}
                      author={elem.author}
                      publish={elem.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
