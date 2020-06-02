import React, { Component } from 'react'

class TrackList extends Component {
    constructor(props){
        super(props);
        this.state = {
            songFocus: false,
            image_src: '',
            current_track: '',
            preview: '',
            offset: 0
        }
    }
    displayNext(e, offset){
        e.preventDefault();
        var numOffset = this.state.offset + (offset * 20);

        document.querySelector('.track-container ol').setAttribute("start", numOffset+1);

        this.setState({
            offset: numOffset
        });
    }
    handleClick(key, song){
        var { tracklist } = this.props;
        this.setState({ 
            songFocus: true,
            image_src: tracklist[key].image,
            preview: tracklist[key].preview,
            current_track: song
        });
    }
    render() { 
        var { 
            offset, 
            songFocus,
            current_track,
            image_src,
            preview
        } = this.state;
        var { term, tracklist } = this.props;
        // Display period of the fetch
        var termHeader = term.substring(0, term.indexOf('_')).toUpperCase();
        return (
            <React.Fragment>
                <div className="col-lg-4">
                    <p style={{fontWeight: 'bold', textAlign: 'center'}}>{termHeader} TERM</p>
                    <div className="track-container">
                        <div className="prev-next">
                            {offset !== 0 && <input id="btn-prev" type="button" value="Prev" onClick={(e)=>this.displayNext(e, -1)}/>}
                            {offset < (tracklist.length-20) && <input id="btn-next" type="button" value="Next" onClick={(e)=>this.displayNext(e, 1)}/>}
                        </div>
                        <ol>
                            {tracklist && tracklist.slice(offset, offset + 20).map((track) => {
                                return (
                                    <li className="track-list" key={track.key} onClick={()=>this.handleClick(track.key, track.value)}>
                                        {` ${track.value}`}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
                <div className="col-lg-8">
                    {tracklist && songFocus &&
                    <div className="image-container">
                        <img className="track-img" src={image_src} alt="" />
                        <div>
                            <p>{current_track}</p>
                            <audio controls autoPlay src={preview}></audio>
                        </div>
                    </div>}
                </div>
            </React.Fragment>
        );
    }
}

export default TrackList
