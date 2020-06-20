import React, { Component } from 'react';
import Pagination from './Pagination';
import TracksDisplay from './TracksDisplay';
import TrackControl from './TrackControl';
import withToast from '../../hoc/withToast';
import classes from './style/TrackList.module.css';

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
			tracksPerPage: 20,
			activeClass: false
		}
	}
	// Handler for clicking of a track
	handleClick = (key, song) => {
		var { tracklist } = this.props;
		var track = {
			name: song,
			preview: tracklist[key].preview,
			image_src: tracklist[key].artwork,
			uri: tracklist[key].uri
		}
		if(track.preview === null){
			this.props.addToast(`No Previews Found`, {
					appearance: 'warning',
					autoDismiss: true
			});
		} else {
			this.setState({ 
				songFocus: true,
				currentTrack: track,
				activeClass: true
			});
		}
	}
	// update state of the currentPage to display
	paginate = (event, number) => {
		event.preventDefault();
		this.setState({ currentPage: number });
	}
	render() { 
		const { 
				songFocus,
				currentPage,
				tracksPerPage,
				currentTrack,
				activeClass
		} = this.state;
		const { term, tracklist } = this.props;

		// Display period of the fetch
		var termHeader = term.substring(0, term.indexOf('_'));

		// Retrieving Pagination Indexes
		// get the list of tracks in focus
		let indexOfLastPage = currentPage * tracksPerPage;
		let indexOfFirstPage = indexOfLastPage - tracksPerPage;
		let currentTracks = tracklist.slice(indexOfFirstPage, indexOfLastPage);
		
		return (
			<React.Fragment>
				<div className={`col-lg-4 ${classes.TrackList}`}>
					<p style={{fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize'}}>{termHeader} term</p>
					<div>
						<TracksDisplay 
								indexOfFirstPage={indexOfFirstPage}
								currentTracks={currentTracks}
								onclick={this.handleClick} />
						<Pagination 
								totalTracks={tracklist.length} 
								tracksPerPage={tracksPerPage} 
								paginate={this.paginate} />
					</div>
				</div>
				<TrackControl 
					songFocus={songFocus}
					currentTrack={currentTrack}
					activeClass={activeClass} />
			</React.Fragment>
		);
	}
}

export default withToast(TrackList)
