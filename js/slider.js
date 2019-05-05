var Slider=function (element) {
    
    let that=this;
    
    that.current=0;
    that.isChangeCurrent=true;
    that.interval=null;
    that.intervalTime=4500;
    that.auto=false;
    that.autoInterval=null;
    that.slidesContainer=document.querySelector('.'+element+'__slides');
    that.leftBtn=document.querySelector('.'+element+'__leftBtn');
    that.rightBtn=document.querySelector('.'+element+'__rightBtn');
    that.dots=document.querySelector('.'+element+'__dots');
    that.totalSlides=that.slidesContainer.children.length;
    that.slides=that.slidesContainer.children;
    

    that.init=function () {

        if(that.leftBtn && that.rightBtn){
            that.leftBtn.addEventListener('click',that.preSlide);
            that.rightBtn.addEventListener('click',that.nextSlide);
        }


         if(that.dots){

             for (let x = 0; x < that.totalSlides; x++) {
                 var span=document.createElement('span');
                 span.className=element+'__dots';
                 if(x==0){
                     span.className=element+'__dots slider__current';
                 }
                 span.dataset.num=x+1;
                 that.dots.appendChild(span);
             }

             for (let x = 0; x < that.dots.children.length; x++) {
                 that.dots.children[x].addEventListener('click',that.changeSlide);
             }


         }

        that.autoInterval=setInterval(that.chkAuto,that.intervalTime);

    }
    


    that.nextSlide=function () {

        if(that.auto===false && that.interval){
            console.log('here')

        }


        for(var i=0;i<that.totalSlides;i++){
            if(!(i==that.current)){
                that.slides[i].style.opacity=0;
            }
        }


        if(that.isChangeCurrent){
            if(!(that.current<that.totalSlides-1)){
                that.current=0;
            }else {
                that.current++;

            }
        }

        that.next();
        that.manageCurrentClass();
        that.isChangeCurrent=true;
    }
    
    that.next=function () {

       that.currentSlide();

        if(that.auto){
            clearInterval(that.interval);
            that.interval=setInterval(that.nextSlide,that.intervalTime);
        }else {
            clearInterval(that.interval);
            that.interval=null;
        }


        galleryNumber.innerText=gallerySlider.current+1+'/'+galleryImages.length;


    }
 
    
    that.currentSlide=function (){
        that.slides[that.current].style.opacity=1;

        var lastSlide=that.current-1;

        if(that.current==0){
            lastSlide=that.totalSlides-1;
        }

        for(var i=0;i<that.totalSlides;i++){

            if(!(i==(lastSlide))){
                that.slides[i].className='slide slider__offLeft';
            }
        }
        that.slides[lastSlide].className='slide slider__offRight slider__trans';
        that.slides[that.current].className='slide slider__trans';


    }




    that.preSlide=function () {
        for(var i=0;i<that.totalSlides;i++){
            if(!(i==that.current)){
                that.slides[i].style.opacity=0;
            }
        }





        if(that.isChangeCurrent){
            if(that.current==0){
                that.current=that.totalSlides-1;
            }else {
                that.current--;
            }
        }

        that.pre();
        that.manageCurrentClass();


        for(var i=0;i<that.totalSlides;i++){
            if(!(i==that.current)){
                that.slides[i].style.opacity=0;
            }
        }

    }
    
    
    
    
    
    that.pre=function () {

        that.slides[that.current].style.opacity=1;

        var lastSlide=that.current+1;

        if(that.current==that.totalSlides-1){
            lastSlide=0
        }

        for(var i=0;i<that.totalSlides;i++){

            if(!(i==(lastSlide))){

                that.slides[i].className='slide slider__offRight';
            }
        }
        that.slides[lastSlide].className='slide slider__offLeft slider__trans';
        that.slides[that.current].className='slide slider__trans';


        galleryNumber.innerText=gallerySlider.current+1+'/'+galleryImages.length;




    }


    that.manageCurrentClass=function () {
        let dotChilds=that.dots.children;
        for (let x = 0; x < dotChilds.length; x++) {
            dotChilds[x].classList.remove('slider__current');
        }
        that.dots.children[that.current].classList.add('slider__current');
    };


    
    that.changeSlide=function (e) {

        var newCurrent=Number(e.target.dataset.num)-1;
        if(newCurrent>that.current){
            that.current=newCurrent;
            that.isChangeCurrent=false;
            that.nextSlide();
        }else if(newCurrent<that.current){
            that.current=newCurrent;
            that.isChangeCurrent=false;
            that.preSlide();
        }
    }


    that.chkAuto=function () {

        if(that.auto){
            that.nextSlide();
        }

    }



}