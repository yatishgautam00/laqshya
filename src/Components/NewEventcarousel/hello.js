// //step 1: get DOM
// //getting the previouse and next buttons id
// let nextDom = document.getElementById('next');
// let prevDom = document.getElementById('prev');

// //getting the all the css class with the help of css selector 
// let carouselDom = document.querySelector('.carousel');
// let SliderDom = carouselDom.querySelector('.carousel .list');
// let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
// let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
// let timeDom = document.querySelector('.carousel .time');

// thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
// let timeRunning = 500;
// let timeAutoNext = 10000;

// //adding the event listner on click of next button: if cling the next button then the next animation will occure
// nextDom.onclick = function(){
//     //calling the slider function with argument 'next' --> it showing the effect of the next one 
//     showSlider('next');    
// }

// //adding the event listner on click of prev button: if cling the previouse button then the prev animation will occure
// prevDom.onclick = function(){
//     //calling the slider function with argument 'prev' --> it showing the effect of the previouse one 
//     showSlider('prev');    
// }

// let runTimeOut;
// //insuring that if any button will not click then next slid will show in next 7s
// let runNextAuto = setTimeout(() => {
//     next.click();
// }, timeAutoNext)

// //function for the slider show 
// /* this function taking the type parameter which is the button type 
// hace we have two type of button 'next' and 'prev', if we click the 'next' button then it 
// detect it with name and performs the 'next' buttons operation and it will do same for the 'pre' button */
// function showSlider(type){
//     let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
//     let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
//     if(type === 'next'){
//         SliderDom.appendChild(SliderItemsDom[0]);
//         thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
//         carouselDom.classList.add('next');  //if we clicked next button then on carousel class adding class 'next' that property also defined on the css 
//     }else{
//         SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
//         thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
//         carouselDom.classList.add('prev');  //if we clicked prev button then on carousel class adding class 'prev' that property, also defined on the css 
//     }

//     clearTimeout(runTimeOut);
//     //defining during the running time of animation slid-show the 'next' and 'prev' is diabled
//     runTimeOut = setTimeout(() => {
//         carouselDom.classList.remove('next');  //removing the 'next' class from the carousel class that means we are removing the function on this css class
//         carouselDom.classList.remove('prev'); //same for the 'prev' class
//     }, timeRunning);

//     clearTimeout(runNextAuto);
//     //insuring that if any button will not click then next slid will show in next 7s
//     runNextAuto = setTimeout(() => {
//         next.click();
//     }, timeAutoNext)
// }