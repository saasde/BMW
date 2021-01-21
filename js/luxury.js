var VirtualScroll = (function(document) {

    var vs = {};

    var numListeners, listeners = [], initialized = false;

    var touchStartX, touchStartY;

    // [ These settings can be customized with the options() function below ]
    // Mutiply the touch action by two making the scroll a bit faster than finger movement
    var touchMult = 2;
    // Firefox on Windows needs a boost, since scrolling is very slow
    var firefoxMult = 15;
    // How many pixels to move with each key press
    var keyStep = 120;
    // General multiplier for all mousehweel including FF
    var mouseMult = 1;

    var bodyTouchAction;

    var hasWheelEvent = 'onwheel' in document;
    var hasMouseWheelEvent = 'onmousewheel' in document;
    var hasTouch = 'ontouchstart' in document;
    var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
    var hasPointer = !!window.navigator.msPointerEnabled;
    var hasKeyDown = 'onkeydown' in document;

    var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

    var event = {
        y: 0,
        x: 0,
        deltaX: 0,
        deltaY: 0,
        originalEvent: null
    };

    vs.on = function(f) {
        if(!initialized) initListeners();
        listeners.push(f);
        numListeners = listeners.length;
    }

    vs.options = function(opt) {
        keyStep = opt.keyStep || 120;
        firefoxMult = opt.firefoxMult || 15;
        touchMult = opt.touchMult || 2;
        mouseMult = opt.mouseMult || 1;
    }

    vs.off = function(f) {
        listeners.splice(f, 1);
        numListeners = listeners.length;
        if(numListeners <= 0) destroyListeners();
    }

    var notify = function(e) {
        event.x += event.deltaX;
        event.y += event.deltaY;
        event.originalEvent = e;

        for(var i = 0; i < numListeners; i++) {
            listeners[i](event);
        }
    }

    var onWheel = function(e) {
        // In Chrome and in Firefox (at least the new one)
        event.deltaX = e.wheelDeltaX || e.deltaX * -1;
        event.deltaY = e.wheelDeltaY || e.deltaY * -1;

        // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
        // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if(isFirefox && e.deltaMode == 1) {
            event.deltaX *= firefoxMult;
            event.deltaY *= firefoxMult;
        }

        event.deltaX *= mouseMult;
        event.deltaY *= mouseMult;

        notify(e);
    }

    var onMouseWheel = function(e) {
        // In Safari, IE and in Chrome if 'wheel' isn't defined
        event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
        event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

        notify(e);
    }

    var onTouchStart = function(e) {
        var t = (e.targetTouches) ? e.targetTouches[0] : e;
        touchStartX = t.pageX;
        touchStartY = t.pageY;
    }

    var onTouchMove = function(e) {
        // e.preventDefault(); // < This needs to be managed externally
        var t = (e.targetTouches) ? e.targetTouches[0] : e;

        event.deltaX = (t.pageX - touchStartX) * touchMult;
        event.deltaY = (t.pageY - touchStartY) * touchMult;

        touchStartX = t.pageX;
        touchStartY = t.pageY;

        notify(e);
    }

    var onKeyDown = function(e) {
        // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
        event.deltaX = event.deltaY = 0;
        switch(e.keyCode) {
            case 37:
                event.deltaX = -keyStep;
                break;
            case 39:
                event.deltaX = keyStep;
                break;
            case 38:
                event.deltaY = keyStep;
                break;
            case 40:
                event.deltaY = -keyStep;
                break;
        }

        notify(e);
    }

    var initListeners = function() {
        if(hasWheelEvent) document.addEventListener("wheel", onWheel);
        if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel);

        if(hasTouch) {
            document.addEventListener("touchstart", onTouchStart);
            document.addEventListener("touchmove", onTouchMove);
        }

        if(hasPointer && hasTouchWin) {
            bodyTouchAction = document.body.style.msTouchAction;
            document.body.style.msTouchAction = "none";
            document.addEventListener("MSPointerDown", onTouchStart, true);
            document.addEventListener("MSPointerMove", onTouchMove, true);
        }

        if(hasKeyDown) document.addEventListener("keydown", onKeyDown);

        initialized = true;
    }

    var destroyListeners = function() {
        if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
        if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

        if(hasTouch) {
            document.removeEventListener("touchstart", onTouchStart);
            document.removeEventListener("touchmove", onTouchMove);
        }

        if(hasPointer && hasTouchWin) {
            document.body.style.msTouchAction = bodyTouchAction;
            document.removeEventListener("MSPointerDown", onTouchStart, true);
            document.removeEventListener("MSPointerMove", onTouchMove, true);
        }

        if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

        initialized = false;
    }

    return vs;
})(document);

