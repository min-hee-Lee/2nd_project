// /**
//  * FsLightBoxEx
//  * 어떤 요소(img, button, a 등)을 클릭했을 때
//  * 저장된 이미지, 영상 등을 모달 팝업으로 표시하는 기능
//  *
//  *  http://fslightbox.com/
//  *
//  * npm install fslightbox-react
//  * yarn add fslightbox-react
//  */

// import React, { memo, useRef, useState } from "react";
// import style from "../../css/board/FsLightBox.module.css";
// import FsLightbox from "fslightbox-react";

// const FsLightBox = memo((props) => {
//   const { boardDetail } = props;

//   const imagseIoop = [];
//   for (let i = 0; i < boardDetail.imagesDTO.length; i++) {
//     imagseIoop.push(i);
//   }
//   console.log("길이 : ", boardDetail.imagesDTO.length);

//   //복수 이미지를 사용할 경우 모달창 표시 여부와 몇번째 이미지를 표시할지에 대한 상태값
//   const [multiToggler, setMultiToggler] = useState({
//     open: false,
//     index: 0,
//   });

//   const smallImg = useRef(); //작은이미지
//   const imgs = useRef([]);

//   const handleImageClick = (index) => {
//     setMultiToggler({ open: true, index });
//   };

//   const prevClick = () => {
//     smallImg.current.style.marginLeft = `${0}px`;
//     //smallImg.current.prev();
//   };
//   const nextClick = () => {
//     smallImg.current.style.marginLeft = `${-225}px`;
//     //smallImg.current.next();
//   };

//   return (
//     <div className={style.wrap}>
//       <div className={style.thumbnail}>
//         <img
//           src={boardDetail.imagesDTO[0].filepath}
//           alt={boardDetail.imagesDTO[0].filename}
//         />
//       </div>

//       {/* 체육관 서브 사진 */}
//       <div className={style.imgList}>
//         <div className={style.imgBtn}>
//           {/* 이전 버튼 */}
//           <button onClick={prevClick}>prev</button>
//           {/* 다음 버튼 */}
//           <button onClick={nextClick}>next</button>
//         </div>

//         <div className={style.smallImg} ref={smallImg}>
//           {imagseIoop.map((num, idx) => (
//             <button
//               key={num}
//               // onClick={(e) =>
//               //   setMultiToggler({ open: !multiToggler.open, index: idx })
//               // }
//               onClick={() => handleImageClick(idx)}
//             >
//               <img
//                 alt={boardDetail.imagesDTO[num].filename}
//                 src={boardDetail.imagesDTO[num].filepath}
//                 width="150"
//                 ref={(el) => (imgs.current[idx] = el)}
//                 key={num}
//               />
//             </button>
//           ))}
//           <FsLightbox
//             toggler={multiToggler.open}
//             sources={boardDetail.imagesDTO.map((image) => image.filepath)}
//             slide={multiToggler.index}
//             type="image"
//             ref={smallImg}
//           />
//         </div>
//         <p>이미지 클릭시 크게 보실 수 있습니다.</p>
//       </div>
//     </div>
//   );
// });

// export default FsLightBox;

import React, { memo, useRef, useState } from "react";
import style from "../../css/board/FsLightBox.module.css";
import FsLightbox from "fslightbox-react";

const FsLightBox = memo((props) => {
  const { boardDetail } = props;

  const images = boardDetail.imagesDTO;
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여지는 이미지의 인덱스
  const [multiToggler, setMultiToggler] = useState(false); // FsLightbox 모달 토글

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setMultiToggler(true);
  };

  const prevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const nextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={style.wrap}>
      <div className={style.thumbnail}>
        <img src={images[0].filepath} alt={images[0].filename} />
      </div>

      <div className={style.imgList}>
        <div className={style.imgBtn}>
          <button onClick={prevClick}>prev</button>
          <button onClick={nextClick}>next</button>
        </div>

        <div className={style.smallImg}>
          {images.map((image, index) => (
            <button key={index} onClick={() => handleImageClick(index)}>
              <img alt={image.filename} src={image.filepath} width="150" />
            </button>
          ))}
        </div>

        <p>이미지 클릭시 크게 보실 수 있습니다.</p>
      </div>

      <FsLightbox
        toggler={multiToggler}
        sources={images.map((image) => image.filepath)}
        slide={currentIndex}
        type="image"
      />
    </div>
  );
});

export default FsLightBox;
