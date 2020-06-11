import React, { Component } from 'react';
import Pagination from './Pagination';
import TracksDisplay from './TracksDisplay';
import TrackControl from './TrackControl';

class TrackList extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTrack: {
                name: '',
                preview: '',
                image_src: ''
            },
            songFocus: false,
            currentPage: 1,
            tracksPerPage: 20
        }
    }
    handleClick = (key, song) => {
        var { tracklist } = this.props;
        var track = {
            name: song,
            preview: tracklist[key].preview,
            image_src: tracklist[key].image
        }
        this.setState({ 
            songFocus: true,
            currentTrack: track
        });
    }
    paginate = (event, number) => {
        event.preventDefault();
        this.setState({ currentPage: number });
    }
    render() { 
        var { 
            songFocus,
            currentPage,
            tracksPerPage,
            currentTrack
        } = this.state;
        var { term, tracklist } = this.props;

        // Display period of the fetch
        var termHeader = term.substring(0, term.indexOf('_'));

        // Retrieving Pagination Indexes
        var indexOfLastPage = currentPage * tracksPerPage;
        var indexOfFirstPage = indexOfLastPage - tracksPerPage;
        var currentTracks = tracklist.slice(indexOfFirstPage, indexOfLastPage);
        
        return (
            <React.Fragment>
                <div className="col-lg-4">
                    <p style={{fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize'}}>{termHeader} term</p>
                    <div className="track-container">
                        <TracksDisplay 
                            indexOfFirstPage={indexOfFirstPage}
                            currentTracks={currentTracks}
                            onclick={this.handleClick}
                        />
                        <Pagination 
                            totalTracks={tracklist.length} 
                            tracksPerPage={tracksPerPage} 
                            paginate={this.paginate}
                        />
                    </div>
                </div>
                <TrackControl 
                    songFocus={songFocus}
                    currentTrack={currentTrack}
                />
            </React.Fragment>
        );
    }
}

export default TrackList
