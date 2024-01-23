import "./App.css";
import { useState, useEffect } from "react";

// components

function App() {
  const [countries, setCountries] = useState([]);
  const [word, setWord] = useState("");
  const [dataFilter] = useState(["name.common", "capital"]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const searchCountries = () => {

    return countries.filter((item) => {
      const commonName = item.name?.common ||  "";
      const capital = item.capital?.[0] || ""; // capital is an array, take the first element if available
      const valuesToSearch = [commonName, capital];
  
      return valuesToSearch.some((value) => {
        if (value !== undefined && value !== null) {
          return String(value).toLowerCase().includes(word.toLowerCase());
        }
        return false;
      });
    });
  };

  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหาประเทศหรือเมืองหลวง "
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries().map((item, index) => {
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
                      <li>
                        ภูมิภาค : <span>{item.region}</span>
                      </li>
                      <li>
                        เมืองหลวง : <span>{item.capital}</span>
                      </li>
                      <li>
                        ประชากร : <span>{formatNumber(item.population)}</span> คน
                      </li>
                      <li>
                        พื้นที่ : <span>{item.area}</span>
                      </li>
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
