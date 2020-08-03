import {getData} from "./apiCalls";
import {saveTrip} from "./trips";
import {cardPreviewGenerator} from "./trips";
import {validate} from "./validate";
import {isCurrent} from "./current";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


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
        await previewAndConfirm(cardData);
    }
}



async function previewAndConfirm(cardData) {
    // preview the Trip Card to the user, he can confirm or cancel it.
    let cardPreviewElement = cardPreviewGenerator(cardData);

    Swal.fire({
        title: 'Trip Preview',
        html: cardPreviewElement,
        showCancelButton: true,
        allowOutsideClick: false,
        cancelButtonText: "Cancel Trip",
        confirmButtonText: "Save Trip",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6"
      })
    .then((dismiss) => {
        if(dismiss.isConfirmed){
            //confirm the trip
            saveTrip(cardData);
        }
    });
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