//Datapicker plugin
import { Datepicker } from 'vanillajs-datepicker';

// -- Swiper plugin--
import Swiper, {Navigation, Lazy, Autoplay} from 'swiper';



import {WOW} from 'wowjs';


document.addEventListener('DOMContentLoaded', () => {

	/* WOW */
	var wow = new WOW({
		boxClass: 'wow',   // animated element css class (default is wow)
		animateClass: 'animated',  // animation css class (default is animated)
		offset: 0, // distance to the element when triggering the animation (default is 0)
		mobile: false, //turn off on mobile
		live: false,  // act on asynchronously loaded content (default is true)
		scrollContainer: null // optional scroll container selector, otherwise use window
	});
	wow.init();	
	/* WOW */
	

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

    //2. Back to top button
window.onscroll = function(){
	//window.scrollTo(x,y)
	let scrolled;
	let timer;
	let topBtn=document.getElementById('top');

	scrolled = window.pageYOffset;
	if (scrolled > 100){
		topBtn.style.display="block";
	}
	else {
		topBtn.style.display="none";
	}

	topBtn.onclick = function(){
		scrollToTop();
	}
	
	function scrollToTop(){
		if (scrolled > 100) {
			window.scrollTo(0, scrolled);
			scrolled = scrolled - 50;
			timer = setTimeout(scrollToTop, 15);
			
		}
		else {
			clearTimeout(timer);
			window.scrollTo(0,0);
			topBtn.style.display="none";
		}
	}
}
/* POPUP  */
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
/* /POPUP  */

/*  DATAPICKER  */
const elem = document.querySelector('input[name="date"]');
const datepicker = new Datepicker(elem, {
	format: 'd M yyyy',    //date format
}); 
/*  /DATAPICKER  */




})//End


