
//Making slider
var testimonialSlider=new Slider('testimonial');
testimonialSlider.init();
testimonialSlider.auto=true;



//===================================================
//------Making Dynamic Content for Client Section----
//===================================================

var clientAllSlides=document.querySelector('.client__slides');

var clientsImg=['angular','bower','buffer','codepen','dribbble','dropbox','envato','evernote','firefox','github','grunt','joomla','jQuery','magento','messenger','mozilla','opera','pocket','spotify','wordpress'];



    let totalSlides=Math.ceil(clientsImg.length/5),
        elementsPerSlide=Math.ceil(clientsImg.length/totalSlides);

    if(window.innerWidth<700) {
    totalSlides=Math.ceil(clientsImg.length/4);
    elementsPerSlide=Math.ceil(clientsImg.length/totalSlides);
}
if(window.innerWidth<550) {
    totalSlides=Math.ceil(clientsImg.length/3);
    elementsPerSlide=Math.ceil(clientsImg.length/totalSlides);

}
if(window.innerWidth<450) {
    totalSlides=Math.ceil(clientsImg.length/2);
    elementsPerSlide=Math.ceil(clientsImg.length/totalSlides);
}

function client() {

    for(var i=0;i<totalSlides;i++){
        var div=document.createElement('div');
        div.className='slide';
        if(i>0){
            div.classList.add('slider__offLeft');
        }

        for (var x=0;x<elementsPerSlide;x++){

            if(x+(i*elementsPerSlide)<clientsImg.length) {
                let image=document.createElement('img');
                image.src="img/clients/"+clientsImg[x+(i*elementsPerSlide)]+'.png';
                div.appendChild(image);
            }
        }


        clientAllSlides.appendChild(div);

    }

}

client();

var clientSlider=new Slider('client');
clientSlider.init();
clientSlider.auto=true;



//===========================================================
//==-------------------------Nav Bar-----------------------
//===========================================================
let nav =document.querySelector('.nav'),navInterval;
let navClose=document.querySelector('.nav__close'),
    navMenu=document.querySelector('.nav__menu');

navClose.addEventListener('click',()=>navInterval=setTimeout(hideNav,200));


function hideNav(){
    nav.style.right='-500px';
    clearInterval(navInterval);
}

nav.addEventListener('click',()=>navInterval=setTimeout(hideNav,600));


function showNav(){
    nav.style.right='0';
    clearInterval(navInterval);
}
navMenu.addEventListener('click',()=>navInterval=setTimeout(showNav,40));




//Scroll Up Visibility

var scrollUp =document.querySelector('.scrollUpBtn');

window.onscroll=function () {


    if(window.scrollY>=window.innerHeight/1.2){
        navMenu.style.backgroundColor='black';

    }else {
        navMenu.style.backgroundColor='transparent';

    }




    if(window.scrollY>= window.innerHeight){
        scrollUp.style.visibility='visible';
        scrollUp.style.opacity='1';

    }else {
        scrollUp.style.visibility='hidden';
        scrollUp.style.opacity='0';
    }

}


//==========================================================
//------------------------Gallery---------------------------
//==========================================================

const portfolioItem=document.querySelectorAll('.portfolio__item'),
    closeGallery=document.getElementById('close-gallery'),
    gallery=document.querySelector('.gallery'),
    galleryImg=document.getElementById('gallery-img'),
    galleryImgPreviewBtn=document.querySelector('.galleryImgPreview'),
    galleryImgPreviewContainer=document.querySelector('.gallery__content__imgPreview'),
    galleryContent=document.querySelector('.gallery__content'),
    galleryImages=['minimalismo.jpg','architecture.jpg','shutterbug.jpg','skaterboy.jpg','salad.jpg','yellowwall.jpg'],
    galleryAutoplayBtn=document.querySelector('.gallery__autoplay'),
    galleryDownloadBtn=document.querySelector('.gallery__download'),
    galleryNumber=document.querySelector('.image-num');


//Close Gallery
closeGallery.addEventListener('click',()=>gallery.classList.add('close-gallery'));

//EventListener to open Gallery
for (let x=0;x<portfolioItem.length;x++){
    portfolioItem[x].addEventListener('click',openGallery);
}
//EventListener for Images preview in gallaery
galleryImgPreviewBtn.addEventListener('click',()=>galleryContent.classList.toggle('show-img'));


for(let x=0;x<galleryImages.length;x++){
    let image=document.createElement('img');
    image.src='../img/portfolio/'+galleryImages[x];
    image.classList.add('gallery__image__'+x+1);
    image.dataset.num=x+1;
    galleryImgPreviewContainer.appendChild(image);
}


