(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,a){e.exports=a(35)},22:function(e,t,a){},24:function(e,t,a){},26:function(e,t,a){},33:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(15),s=a.n(i),o=a(2),c=a(3),l=a(5),m=a(4),u=a(6),p=(a(22),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container-login"},r.a.createElement("a",{href:"https://accounts.spotify.com/en/authorize/?client_id=".concat("54023f00676d404aa81cafd195a5b9f5","&response_type=token&redirect_uri=").concat("https://elvinlkw.github.io/react-spotifly/","&scope=").concat("user-read-private user-read-email user-library-read user-top-read user-read-recently-played user-read-currently-playing")},"Login"),r.a.createElement("p",null,"Please Login First"))}}]),t}(n.Component)),h=a(39),f=a(36),d=a(10),v=a.n(d),k=(a(24),new v.a),y=function(e){function t(){var e;Object(o.a)(this,t),e=Object(l.a)(this,Object(m.a)(t).call(this));var a=window.location.href;if(a.indexOf("token=")>-1)var n=a.split("token=")[1].split("&")[0].trim();return k.setAccessToken(n),e.state={topTrack:"",topArtist:"",topTrackArtwork:"",topArtistArtwork:"",topArtistPreview:"",topTrackPreview:"",topTrackLoaded:!1,topPreviewLoaded:!1,genre:{}},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;k.getMyTopTracks({time_range:"long_term"}).then(function(t){for(var a="",n=0;n<t.items[0].artists.length;n++)a.length>1?a+=", "+t.items[0].artists[n].name:a+=t.items[0].artists[n].name;e.setState({topTrack:a+" - "+t.items[0].name,topTrackArtwork:t.items[0].album.images[1].url,topTrackPreview:t.items[0].preview_url,topTrackLoaded:!0})},function(e){alert("Data Could Not Be Retrieved!")}),k.getMyTopArtists({time_range:"long_term",limit:"50"}).then(function(t){return e.setState({topArtist:t.items[0].name,topArtistArtwork:t.items[0].images[1].url}),t.items[0].id}).then(function(t){k.getArtistTopTracks(t,"US").then(function(t){e.setState({topPreviewLoaded:!0,topArtistPreview:t.tracks[0].preview_url})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"container-current-top"},r.a.createElement("div",{className:"wrapper-top-header"},r.a.createElement("h1",null,"All Time Top Track"),r.a.createElement("img",{alt:"Could Not Be Loaded",src:this.state.topTrackArtwork})),r.a.createElement("div",{className:"wrapper-top-preview"},r.a.createElement("h4",null,this.state.topTrack),this.state.topTrackLoaded&&r.a.createElement("audio",{controls:!0},r.a.createElement("source",{src:this.state.topTrackPreview})))),r.a.createElement("div",{className:"container-current-top"},r.a.createElement("div",{className:"wrapper-top-preview"},r.a.createElement("h4",null,this.state.topArtist),this.state.topPreviewLoaded&&r.a.createElement("audio",{controls:!0},r.a.createElement("source",{src:this.state.topArtistPreview}))),r.a.createElement("div",{className:"wrapper-top-header"},r.a.createElement("h1",null,"All Time Top Artist"),r.a.createElement("img",{alt:"Could Not Be Loaded",src:this.state.topArtistArtwork}))))}}]),t}(n.Component),g=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={itemList:[],dataValid:!1},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopTracks({limit:50,time_range:"short_term"}).then(function(e){for(var t=0;t<e.items.length;t++){for(var n={},r="",i=0;i<e.items[t].artists.length;i++)r.length>1?r+=", "+e.items[t].artists[i].name:r+=e.items[t].artists[i].name;n.key=t+1,n.value=r+" - "+e.items[t].name,a.push(n)}},function(e){alert("Error: Could Not Retrieve Data From Server")}).then(function(){t.getMyTopTracks({limit:50,time_range:"short_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){for(var r={},i="",s=0;s<t.items[n].artists.length;s++)i.length>1?i+=", "+t.items[n].artists[s].name:i+=t.items[n].artists[s].name;r.key=n+50,r.value=i+" - "+t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Short Term (4 weeks)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),b=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={itemList:[],dataValid:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopTracks({limit:50,time_range:"medium_term"}).then(function(e){for(var t=0;t<e.items.length;t++){for(var n={},r="",i=0;i<e.items[t].artists.length;i++)r.length>1?r+=", "+e.items[t].artists[i].name:r+=e.items[t].artists[i].name;n.key=t+1,n.value=r+" - "+e.items[t].name,a.push(n)}},function(e){alert("Error: Could Not Retrieve Data From Server")}).then(function(){t.getMyTopTracks({limit:50,time_range:"medium_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){for(var r={},i="",s=0;s<t.items[n].artists.length;s++)i.length>1?i+=", "+t.items[n].artists[s].name:i+=t.items[n].artists[s].name;r.key=n+50,r.value=i+" - "+t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Medium Term (Approximately 6 Months)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={itemList:[],dataValid:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopTracks({limit:50,time_range:"long_term"}).then(function(e){for(var t=0;t<e.items.length;t++){for(var n={},r="",i=0;i<e.items[t].artists.length;i++)r.length>1?r+=", "+e.items[t].artists[i].name:r+=e.items[t].artists[i].name;n.key=t+1,n.value=r+" - "+e.items[t].name,a.push(n)}},function(e){alert("Error: Could Not Retrieve Data From Server")}).then(function(){t.getMyTopTracks({limit:50,time_range:"long_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){for(var r={},i="",s=0;s<t.items[n].artists.length;s++)i.length>1?i+=", "+t.items[n].artists[s].name:i+=t.items[n].artists[s].name;r.key=n+50,r.value=i+" - "+t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Long Term (All Time)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),O=(a(26),new v.a),j=function(e){function t(){var e;Object(o.a)(this,t),e=Object(l.a)(this,Object(m.a)(t).call(this));var a=window.location.href;if(a.indexOf("token=")>-1)var n=a.split("token=")[1].split("&")[0].trim();return O.setAccessToken(n),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"text-center"},"Top Tracks"),r.a.createElement("div",{className:"row"},r.a.createElement(g,{spotifyApi:O}),r.a.createElement(b,{spotifyApi:O}),r.a.createElement(E,{spotifyApi:O})))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={itemList:[],dataValid:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopArtists({limit:50,time_range:"short_term"}).then(function(e){for(var t=0;t<e.items.length;t++){var n={};n.key=t+1,n.value=e.items[t].name,a.push(n)}},function(e){alert("Error: Data could not be fetched!")}).then(function(){t.getMyTopArtists({limit:50,time_range:"short_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){var r={};r.key=n+50,r.value=t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Short Term (4 Weeks)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={itemList:[],dataValid:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopArtists({limit:50,time_range:"medium_term"}).then(function(e){for(var t=0;t<e.items.length;t++){var n={};n.key=t+1,n.value=e.items[t].name,a.push(n)}},function(e){alert("Error: Data could not be fetched!")}).then(function(){t.getMyTopArtists({limit:50,time_range:"medium_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){var r={};r.key=n+50,r.value=t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Medium Term (Approximately 6 Months)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),A=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={itemList:[],dataValid:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.spotifyApi,a=[];t.getMyTopArtists({limit:50,time_range:"long_term"}).then(function(e){for(var t=0;t<e.items.length;t++){var n={};n.key=t+1,n.value=e.items[t].name,a.push(n)}},function(e){alert("Error: Data could not be fetched!")}).then(function(){t.getMyTopArtists({limit:50,time_range:"long_term",offset:"49"}).then(function(t){for(var n=1;n<t.items.length;n++){var r={};r.key=n+50,r.value=t.items[n].name,a.push(r)}e.setState({itemList:a,dataValid:!0})})})}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-4"},r.a.createElement("p",{style:{fontWeight:"bold"}},"Long Term (All Time)"),r.a.createElement("ol",null,this.state.dataValid&&this.state.itemList.map(function(e){return r.a.createElement("li",{key:e.key},e.value)})))}}]),t}(n.Component),_=new v.a,N=function(e){function t(){var e;Object(o.a)(this,t),e=Object(l.a)(this,Object(m.a)(t).call(this));var a=window.location.href.split("token=")[1].split("&")[0].trim();return _.setAccessToken(a),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"text-center"},"Top Artists"),r.a.createElement("div",{className:"row",style:{width:"100vw",overflowX:"hidden"}},r.a.createElement(T,{spotifyApi:_}),r.a.createElement(w,{spotifyApi:_}),r.a.createElement(A,{spotifyApi:_})))}}]),t}(n.Component),L=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(f.a,{exact:!0,path:"/",component:y}),r.a.createElement(f.a,{exact:!0,path:"/top-tracks",component:j}),r.a.createElement(f.a,{exact:!0,path:"/top-artists",component:N}))}}]),t}(n.Component),M=a(38),x=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.token;return r.a.createElement("div",{className:"navbar bg-dark navbar-expand"},r.a.createElement("span",{className:"navbar-brand"},r.a.createElement(M.a,{exact:!0,to:"/#access_token=".concat(e,"&token_type=Bearer&expires_in=3600"),className:"nav-link"},"Spotifly")),r.a.createElement("ul",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(M.a,{exact:!0,to:"/#access_token=".concat(e,"&token_type=Bearer&expires_in=3600"),className:"nav-link"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(M.a,{exact:!0,to:"/top-tracks#access_token=".concat(e,"&token_type=Bearer&expires_in=3600"),className:"nav-link"},"Top Tracks")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(M.a,{exact:!0,to:"/top-artists#access_token=".concat(e,"&token_type=Bearer&expires_in=3600"),className:"nav-link"},"Top Artists"))))}}]),t}(n.Component),C=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={loggedIn:!1},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=window.location.href;e.indexOf("token=")>-1&&(this.authToken=e.split("token=")[1].split("&")[0].trim(),this.setState({loggedIn:!0}))}},{key:"render",value:function(){return r.a.createElement("div",null,!this.state.loggedIn&&r.a.createElement(p,null),this.state.loggedIn&&r.a.createElement("div",null,r.a.createElement(x,{token:this.authToken}),r.a.createElement(L,{token:this.authToken})))}}]),t}(n.Component),V=a(37);a(31),a(33);s.a.render(r.a.createElement(V.a,{basename:"/react-spotifly"},r.a.createElement(C,null)),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.407f1a4e.chunk.js.map