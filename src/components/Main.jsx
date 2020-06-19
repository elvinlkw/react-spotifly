import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing/Landing';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import TopTracks from './TopTracks/TopTracks';
import TopArtists from './TopArtists/TopArtists';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/react-spotifly" component={Landing} />}/>
            <Route exact path="/react-spotifly/profile" component={Profile}></Route>
            <Route exact path="/react-spotifly/search" component={Search}></Route>
            <Route exact path="/react-spotifly/top-tracks" component={TopTracks}></Route>
            <Route exact path="/react-spotifly/top-artists" component={TopArtists}></Route>
        </Switch>
    );
}

export default Main;