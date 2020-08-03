import {validate} from "./validate";
import {getData} from "./apiCalls";
import {isCurrent} from "./current";
import {cardPreviewGenerator} from "./trips";
import {saveTrip} from "./trips";
import {loadSlider} from "./trips";
import {cardsSlider} from  "./sliderActions";


export function eventsRegister() {


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
            allowOutsideClick: true
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


// load trips in the slider after the DOM loaded 
document.addEventListener("DOMContentLoaded", loadSlider);


