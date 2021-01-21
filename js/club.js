var club = (function(){

    return {
        init : function(){
            TweenMax.delayedCall(0.3, function(){
                club.mainMot();
            });

            $('.btn_box').click(function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).next('.hidden_box').stop().slideUp();
                }else{
                    $('.hidden_box').stop().slideUp();
                    $('.btn_box').removeClass('active');
                    $(this).addClass('active');
                    $(this).next('.hidden_box').slideDown();
                }
            });
        },

        mainMot : function(){
            club.rollingBg(0);

            TweenMax.delayedCall(0.5, function(){
                $('.art_top').find('.text1').addClass('active');

                TweenMax.delayedCall(0.5, function(){
                    $('.art_top').find('.text2').addClass('active');

                    TweenMax.delayedCall(0.5, function(){
                        $('.logo').addClass('active');
                        $('.scroll_wrap').addClass('active');

                    })
                })
            })
        },
        rollingBg : function(num){
            TweenMax.to($('.main_slide_bg'), 3, {opacity:0,ease: Power4.easeOut});
            TweenMax.set($('.main_slide_bg').eq(num), {scale:1.25});
            TweenMax.to($('.main_slide_bg').eq(num), 3, {scale:1,opacity:1,ease: Power4.easeOut});
        }
    }
})();

club.init();