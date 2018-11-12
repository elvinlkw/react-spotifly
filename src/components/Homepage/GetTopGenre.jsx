import React, { Component } from 'react';

class GetTopGenre extends Component {
    constructor(){
        super();
        this.state = {
            favoriteGenres: {}
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        spotifyApi.getMyTopArtists({time_range: 'long_term', limit: '50'}).then((res)=>{
            var obj = {};
            var temp;
            var sortedResult = {};
            for(var i=0;i<res.items.length;i++){
                for (var j=0; j<res.items[i].genres.length; j++){
                    temp = res.items[i].genres[j].split(/[ -]+/).join('_');
                    if(Object.keys(obj).includes(temp)){
                        obj[temp] += 1;
                    } else{
                        obj[temp] = 1;
                    }
                }
            }
            sortedResult = this.sortResult(obj);
            this.setState({
                favoriteGenres: sortedResult
            })
            return res.items[0].id;
        });
    }
    sortResult(data){
        var first = 0, second = 0, third = 0, fourth = 0, temp;
        var result = {};

        for(var key in data){
            temp = data[key];
            if(first < temp){
                first = temp;
            } else if(second < temp){
                second = temp;
            } else if (third < temp){
                third = temp;
            } else if (fourth < temp){
                fourth = temp;
            }
        }
        for(var prop in data){
            if(data[prop] === first){
                result[prop] = Math.ceil((first/50)*100);
            } else if(data[prop] === second){
                result[prop] = Math.ceil((second/50)*100);
            } else if(data[prop] === third){
                result[prop] = Math.ceil((third/50)*100);
            } else if(data[prop] === fourth){
                result[prop] = Math.ceil((fourth/50)*100);
            }
        }
        return result;
    }
    render() { 
        return (
            <div className="container-favorite-genres">
                <h1 className="text-center">Favorite Genres</h1>
                <h4 className="text-center">Your most played tracks include the following genres: </h4>
                <div>{
                    Object.keys(this.state.favoriteGenres).map((genre)=>{
                        return(
                            <div key={genre} className="genres">
                                <h4 style={{width: "20%", textAlign:"center"}}>{genre.split('_').join(' ').toUpperCase()}</h4>
                                <h4>{`${this.state.favoriteGenres[genre]}%`}</h4>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width: `${this.state.favoriteGenres[genre]}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        )
                    })
                }</div>
            </div>
        );
    }
}

export default GetTopGenre;