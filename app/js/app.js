// -- Swiper plugin--
import Swiper, {Navigation, Lazy, Autoplay} from 'swiper';

document.addEventListener('DOMContentLoaded', () => {

    /* TABS */
	let tabulation= document.querySelectorAll('.tabs');
    tabulation.forEach(tabulationItem=>{
        let tabs = tabulationItem.querySelectorAll('.tabs__toggle');
        let contents = tabulationItem.querySelectorAll('.tabs__content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                contents.forEach((content) => {
                    content.classList.remove('is-active');
                });
                tabs.forEach((tab) => {
                    tab.classList.remove('is-active');
                });
                contents[index].classList.add('is-active');
                tabs[index].classList.add('is-active');
            });
        });
    })
	/* /TABS */
    /* TESTIMONIALS SLIDER */
    var swipertesti = new Swiper('.testimonials-slider', {
        modules: [Navigation, Lazy, Autoplay],
        autoplay: {
            delay: 5000,				 
        },  
        //loop: true,         
        //slidesPerView: 1,
        //spaceBetween: 10,
        // Navigation arrows
        navigation: {
            nextEl: '.testimonials-slider__button-next',
            prevEl: '.testimonials-slider__button-prev',
        },
        
    });   
    /* /TESTIMONIALS SLIDER */

    /* CLIENTS SLIDER */
    var swiperclients = new Swiper('.clients-slider', {
        modules: [Lazy, Autoplay],
        autoplay: {
            delay: 5000,				 
        },  
        loop: true,         
        slidesPerView: 1,
        spaceBetween: 10, 
        breakpoints: {
            576: {
                slidesPerView: 2,             
            },
            992: {
                slidesPerView: 4,             
            },
        }    
        
    });   
    /* /CLIENTS SLIDER */


})
