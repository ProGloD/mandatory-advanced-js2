import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      movie: {
        title: "",
        director: "",
        description: "",
        rating: 0
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const info = { ...this.state.movie };
    info[e.target.id] = e.target.value;
    this.setState({ movie: info });
  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies",
        this.state.movie
      )
      .then(() => {
        this.setState({
          added: true
        });
      });
  }

  render() {
    if (this.state.added) {
      return <Redirect to="/" />;
    }

    const { title, director, description, rating } = this.state.movie;

    return (
      <>
        <Helmet>
          <title>New Movie</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <h3>Title:</h3>
          <input
            id="title"
            type="text"
            minLength="1"
            maxLength="40"
            placeholder="Title..."
            onChange={this.onChange}
            value={title}
            required="required"
          />
          <h3>Director:</h3>
          <input
            id="director"
            type="text"
            minLength="1"
            maxLength="40"
            placeholder="Director..."
            onChange={this.onChange}
            value={director}
            required="required"
          />
          <h3>Description:</h3>
          <textarea
            id="description"
            minLength="1"
            maxLength="300"
            placeholder="Description..."
            onChange={this.onChange}
            value={description}
            required="required"
          />
          <h3>Rating:</h3>
          <div className="rating">
            <input
              id="rating"
              type="range"
              min="0"
              max="5"
              step="0.1"
              onChange={this.onChange}
              value={rating}
              required="required"
            />
            <label>{rating}/5</label>
          </div>
          <br />
          <input type="submit" value="Add" />
        </form>
      </>
    );
  }
}

export default AddMovie;
