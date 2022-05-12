import React, { useState } from 'react'


const SLIDE_GAP = 1;  //각 슬라이드 사이 간격 
const SLIDE_MOVING_UNIT = 500;  //슬라이드 버튼 클릭 시 움직일 길이
const IMG_WIDTH = 400;  //이미지 가로 길이

function ProductImageSlider({ images }) {
    const [slideSpot, setSlidSpot] = useState(0);
    const imgQuantity = images.length

    console.log(window.innerWidth)
    // console.log(window.getComputedStyle(document.querySelector(".slideInner")).width)
    console.log(document.querySelector(".slideInner"))


    //데이터로 들어오는 총 이미지 수가 항상 다르기 때문에 총 이미지 수를 구해준다.
    const slideWidth =
        IMG_WIDTH * imgQuantity + (imgQuantity - 1) * SLIDE_GAP;
    //슬라이드 내부 컨텐츠의 전체 길이를 구해준다. 
    const hiddenedSlideWidth = slideWidth - window.innerWidth;
    //슬라이드 내부 컨텐츠 전체 길이에서 윈도우의 innerWidth 값을 빼 남아있는 슬라이드의 길이를 구한다.
    let slideEnd;

    const handlePrevBtn = () => {
        if (Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
            //슬라이드 왼쪽으로 남은 값이 한 번에 이동하는 값보다 작으면 
            setSlidSpot(0);
        } else {
            //그 외의 경우
            setSlidSpot(prev => prev + SLIDE_MOVING_UNIT)
            //현재 위치에서 한 번에 이동해야 하는 값만큼 이동
        }
    }

    const handleNextBtn = () => {
        if (hiddenedSlideWidth - Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
            //남아있는 슬라이드의 길이에서 현재 슬라이드의 위치값을 뺀 값이 한 번에 움직여야 하는 값보다 작으면
            setSlidSpot(prev => slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot)))
            slideEnd = slideSpot - (hiddenedSlideWidth - Math.abs(slideSpot));
            //slideEnd의 값을 slideSpot의 값과 동일하게 만들어 nextBtn을 보이지 않게 한다 
        } else {
            //남아있는 슬라이드의 길이가 한 번에 움직여야 하는 값보다 크면
            setSlidSpot(prev => prev - SLIDE_MOVING_UNIT)
        }
    };

    return (
        <div className="storeImgBox d-flex">
            {!!slideSpot && (
                <button onClick={handlePrevBtn} className="slideArrow arrowLeft">
                    <i className="fas fa-chevron-left"></i>
                </button>
            )}
            <ul className="storeImgUl">
                <div
                    style={{ transform: `translateX(${slideSpot}px)` }}
                    className="slideInner d-flex"
                >
                    {images.map((img, i) => (
                        <li key={i} className="storeImgLi" style={{ width: "25%" }}>
                            <img className="product-image-slider-item" style={{ width: "100%", objectFit: 'cover' }} src={img} />
                        </li>
                    ))}
                </div>
            </ul>
            {slideSpot !== slideEnd && (
                <button
                    onClick={handleNextBtn}
                    className="slideArrow arrowRight"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            )}
        </div>);
}

export default ProductImageSlider

// class StoreImgList extends React.Component {
//     state = {
//         slideSpot: 0,
//         //현재 화면에 보이고 있는 슬라이드의 시작점
//     };

//     imgQuantity = this.props.imagesData.length;
//     //데이터로 들어오는 총 이미지 수가 항상 다르기 때문에 총 이미지 수를 구해준다.
//     slideWidth =
//         IMG_WIDTH * this.imgQuantity + (this.imgQuantity - 1) * SLIDE_GAP;
//     //슬라이드 내부 컨텐츠의 전체 길이를 구해준다. 
//     hiddenedSlideWidth = this.slideWidth - window.innerWidth;
//     //슬라이드 내부 컨텐츠 전체 길이에서 윈도우의 innerWidth 값을 빼 남아있는 슬라이드의 길이를 구한다.
//     slideEnd;
//     //슬라이드의 끝부분에 갔을 때 next 버튼이 없어지도록 만들 때 사용할 변수이다.

//     handlePrevBtn = () => {
//         const { slideSpot } = this.state;

//         if (Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
//             //슬라이드 왼쪽으로 남은 값이 한 번에 이동하는 값보다 작으면 

//             this.setState({
//                 slideSpot: 0,
//                 //0까지만 이동

//             });
//         } else {
//             //그 외의 경우

//             this.setState({
//                 slideSpot: slideSpot + SLIDE_MOVING_UNIT,
//                 //현재 위치에서 한 번에 이동해야 하는 값만큼 이동

//             });
//         }
//     };

//     handleNextBtn = () => {
//         const { slideSpot } = this.state;

//         if (this.hiddenedSlideWidth - Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
//             //남아있는 슬라이드의 길이에서 현재 슬라이드의 위치값을 뺀 값이 한 번에 움직여야 하는 값보다 작으면

//             this.setState({
//                 slideSpot: slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot)),
//                 //남은 길이만큼만 이동하고

//             });
//             this.slideEnd =
//                 slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot));
//             //slideEnd의 값을 slideSpot의 값과 동일하게 만들어 nextBtn을 보이지 않게 한다 

//         } else {
//             //남아있는 슬라이드의 길이가 한 번에 움직여야 하는 값보다 크면

//             this.setState({
//                 slideSpot: slideSpot - SLIDE_MOVING_UNIT,
//                 //한 번에 움직여야 하는 만큼 값을 빼준다

//             });
//         }
//     };

//     render() {
//         const { slideSpot } = this.state;
//         const { imagesData } = this.props;

//         return (
//             <div className="storeImgBox">
//                 {!!slideSpot && (
//                     <button onClick={this.handlePrevBtn} className="slideArrow arrowLeft">
//                         <i className="fas fa-chevron-left"></i>
//                     </button>
//                 )}
//                 <ul className="storeImgUl">
//                     <div
//                         style={{ transform: `translateX(${slideSpot}px)` }}
//                         className="slideInner"
//                     >
//                         {imagesData.map((img, i) => (
//                             <li key={i} className="storeImgLi">
//                                 <img src={img} />
//                             </li>
//                         ))}
//                     </div>
//                 </ul>
//                 {slideSpot !== this.slideEnd && (
//                     <button
//                         onClick={this.handleNextBtn}
//                         className="slideArrow arrowRight"
//                     >
//                         <i className="fas fa-chevron-right"></i>
//                     </button>
//                 )}
//             </div>);
//     }
// }


// export default StoreImgList;