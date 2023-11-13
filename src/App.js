import "./App.css";
import { heur } from "./heur";
import loadimg from "./load.gif"
import { fetchWeather } from "./meteo";
import { useState } from "react";

function App() {
  const [ville, setVille] = useState("");
  const [error, setError] = useState(null);
  const [datas, setData] = useState(null);
  const [isloading,setLoad]=useState(false)

  const getVille = (e) => {
    e.preventDefault();
    setData(null)
    if (ville.trim() !== "") {
      setLoad(true)
      fetchWeather(ville)
        .then((data) => {
          setData(data);
          console.log(data);
          setLoad(false)
        })
        .catch((e) => {
          console.log(e);
          setData(null)
          setLoad(false)
          setError(e);
        });
      setVille("");
    }
  };

  const onch = (e) => {
    setVille(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="header">Meteo</h1>

      <form action="" onSubmit={getVille} className="getville">
        <input
          type="text"
          name="ville"
          id=""
          value={ville}
          onChange={onch}
          placeholder="Search  ..."
        />
      </form>

      {isloading ? <img src={loadimg} className="load"/>:""}
      
      {datas !== null ? (
        <div className="datas">
          <div className="donnee">
            <p className="name">{datas.name} ( {datas.sys.country} )</p>
            <img
              className="img-weather"
              srcSet={`https://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`}
              alt=""
            />
            <p>{datas.weather[0].description}</p>
            <p className="temp">{datas.main.temp.toFixed(1)}<sup>&deg;c</sup></p>
            <p className="temp min-max">{datas.main.temp_min.toFixed(1)}<sup>&deg;c</sup> (min)/ {datas.main.temp_max.toFixed(1)}<sup>&deg;c</sup> (max)</p>
            <p>Lever du soleil : {heur(datas.sys.sunrise)}</p>
            <p>Coucher du soleil : {heur(datas.sys.sunset)}</p>
          </div>
          <fieldset className="field">
            <legend>Weather</legend>
            <p>Description : {datas.weather[0].description}</p>
            {/* <p>sky : {datas.weather[0].main}</p> */}
            <fieldset className="field">
              <legend>Coordonnees</legend>
              <p>Lat : {datas.coord.lat}</p>
              <p>Lon : {datas.coord.lon}</p>
            </fieldset>
             <fieldset className="field">
              <legend>Vent</legend>
              <p>Vitesse : {datas.wind.speed} m/s</p>
              
            </fieldset>
          </fieldset>
        </div>
      ) : (
        <div   >
          {error ? <div className="error">
          <p>"Verifier l'orthographe du nom de la ville ou du pays."</p>
          <p>{error.response.data.message}</p>
          
          </div>: ""}
        </div>
      )}
      {/* <div>
        <h2>Senegal</h2>
        <div className="dst">23&deg;C</div>
        <img className="sen" src={sen} alt="no jpg"  />
      </div> */}
    </div>
  );
}

export default App;
