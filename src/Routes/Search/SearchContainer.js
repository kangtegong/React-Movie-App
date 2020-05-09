
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    // requrires interactivity
  state = {
    // search both movie and tv
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    // loading : false: by default, not loading anything. wait for user input
    loading: false,
    error: null
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
      />
    );
  }
}