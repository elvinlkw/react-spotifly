import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage';
import TopTracks from './TopTracks/TopTracks';

class Main extends Component {
    render() { 
        return (
            <Switch>
                <Route exact path="/" component={Homepage}></Route>
                <Route exact path="/top-tracks" component={TopTracks}></Route>
            </Switch>
        );
    }
}

export default Main;