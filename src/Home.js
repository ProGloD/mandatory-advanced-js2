import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };

    axios
      .get(
        "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies"
      )
      .then(response =>
        this.setState({
          movies: response.data
        })
      );
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie.id}>
                <td>
                  <Link to={`/about/${movie.id}`}>{movie.title}</Link>
                </td>
                <td>{movie.director}</td>
                <td>{movie.rating}</td>
                <td>
                  <span>Edit</span>
                  <span>Remove</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;
