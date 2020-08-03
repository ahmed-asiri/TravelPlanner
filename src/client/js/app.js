
import {validate} from "./validate";
import {getData} from "./apiCalls";
import {isCurrent} from "./current";

export function eventsRegister() {




document.querySelector(".navigation").addEventListener("click", function (eve) {
    // This add the open and close functionality on the Navigation for mobile and tablets
    eve.preventDefault();
    if(eve.target.tagName === "I"){
        this.children[1].classList.toggle("active");
    }
});




// Trip cards slider event
let pageIndicator = 1;

document.querySelector(".cards-slider").addEventListener("click", cardsSlider);

function cardsSlider(eve) {
    eve.preventDefault();

        if(eve.target.classList.contains("move-btn")) {
            sliderMove(eve, this);
        } else if(eve.target.classList.contains("card__img-option--options")){
            deleteTrip(eve.target.parentElement.parentElement.id, this.firstElementChild)
        }
    
}

function deleteTrip(cardId, container) {
    localStorage.removeItem(cardId);
    let cardElement = document.querySelector(`#${cardId}`);
    cardElement.style.transform = "translateY(150%)";
    setTimeout(function() {
        container.removeChild(cardElement);
        if(container.childElementCount < 1)
            container.parentElement.parentElement.style.display = "none";
    }, 500);


}

function sliderMove(eve, slider) {
    let direction = true;
    let sliderWidth = slider.getBoundingClientRect().width;
    let cardContainer = slider.firstElementChild;
    let cardContainerWidth = cardContainer.scrollWidth;
    let pages = Math.ceil(cardContainerWidth / sliderWidth);
    let translateSliderX;
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




// form event, getting data from the server
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

        cardData.depart = tripData.depart.valueAsDate;
        cardData.arrive = tripData.arrive.valueAsDate;



        loader.style.display = "none";

        let card = cardPreviewGenerator(cardData);

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
                saveTrip(cardData);
              }else if(dismiss.isDismissed){
                card = null;
              }
          });
    }
    


});

}
let cardsSlider = document.querySelector(".cards-slider__container");


function saveTrip(cardData) {
    cardData.id = "card-" + localStorage.length;
    addToLocalStorage(cardData);
    let cardElement = cardGenerator(cardData);
    insertCardToSlider(cardElement);
    if(localStorage.length === 1)
        cardsSlider.parentElement.parentElement.style.display = "block";

}

function addToLocalStorage(cardData){
    // adding the data into the localStorage
    localStorage.setItem(cardData.id, JSON.stringify(cardData));
}

function insertCardToSlider (cardEle) {
    // insert the new Saved Trip into the Slider
    if(cardsSlider.children[0] === undefined){
        cardsSlider.appendChild(cardEle);
        return;
    }
    cardsSlider.insertBefore(cardEle, cardsSlider.children[0]);
}



function loadSlider() {
    if(localStorage.length > 0) {
        let cardsArray = localStorageToArray();
        console.log(cardsArray);
        let sortedCardsArray = sortArrayBasedOnDate(cardsArray);
        let fragmentObj = document.createDocumentFragment();
        for (let card of sortedCardsArray) {
            let cardElement = cardGenerator(card);
            fragmentObj.appendChild(cardElement);        
        }
        cardsSlider.parentElement.parentElement.style.display = "block";
        cardsSlider.appendChild(fragmentObj);
    }
}

document.addEventListener("DOMContentLoaded", loadSlider);

function localStorageToArray() {
    // on load, it will get all the data from the localStorage into an array
    let cardsCounter = 0;
    let cardsDataArray = [];
    for (let i = 0; cardsCounter < localStorage.length; i++) {
        if(localStorage.getItem("card-"+i) !== null){
            cardsCounter++;
            let cardObj = JSON.parse(localStorage.getItem("card-"+i));
            cardObj.depart = new Date(cardObj.depart);
            cardObj.arrive = new Date(cardObj.arrive);
            cardsDataArray.push(cardObj);
        }
    }
    return cardsDataArray;
} 

function sortArrayBasedOnDate(arr) {
    // sort the array that generated from the localStorageToArray() function, based on depart date
    const sortedArray = arr.slice().sort((a, b) => a.depart - b.depart)
    return sortedArray;
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
    cardElement.id = cardData.id;
    cardElement.innerHTML = card;

    return cardElement;
}

function cardPreviewGenerator(cardData) {
    let cardElement = cardGenerator(cardData);
    cardElement.style.height = "400px";
    cardElement.style.width = "250px";
    cardElement.style.margin = "auto";
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
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getDurationOfTrip(departDate, arriveDate) {
    let days = Math.ceil((arriveDate.getTime() - departDate.getTime()) / (1000*60*60*24));
    let message = `${days} Day`;
    if(days > 1)
        message += "s";
    return message;

}

