import React, { Component } from 'react';
import ArtistDisplay from './ArtistDisplay';
import Pagination from '../Layout/Pagination';
import classes from './style/ArtistList.module.css';

class ArtistList extends Component {
	state = {
		currentPage: 1,
		artistPerPage: 20
	}
	paginate = (e, page) => {
		e.preventDefault();
		this.setState({
			currentPage: page
		})
	}
	render(){
		const { term, artist_list } = this.props;
		const {
			currentPage,
			artistPerPage
		} = this.state;
		const termHeader = term.substring(0, term.indexOf('_'));

		let indexLastOfPage = currentPage * artistPerPage;
		let indexFirstOfPage = indexLastOfPage - artistPerPage;
		let current_artists = artist_list.slice(indexFirstOfPage, indexLastOfPage);

		return (
			<div className={classes.ArtistList}>
				<p>{termHeader} term</p>
				<div>
					<ArtistDisplay indexFirstOfPage={indexFirstOfPage} artist_list={current_artists} onclick={this.props.showModal}/>
					<Pagination totalTracks={artist_list.length} tracksPerPage={artistPerPage} paginate={this.paginate} />
				</div>
			</div>
		)
	}
}

export default ArtistList
