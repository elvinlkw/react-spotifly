import React, { Component } from 'react';
import axios from 'axios';
import withToast from '../../hoc/withToast';
import ArtistList from './ArtistList';
import SelectedOption from './SelectedOption';
import AuthContext from '../../context/auth-context';
import ArtistDetails from './ArtistDetails';
import Spinner from '../Layout/Spinner';
import Modal from './Modal';
import classes from './style/TopArtists.module.css';

class TopArtists extends Component {
	constructor(props){
		super(props);
		this.state = {
			term: "short_term",
			loading: false,
			modalLoading: false,
			showModal: false,
			searchCompleted: false,
			artist_list: [],
			myArtistDetails: {}
		}
		this.token = sessionStorage.getItem('token');
	}
	static contextType = AuthContext;
	componentDidMount() {
		this.setState({ loading: true });
		this.fetchArtistList('short_term')
	}
	fetchArtistList = async (term) => {
		try {
			let res = await axios({
				method: 'GET',
				url: 'https://api.spotify.com/v1/me/top/artists',
				params: {
					limit: 50,
					time_range: term
				},
				headers: { 'Authorization': `Bearer ${this.token}` }
			});
			
			let artist_list = [];
			artist_list = this.storeArtistList(res, artist_list);

			res = await axios({
				method: 'GET',
				url: 'https://api.spotify.com/v1/me/top/artists',
				params: {
					limit: 50,
					time_range: term,
					offset: 49
				},
				headers: { 'Authorization': `Bearer ${this.token}` }
			});

			artist_list = this.storeArtistList(res, artist_list, 50);

			this.setState({ 
				artist_list,
				loading: false
			});

		} catch (error) {
			this.props.addToast(`${error.response.status}: ${error.response.data ? error.response.data.error.message : 'Error Encountered'}`, {
				appearance: 'error',
				autoDismiss: true
			});
			// Triggers when access token is expired
			if(error.response.status === 401){
				sessionStorage.clear();
				this.context.updateAuth(false);
			}
		}
	}
	storeArtistList = (res, artistList, offset = 0) => {
		let artistArray = artistList;
		let data = res.data.items
		for(let i = 0; i < data.length; i++){
			const store = {
				key: i + offset,
				name: data[i].name,
				id: data[i].id,
				images: data[i].images[1].url
			}
			artistArray.push(store);
		}
		return artistArray;
	}
	handleOption = (e) => {
		this.setState({ 
			term: e.target.value,
			loading: true,
		})
		this.fetchArtistList(e.target.value);
	}
	fetchMyArtistTracks = async (clickedArtist) => {
		try {
      let res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
				params: {
					time_range: this.state.term,
					limit: 50
				},
				headers: { 'Authorization': `Bearer ${this.token}` }
			});

			let artistTracks = [];
			artistTracks = this.storeMyArtistTracks(res, artistTracks, clickedArtist);

			res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
				params: {
					time_range: this.state.term,
					limit: 50,
					offset: 49
				},
				headers: { 'Authorization': `Bearer ${this.token}` }
			});
			artistTracks = this.storeMyArtistTracks(res, artistTracks, clickedArtist);

			this.setState({
				modalLoading: false,
				myArtistDetails: {
					artist: clickedArtist,
					my_ArtistTracks: artistTracks
				},
				searchCompleted: true
			});
    } catch (error) {
      alert(error);
    }
	}
	storeMyArtistTracks = (res, artistTracks, clickedArtist, offset = 0) => {
		const data = res.data.items;
		let artistArray = artistTracks;
		for(let i = 0; i < data.length; i++){
			data[i].artists.forEach(artist => {
				if(artist.name === clickedArtist.name){
					const store = {
						name: data[i].name,
						preview_url: data[i].preview_url,
						uri: data[i].uri,
					}
					artistArray.push(store);
				}
			});
		}
		return artistArray;
	}
	handleShowModal = (clickedArtist) => {
		this.setState({ 
			showModal: true,
			modalLoading: true
		});
		this.fetchMyArtistTracks(clickedArtist);
	}
	handleHideModal = () => this.setState({ showModal: false });
	render() {       
		const {
			term,
			loading,
			modalLoading,
			artist_list,
			showModal,
			myArtistDetails,
			searchCompleted
		} = this.state;

		if(loading) return <Spinner /> 

		return (
			<div className={classes.TopArtists}>
				<Modal displayModal={showModal} hideModal={this.handleHideModal}>
					{searchCompleted && <ArtistDetails loading={modalLoading} myArtist={myArtistDetails}/>}
				</Modal>
				<h1 className="text-center">Top Artists</h1>
				<div className={`form-group ${classes.SelectedOption}`}>
					<p>View:</p>
					<SelectedOption term={term} onchange={this.handleOption} />
				</div>
				<div>
					<ArtistList term={term} artist_list={artist_list} showModal={this.handleShowModal}/>
				</div>
			</div>
		);
	}
}

export default withToast(TopArtists);