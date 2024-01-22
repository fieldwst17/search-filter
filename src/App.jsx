import "./App.css";
import { useState, useEffect } from "react";

// components

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  return (
    <div className="container">
      <ul className="row">
        {countries.map((item, index) => {
          return (
            <li key={index}>

              {/* Card */}
              <div className="card">
                <div className="card-title">
                  <img src={item.flags.svg} alt={item.flags.alt} />
                </div>
                <div className="card-body">
                  <div className="card-desc">
                    <h2>{item.name.common}</h2>
                    <ol className="card-list">
                      <li>ภูมิภาค : <span>{item.region}</span></li>
                      <li>เมืองหลวง : <span>{item.capital}</span></li>
                      <li>ประชากร : <span>{item.population}</span></li>
                      <li>พื้นที่ : <span>{item.area}</span></li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* Card End */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
