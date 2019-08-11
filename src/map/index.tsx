import React, {ReactNode} from 'react';
import './style.css';

interface MapProps {
    onUpdate(pos: string, zoom: string): void;
    pos: string[];
    zoom: string;
}

class CustomMap extends React.Component<MapProps> {
    public leafletMap;

    private centerMarker = (): void => {
        if (this.leafletMap && this.leafletMap.viewport) {
            this.props.onUpdate(this.leafletMap.viewport.center, this.leafletMap.viewport.zoom);
        }
    };

    public render(): ReactNode {
        const { pos, zoom } = this.props;
        if (process.browser) {
            // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
            const {Map, TileLayer} = require('react-leaflet');
            return (
                <div>
                    <Map ref={(m): void => { this.leafletMap = m; }} center={pos} zoom={zoom} className="map" animate={true} onMoveEnd={this.centerMarker}>
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {this.props.children || null}
                    </Map>
                </div>
            );
        }

        return null;

    }
}

export default CustomMap;
