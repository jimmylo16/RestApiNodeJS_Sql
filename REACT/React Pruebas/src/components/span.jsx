import React, { Component, Fragment } from 'react';
import IconSearch from './SVGIcons/IconSearch';

class aber extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: ''
		};
	}
	render() {
		return (
			<Fragment>
				<span className="iconSearch" > 
							<IconSearch />
				</span>
			</Fragment>
		);
	}
}

export default aber;
