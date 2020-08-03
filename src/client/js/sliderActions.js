let pageIndicator = 1;

export function cardsSlider(eve) {
    // this is the main function that will trigger when cards-slider clicked.
    eve.preventDefault();

        if(eve.target.classList.contains("move-btn")) {
            sliderMove(eve, this);
        } else if(eve.target.classList.contains("card__img-option--options")){
            deleteTrip(eve.target.parentElement.parentElement.id, this.firstElementChild)
        }
    
}



function deleteTrip(cardId, container) {
    // if the user click on the 'trash' icon on the card, the trip will be deleted
    localStorage.removeItem(cardId);
    let cardElement = document.querySelector(`#${cardId}`);
    cardElement.style.transform = "translateY(150%)";
    setTimeout(function() {
        document.querySelector(".move-btn.left").click();
        container.removeChild(cardElement);
        if(container.childElementCount < 1)
            container.parentElement.parentElement.style.display = "none";
    }, 500);


}

function sliderMove(eve, slider) {
    // if the user click on the left or right button on the slider, the slider will move.
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