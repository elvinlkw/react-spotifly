import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import TopTracks from "./TopTracks/TopTracks";
import TopArtists from "./TopArtists/TopArtists";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/profile" component={Profile}></Route>
      <Route path="/search" component={Search}></Route>
      <Route path="/top-tracks" component={TopTracks}></Route>
      <Route path="/top-artists" component={TopArtists}></Route>
      <Route path="/access_token*" component={Landing}></Route>
    </Switch>
  );
};

export default Main;
