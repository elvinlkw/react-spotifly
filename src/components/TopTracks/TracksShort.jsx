import React, { Component } from 'react';

class TracksShort extends Component {
    constructor(){
        super();
        this.state = {
            itemList: [],
            dataValid: false,
            songFocus: false,
            image_src: '',
            track: '',
            preview: '',
            offset: 0
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
                    // console.log(data);
                })
            }
            tempArray.push(obj);
        }.bind(this));

        return tPromise;
    }
    displayNext(event, offset){
        event.preventDefault();
        var numOffset = this.state.offset + (offset * 20);

        document.querySelector('.track-container ol').setAttribute("start", numOffset+1);

        this.setState({
            offset: numOffset
        });
    }
    handleClick(key, song){
        this.setState({
            songFocus: true,
            image_src: this.state.itemList[key].image,
            preview: this.state.itemList[key].preview,
            track: song
        });
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        var tempArray = [];
        spotifyApi.getMyTopTracks({limit: 50, time_range: 'short_term'}).then((res) => {
            var promiseArray = [];
            for(let i = 0; i < res.items.length; i++){
                promiseArray.push(this.getTrackInfo(i, res.items[i], tempArray))
            }
            Promise.all(promiseArray).then(function(){
                return;
            });
		}, (res) => {
			alert('Error: Could Not Retrieve Data From Server');
		}).then(()=>{
            console.log(tempArray)
            spotifyApi.getMyTopTracks({limit:50, time_range: 'short_term', offset: '49'}).then((data)=>{
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
    render() { 
        return (
            <React.Fragment>
                <div className="col-lg-4">
                    <p style={{fontWeight: 'bold'}}>Short Term (4 weeks)</p>
                    <div className="track-container">
                        <ol>
                            {this.state.dataValid && this.state.itemList.slice(this.state.offset, this.state.offset + 20).map((item) => {
                                return (
                                    <li className="track-list" key={item.key} onClick={()=>this.handleClick(item.key, item.value)}>
                                        {` ${item.value}`}
                                    </li>
                                )
                            })}
                        </ol>
                        <div className="prev-next">
                            {this.state.offset !== 0 && <input id="btn-prev" type="button" value="Prev" onClick={(e)=>this.displayNext(e, -1)}/>}
                            {this.state.offset < (this.state.itemList.length-20) && <input id="btn-next" type="button" value="Next" onClick={(e)=>this.displayNext(e, 1)}/>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
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
        );
    }
}

export default TracksShort;