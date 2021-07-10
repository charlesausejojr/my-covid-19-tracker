import React, {useState,useEffect} from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { Button, ButtonGroup, Card, CardContent, FormControl, IconButton, MenuItem, Select } from '@material-ui/core';
import InfoBox from "./InfoBox";
import LeafletMap from "./LeafletMap";
import Table from "./Table";
import {sortData} from "./helper";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Sidebar from './Sidebar';
import Login from "./Login";
import {auth} from "./firebase";
import {useSelector,useDispatch} from 'react-redux';
import { selectUser, login, logout} from './features/userSlice';
import { ExitToApp } from '@material-ui/icons';

function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('Global');
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [caseType,setCaseType] = useState("cases");
  const [mapCenter,setMapCenter] = useState([34.80746, -40.4796 ]);
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
 
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
          dispatch(login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else{
        dispatch(logout());
      }
    });
  }, [dispatch]);



  //for first load
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  },[]);

  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=> {

        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
      ));

      const sortedData = sortData(data);
      setTableData(sortedData);
      setMapCountries(data);
      setCountries(countries);

      })
    };
    getCountriesData();
  },[]);

  const selectedCountry = async (e) => {
    
      const countryCode = e.target.value;
    
      const url = countryCode === 'Global'? 
      'https://disease.sh/v3/covid-19/all': //for first selection
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      
      
      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);

          if (data.countryInfo) {
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(4);
          } else {
            setMapCenter([34.80746, -40.4796]);
            setMapZoom(3);
          }
        });
    };

    console.log(countryInfo);
    console.log(mapCenter);
    console.log(caseType);

    const getCaseType = (e) => {
      e.preventDefault();
      setCaseType(e.currentTarget.value);
    }

  return (
    <div className="app">
    {user ? ( <>
      <Card className="app__left">
      <CardContent>
        <h3>Cases by Country</h3>
        <Table countries={tableData}/>
        <h3>Live Global Report</h3>
        <div className="app__buttons">
                <ButtonGroup size="small" aria-label="small outlined button group">
                      <Button value="cases" onClick={getCaseType}>Cases</Button>
                      <Button value='recovered' onClick={getCaseType}>Recoveries</Button>
                      <Button value='deaths' onClick={getCaseType}>Deaths</Button>
                </ButtonGroup>
        </div>
        <LineGraph casesType={caseType}/>
      </CardContent>
    </Card>
    <div className="app__center">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={selectedCountry}
            >
            <MenuItem value="Global">Global</MenuItem>
              {
                  countries.map(country => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
              }

            </Select>
          </FormControl>
        </div>


      <div className="app__statistics">
              <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
              <InfoBox title="Recoveries" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
              <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <LeafletMap 
        center={mapCenter} 
        zoom={mapZoom}
        countries={mapCountries}
        casesType={caseType}
        />
    </div>

    <Card className="app__right">
              <div className="app__rightInfo">
                  <h3>ChatBox</h3>
                  <IconButton>
                    <ExitToApp onClick = {() => auth.signOut()}/>
                  </IconButton>
              </div>
            
            <Sidebar/>
    </Card>
    </>) : <Login/>}
 

    
    </div>
  );
}

export default App;
