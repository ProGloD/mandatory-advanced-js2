import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      title: "Yaro's test",
      director: "Yaro",
      description: "This is test made by Yaro!",
      rating: 5
    };

    this.addTitle = this.addTitle.bind(this);
    this.addDirector = this.addDirector.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.addRating = this.addRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  addDirector(e) {
    this.setState({
      director: e.target.value
    });
  }

  addDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  addRating(e) {
    this.setState({
      rating: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      title: this.state.title,
      director: this.state.director,
      description: this.state.description,
      rating: this.state.rating
    };

    axios
      .post(
        "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies",
        movie
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

    return (
      <>
        <Helmet>
          <title>New Movie</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <h3>Title:</h3>
          <input
            type="text"
            minLength="1"
            maxLength="40"
            onChange={this.addTitle}
            value={this.state.title}
            required="required"
          />
          <h3>Director:</h3>
          <input
            type="text"
            minLength="1"
            maxLength="40"
            onChange={this.addDirector}
            value={this.state.director}
            required="required"
          />
          <h3>Description:</h3>
          <textarea
            minLength="1"
            maxLength="300"
            onChange={this.addDescription}
            value={this.state.description}
            required="required"
          />
          <h3>Rating:</h3>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            onChange={this.addRating}
            value={this.state.rating}
            required="required"
          />
          <label>{this.state.rating}/5</label>
          <br />
          <input type="submit" value="Add" />
        </form>
      </>
    );
  }
}

export default AddMovie;
