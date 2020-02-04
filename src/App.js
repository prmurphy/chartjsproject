import React from 'react';


import BarExample from '/home/patrick/Desktop/chart/src/components/bar.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };
	}
	
	callAPI() {
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState({ apiResponse: res }));
	}
	
	componentDidMount() {
		this.callAPI();
	}
	render() {
		return (
			<div>
				<p className="App-intro">;{this.state.apiResponse}</p>
				<BarExample />
				<hr />
				
			</div>
		);
	}
}