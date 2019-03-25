import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updated: false,
      movie: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
    axios
      .get(
        `http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${
          this.props.match.params.id
        }`,
        {
          cancelToken: this.source.token
        }
      )
      .then(response => this.setState({ movie: response.data }))
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log("Request canceled", thrown.message);
        } else {
          // handle error
        }
      });
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  onChange(e) {
    const info = { ...this.state.movie };
    info[e.target.id] = e.target.value;
    this.setState({ movie: info });
  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .put(
        `http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${
          this.props.match.params.id
        }`,
        this.state.movie
      )
      .then(() => this.setState({ updated: true }));
  }

  render() {
    if (this.state.updated) {
      return <Redirect to={`/about/${this.props.match.params.id}`} />;
    }

    const { movie } = this.state;
    if (!movie) {
      return (
        <>
          <Helmet>
            <title>Loading...</title>
          </Helmet>

          <p>Loading, please wait...</p>
        </>
      );
    }

    return (
      <>
        <Helmet>
          <title>Editing {`${this.state.movie.title}`}</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <h3>Title:</h3>
          <input
            id="title"
            type="text"
            minLength="1"
            maxLength="40"
            onChange={this.onChange}
            value={this.state.movie.title}
            required="required"
          />
          <h3>Director:</h3>
          <input
            id="director"
            type="text"
            minLength="1"
            maxLength="40"
            onChange={this.onChange}
            value={this.state.movie.director}
            required="required"
          />
          <h3>Description:</h3>
          <textarea
            id="description"
            minLength="1"
            maxLength="300"
            onChange={this.onChange}
            value={this.state.movie.description}
            required="required"
          />
          <h3>Rating:</h3>
          <input
            id="rating"
            type="range"
            min="0"
            max="5"
            step="0.1"
            onChange={this.onChange}
            value={this.state.movie.rating}
            required="required"
          />
          <label>{this.state.movie.rating}/5</label>
          <br />
          <input type="submit" value="Save" />
        </form>
      </>
    );
  }
}

export default Edit;
