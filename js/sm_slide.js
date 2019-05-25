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

    var colCount = 3;
    var colWidth = 340;
    var margin = 28;
    var blocks = [];
    const feedWrap = document.querySelector('.feed_wrap');

    $(document).ready(function() {
        setupBlocks();
      });

    function setupBlocks() {
        console.log(blocks);
        for(let i = 0; i < colCount; i++){
            blocks.push(margin);
        }
        positionBlocks();
        feedWrap.style.height = Array.max(blocks) + 'px';
    }

    function positionBlocks() {
        $('.feed_box').each(function(){
            var min = Array.min(blocks);
            var index = $.inArray(min, blocks);
            var leftPos = margin+(index*(colWidth+margin));
            $(this).css({
                'left':leftPos+'px',
                'top':min+'px'
            });
            blocks[index] = min+$(this).outerHeight()+margin;
        });	
    }

    // Function to get the Min value in Array
    Array.min = function(array) {
            return Math.min.apply(Math, array);
    };
    // Function to get the Max value in Array
    Array.max = function (array) {
        return Math.max.apply(Math, array);
    };

});
