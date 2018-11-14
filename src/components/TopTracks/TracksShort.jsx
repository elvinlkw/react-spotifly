import React, { Component } from 'react';

class TracksShort extends Component {
    constructor(){
        super();
        this.state = {
            itemList: [],
            dataValid: false
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        var tempArray = [];
        spotifyApi.getMyTopTracks({limit: 50, time_range: 'short_term'}).then((res) => {
			for(var i=0; i < res.items.length; i++){
                var obj = {};
                var artist = '';
                for (var j=0; j<res.items[i].artists.length;j++){
                    if(artist.length > 1){
                        artist += ', ' + res.items[i].artists[j].name;
                    }else{
                        artist += res.items[i].artists[j].name;
                    }
                }
				obj['key'] = i;
                obj['value'] = artist + ' - ' + res.items[i].name;
                obj['preview'] = res.items[i].preview_url;
				tempArray.push(obj);
            }
            return;
		}, (res) => {
			alert('Error: Could Not Retrieve Data From Server');
		}).then(()=>{
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
        document.addEventListener('play', function(e){
            var audios = document.getElementsByTagName('audio');
            for(var i = 0, len = audios.length; i < len;i++){
                if(audios[i] !== e.target){
                    audios[i].pause();
                    document.getElementsByTagName('i')[i].className = 'fa fa-play';
                }
            }
        }, true);
        var renderPlayPause = (player)=>{
            var classlist = document.getElementsByTagName('i')[player].className;
            var audio = document.getElementsByTagName('audio');
            if(classlist.includes('play')){
                classlist = classlist.replace('play', 'pause');
                audio[player].play();
            }else{
                classlist = classlist.replace('pause', 'play');
                audio[player].pause();
            }
            document.getElementsByTagName('i')[player].className = classlist;
        }
        return (
            <div className="col-4">
                <p style={{fontWeight: 'bold'}}>Short Term (4 weeks)</p>
                <ol>
                    {this.state.dataValid && this.state.itemList.map((item) => {
                        return (
                            <li key={item.key}>
                                <i onClick={()=>renderPlayPause(item.key)} style={{opacity:'0.8'}} className="fa fa-play"></i>
                                {` ${item.value}`}
                                <audio src={item.preview}></audio>
                            </li>
                        )
                    })}
                </ol>
            </div>
        );
    }
}

export default TracksShort;