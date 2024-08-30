import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&apiKey=3c05df16f3574789803a9cf2ef6aae61&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    } else {
      let url = `https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&apiKey=3c05df16f3574789803a9cf2ef6aae61&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    }
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/everything?country=${this.props.country}&category=${this.props.category}&apiKey=3c05df16f3574789803a9cf2ef6aae61&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })
  }

  render() {
    return (
      <div className='container my-3'>
        {this.state.loading && <Spinner />}
        <h2>The top headlines from around the globe</h2>
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 my-3" key={element.title}>
              <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 84) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-center">
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={this.state.page === Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-outline-primary" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News
