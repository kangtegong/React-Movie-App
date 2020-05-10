
import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../Api";

export default class extends React.Component {
  // requrires interactivity
  state = {
    // search both movie and tv
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    //testing: searchTerm: "code",
    // loading : false: by default, not loading anything. wait for user input
    loading: false,
    error: null
  };

  /*testing
   componentDidMount(){
    this.handleSubmit();
  }*/

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async() => {
    const { searchTerm } = this.state;
    try{
      // get movie/show info based on search
      // const movieResults = await movieApi.search(searchTerm);
      // const showResults = await tvApi.search(searchTerm);
      // console.log(movieResults, showResults);
      
      // data.results.something으로 접근
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults
      });
      console.log(this.state);

      this.setState({ loading: true}) 
    } catch {
      this.setState({error: "Can't find results. "});
    } finally {
      this.setState({loading: false});
    }
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
        handleSubmit={this.handleSubmit}
      />
    );
  };
}