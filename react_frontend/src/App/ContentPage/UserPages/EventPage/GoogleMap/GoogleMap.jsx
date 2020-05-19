import Breakpoint from "react-socks";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import React from "react";
import {GoogleMapsAPIKey} from "../../../../../secrets";


class GoogleMap extends React.Component {
	render() {

		return (
			<React.Fragment>
				<Breakpoint small down>
					<Map google={this.props.google}
					     zoom={5}
					     initialCenter={{lat: 54.836947, lng: 9.525610}}
					     style={{width: '90vw', height: '75vh', borderRadius: 'inherit'}}>
						<Marker/>
					</Map>
				</Breakpoint>
				<Breakpoint medium up>
					<Map google={this.props.google}
					     zoom={5}
					     initialCenter={{lat: 54.836947, lng: 9.525610}}
					     style={{width: '60vw', height: '30vw', borderRadius: 'inherit'}}>
						<Marker/>
					</Map>
				</Breakpoint>
			</React.Fragment>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: (GoogleMapsAPIKey)
})(GoogleMap);