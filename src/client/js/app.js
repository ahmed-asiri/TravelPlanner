
import {validate} from "./validate";
import {getData} from "./apiCalls";
import {isCurrent} from "./current";

export function eventsRegister() {

// Burger Menu open Event
document.querySelector(".navigation__menu").addEventListener("click", (eve) => {
        document.querySelector(".navigation__list").classList.add("active");
});

// Burger Menu close Event
document.querySelector(".navigation__list--header i").addEventListener("click", (eve) => {
    document.querySelector(".navigation__list").classList.remove("active");
});


// Trip cards slider event

let pageIndicator = 1;

document.querySelector(".cards-slider").addEventListener("click", sliderMovment);
function sliderMovment(eve) {

    eve.preventDefault();
    
    let sliderWidth = this.getBoundingClientRect().width;
    let cardContainer = this.firstElementChild;
    let cardContainerWidth = cardContainer.scrollWidth;
    let pages = Math.ceil(cardContainerWidth / sliderWidth);


        if(eve.target.classList.contains("move-btn")) {
            if(eve.target.classList.contains("right")) {
                if(!(pageIndicator >= pages)) {
                    pageIndicator++;
                }
            } else {
                if((pageIndicator != 1)) {
                    pageIndicator--;
                }
                direction = false
            }
    
            translateSliderX = (100 * pageIndicator) - 100; // minus 100 becasue at the first will be 0% on X Axies
            translateSliderX =  translateSliderX * -1 ; 

            cardContainer.style.transform = "translateX(" + translateSliderX + "%)";

        }
    
}





document.querySelector(".header__form--btn").addEventListener("click", async function (eve) {
    eve.preventDefault();
    let inputs = document.querySelectorAll("input");
    
    let tripData = {
        dest: inputs[0].value,
        depart: inputs[1],
        arrive: inputs[2]
    };

    let validatedResult =  validate(tripData);
    tripData.isCurrent = isCurrent(tripData);

    if(!validatedResult.approved){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${validatedResult.message}`,
            allowOutsideClick: false
          });
    } else {
        let loader = document.querySelector(".loader");
        loader.style.display = "grid";


        let cardDataResponse = await getData(tripData);
        let cardData = cardDataResponse;
        console.log(cardData.weatherData.weather.icon);
        loader.style.display = "none";

        let card = `<div style="height: 400px; width: 250px; margin: auto;" class="card"><div class="card__img-option">
        <img src="${cardData.imgURL}" alt="${cardData.city}">
        <div class="card__img-option--options">
        <i class="far fa-trash-alt"></i>
        </div></div>
        <h3 class="card__city"> ${cardData.city}, 
        <span class="card__city--country">${cardData.country}</span>
        </h3>
        <p class="card__date">10/10/2020 <i class="fas fa-plane"></i> 15/10/2020</p>
        <p class="card__degree">${cardData.weatherData.low} to ${cardData.weatherData.max}</p>
        <p class="card__time">5 days away</p>
        </div>`
        Swal.fire({
            title: 'Trip Preview',
            html: card,
            allowOutsideClick: false,
          });
    }
    


});

}





// CARD, we can insert it in the footer in swalAlert
let card = '<div class="card"><div class="card__img-option"><img src="./assets/hero-image.jpg" alt="hero"><div class="card__img-option--options"><i class="far fa-trash-alt"></i></div></div><h3 class="card__city"> Paris, <span class="card__city--country">france</span></h3><p class="card__date">10/10/2020 <i class="fas fa-plane"></i> 15/10/2020</p><p class="card__degree">30 to 45</p><p class="card__time">5 days away</p></div>'


