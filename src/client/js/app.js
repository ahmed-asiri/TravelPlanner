


function eventsRegister() {

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
}


eventsRegister();