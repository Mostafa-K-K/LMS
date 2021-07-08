// import React, { useState } from 'react';
// import image_slider_1 from '../Images/image_slider_1.jpg';
// import image_slider_2 from '../Images/image_slider_2.jpg';
// import image_slider_3 from '../Images/image_slider_3.jpg';

// export default function Slider() {
//     const [index, setIndex] = useState(0);
//     const [slider, setSlider] = useState([image_slider_1, image_slider_2, image_slider_3]);

//     const left = () => {
//         let i = index;
//         var length = slider.length;
//         (i > 0) ? setIndex(i - 1) : setIndex(length - 1);
//     }

//     const right = () => {
//         let i = index;
//         var length = slider.length;
//         (i < length - 1) ? setIndex(i + 1) : setIndex(0);
//     }
//     return (
//         <div className="divimgslide">
//             <a className="prev" onClick={left}>&#10094;</a>
//             <a className="next" onClick={right}>&#10095;</a>
//             <img src={slider[index]} alt="Welcome to B A AM" className="sliderImag"/>
//         </div>
//     );
// }