
document.querySelector(".navigation__menu").addEventListener("click", (eve) => {
        document.querySelector(".navigation__list").classList.add("active");
});


document.querySelector(".navigation__list--header i").addEventListener("click", (eve) => {
    document.querySelector(".navigation__list").classList.remove("active");
});

