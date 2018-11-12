import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import TopTracks from './TopTracks/TopTracks';
import TopArtists from './TopArtists/TopArtists';

class Main extends Component {
    render() { 
        return (
            <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route exact path="/top-tracks" component={TopTracks}></Route>
                <Route exact path="/top-artists" component={TopArtists}></Route>
            </Switch>
        );
    }
}

export default Main;