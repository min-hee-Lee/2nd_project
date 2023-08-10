/* 지도 검색 전체 감싸고 있는 컴포넌트 */
import React, { useState } from "react";
import MapContainer2 from "./mapContainer2";

import style from "../../css/map/SearchPlace2.module.css";
import SearchIcon from "@material-ui/icons/Search"; //검색 Icon

const SearchPlace2 = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <div className={style.main_inner}>
      <div className={style.searchBox}>
        <form className={style.search} onSubmit={handleSubmit}>
          <div>
            <button type="submit" className={style.btn_search}>
              <SearchIcon style={{ fontSize: "35px" }} />
            </button>
          </div>
          <div>
            <input
              placeholder="Search Place..."
              onChange={onChange}
              value={inputText}
            />
          </div>
        </form>
      </div>
      <MapContainer2 searchPlace={place} />
    </div>
  );
};

export default SearchPlace2;
