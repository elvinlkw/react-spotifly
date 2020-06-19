import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import withToast from '../../hoc/withToast';
import TrackList from './TrackList';
import Spinner from '../Layout/Spinner';
import TrackOption from './TrackOption';
import classes from './style/TopTracks.module.css';

class TopTracks extends Component {
	constructor(){
		super();
		this.token = sessionStorage.getItem('token');
		this.state = {
			term: "short_term",
			loading: false,
			tracklist: [],
			isLoginRequired: false,
		};
	}
	componentDidMount(){
		// Starts fetching action when component is loaded
		// Default for fetching is Short Term
		this.setState({ loading: true });
		this.fetchTracklist('short_term');
	}
	fetchTracklist = async (term) => {
		try {
			let res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
			params: {
				time_range: term,
				limit: 50
			},
			headers: { 'Authorization': `Bearer ${this.token}` }
			});
		
			// Store tracklist, preview_url and artwork
			let trackList = [];
			trackList = await this.storeTrackList(res, trackList);

			res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
			params: {
				time_range: term,
				limit: 50,
				offset: 49
			},
			headers: { 'Authorization': `Bearer ${this.token}` }
			}); 

			trackList = await this.storeTrackList(res, trackList, 50)
			this.setState({ tracklist: trackList, loading: false });

		} catch (error) {
			this.props.addToast(`${error.response.status}: ${error.response.data ? error.response.data.error.message : 'Error Encountered'}`, {
				appearance: 'error',
				autoDismiss: true
			});
			// Triggers when access token is expired
			if(error.response.status === 401){
				this.setState({ isLoginRequired: true });
				sessionStorage.clear();
			}
		}
	}
	storeTrackList = async (res, trackList, offset = 0) => {
		let trackArray = trackList;
		let preview_url = '';
		const data = res.data.items;
		for (let i = 0; i < data.length; i++){
			// Gather list of artist in track
			let artists = '';
			for(let j = 0; j < data[i].artists.length; j++){
				if(artists.length > 1){
					artists += `, ${data[i].artists[j].name}`
				} else {
					artists += data[i].artists[j].name
				}
			}
			// If Preview URL is null in initial fetch
			// fetches deeper to get the preview
			if(data[i].preview_url === null){
				const res_track = await axios.get(data[i].href, {
					headers: { 'Authorization': `Bearer ${this.token}` }
				})
				preview_url = res_track.data.preview_url;
			} else {
				preview_url = data[i].preview_url;
			}
			const store = {
				key: i + offset,
				name: `${artists} - ${data[i].name}`,
				artwork: data[i].album.images[0].url,
				preview: preview_url
			}
			trackArray.push(store);
		}
		return trackArray;
	}
	handleOption = async (e) => {
		this.setState({
			term: e.target.value,
			loading: true
		});
		console.log(e.target.value);
		this.fetchTracklist(e.target.value);
	}
	render() { 
			var { term, tracklist, loading, isLoginRequired } = this.state;

			if(loading && !isLoginRequired) return <Spinner />

			// This will trigger when the access token is expired
			const isRedirect = isLoginRequired ? this.props.history.push('/react-spotifly/login') : null;

			return (
				<Fragment>
					{isRedirect}
					<div className={classes.TopTracks}>
						<h1 className="text-center">Top Tracks</h1>
						<div className={`form-group ${classes.TrackOption}`}>
							<p>View:</p>
							<TrackOption term={term} onchange={(this.handleOption)} />
						</div>
						<div className="row">
							<TrackList term={term} tracklist={tracklist}/>
						</div>
					</div>
				</Fragment>
			);
	}
}

export default withRouter(withToast(TopTracks));