import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'YOUR GOOGLE YOUTUBE API KEY';


// create a new componnent, this component should produce HTML
class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch("react with redux");
		
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (data) =>{
			this.setState({videos: data,
			selectedVideo: data[0]
			});
		});
	}

	render () {	
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return (
		<div>
			<SearchBar onSearchTermChange={videoSearch}/>
			<VideoDetail video = {this.state.selectedVideo}/>
			<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} 
			/>
		</div> 
		);
	}
}

//take this components html generated and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
