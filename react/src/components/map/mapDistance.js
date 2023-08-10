import axios from "axios";
import { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../reduxs/actions/board_action";

import style from "../../css/map/SearchPlace2.module.css";
import WalkIcon from "@material-ui/icons/DirectionsWalk";
import CarIcon from "@material-ui/icons/DriveEta";
import BusIcon from "@material-ui/icons/DirectionsBus";
import TrainIcon from "@material-ui/icons/Train";
import BusTimeIcon from "@material-ui/icons/DepartureBoard";
import BusStationIcon from "@material-ui/icons/Flag";

const MapDistance = ({ item, newDistance, searchPlace }) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const [train, setTrain] = useState([]);

  //console.log(train);

  //console.log(item);
  const dispatch = useDispatch();

  const mapBusList = useSelector((state) => state.board.mapBusList);

  const getMapBusList = (latitude, longitude) => {
    dispatch(boardActions.getMapBusList(latitude, longitude));
  };

  console.log(mapBusList);

  // console.log(distance);
  // console.log(duration);

  const trainIoop = [];
  for (let i = 0; i < 3; i++) {
    trainIoop.push(i);
  }

  const [start, setStart] = useState({
    longitude: newDistance["longitude"],
    latitude: newDistance["latitude"],
  });
  const [end, setEnd] = useState({
    longitude: item.longitude,
    latitude: item.latitude,
  });

  const [carDistance, setCarDistance] = useState({
    distance: "",
    duration: "",
    taxi: "",
    toll: "",
  });

  console.log(carDistance);

  const dateString = "20150717042000";
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const second = dateString.substring(12, 14);

  //longitude; x축
  //latitude; y축

  useEffect(() => {
    const getDirections = async () => {
      const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${newDistance["longitude"]},${newDistance["latitude"]}&destination=${item.longitude},${item.latitude}&waypoints=&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

      const headers = {
        Authorization: "KakaoAK 855727f66b44ec7b7a1e16636be2779e",
      };
      const response = await axios.get(url, { headers });

      if (response.data.routes[0]?.summary?.distance !== null) {
        setCarDistance({
          distance: response.data.routes[0]?.summary?.distance,
          duration: response.data.routes[0]?.summary?.duration,
          taxi: response.data.routes[0]?.summary?.fare.taxi,
          toll: response.data.routes[0]?.summary?.fare.toll,
        });
      }

      //  console.log(response.data.routes[0].summary.distance); //자동차 거리(미터) 전체 검색 결과 거리(미터)
      //  console.log(response.data.routes[0].summary.duration); //  목적지까지 소요 시간(초)
      //  console.log(response.data.routes[0].summary.fare.taxi); //택시요금(원)
      //  console.log(response.data.routes[0].summary.fare.toll); // 통행요금(원)

      //curl -v -X GET  \
      // -H "Authorization: KakaoAK ${REST_API_KEY}" // 카카오디벨로퍼스에서 발급 받은 API 키 값

      const response3 = await axios.get(
        //"https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=PM9&radius=20000" \

        // `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=SW8&y=${item.latitude}&x=${item.longitude}&radius=500`,

        `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=SW8&y=${item.latitude}&x=${item.longitude}&radius=2000`,

        {
          headers: {
            Authorization: "KakaoAK 855727f66b44ec7b7a1e16636be2779e",
          },
        }
      );

      getMapBusList(item.latitude, item.longitude);
      // console.log(response3);
      // console.log(response3.data);
      // console.log(response3.data.documents);
      // console.log(response3.data.documents[0]['distance']);
      // console.log(response3.data.documents[0]['place_name']);

      // console.log(response3.data.documents);

      setTrain(response3.data.documents);

      //
      // JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu+sieUZdvJ59oh+xsm0on5zfJEHdejQ==

      // const response4 = await axios.get(
      //   `/api/rest/stationinfo/getStationByPos?serviceKey=JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D&tmX=126.995852&tmY=37.483637&radius=100`
      // );

      // const queryParams = `?serviceKey=${encodeURIComponent(
      //   'JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D'
      // )}&tmX=${encodeURIComponent('126.995852')}&tmY=${encodeURIComponent(
      //   '37.483637'
      // )}&radius=${encodeURIComponent('100')}`;

      // const response4 = await axios.get(
      //   `/api/rest/stationinfo/getStationByPos${queryParams}`
      // );

      // const axiosInstance = axios.create({
      //   baseURL: 'http://ws.bus.go.kr/api',
      // });

      // const response4 = await axios.get(
      //   '/api/rest/stationinfo/getStationByPos',
      //   {
      //     params: {
      //       serviceKey:
      //         'JOj477Pjm59a1ozBHNYRG58lyxtNeju8B31Pr3BkDoug4EANQsWN60Vu%2BsieUZdvJ59oh%2Bxsm0on5zfJEHdejQ%3D%3D',
      //       tmX: 126.995852,
      //       tmY: 37.483637,
      //       radius: 100,
      //     },
      //   }
      // );
    };

    getDirections();
  }, [start, end, searchPlace]);

  return (
    <>
      <div className={style.go}>
        <h4>
          출발지 : <span>{searchPlace}</span>
        </h4>
        <h4>
          도착지 :{" "}
          <span>
            {item.filename} ({item.main_address})
          </span>
        </h4>
      </div>

      {/* 가는 방법 (자동차, 지하철, 버스) */}
      <div style={{ display: "flex" }}>
        <div className={style.item}>
          <div className={style.how}>
            <CarIcon style={{ fontSize: "50px", color: "red" }} />
            <span>자동차</span>
          </div>
          {carDistance && carDistance && (
            <div className={style.try}>
              <p>주행 거리 : {carDistance["distance"]}m</p>
              <p>소요 시간 : {carDistance["duration"]}초</p>
              <p>
                택시 요금 : {Number(carDistance["taxi"]).toLocaleString()}원
              </p>
              <p>
                통행 요금 : {Number(carDistance["toll"]).toLocaleString()}원
              </p>
            </div>
          )}
        </div>

        <div className={style.item}>
          <div className={style.how}>
            <TrainIcon style={{ fontSize: "50px", color: "green" }} />
            <span>지하철 (도착지 기준)</span>
          </div>
          {train
            ? train.slice(0, 2).map((num, idx) => (
                <div key={idx} className={`${style.try} ${style.subway}`}>
                  <div>{num.place_name}</div>
                  <div style={{ color: "gray" }}>{num.distance}m</div>
                </div>
              ))
            : null}
        </div>

        <div className={style.item}>
          <div className={style.how}>
            <BusIcon style={{ fontSize: "50px", color: "blue" }} />
            <span>버스 (정류장)</span>
          </div>

          {mapBusList
            ? mapBusList.map((num, idx) => (
                <div key={idx} className={`${style.try} ${style.bus}`}>
                  <p>
                    <BusStationIcon /> {num.stationNm}
                  </p>
                  <p>버스 : {num.busRouteNm}</p>
                  {/* <p>{num.firstBusTm} 첫차 / 거리</p>
                  <p>{num.lastBusTm} 막차 / 거리</p> */}
                  <p>
                    첫차 : {num.firstBusTm.slice(8, 10)}시{" "}
                    {num.firstBusTm.slice(10, 12)}분
                  </p>
                  <p>
                    막차 :{num.lastBusTm.slice(8, 10)}시{" "}
                    {num.lastBusTm.slice(10, 12)}분
                  </p>
                  <p>거리 : {num.dist}m</p>
                  <p>기점 : {num.stBegin}</p>
                  <p>종점 : {num.stEnd}</p>
                  <p>
                    <BusTimeIcon />
                    배차간격 : {num.term}분
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default MapDistance;
