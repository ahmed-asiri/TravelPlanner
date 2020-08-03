import {getData} from "./apiCalls";
import {saveTrip} from "./trips";
import {cardPreviewGenerator} from "./trips";
import {validate} from "./validate";
import {isCurrent} from "./current";

export async function submitData(eve) {
    // this function will get data from the server then validate it then ask the user for confirm or cancel
    eve.preventDefault();
    let inputs = document.querySelectorAll("input");
    let tripData = {
        dest: inputs[0].value,
        depart: inputs[1],
        arrive: inputs[2]
    };
    let validatedResult =  validate(tripData);

    if(!validatedResult.approved){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${validatedResult.message}`,
            allowOutsideClick: true
          });
    } else {
        tripData.isCurrent = isCurrent(tripData);
        let cardData = await gettingDataAndLoading(tripData);
        previewAndConfirm(cardData);
    }
}



function previewAndConfirm(cardData) {
    // preview the Trip Card to the user, he can confirm or cancel it.
    let cardPreviewElement = cardPreviewGenerator(cardData);
    saveTrip(cardData);
}

async function gettingDataAndLoading(tripData) {
    // this will call the API, and then display loading SVG, and remove the SVG when data arrive
    let loader = document.querySelector(".loader");
    loader.style.display = "grid";
    let cardData = await getData(tripData);
    cardData.depart = tripData.depart.valueAsDate;
    cardData.arrive = tripData.arrive.valueAsDate;
    loader.style.display = "none";

    return cardData;
}