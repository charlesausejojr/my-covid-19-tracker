import React from 'react';
import "./LeafletMap.css";
import { MapContainer, TileLayer} from 'react-leaflet';
import {showDataOnMap} from './helper';

function LeafletMap({center, zoom, countries, casesType}) {
    
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    );
}

export default LeafletMap
