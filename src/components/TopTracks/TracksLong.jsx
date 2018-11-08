import React, { Component } from 'react';

class TracksLong extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemList: [],
            dataValid: false
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        var tempArray = []
		spotifyApi.getMyTopTracks({limit: 50, time_range: 'long_term'}).then((res) => {
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
				obj['key'] = i+1;
				obj['value'] = artist + ' - ' + res.items[i].name;
				tempArray.push(obj);
            }
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
                    obj['key'] = i+50;
                    obj['value'] = artist + ' - ' + data.items[i].name;
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
            <div className="col-4">
                <p style={{fontWeight: 'bold'}}>Long Term (All Time)</p>
                <ol>
                    {this.state.dataValid && this.state.itemList.map((item) => {
                        return (
                            <li key={item.key}>{item.value}</li>
                        )
                    })}
                </ol>
            </div>
        );
    }
}
 
export default TracksLong;