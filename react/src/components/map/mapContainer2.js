// MapContainer.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../../reduxs/actions/board_action";
import { useParams } from "react-router-dom";
import MapTableRow from "./mapTable_row";
import MapPageNavigation from "./mapPage_nav";
import MapDetailRow from "./MapDetailRow";

import style from "../../css/map/SearchPlace2.module.css";
import "../../css/map/mapContainer2.css";

const { kakao } = window;
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1, removable: true });

// MapContainer.js

// 마커를 담을 배열입니다
var markers = [];

const MapContainer2 = ({ searchPlace }) => {
  console.log("검색 : " + searchPlace);

  const { currentPage } = useParams();

  const [distance, setDistance] = useState(null);
  const [newduration, setNewDuration] = useState(null);

  const [cheakMarker, setCheakMaeker] = useState(false);

  console.log(cheakMarker);

  const [newDistance, setNewDistance] = useState({
    latitude: "",
    longitude: "",
  });

  //console.log(newDistance);

  const [duration, setduration] = useState(null);

  const [selectRowId, setSelectRowId] = useState(null);

  console.log("selectRowId : " + selectRowId);

  const dispatch = useDispatch();

  const mapList = useSelector((state) => state.board.mapList);

  const pv = useSelector((state) =>
    state.board.pvMap ? state.board.pvMap : { currentPage: 1 }
  );

  console.log(mapList);
  //longitude; x축
  //latitude; y축

  const getMapList = (currentPage, distance) => {
    dispatch(boardActions.getMapList(currentPage, distance));
  };

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  const [userWish, setUserWish] = useState({
    t_id: localStorage.id,
  });

  if (localStorage.getItem("t_id")) {
    setUserWish(localStorage.getItem("t_id"));
  }

  const wishSelectList = useSelector((state) => state.board.wish_Select_List);

  const getWishSelectList = (t_id) => {
    dispatch(boardActions.getWishSelectList(t_id));
  };

  useEffect(() => {
    var markers = [{ text: "텍스트를 표시할 수 있어요!" }];

    console.log("userEffect 호출");

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    //예가 가지고 오나보다.
    //// 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB);

      //여기를 바꾸면됨 axios 로? 위에도 같이?
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          //마커 생성
          for (let i = 0; i < mapList.length; i++) {
            displayMarker(mapList[i]);
            console.log(i + "번째 마커 생성");
          }

          for (let i = 0; i < data.length; i++) {
            // displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
          // 페이지 목록 보여주는 displayPagination() 추가
          //displayPagination(pagination);
          setPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      // 검색결과 목록 하단에 페이지 번호 표시
      // function displayPagination(pagination) {
      //   var paginationEl = document.getElementById('pagination'),
      //     fragment = document.createDocumentFragment(),
      //     i;

      //   // 기존에 추가된 페이지 번호 삭제
      //   while (paginationEl.hasChildNodes()) {
      //     paginationEl.removeChild(paginationEl.lastChild);
      //   }

      //   for (i = 1; i <= pagination.last; i++) {
      //     var el = document.createElement('a');
      //     el.href = '#';
      //     el.innerHTML = i;

      //     if (i === pagination.current) {
      //       el.className = 'on';
      //     } else {
      //       el.onclick = (function (i) {
      //         return function () {
      //           pagination.gotoPage(i);
      //         };
      //       })(i);
      //     }

      //     fragment.appendChild(el);
      //   }
      //   paginationEl.appendChild(fragment);
      // }

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(50, 55), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.latitude, place.longitude),
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(
            `
            <div class="infowindow-wrapper">
            <div class="infowindow" id = "btn_closeOff">
            <img class='infowindow-photo' src="${place.filepath}" alt="${
              place.filename
            }" />
            <div class="infowindow-content">
              <h3>${place.filename}</h3>
              <p>${place.main_address}</p>
              <div><img class='infowindow-star' src='/images/starF.png' /><span> ${
                place.avg_rating
              }</span></div>
              <p>₩ ${Number(place.cost).toLocaleString()}원~ / 🕒${
              place.time_about
            }시간당</p>
            </div>
          </div>
          </div>`
          );

          //document.getElementById('close').style.display='none'

          infowindow.open(map, marker);
          setCheakMaeker(true);
        });
      }

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(searchPlace, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          //longitude; x축
          //latitude; y축

          const distance = { latitude: result[0].y, longitude: result[0].x };

          setNewDistance({
            ...newDistance,
            ["latitude"]: result[0].y,
            ["longitude"]: result[0].x,
          });

          //console.log(distance);

          getMapList(currentPage, distance);

          let lat = result[0].y; // 위도
          let lng = result[0].x; // 경도
          // console.log(lat);
          //console.log(lng);

          // var mapbtn = document.getElementById('map-btn');
          // mapbtn.addEventListener("click", function() {
          //   window.location = "https://map.kakao.com/link/to/"+searchPlace+","+lat+","+lng;
          // })
        }
      });

      var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
      var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
      var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        // 마우스로 클릭한 위치입니다
        var clickPosition = mouseEvent.latLng;

        // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
        if (!drawingFlag) {
          // 상태를 true로, 선이 그리고있는 상태로 변경합니다
          drawingFlag = true;

          // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
          deleteClickLine();

          // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
          deleteDistnce();

          // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
          deleteCircleDot();

          // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
          clickLine = new kakao.maps.Polyline({
            map: map, // 선을 표시할 지도입니다
            path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });

          // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
          moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });

          // 클릭한 지점에 대한 정보를 지도에 표시합니다
          displayCircleDot(clickPosition, 0);
        } else {
          // 선이 그려지고 있는 상태이면

          // 그려지고 있는 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 좌표 배열에 클릭한 위치를 추가합니다
          path.push(clickPosition);

          // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
          clickLine.setPath(path);

          var distance = Math.round(clickLine.getLength());
          displayCircleDot(clickPosition, distance);
        }
      });

      // 지도에 마우스무브 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
      kakao.maps.event.addListener(map, "mousemove", function (mouseEvent) {
        // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
        if (drawingFlag) {
          // 마우스 커서의 현재 위치를 얻어옵니다
          var mousePosition = mouseEvent.latLng;

          // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
          var movepath = [path[path.length - 1], mousePosition];
          moveLine.setPath(movepath);
          moveLine.setMap(map);

          var distance = Math.round(
              clickLine.getLength() + moveLine.getLength()
            ), // 선의 총 거리를 계산합니다
            content =
              '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
              distance +
              "</span>m</div>"; // 커스텀오버레이에 추가될 내용입니다

          // 거리정보를 지도에 표시합니다
          showDistance(content, mousePosition);
        }
      });

      // 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
      kakao.maps.event.addListener(map, "rightclick", function (mouseEvent) {
        // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
        if (drawingFlag) {
          // 마우스무브로 그려진 선은 지도에서 제거합니다
          moveLine.setMap(null);
          moveLine = null;

          // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 선을 구성하는 좌표의 개수가 2개 이상이면
          if (path.length > 1) {
            // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
            if (dots[dots.length - 1].distance) {
              dots[dots.length - 1].distance.setMap(null);
              dots[dots.length - 1].distance = null;
            }

            var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
              content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

            // 그려진 선의 거리정보를 지도에 표시합니다
            showDistance(content, path[path.length - 1]);
          } else {
            // 선을 구성하는 좌표의 개수가 1개 이하이면
            // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
            deleteClickLine();
            deleteCircleDot();
            deleteDistnce();
          }

          // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
          drawingFlag = false;
        }
      });

      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      function deleteClickLine() {
        if (clickLine) {
          clickLine.setMap(null);
          clickLine = null;
        }
      }

      // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
      // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
      function showDistance(content, position) {
        if (distanceOverlay) {
          // 커스텀오버레이가 생성된 상태이면

          // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
          distanceOverlay.setPosition(position);
          distanceOverlay.setContent(content);
        } else {
          // 커스텀 오버레이가 생성되지 않은 상태이면

          // 커스텀 오버레이를 생성하고 지도에 표시합니다
          distanceOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: content, // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3,
          });
        }
      }

      // 그려지고 있는 선의 총거리 정보와
      // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
      function deleteDistnce() {
        if (distanceOverlay) {
          distanceOverlay.setMap(null);
          distanceOverlay = null;
        }
      }

      // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
      function displayCircleDot(position, distance) {
        // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
        var circleOverlay = new kakao.maps.CustomOverlay({
          content: '<span class="dot"></span>',
          position: position,
          zIndex: 1,
        });

        // 지도에 표시합니다
        circleOverlay.setMap(map);

        if (distance > 0) {
          // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
          var distanceOverlay = new kakao.maps.CustomOverlay({
            content:
              '<div class="dotOverlay">거리 <span class="number">' +
              distance +
              "</span>m</div>",
            position: position,
            yAnchor: 1,
            zIndex: 2,
          });

          // 지도에 표시합니다
          distanceOverlay.setMap(map);
        }

        // 배열에 추가합니다
        dots.push({ circle: circleOverlay, distance: distanceOverlay });
      }

      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
      function deleteCircleDot() {
        var i;

        for (i = 0; i < dots.length; i++) {
          if (dots[i].circle) {
            dots[i].circle.setMap(null);
          }

          if (dots[i].distance) {
            dots[i].distance.setMap(null);
          }
        }

        dots = [];
      }

      // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
      // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
      // HTML Content를 만들어 리턴하는 함수입니다
      function getTimeHTML(distance) {
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        var walkkTime = (distance / 67) | 0;
        var walkHour = "",
          walkMin = "";

        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (walkkTime > 60) {
          walkHour =
            '<span class="number">' +
            Math.floor(walkkTime / 60) +
            "</span>시간 ";
        }
        walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

        // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
        var bycicleTime = (distance / 227) | 0;
        var bycicleHour = "",
          bycicleMin = "";

        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
        if (bycicleTime > 60) {
          bycicleHour =
            '<span class="number">' +
            Math.floor(bycicleTime / 60) +
            "</span>시간 ";
        }
        bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

        // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
        var content = '<ul class="dotOverlay distanceInfo">';
        content += "    <li>";
        content +=
          '        <span class="label">총거리 : </span><span class="number">' +
          distance +
          "</span>m";
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">도보 : </span>' + walkHour + walkMin;
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">자전거 : </span>' +
          bycicleHour +
          bycicleMin;
        content += "    </li>";
        content += "</ul>";

        return content;
      }
    }
    getWishSelectList(userWish);
  }, [searchPlace]);

  return (
    <>
      <div className={style.box}>
        {/* 지도  */}
        <div id="myMap" className={style.map}></div>
        {/* 지도 검색시 목록리스트 */}
        <div id="result-list" className={style.listAll}>
          <div className={style.listGroup}>
            {mapList ? (
              mapList.map((mapList) => (
                <MapTableRow
                  board={mapList}
                  key={mapList.rm}
                  isSelected={selectRowId === mapList.rm} // 선택된 row인지 여부를 전달
                  onSelect={() => setSelectRowId(mapList.rm)} // row를 선택할 때 실행되는 함수
                ></MapTableRow>
              ))
            ) : (
              <div colSpan="4" className="text-center">
                잠시만 기다려 주세요...
              </div>
            )}
          </div>
          <>
            {pv ? (
              <MapPageNavigation
                getMapList={getMapList}
                newDistance={newDistance}
              />
            ) : (
              ""
            )}
          </>
        </div>
      </div>

      <div className={style.box}>
        {selectRowId && (
          <MapDetailRow
            key={selectRowId}
            item={mapList.find((mapList) => mapList.rm === selectRowId)} // 선택된 row의 데이터를 전달
            newDistance={newDistance}
            searchPlace={searchPlace}
            wishSelectList={wishSelectList}
            onClose={() => setSelectRowId(null)} //닫기 버튼을 누를 때 실행되는 함수
          ></MapDetailRow>
        )}
      </div>
    </>
  );
};

export default MapContainer2;
