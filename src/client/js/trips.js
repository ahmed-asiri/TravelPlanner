let cardsSlider = document.querySelector(".cards-slider__container");

export function saveTrip(cardData) {
    // adding the trip to the localStorage and then append it to the cards-slider
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



export function loadSlider() {
    // this function is used for DOMContentLoaded event, to load all the LocalStorage content into the Slider
    if(localStorage.length > 0) {
        let cardsArray = localStorageToArray();
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
    <p class="card__degree"><i class="fas fa-temperature-low"></i> ${cardData.lowTemp} to ${cardData.maxTemp}</p>
    <p class="card__duration"><i class="far fa-clock"></i> ${getDurationOfTrip(cardData.depart, cardData.arrive)}</p>
    <p class="card__time">${timeToCome(cardData.depart)}</p>`;

    let cardElement = document.createElement("DIV");
    cardElement.classList.add("card");
    cardElement.id = cardData.id;
    cardElement.innerHTML = card;

    return cardElement;
}

export function cardPreviewGenerator(cardData) {
    // this will create card elementm but it it for preview not to be added into the DOM
    let cardElement = cardGenerator(cardData);
    cardElement.style.height = "400px";
    cardElement.style.width = "250px";
    cardElement.style.margin = "auto";
    return cardElement;
}

function timeToCome(departDate) {
    // calculate the time before the trip departing date come
    let days = Math.ceil((departDate.getTime() - new Date().getTime()) / (1000*60*60*24));
    let message = "Out of Date";
    if(days > 0){
        message = days == 1? "1 day away" : `${days} days away` 
    }

    return message;

}

function getDataAsString(date) {
    // convert the date object into fromated string as 'mm/dd/yyyy' for displaying the DOM
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function getDurationOfTrip(departDate, arriveDate) {
    let days = Math.ceil((arriveDate.getTime() - departDate.getTime()) / (1000*60*60*24));
    let message = `${days} Day`;
    if(days > 1)
        message += "s";
    return message;

}