import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component{
    
    //state : derived from api
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error:null,
        loading:true,
    }

    // logics 

    // render : render all state to Presenter
    // no presentation in this component
    render(){
        //destructuring
        const {nowPlaying, upComing, popular, error, loading} = this.state;
        
        return (
            <HomePresenter 
                nowPlaying={nowPlaying} 
                upComing={upComing} 
                popular={popular}
                error={error}
                loading={loading}
            />
        )  
    }
}