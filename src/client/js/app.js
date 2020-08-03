
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
    let direction = true;
    let sliderWidth = this.getBoundingClientRect().width;
    let cardContainer = this.firstElementChild;
    let cardContainerWidth = cardContainer.scrollWidth;
    let pages = Math.ceil(cardContainerWidth / sliderWidth);
    let translateSliderX;

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
       // console.log(cardData.weatherData.weather.icon);

       cardData.depart = tripData.depart.valueAsDate;
       cardData.arrive = tripData.arrive.valueAsDate;



        loader.style.display = "none";

        let card = cardGenerator(cardData);

        Swal.fire({
            title: 'Trip Preview',
            html: card,
            showCancelButton: true,
            allowOutsideClick: false,
            cancelButtonText: "Cancel Trip",
            confirmButtonText: "Save Trip",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6"
          })
          .then((dismiss) => {
              if(dismiss.isConfirmed){
                // on Confirm
                cardGenerator(cardData)
              }else if(dismiss.isDismissed){
                // on Cancel
              }
          });
    }
    


});

}

function cardGenerator(cardData) {
    let card = `<div class="card__img-option">
    <img src="${cardData.imgURL}" alt="${cardData.city}">
    <div class="card__img-option--options">
    <i class="far fa-trash-alt"></i>
    </div></div>
    <h3 class="card__city"> ${cardData.city}, 
    <span class="card__city--country">${cardData.countryCode}</span>
    </h3>
    <p class="card__date">${getDataAsString(cardData.depart)}<i class="fas fa-plane"></i> ${getDataAsString(cardData.arrive)}</p>
    <p class="card__degree"><i class="fas fa-temperature-low"></i> ${cardData.weatherData.low} to ${cardData.weatherData.max}</p>
    <p class="card__duration"><i class="far fa-clock"></i> ${getDurationOfTrip(cardData.depart, cardData.arrive)}</p>
    <p class="card__time">${timeToCome(cardData.depart)}</p>`;

    let cardElement = document.createElement("DIV");
    cardElement.classList.add("card");
    cardElement.style.height = "400px";
    cardElement.style.width = "250px";
    cardElement.style.margin = "auto";
    cardElement.innerHTML = card;

    return cardElement;
}

function timeToCome(departDate) {
    let days = Math.ceil((departDate.getTime() - new Date().getTime()) / (1000*60*60*24));
    let message = "Out of Date";
    if(days > 0){
        message = days == 1? "1 day away" : `${days} days away` 
    }

    return message;

}

function getDataAsString(date) {
    console.log(date.getTime());
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getDurationOfTrip(departDate, arriveDate) {
    let days = Math.ceil((arriveDate.getTime() - departDate.getTime()) / (1000*60*60*24));
    let message = `${days} Day`;
    if(days > 1)
        message += "s";
    return message;

}

