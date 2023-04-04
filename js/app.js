
// Display Mobile Menu 
const menuHamburger = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');

menuHamburger.addEventListener('click', function(){
    menuHamburger.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Carousel JS
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides_fade");
    var dots = document.getElementsByClassName("carousel_dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Carousel Auto Slide JS 
    var slideIndex = 0;
    showSlides();
    function showSlides() {
        var i;
    var slides = document.getElementsByClassName("slides_fade");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); 
    }

  