var gallerySlider=new Slider('gallery');
gallerySlider.init();
gallerySlider.auto=false;

galleryNumber.innerText=(Number(gallerySlider.current)+1)+'/'+galleryImages.length;

function openGallery(e) {
    selectClickImg(e);
    gallerySlider.currentSlide();
    gallery.classList.remove('close-gallery');

}



function selectClickImg(e) {


    //if clicked on image
    if(e.target.className==='portfolio__item__content'){
        gallerySlider.current=Number(e.target.parentElement.dataset.num);
    }

    //if clicked on dots
    if(e.target.className==='middlepart'){

        gallerySlider.current=Number(e.target.parentElement.parentElement.dataset.num);

    }


    if(e.target.parentElement.className==='portfolio__item__content__link'){
        //if clicked on svg
        gallerySlider.current=Number(e.target.parentElement.parentElement.parentElement.parentElement.dataset.num);

    }

    //if clicked on svg use tag
    if(e.target.parentElement.parentElement.className==='portfolio__item__content__link'){

        gallerySlider.current=Number(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.num);


    }


    if(e.target.className==='content-upperpart'){
        //if clicked on upperPart
        gallerySlider.current=Number(e.target.parentElement.parentElement.dataset.num);
    }




    //if clicked on text


    if(e.target.parentElement.className==='portfolio__item__content__text'){

        gallerySlider.current=Number(e.target.parentElement.parentElement.parentElement.dataset.num);

    }

    //if clicked on anchor tag

    if(e.target.className==='portfolio__item__content__link'){

        gallerySlider.current=Number(e.target.parentElement.parentElement.parentElement.dataset.num);

    }

    galleryNumber.innerText=(Number(gallerySlider.current)+1)+'/'+galleryImages.length;


}





galleryAutoplayBtn.addEventListener('click',function(e){
    if(gallerySlider.auto===false){
        gallerySlider.auto=true;

        document.querySelector('.gallery__autoplay__svgUse').setAttribute('xlink:href','img/sprite.svg#icon-pause');
        return;
    }


    if(gallerySlider.auto===true){
        gallerySlider.auto=false;
        document.querySelector('.gallery__autoplay__svgUse').setAttribute('xlink:href','img/sprite.svg#icon-play2');
        clearInterval(gallerySlider.interval);
    }

});
galleryDownloadBtn.addEventListener('click',function(e){
    window.location='../img/portfolio/'+galleryImages[gallerySlider.current];
});


//===================================================================================
//--------------------------Smooth Scroll--------------------------------------------
//===================================================================================


let home=document.getElementById('header'),
    about=document.getElementById('about'),
    services=document.getElementById('services'),
    contact=document.getElementById('contact'),
    navItems=document.querySelector('.nav__items'),
    headerScrollDown=document.querySelector('.header__rightside__scrollDown'),
    headerBtn=document.querySelector('.header-btn');

headerBtn.addEventListener('click',function (e) {
    e.preventDefault();
    var dist=services.offsetTop;
    scrollBy(dist, 500);
});
scrollUp.addEventListener('click',function (e) {
    e.preventDefault();
    var dist=scrollUp.offsetTop-window.innerHeight;
    scrollBy(dist, 500);
});
headerScrollDown.addEventListener('click',function (e) {
    e.preventDefault();
    var dist=about.offsetTop;
    scrollBy(dist, 500);
});
navItems.children[0].addEventListener('click',function (e) {
    e.preventDefault();
    var dist=home.offsetTop;
    scrollBy(dist, 500);
});

navItems.children[0].addEventListener('click',function (e) {
    e.preventDefault();
    var dist=home.offsetTop;
    scrollBy(dist, 500);
});

navItems.children[1].addEventListener('click',function (e) {
    e.preventDefault();
    var dist=about.offsetTop;
    scrollBy(dist, 500);
});

navItems.children[2].addEventListener('click',function (e) {
    e.preventDefault();
    var dist=services.offsetTop;
    scrollBy(dist, 500);
});

navItems.children[3].addEventListener('click',function (e) {
    e.preventDefault();
    var dist=contact.offsetTop;
    scrollBy(dist, 500);
});


function scrollBy(distance, duration) {

    var initialY = document.body.scrollTop;
    var y = Number(initialY) + Number(distance);
    var baseY = (initialY + y) * 0.5;
    var difference = initialY - baseY;
    var startTime = performance.now();


    function step() {
        var normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo({
            top: baseY + difference * Math.cos(normalizedTime * Math.PI),
            left:  0,
            behavior: 'smooth'
        });

        if (normalizedTime < 1) window.requestAnimationFrame(step);

    }
    window.requestAnimationFrame(step);
}
