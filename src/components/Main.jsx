import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import TopTracks from './TopTracks/TopTracks';
import TopArtists from './TopArtists/TopArtists';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route exact path="/top-tracks" component={TopTracks}></Route>
            <Route exact path="/top-artists" component={TopArtists}></Route>
        </Switch>
    );
}

export default Main;