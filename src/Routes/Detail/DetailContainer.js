import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
    state = {
    result: null, // only one result. dont care if its tv or movie
    error: null,
    loading: true
  };

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}