import React, { Component } from 'react';

class ArtistsMedium extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemList: [],
            dataValid: false
        }
    }
    componentWillMount(){
        var {spotifyApi} = this.props;
        var tempArray = [];
        spotifyApi.getMyTopArtists({limit: 50, time_range: 'medium_term'}).then((res)=>{
            for(var i = 0; i < res.items.length; i++){
                var obj = {};
                obj['key'] = i+1;
                obj['value'] = res.items[i].name;
                tempArray.push(obj);
            }
            return;
        }, (res) => {
            alert('Error: Data could not be fetched!');
        }).then(()=>{
            spotifyApi.getMyTopArtists({limit:50, time_range: 'medium_term', offset: '49'}).then((data)=>{
                for(var i=1; i<data.items.length; i++){
                    var obj = {};
                    obj['key'] = i+50;
                    obj['value']=data.items[i].name;
                    tempArray.push(obj);
                }
                this.setState({
                    itemList: tempArray,
                    dataValid: true
                })
            });
        });
    }
    render() { 
        return (
            <div className="col-lg-4">
                <p style={{fontWeight: 'bold'}}>Medium Term (Approximately 6 Months)</p>
                <ol className="artist-list">
                    {this.state.dataValid && 
                    this.state.itemList.map((item)=>{
                        return (
                            <li key={item.key}>{item.value}</li>
                        )
                    })
                    }
                </ol>
            </div>
        );
    }
}

export default ArtistsMedium;