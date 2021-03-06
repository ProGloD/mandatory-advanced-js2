import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      filtered: null
    };

    this.getMovies = this.getMovies.bind(this);
    this.Search = this.Search.bind(this);

    this.getMovies();
  }

  getMovies() {
    axios
      .get(
        "http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies"
      )
      .then(response =>
        this.setState({
          movies: response.data,
          filtered: response.data
        })
      );
  }

  Search(e) {
    const filtered = this.state.movies.filter(
      movie =>
        movie.title.toLowerCase().includes(e.target.value) ||
        movie.director.toLowerCase().includes(e.target.value)
    );

    this.setState({ filtered: filtered });
  }

  render() {
    const { filtered } = this.state;
    if (!filtered) {
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <p>Loading, please wait...</p>
        </>
      );
    }

    return (
      <>
        <aside className="searchContainer">
          <label>
            <i className="material-icons searchIcon">search</i>
          </label>
          <input
            className="searchBox"
            type="search"
            onChange={this.Search}
            placeholder="Search..."
            value={this.state.search}
          />
        </aside>

        <div className="moviesList">
          <table>
            <thead>
              <tr className="tableHead">
                <th>Title</th>
                <th>Director</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filtered.map(movie => (
                <tr key={movie.id}>
                  <td>
                    <Link to={`/about/${movie.id}`}>{movie.title}</Link>
                  </td>
                  <td>{movie.director}</td>
                  <td>{movie.rating}</td>
                  <td>
                    <Link to={`edit/${movie.id}`}>
                      <button className="action edit">
                        <i className="material-icons">edit</i>
                      </button>
                    </Link>
                    <button className="action delete"
                      onClick={() => {
                        axios
                          .delete(
                            `http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${
                              movie.id
                            }`
                          )
                          .then(() => this.getMovies());
                      }}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Home;