var luxury = (function(){

    var $window = $(window),
        $videoTop = $('.video_top'),
        controller,
        mainVideo = document.getElementById("main_video"),
        video1 = document.getElementById("video1"),
        video2 = document.getElementById("video2"),
        video3 = document.getElementById("video3"),
        videoTyphoon = document.getElementById("video_typhoon"),
        $movie1 = $('.movie1'),
        $movie2 = $('.movie2'),
        $movie3 = $('.movie3'),
        $movie4 = $('.movie4'),
        $lightArea = $('.light_area'),
        $carArea = $('.car_area'),
        $imgBoxUl = $('.img_box_ul'),
        $btnFloat = $('.btn_float'),
        sectionIdx = 0,
        sectionPos = 0,
        sectionPrvIdx = 0,
        sectionFlag = true;

    return {
        init : function(){
            VirtualScroll.on(function(e) {
                if(!sectionFlag){
                    sectionFlag = true;

                    if(e.deltaY >= 0 ){
                        sectionIdx -= 1;

                        if(sectionIdx < 0){
                            sectionIdx = 0
                        }

                    }else{
                        sectionIdx += 1;

                        if(sectionIdx > 10){
                            sectionIdx = 10;
                        }
                    }

                    if(sectionIdx == 8){
                        sectionPos = 7;
                        TweenMax.to(".wrap_inner", 1, {y:-sectionPos * $window.height(),ease:Power2.easeOut});
                    }else if(sectionIdx == 9){
                        sectionPos = 7;

                        if($window.height() < 1000){
                            TweenMax.to(".wrap_inner", 1, {y:-sectionPos * $window.height() - 700,ease:Power2.easeOut});
                        }else{
                            TweenMax.to(".wrap_inner", 1, {y:-sectionPos * $window.height() - 500,ease:Power2.easeOut});
                        }


                    }else if(sectionIdx == 10){
                        sectionPos = 7;

                        if($window.height() < 1000){
                            TweenMax.to(".wrap_inner", 0.5, {y:-sectionPos * $window.height() - 948,ease:Power2.easeOut});
                        }else{
                            TweenMax.to(".wrap_inner", 0.5, {y:-sectionPos * $window.height() - 748,ease:Power2.easeOut});
                        }

                    }else{
                        sectionPos = sectionIdx;
                        TweenMax.to(".wrap_inner", 1, {y:-sectionIdx * $window.height(),ease:Power2.easeOut});
                    }

                    luxury.scrollInMot(sectionIdx);

                    // console.log('sectionIdx : '+sectionIdx +' , sectionPrvIdx : ');
                }
            });

            $window.resize(function(){
                // console.log('resize : '+sectionIdx);

                if(sectionIdx == 9){
                    if($window.height() < 1000){
                        TweenMax.to(".wrap_inner", 0, {y:-7 * $window.height() - 700});
                    }else{
                        TweenMax.to(".wrap_inner", 0, {y:-7 * $window.height() - 500});
                    }
                }else if(sectionIdx == 10){
                    if($window.height() < 1000){
                        TweenMax.to(".wrap_inner", 0, {y:-7 * $window.height() - 948});
                    }else{
                        TweenMax.to(".wrap_inner", 0, {y:-7 * $window.height() - 748});
                    }
                }else{
                    TweenMax.to(".wrap_inner", 0, {y:-sectionPos * $window.height()});
                }
            });

            $btnFloat.click(function(){
                if(!sectionFlag){
                    sectionFlag = true;

                    if($(this).hasClass('top')){
                        $btnFloat.removeClass('top , show');
                        $('.newsletter_box').removeClass('stop');
                        $('.footer').removeClass('active');
                        sectionIdx = 0;
                        sectionPos = 0;


                    }else{
                        sectionIdx = 7;
                        sectionPos = 7;

                        $btnFloat.addClass('top');
                    }

                    TweenMax.to(".wrap_inner", 1, {y:-sectionIdx * $window.height(),ease:Power2.easeOut});
                    luxury.scrollInMot(sectionIdx);
                }
            });

            luxury.mainMot();
        },
        scrollInMot : function(idx){
            luxury.videoPause();

            if(idx >= 7 ){
                $btnFloat.addClass('top');
            }else{
                $btnFloat.removeClass('top');
            }


            if(idx == 10){
                $('.newsletter_box').addClass('stop');
            }else{
                TweenMax.delayedCall(1, function(){
                    $('.newsletter_box').removeClass('stop');
                });


            }

            switch (idx){
                case 0 :
                    sectionFlag = false;
                    luxury.videoPlay(mainVideo);
                    $btnFloat.removeClass('show');
                    break;
                case 1 :
                    $btnFloat.addClass('show');
                    TweenMax.set($movie1.find('.text_wrap').eq(0).find('.text'), {y:50,opacity:0});
                    TweenMax.set($movie1.find('.text_wrap').eq(0).find('.en_text'), {y:70,opacity:0});
                    TweenMax.to($movie1.find('.text_wrap').eq(0).find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.text_wrap').eq(0).find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    TweenMax.to($movie1.find('.line1'), 1.1, {delay:0.4,y:-320,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line2'), 1.1, {delay:0.4,y:-370,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line3'), 1.1, {delay:0.4,y:260,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line4'), 1.1, {delay:0.4,y:-580,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line5'), 1.1, {delay:0.4,y:-770,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line6'), 1.1, {delay:0.4,y:-110,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line7'), 1.1, {delay:0.4,y:-130,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line8'), 1.1, {delay:0.4,y:250,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.line10'), 1.1, {delay:0.4,y:740,opacity:1,ease:Power2.easeOut});

                    break;
                case 2 :
                    luxury.videoPlay(videoTyphoon);
                    TweenMax.set($movie1.find('.text_wrap').eq(1).find('.text'), {y:50,opacity:0});
                    TweenMax.set($movie1.find('.text_wrap').eq(1).find('.en_text'), {y:70,opacity:0});
                    TweenMax.to($movie1.find('.text_wrap').eq(1).find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie1.find('.text_wrap').eq(1).find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    break;
                case 3 :
                    luxury.videoPlay(video1);
                    TweenMax.set($movie2.find('.text_wrap').find('.text'), {y:50,opacity:0});
                    TweenMax.set($movie2.find('.text_wrap').find('.en_text'), {y:70,opacity:0});
                    TweenMax.to($movie2.find('.text_wrap').find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie2.find('.text_wrap').find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    break;
                case 4 :
                    luxury.videoPlay(video2);
                    TweenMax.set($movie3.find('.text_wrap').find('.text'), {y:50,opacity:0});
                    TweenMax.set($movie3.find('.text_wrap').find('.en_text'), {y:70,opacity:0});
                    TweenMax.to($movie3.find('.text_wrap').find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie3.find('.text_wrap').find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    break;
                case 5 :
                    luxury.videoPlay(video3);
                    TweenMax.set($movie4.find('.text_wrap').find('.text'), {y:50,opacity:0});
                    TweenMax.set($movie4.find('.text_wrap').find('.en_text'), {y:70,opacity:0});
                    TweenMax.to($movie4.find('.text_wrap').find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($movie4.find('.text_wrap').find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    break;
                case 6 :
                    TweenMax.set($lightArea.find('.text_wrap').find('.text'), {y:50,opacity:0});
                    TweenMax.set($lightArea.find('.text_wrap').find('.en_text'), {y:70,opacity:0});
                    TweenMax.set($lightArea.find('.bar1'), {y:340});
                    TweenMax.set($lightArea.find('.bar2'), {y:280});
                    TweenMax.set($lightArea.find('.bar3'), {y:230});
                    TweenMax.set($lightArea.find('.bar4'), {y:180});
                    TweenMax.set($lightArea.find('.bar5'), {y:130});
                    TweenMax.set($lightArea.find('.bar6'), {y:100});
                    TweenMax.set($lightArea.find('.bar7'), {y:70});
                    TweenMax.set($lightArea.find('.bar8'), {y:40});

                    TweenMax.to($lightArea.find('.bar1'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar2'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar3'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar4'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar5'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar6'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar7'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar8'), 1.3, {delay:0.2,y:0,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.text_wrap').find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.text_wrap').find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});
                    break;

                case 7 :
                    $carArea.find('.bmw_logo').removeClass('active');

                    TweenMax.set($carArea.find('.text_wrap').find('.text'), {y:50,opacity:0});
                    TweenMax.set($carArea.find('.text_wrap').find('.en_text'), {y:70,opacity:0});


                    TweenMax.to($lightArea.find('.bar1'), 1, {y:-300,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar2'), 1, {y:-200,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar3'), 1, {y:-175,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar4'), 1, {y:-125,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar5'), 1, {y:-100,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar6'), 1, {y:-75,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar7'), 1, {y:-50,ease:Power2.easeOut});
                    TweenMax.to($lightArea.find('.bar8'), 1, {y:-25,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.road_day'), 0.7, {opacity:1,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.car_day'), 0.7, {opacity:1,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.road_night'), 0.7, {opacity:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.light'), 0.7, {opacity:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.car_night'), 0.7, {opacity:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.text_wrap').find('.text'), 1, {delay:0.8,y:0,opacity:1,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.text_wrap').find('.en_text'), 1, {delay:0.9,y:0,opacity:0.8,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});

                    TweenMax.to($carArea.find('.bmw_logo'), 0.7, {y:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.logo_text'), 0.7, {y:0,opacity:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.line'), 0.7, {y:0,height:0,opacity:0,ease:Power2.easeOut});
                    //
                    TweenMax.set($imgBoxUl.find('li').eq(0), {opacity:0,y:0});
                    TweenMax.set($imgBoxUl.find('li').eq(1), {opacity:0,y:0});
                    TweenMax.set($imgBoxUl.find('li').eq(2), {opacity:0,y:0});
                    TweenMax.set($imgBoxUl.find('li').eq(3), {opacity:0,y:0});

                    break;

                case 8 :

                    TweenMax.to($carArea.find('.bmw_logo'), 0.7, {y:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.logo_text'), 0.7, {y:0,opacity:0,ease:Power2.easeOut});
                    TweenMax.to($carArea.find('.line'), 0.7, {y:0,height:0,opacity:0,ease:Power2.easeOut});


                    if(sectionPrvIdx == 7){
                        TweenMax.delayedCall(0.5, function(){
                            TweenMax.to($carArea.find('.road_night'), 1, {opacity:1,ease:Power2.easeOut});
                            TweenMax.to($carArea.find('.car_night'), 1, {opacity:1,ease:Power2.easeOut});

                            TweenMax.delayedCall(1.5, function(){
                                TweenMax.set($carArea.find('.road_day'), {opacity:0});
                                TweenMax.set($carArea.find('.car_day'), {opacity:0});
                                TweenMax.to($carArea.find('.light'), 1, {opacity:1,ease:Power2.easeOut});

                                TweenMax.delayedCall(1.5, function(){
                                    TweenMax.to($carArea.find('.road_night'), 1, {opacity:0,ease:Power2.easeOut});
                                    TweenMax.to($carArea.find('.light'), 1, {opacity:0,ease:Power2.easeOut});
                                    TweenMax.to($carArea.find('.car_night'), 1, {opacity:0,ease:Power2.easeOut});

                                    TweenMax.delayedCall(1, function(){
                                        $carArea.find('.bmw_logo').addClass('active');

                                        TweenMax.to($carArea.find('.bmw_logo'), 1, {y:-30,ease:Power2.easeOut});
                                        TweenMax.to($carArea.find('.logo_text'), 1, {y:-120,opacity:1,ease:Power2.easeOut});
                                        TweenMax.to($carArea.find('.line'), 1, {y:-80,height:150,opacity:1,ease:Power2.easeOut});
                                        TweenMax.to($imgBoxUl.find('li').eq(0), 1, {opacity:0,y:0,ease:Power2.easeOut});
                                        TweenMax.to($imgBoxUl.find('li').eq(1), 1, {opacity:0,y:0,ease:Power2.easeOut});
                                        TweenMax.to($imgBoxUl.find('li').eq(2), 1, {opacity:0,y:0,ease:Power2.easeOut});
                                        TweenMax.to($imgBoxUl.find('li').eq(3), 1, {opacity:0,y:0,ease:Power2.easeOut,onComplete:function(){
                                                sectionFlag = false;
                                            }});
                                        $carArea.find('.line').addClass('active');


                                        if(getNewsState() != 'Y'){
                                            if($('.newsletter_box').hasClass('stop')){
                                                $('.newsletter_box').removeClass('stop');
                                            }

                                            if(!$('.newsletter_box').hasClass('show')){
                                                $('.newsletter_box').addClass('show');
                                            }
                                        }
                                    });
                                });
                            })
                        });
                    }else{
                        TweenMax.set($carArea.find('.road_day'), {opacity:0});
                        TweenMax.set($carArea.find('.car_day'), {opacity:0});

                        $carArea.find('.line').addClass('active');
                        TweenMax.to($carArea.find('.bmw_logo'), 0.7, {y:-120,ease:Power2.easeOut});
                        TweenMax.to($carArea.find('.logo_text'), 0.7, {y:-120,opacity:1,ease:Power2.easeOut});
                        TweenMax.to($carArea.find('.line'), 0.7, {y:-80,height:150,opacity:1,ease:Power2.easeOut});
                        TweenMax.to($imgBoxUl.find('li').eq(0), 2, {opacity:0,y:0,ease:Power2.easeOut});
                        TweenMax.to($imgBoxUl.find('li').eq(1), 2, {opacity:0,y:0,ease:Power2.easeOut});
                        TweenMax.to($imgBoxUl.find('li').eq(2), 2, {opacity:0,y:0,ease:Power2.easeOut});
                        TweenMax.to($imgBoxUl.find('li').eq(3), 2, {opacity:0,y:0,ease:Power2.easeOut,onComplete:function(){
                                sectionFlag = false;
                            }});
                    }

                    break;

                case 9 :
                    TweenMax.to($imgBoxUl.find('li').eq(0), 1.5, {opacity:1,y:-530,ease:Power2.easeOut});
                    TweenMax.to($imgBoxUl.find('li').eq(1), 1.5, {opacity:1,y:-640,ease:Power2.easeOut});
                    TweenMax.to($imgBoxUl.find('li').eq(2), 1.5, {opacity:1,y:-280,ease:Power2.easeOut});
                    TweenMax.to($imgBoxUl.find('li').eq(3), 1.5, {opacity:1,y:-440,ease:Power2.easeOut,onComplete:function(){
                            sectionFlag = false;
                        }});


                    TweenMax.delayedCall(0.3, function(){
                        $('.footer').removeClass('active');

                        if(getNewsState() != 'Y'){
                            if($('.newsletter_box').hasClass('stop')){
                                $('.newsletter_box').removeClass('stop');
                            }

                            if(!$('.newsletter_box').hasClass('show')){
                                $('.newsletter_box').addClass('show');
                            }
                        }
                    });

                    break;

                case 10 :

                    $('.footer').addClass('active');
                    if(getNewsState() != 'Y'){
                        if(!$('.newsletter_box').hasClass('stop')){
                            $('.newsletter_box').addClass('stop');
                        }
                    }

                    sectionFlag = false;
                    break;
            }

            sectionPrvIdx = idx;
        },
        videoPlay : function(target){
            if(target){
                if(target.paused){

                    TweenMax.delayedCall(0.5, function(){
                        target.play();
                    })

                }
            }
        },
        videoPause : function(){
            mainVideo.pause();
            video1.pause();
            video2.pause();
            video3.pause();
            videoTyphoon.pause();
        },
        mainMot : function(){
            TweenMax.delayedCall(0.3, function(){
                $videoTop.addClass('active');
                TweenMax.delayedCall(0.5, function(){
                    TweenMax.to($('.movie1').find('.video_box'), 0, {opacity:1});
                    $videoTop.find('.text_line').addClass('active');
                    TweenMax.delayedCall(0.5, function(){
                        $videoTop.find('.text1').addClass('active');
                        TweenMax.delayedCall(0.2, function(){
                            $videoTop.find('.text2').addClass('active');
                            TweenMax.delayedCall(0.2, function(){
                                $videoTop.find('.scroll_wrap').addClass('active');
                                TweenMax.delayedCall(0.2, function(){
                                    $('.logo').addClass('active');

                                    sectionFlag = false;
                                })
                            })
                        })
                    })
                })
            })
        }
    }
})();

luxury.init();