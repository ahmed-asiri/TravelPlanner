import {loadSlider} from "./trips";
import {cardsSlider} from  "./sliderActions";
import {submitData} from "./validateAndConfirm";


export function eventsRegister() {
// this method used to rigester all the events on the page.

document.querySelector(".navigation").addEventListener("click", function (eve) {
    // This add the open and close functionality on the Navigation for mobile and tablets
    eve.preventDefault();
    if(eve.target.tagName === "I"){
        this.children[1].classList.toggle("active");
    }
});

// Trip cards slider event
document.querySelector(".cards-slider").addEventListener("click", cardsSlider);

// form event, getting data from the server
document.querySelector(".header__form--btn").addEventListener("click", submitData);

// load trips in the slider after the DOM loaded 
document.addEventListener("DOMContentLoaded", loadSlider);
}





