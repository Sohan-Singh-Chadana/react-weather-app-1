import { useContext, useEffect, useState } from "react";
import { searchPlaces } from "../api";
import "../styles/components/Search.scss";
import WeatherContext from "../context/weather.context";

function Search() {
  const { setPlace } = useContext(WeatherContext);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  useEffect(() => {
    if (debouncedText.trim() === "") {
      setSearchResults([]);
      setOpenSearchResults(false);
      return;
    }

    async function fetchSearchResults() {
      const data = await searchPlaces(debouncedText);
      setSearchResults(data);
      setOpenSearchResults(data.length);
    }

    fetchSearchResults();
  }, [debouncedText]);

  // async function onSearch(e) {
  //   setText(e.target.value);
  //   const data = await searchPlaces(e.target.value);
  //   setSearchResults(data);
  //   setOpenSearchResults(data.length);
  // }

  const changePlace = (place) => {
    setPlace(place);
    setText("");
    setOpenSearchResults(false);
  };

  return (
    <>
      <div className="search-container">
        <div className="search-icon">
          <i className="bi bi-search"></i>
        </div>
        <div className="search-input">
          <input
            type="text"
            name="search-city"
            placeholder="Search city ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {openSearchResults && (
          <div className="search-results">
            <div className="results-container">
              {searchResults.map((place) => (
                <div
                  className="result"
                  key={place.place_id}
                  onClick={() => changePlace(place)}
                >
                  {place.name}, {place.adm_area1} , {place.country}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
