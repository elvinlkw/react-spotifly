import React, { Component } from 'react';
import SpotifyApi from 'spotify-web-api-js';
import './../../style/Profile.css';

const spotifyApi = new SpotifyApi();

class Profile extends Component {
    constructor(props){
        super(props);
        let url = window.location.href;
        if(url.indexOf("token=") > -1){ 
            var token = url.split("token=")[1].split("&")[0].trim();
        }
        this.state = {
            profile_img: '',
            country: '',
            display_name: '',
            email: '',
            id: '',
            account_type: '',
            link: '',
            followers: 0
        }
        spotifyApi.setAccessToken(token);
    }
    componentWillMount(){
        spotifyApi.getMe().then((res)=>{
            try{
                this.setState({
                    country: res.country,
                    display_name: res.display_name,
                    profile_img: res.images[0].url,
                    email: res.email,
                    followers: res.followers.total,
                    account_type: res.product,
                    id: res.id,
                    link: res.external_urls.spotify
                });
            } catch(e){
                alert("Your Information Was Not Successfully Retrieved. Try refreshing the page!");
            }
            
        }, () => {
            alert('Profile Data Could Not Be Fetched!');
        });
    }
    render() { 
        return (
            <div className="container-profile">
                <img src={this.state.profile_img} alt="Could Not Be Loaded"/>
                <h4><strong>Country: </strong>{this.state.country}</h4>
                <h4><strong>Display Name: </strong>{this.state.display_name}</h4>
                <h4><strong>Email: </strong>{this.state.email}</h4>
                <h4><strong>ID: </strong>{this.state.id}</h4>
                <h4><strong>Followers: </strong>{this.state.followers}</h4>
                <h4><strong>Account Type: </strong>{this.state.account_type}</h4>
                <h4><a target="_blank" rel="noopener noreferrer" href={this.state.link}>Link</a></h4>
            </div>
        );
    }
}

export default Profile;