
// Style referenced in html
import "./sass/main.scss";

import {eventsRegister} from "./js/app";
import {cardsSlider} from  "./js/sliderActions";

// images
import "./imgs/TrAvenger.ico";
import "./imgs/hero-img.svg";
import "./imgs/hero-image.jpg";

// The primary function of the app.js
eventsRegister();

// Trip cards slider eventListener
document.querySelector(".cards-slider").addEventListener("click", cardsSlider);