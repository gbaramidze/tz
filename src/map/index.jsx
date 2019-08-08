import React from 'react'
import './style.css';

class map extends React.Component {

    centerMarker = () => {
        if(this.leafletMap && this.leafletMap.viewport) {
            this.props.onUpdate(this.leafletMap.viewport.center,this.leafletMap.viewport.zoom)
        }
    };

    render() {
        const { pos, zoom } = this.props;

        if (process.browser) {
            const {Map,  TileLayer} = require('react-leaflet');
            return (
                <div>
                    <Map ref={m => { this.leafletMap = m; }} center={pos} zoom={zoom} className='map' animate={true} onMoveEnd={this.centerMarker}>
                        <TileLayer
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {this.props.children? this.props.children : null}
                    </Map>
                </div>
            );
        }
        else {
            return null
        }
    }
}

export default map
