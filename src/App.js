import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { title: "the Lord of the Rings", year: "2003" },
        { title: "Spiderman", year: "2021" },
        { title: "Ghostbuster", year: "1984" },
        { title: "Avengers: Infinity War", year: "2018" },
        { title: "The Shining", year: "1980" }
      ],
      movieToUpdate: null
    };
  }

  changeHandlerTitle = (e) => {
    this.setState((prevState) => ({
      movieToUpdate: {
        index: prevState.movieToUpdate?.index,
        title: e.target.value,
        year: prevState.movieToUpdate?.year
      }
    }));
  };

  changeHandlerYear = (e) => {
    this.setState((prevState) => ({
      movieToUpdate: {
        index: prevState.movieToUpdate?.index,
        title: prevState.movieToUpdate?.title,
        year: e.target.value
      }
    }));
  };

  render() {
    return (
      <>
        <h2>Movies</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
          {this.state.movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>
                  <button
                    onClick={() => {
                      this.setState({
                        movieToUpdate: {
                          title: movie.title,
                          year: movie.year,
                          index
                        }
                      });
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <br />
        <input
          type="text"
          onChange={this.changeHandlerTitle}
          value={this.state.movieToUpdate?.title ?? ""}
          placeholder="title"
        />{" "}
        <input
          type="text"
          onChange={this.changeHandlerYear}
          value={this.state.movieToUpdate?.year ?? ""}
          placeholder="year"
        />{" "}
        <button
          onClick={() => {
            if (this.state.movieToUpdate.index != null) {
              //update
              let movies = [...this.state.movies];
              let movie = { ...movies[this.state.movieToUpdate.index] };
              movie.title = this.state.movieToUpdate?.title ?? "";
              movie.year = this.state.movieToUpdate?.year ?? "";
              movies[this.state.movieToUpdate.index] = movie;
              this.setState((prevState) => ({
                movieToUpdate: null,
                movies: movies
              }));
            } else {
              //create new
              this.setState((prevState) => ({
                movieToUpdate: null,
                movies: [
                  ...prevState.movies,
                  {
                    title: this.state.movieToUpdate.title,
                    year: this.state.movieToUpdate.year
                  }
                ]
              }));
            }
          }}
        >
          {this.state.movieToUpdate?.index ? "Update" : "Save"}
        </button>
      </>
    );
  }
}

export default App;
