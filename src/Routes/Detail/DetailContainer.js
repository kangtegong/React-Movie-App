import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../Api";

export default class extends React.Component {
    state = {
    result: null, // only one result. dont care if its tv or movie
    error: null,
    loading: true
  };

  async componentDidMount() {
    
    const {
      match: {
        params: { id }
      },
      history: { push },
      location: { pathname }
    } = this.props;
    
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");   // kill function
    }
    
    // determine whether movie or not
    this.isMovie = pathname.includes("/movie/");
    // console.log(this.isMovie);  // movie/1234 -> True, show/1234-> False

    let result = null;
    try{
      
      if (this.isMovie) {
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
        // ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        const request = await tvApi.showDetail(parsedId);
        result = request.data;
        // ({ data: result } = await tvApi.showDetail(parsedId));
      }
      // console.log(result);
    } catch{
      this.setState({error: "can't find anything"});
    } finally{
      this.setState({ loading: false, result })
    }
    // console.log(this.state);

  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}