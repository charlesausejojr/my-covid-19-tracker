import { Circle, Popup } from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';
import L from 'leaflet';

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);

};
export const changeLocation  = ({center,zoom}) => {
    var map = L.map('map');
    map.setView(center, zoom);
    return null;
}

const casesTypeColors = {
    cases: {
      multiplier: 800,
      option: { color:"#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
      multiplier: 1200,
      option: { color:"#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
      multiplier: 2000,
      option: { color:"#ff6c47", fillColor: "#ff6c47" }
    },
  };
  
export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle
        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={casesTypeColors[casesType].option}
        >
            <Popup className="country__popup">
                <div className="country__container">
                    <div
                    className="country__flag"
                    style={{backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className="country__name"><strong>{country.country}</strong></div>
                    <div className="country__casesType">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="country__casesType">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="country__casesType">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);