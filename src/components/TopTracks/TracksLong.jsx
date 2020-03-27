import React, { Component } from 'react';

class TracksLong extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemList: [],
            dataValid: false,
            songFocus: false,
            image_src: '',
            track: '',
            preview: ''
        }
        this.getTrackInfo = this.getTrackInfo.bind(this);
    }
    getTrackInfo(i, trackObj, tempArray){
        let tPromise = new Promise(function(resolve, reject) {
            var obj = {};
            var artist = '';
            for (var j=0; j<trackObj.artists.length;j++){
                if(artist.length > 1){
                    artist += ', ' + trackObj.artists[j].name;
                }else{
                    artist += trackObj.artists[j].name;
                }
            }
            obj['key'] = i;
            obj['value'] = artist + ' - ' + trackObj.name;
            obj['preview'] = trackObj.preview_url;
            obj['image'] = trackObj.album.images[0].url;
            if(trackObj.preview_url === null){
                let reformatedURL = `${trackObj.album.href}?access_token=${this.token}`;
                fetch(reformatedURL).then(res=>{
                    return res.json();
                }).then(data => {
                    console.log(data);
                })
            }
            tempArray.push(obj);
        }.bind(this));

        return tPromise;
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        var tempArray = [];
        spotifyApi.getMyTopTracks({limit: 50, time_range: 'long_term'}).then((res) => {
            var promiseArray = [];
            console.log(res.items[1]);

            for(let i = 0; i < res.items.length; i++){
                promiseArray.push(this.getTrackInfo(i, res.items[i], tempArray))
            }

            Promise.all(promiseArray).then(function(){
                return;
            });
		}, (res) => {
			alert('Error: Could Not Retrieve Data From Server');
		}).then(()=>{
            spotifyApi.getMyTopTracks({limit:50, time_range: 'long_term', offset: '49'}).then((data)=>{
                for(var i=1;i<data.items.length;i++){
                    var obj = {};
                    var artist = '';
                    for (var j=0; j<data.items[i].artists.length;j++){
                        if(artist.length > 1){
                            artist += ', ' + data.items[i].artists[j].name;
                        }else{
                            artist += data.items[i].artists[j].name;
                        }
                    }
                    obj['key'] = i+49;
                    obj['value'] = artist + ' - ' + data.items[i].name;
                    obj['preview'] = data.items[i].preview_url;
                    obj['image'] = data.items[i].album.images[0].url;
                    tempArray.push(obj);
                }
                this.setState({
                    itemList: tempArray,
                    dataValid: true
                });
            })
        });
    }
    // componentDidMount(){
    //     document.addEventListener('play', this.handlePause, true);
    // }
    // componentWillUnmount(){
    //     document.removeEventListener('play', this.handlePause, true);
    // }
    // handlePause(e){
    //     var audios = document.getElementsByTagName('audio');
    //     for(var i = 0, len = audios.length; i < len;i++){
    //         if(audios[i] !== e.target){
    //             audios[i].pause();
    //             document.getElementsByTagName('i')[i].className = 'fa fa-play';
    //             document.getElementsByClassName('track-list')[i].style.color = "black";
    //         }
    //     }
    // }
    handleClick(key, song){
        this.setState({
            songFocus: true,
            image_src: this.state.itemList[key].image,
            preview: this.state.itemList[key].preview,
            track: song
        });
    }
    render() {
        // var renderPlayPause = (player)=>{
        //     var classlist = document.getElementsByTagName('i')[player].className;
        //     var audio = document.getElementsByTagName('audio');
        //     var list_item = document.getElementsByClassName('track-list')[player];
        //     if(classlist.includes('play')){
        //         classlist = classlist.replace('play', 'pause');
        //         audio[player].play();
        //         audio[player].volume = 0.5;
        //         list_item.style.color = "red";
        //     }else{
        //         classlist = classlist.replace('pause', 'play');
        //         audio[player].pause();
        //         list_item.style.color = "black";
        //     }
        //     document.getElementsByTagName('i')[player].className = classlist;
        // }
        return (
            <React.Fragment>
                <div className="col-4">
                    <p style={{fontWeight: 'bold'}}>All Time</p>
                    <div className="track-container">
                        <ol>
                            {this.state.dataValid && this.state.itemList.map((item) => {
                                return (
                                    <li className="track-list" key={item.key} onClick={()=>this.handleClick(item.key, item.value)}>
                                        {` ${item.value}`}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
                <div className="col-8">
                    {this.state.dataValid && this.state.songFocus &&
                    <div className="image-container">
                        <img className="track-img" src={this.state.image_src} alt="" />
                        <div>
                            <p>{this.state.track}</p>
                            <audio controls autoPlay src={this.state.preview}></audio>
                        </div>
                    </div>}
                </div>
            </React.Fragment>
        )
    }
}

export default TracksLong;