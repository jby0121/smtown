$(document).ready(function(){    
    //visual_slide
    var slideText = document.querySelectorAll(".slide_text > a");
    var topLine = document.querySelector(".obj_line");
    
    var visualSlide = $('.visual_slide').bxSlider({
        pagerType : 'short',
        pagerShortSeparator : ' | ',
        auto : true,
        speed : 1000,
        touchEnabled : false,
        onSliderLoad : function(){
            topLine.className = "obj_line " + "slide_0";
        },
        onSlideBefore : textFadeOut,
        onSlideAfter : slideWork
    });
   
    function textFadeOut () {
        for (var i = 0; i < slideText.length; i++) {
            slideText[i].style.opacity = "0";
        }
    }
    function slideWork () {
        for (var i = 0; i < slideText.length; i++) {
            slideText[i].style.visibility = "hidden";
        }
        slideText[visualSlide.getCurrentSlide()].style.visibility = "visible";
        slideText[visualSlide.getCurrentSlide()].style.opacity = "100";
        topLine.className = "obj_line " + ("slide_" + visualSlide.getCurrentSlide());
    }

    //issue_slide
    $('.issue_slide').bxSlider({
        touchEnabled : false,
        controls : false
    });
    
    // video_slide
    $('.video_item_detail').bxSlider({
        mode:'fade',
        controls:false,
        pagerCustom:'#video_pager'
    });

    $('.video_item_thumb').bxSlider({
        pager :false,
        slideMargin : 10,
        minSlides : 5,
        maxSlides : 5,
        moveSlides : 1,
        slideWidth : 208,
        touchEnabled : false
    });

    var thumbsLis = document.querySelectorAll(".video_item_thumb > li");
    for (var i = 0; i < thumbsLis.length; i++ ) {
        thumbsLis[i].addEventListener("click", thumbsWork);
    }
    function thumbsWork (e) {
        e.preventDefault();
        for (var i = 0; i < thumbsLis.length; i++ ) {
            thumbsLis[i].classList.remove("active");
        e.currentTarget.classList.add("active");
        }
    }
    // album_list
    $('.album_list').bxSlider({
        mode:'fade',
        touchEnabled : false,
        controls : false,
        pagerCustom:'#album_pager'
    });

    var coverSlide = document.querySelector('.cover_list');
    var coverLis = coverSlide.querySelectorAll('li');

    var slideIndex = coverLis.length / 2;
    var size = 234;
    var currentSlide = ''; 

    //앞,뒤 4개 배열에 jump class 넣기
    for (var i = 0; i < 4; i++) {
        coverLis[i].classList.add("jump");
    }
    for (var i = coverLis.length - 1; i > coverLis.length-5; i--) {
        coverLis[i].classList.add("jump");
    }
    //슬라이드 처음 시작할떄 중간에 시작하기
    coverSlide.style.transform = 'translateX(' + (-size * slideIndex) + 'px)';
    
    for (var i = 0; i < coverLis.length; i++){
        coverLis[i].addEventListener('click', coverWork);
    };   
    function coverWork (e) {
        currentSlide = e.currentTarget;
        //class remove
        for (let j = 0; j < coverLis.length; j++) {
            coverLis[j].classList.remove("active");
            coverLis[j].classList.remove("zoom");
        }
        currentSlide.classList.add("active");
        setTimeout(function() {
            currentSlide.classList.add("zoom");
        }, 500);

        coverSlide.style.transition = 'transform 0.5s ease-in-out';

        if (e.currentTarget.classList.contains("copy")){
            slideIndex = (e.currentTarget.firstChild.dataset.slideIndex)*1 + 10;
        } else {
            slideIndex = e.currentTarget.firstChild.dataset.slideIndex;
        }
        coverSlide.style.transform = 'translateX(' + (-size * slideIndex) + 'px)'; 
    }

    coverSlide.addEventListener('transitionend', jumpSlide);
    function jumpSlide (e) {
        if (currentSlide.className === 'jump') {
            coverSlide.style.transition = "none";
            slideIndex = Number(slideIndex) + coverLis.length / 2; 
            coverSlide.style.transform = 'translateX(' + (-size * slideIndex) + 'px)';
            currentSlide = coverLis[slideIndex];
        }
        if (currentSlide.className === 'copy jump') {
            coverSlide.style.transition = "none";
            slideIndex = Number(slideIndex) - coverLis.length / 2; 
            coverSlide.style.transform = 'translateX(' + (-size * slideIndex) + 'px)';
            currentSlide = coverLis[slideIndex]; 
        }
    }
    
    //이미지가 돌고 커지는것을 setTimeout으로 늦게 넣어준다. 
//1. 맨처음 시작할떄 coverLis를 복사해서 앞쪽에 넣어준다.
//2. click을 할때 특정범위보다 작거나 크면 transform 없이 무브 먼저
//3. 이동하는 애니메이션 효과 적용
//4. 앨범소개 매치 수정 조건문을 인덱스로 하지말고 배열순서로 수정 인덱스는 복사한것도 0~9까지로만 통일

});
