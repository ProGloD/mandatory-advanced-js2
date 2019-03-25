import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null
    };
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

  render() {
    if (!this.state.movie) {
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
          <title>{this.state.movie.title}</title>
        </Helmet>

        <div>
          <h2>{this.state.movie.title}</h2>
          <h3>Directed by: {this.state.movie.director}</h3>
          <p>
            <strong>Rating: </strong>
            {this.state.movie.rating}/5
          </p>
          <p>{this.state.movie.description}</p>
          <Link to={`/edit/${this.props.match.params.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      </>
    );
  }
}

export default About;
