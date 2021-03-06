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

    // album_slide start
    const coverSlide = document.querySelector('.cover_list');
    var coverLis = coverSlide.querySelectorAll('li');

    let currentIndex = coverLis.length / 2;
    const size = 231;

    //슬라이드 처음 시작할때 중간에서 시작하기
    coverSlide.style.transform = 'translateX(' + (-size * currentIndex) + 'px)';
    
    for (let i = 0; i < coverLis.length; i++){
        coverLis[i].addEventListener('click', coverWork);
    };   
    
    //coverLis에 left값을 주는 기능
    function lisLeft () {
        coverLis = coverSlide.querySelectorAll('li');
        let left = 0;
        for (let i = 0; i <coverLis.length; i++) {
            if (coverLis[i].classList.contains("active")) {
                coverLis[i].style.left = (left + 114) + 'px';
                left += 440;                       
            } else {
                coverLis[i].style.left = left + 'px'; 
                left += 212;   
            }
        }
    }
    lisLeft();

    //건너뛴 li 갯수에 따라 이동방향 넣어주는 기능
    function moveLis (currentSlide) {
        let nextIndex = $(currentSlide).index();
        coverLis = coverSlide.querySelectorAll('li');
        if (currentIndex < nextIndex) {
            for (let i = 0; i < (nextIndex - currentIndex); i++) {
                coverSlide.appendChild(coverLis[i]);
            }
        } else if (currentIndex > nextIndex){
            for (let i = coverLis.length; i > nextIndex + currentIndex; i--) {
                coverSlide.insertBefore(coverLis[coverLis.length-1], coverLis[0]);
                coverLis = coverSlide.querySelectorAll('li');
            }
        }
    }

    function coverWork (e) {
        let currentSlide = e.currentTarget;
        //class remove
        for (let j = 0; j < coverLis.length; j++) {
            coverLis[j].classList.remove("active");
            coverLis[j].classList.remove("zoom");
        }
        currentSlide.classList.add("active");
        setTimeout(function() {
            currentSlide.classList.add("zoom");
        }, 500);  
        moveLis (currentSlide);
        lisLeft();
        currentIndex = $(currentSlide).index();
    }
    // album_slide end

    //feed start
    var $grid = $('.feed_wrap').masonry({
        itemSelector: '.feed_box',
        gutter: 28
    });

    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });

    //scroll Works start
    const htmlElem = document.querySelector("html");
    let ticking = false;
    const issue = document.querySelector('.issue_wrap');
    const issueLine = document.querySelector('.main_issue .line_img');
    const albumLine = document.querySelector('.main_album .line_box .line_img');
    const header = document.querySelector('header');
    let prevScroll = 0;

    window.addEventListener("scroll", function(e) {         
        if (!ticking) {
            window.requestAnimationFrame(function(e) {
                var scrollHight = htmlElem.scrollTop;
                issueTop(scrollHight);
                moveIssueLine(scrollHight);
                moveAlbumLine(scrollHight);
                headerWork (scrollHight);
                prevScroll = scrollHight;
                ticking = false;
        });
          ticking = true;
        } //스크롤 이벤트 최적화
    });
    
    function issueTop (scrollHight) {
        if (scrollHight/5 < 130) {
            issue.style.top = scrollHight/5 +'px';
        } else {
            issue.style.top = '130px';
        }
    }
    function moveIssueLine (scrollHight) {
        if (scrollHight > 1000) {
            issueLine.classList.add('active');
        } else if (scrollHight < 1000) {
            issueLine.classList.remove('active');
        }    
    }
    function moveAlbumLine (scrollHight) {
        if (scrollHight > 1700) {
            albumLine.classList.add('active');
        } else if (scrollHight < 1700) {
            albumLine.classList.remove('active');
        }    
    }
    function headerWork (currentScroll) {
        if (currentScroll < prevScroll) {
            header.classList.add('active');
        } else if (currentScroll > prevScroll){
            header.classList.remove('active');
        } 
        if (currentScroll == 0) {
            header.classList.remove('active');
        } 
    }

    //scroll Works end
});
