import { useState, useRef, useEffect } from "react";

import style from "../../css/home/Banner.module.css";

//banner 이미지
import badminton from "../../img/home/badminton.jpg";
import basketball from "../../img/home/basketball.jpg";
import boxing from "../../img/home/boxing.jpg";
import swimming from "../../img/home/swimming.jpg";
import table_tennis from "../../img/home/table_tennis.jpg";
import tennis from "../../img/home/tennis.jpg";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"; //이전 icon
import NavigateNextIcon from "@material-ui/icons/NavigateNext"; //다음 icon

const Banner = () => {
  const [slideIndex, setSlideIndex] = useState(0); //슬라이드 인덱스 1 2 3 4 5 6
  const imgs = useRef(); // imgs 변수는 ref 속성을 가진 div 요소 (이미지요소) 를 참조
  const [imgCount, setImgCount] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true); //자동슬라이드 autoSlide 여부 state

  const handlePrevClick = () => {
    setAutoSlide(false); // 자동 슬라이드 멈춤
    const newIndex = slideIndex - 1 < 0 ? imgCount - 1 : slideIndex - 1;
    setSlideIndex(newIndex);
    imgs.current.style.marginLeft = `${-newIndex * 1900}px`;

    if (newIndex === imgCount - 1) {
      setTimeout(() => {
        setSlideIndex(0);
        imgs.current.style.marginLeft = "0px";
      }, 300);
    }

    //5초 후 자동 슬라이드 시작
    setTimeout(() => {
      setAutoSlide(true);
    }, 3000);
  };

  const handleNextClick = () => {
    setAutoSlide(false); // 자동 슬라이드 멈춤
    const newIndex = slideIndex + 1 > imgCount - 1 ? 0 : slideIndex + 1;
    setSlideIndex(newIndex);
    imgs.current.style.marginLeft = `${-newIndex * 1900}px`;

    if (newIndex === imgCount - 1) {
      setTimeout(() => {
        setSlideIndex(imgCount - 1);
        imgs.current.style.marginLeft = `${-(imgCount - 1) * 1900}px`;
      }, 300);
    }

    //5초 후 자동 슬라이드 시작
    setTimeout(() => {
      setAutoSlide(true);
    }, 1500);
  };

  useEffect(() => {
    // console.log("useEffect");
    // console.log(imgCount);
    setImgCount(Array.from(imgs.current.children).length);

    /* setInterval()함수를 사용하여 handleNextClick함수를 3초마다 호출하도록 설정
       useEffect hook에서 반환하는 함수를 이용하여
       컴포넌트가 unmount(사라질때) setInterval()함수를 해제하도록 설정 */
    const interval =
      autoSlide &&
      setInterval(() => {
        //console.log("banner index: ", slideIndex);
        handleNextClick();
      }, 1500);

    //autoSlide값이 변경될 때마다 interval 해제 및 설정
    return () => {
      clearInterval(interval);
    };
  }, [slideIndex, autoSlide]);

  //   const handleAutoSlide = () => {
  //     setAutoSlide((prev) => !prev);
  //   };

  return (
    <>
      <div className={style.banner_inner} ref={imgs}>
        <div className="banner_img">
          <img className={style.banner_img} src={badminton} />
        </div>
        <div className="banner_img">
          <img className={style.banner_img} src={basketball} />
        </div>
        <div className="banner_img">
          <img className={style.banner_img} src={boxing} />
        </div>
        <div className="banner_img">
          <img className={style.banner_img} src={swimming} />
        </div>
        <div className="banner_img">
          <img className={style.banner_img} src={table_tennis} />
        </div>
        <div className="banner_img">
          <img className={style.banner_img} src={tennis} />
        </div>
      </div>
      <div className={style.banner_btn}>
        <button
          className={style.prev_btn}
          onClick={() => {
            handlePrevClick();
            setAutoSlide(false);
          }}
        >
          <NavigateBeforeIcon style={{ fontSize: 65, textAlign: "left" }} />
        </button>
        <button
          className={style.next_btn}
          onClick={() => {
            handleNextClick();
            setAutoSlide(false);
          }}
        >
          <NavigateNextIcon style={{ fontSize: 65 }} />
        </button>
      </div>
    </>
  );
};

export default Banner;
