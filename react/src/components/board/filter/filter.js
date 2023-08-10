import { useState } from "react";
import { regions } from "./FilterData";
import { categories } from "./FilterData";
import { etcs } from "./FilterData";

import style from "../../../css/board/Filter.module.css";
import DownIcon from "@material-ui/icons/ArrowDropDown";

const Filter = ({
  currentPage,
  setCheck,
  setFilterList,
  getFilterList,
  setcheckItemSuper,
}) => {
  const [regionAcd, setRegionAcd] = useState(false); // 지역 필터
  const [categoryAcd, setCategoryAcd] = useState(false); // 종목 필터
  const [etcAcd, setEtcAcd] = useState(false); //추가 필터

  const [checkItems, setCheckItems] = useState([]); //체크한 필터 담을 배열

  //체크박스 단일 선택
  const singleCheck = (checked, item) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems([...checkItems, item]);
      console.log(item);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== item));
    }
  };

  const allCheck = (checked, type) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];

      switch (type) {
        case "regions":
          regions.forEach((el) => idArray.push(el.data));
          break;
        case "categories":
          categories.forEach((el) => idArray.push(el.data));
          break;
        case "etcs":
          etcs.forEach((el) => idArray.push(el.data));
          break;
      }
      setCheckItems(idArray);
      console.log(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const filterOkClick = async () => {
    console.log("저장클릭");

    console.log(checkItems);

    setCheck(true);

    setcheckItemSuper(checkItems);

    getFilterList(1, checkItems);

    // await axios
    //   .post(`${baseUrl}/board/filter/${currentPage}`, checkItems)
    //   .then((response) => {
    //     console.log(response.data);
    //     // setFilterList(response.data);
    //   })
    //   .catch((err) => console.error(err.message));

    setCheckItems([]); //저장클릭시 빈 배열로 상태 업데이트

    //저장 클릭시 필터창 닫기
    setRegionAcd(false);
    setCategoryAcd(false);
    setEtcAcd(false);
  };

  //지역 버튼 클릭시
  const regionClick = () => {
    setCategoryAcd(false);
    setEtcAcd(false);
    setRegionAcd(!regionAcd);
  };
  //종목 버튼 클릭시
  const categoryClick = () => {
    setRegionAcd(false);
    setEtcAcd(false);
    setCategoryAcd(!categoryAcd);
  };
  //추가필터 버튼 클릭시
  const etcClick = () => {
    setRegionAcd(false);
    setCategoryAcd(false);
    setEtcAcd(!etcAcd);
  };

  return (
    <>
      <div className={style.filter_wrap}>
        <ul>
          <li>
            <div className={style.filter_btn}>
              <button className="btn_lively" onClick={regionClick}>
                <DownIcon fontSize="large" />
                <span>지역</span>
              </button>
            </div>
          </li>
          <li>
            <div className={style.filter_btn}>
              <button className="btn_lively" onClick={categoryClick}>
                <DownIcon fontSize="large" />
                <span>종목</span>
              </button>
            </div>
          </li>
          <li>
            <div className={style.filter_btn}>
              <button className="btn_lively" onClick={etcClick}>
                <DownIcon fontSize="large" />
                <span>추가필터</span>
              </button>
            </div>
          </li>
        </ul>
      </div>

      {/* filter 지역 버튼 클릭시 나타나는 선택화면 */}
      {regionAcd && (
        <div className={style.filterBox}>
          <div className={style.filterAll}>
            <label>
              <input
                type="checkbox"
                name="region-all"
                value="region-all"
                onChange={(e) => allCheck(e.target.checked, "regions")}
                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                checked={checkItems.length === regions.length ? true : false}
              />
              <span>전체</span>
            </label>
          </div>

          {regions.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                name={`region-${item.id}`}
                value={item.data}
                onChange={(e) => singleCheck(e.target.checked, e.target.value)}
                checked={checkItems.includes(item.data) ? true : false}
              />
              <span>{item.data}</span>
            </label>
          ))}

          <div className={style.filterOk}>
            <button className="btn_lively" onClick={filterOkClick}>
              저장
            </button>
          </div>
        </div>
      )}

      {/* filter 종목 버튼 클릭시 나타나는 선택화면 */}
      {categoryAcd && (
        <div className={style.filterBox}>
          <div className={style.filterAll}>
            <label>
              <input
                type="checkbox"
                name="category-all"
                value="category-all"
                onChange={(e) => allCheck(e.target.checked, "categories")}
                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                checked={checkItems.length === categories.length ? true : false}
              />
              <span>전체</span>
            </label>
          </div>
          {categories.map((item) => (
            <label key={item.id}>
              <input
                type="checkbox"
                name={`category-${item.id}`}
                value={item.data}
                onChange={(e) => singleCheck(e.target.checked, e.target.value)}
                checked={checkItems.includes(item.data) ? true : false}
              />
              <span>{item.data}</span>
            </label>
          ))}
          <div className={style.filterOk}>
            <button className="btn_lively" onClick={filterOkClick}>
              저장
            </button>
          </div>
        </div>
      )}

      {/* filter 추가필터 버튼 클릭시 나타나는 선택화면 */}
      {etcAcd && (
        <div className={style.filterBox}>
          <div className={style.filterAll}>
            <label>
              <input
                type="checkbox"
                name="etcs-all"
                value="etcs-all"
                onChange={(e) => allCheck(e.target.checked, "etcs")}
                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                checked={checkItems.length === etcs.length ? true : false}
              />
              <span>전체</span>
            </label>
          </div>
          <div>
            {etcs.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  name={`etc-${item.id}`}
                  value={item.data}
                  onChange={(e) =>
                    singleCheck(e.target.checked, e.target.value)
                  }
                  checked={checkItems.includes(item.data) ? true : false}
                />
                <span>{item.data}</span>
              </label>
            ))}
          </div>
          <div className={style.filterOk}>
            <button className="btn_lively" onClick={filterOkClick}>
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
