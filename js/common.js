function setItem( key, val ) {
    localStorage.setItem( key, val );
}
function getItem( arg, del ) {
    del		= typeof del === "boolean" ? del : ( del == undefined ? true : false );
    var		item	= localStorage.getItem( arg );
    if( del )
        localStorage.removeItem( arg );
    return item;
}

var currentTm = function(){
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var closeTm = year+""+month+""+day;

    return closeTm;
}

var setCloseNews = function(){
    var closeTm = currentTm();
    setItem("closeTime", closeTm);
};
function closeNewsletter(){
    setCloseNews();

    $('.newsletter_box').addClass('hide');
}

var getNewsState = function(){
    var state   = "N";
    var curTm = currentTm();
    if(getItem("closeTime", false) == null){
        return state;
    }
    if(getItem("closeTime", false) == curTm){
        state  = "Y";

        if(!$('.newsletter_box').hasClass('hide')){
            $('.newsletter_box').addClass('hide');
        }

    }else{
        localStorage.removeItem( "closeTime" );
        state  = "N";

        console.log('n');
    }
    return state;
};


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var main = '';

if(isMobile.any()) {
    var href = location.href,
        origin,
        replace;

        if(href.indexOf('does.kr') > -1){
            origin = '1811_bmw';
        }else{
            origin = location.origin
        }

    replace = href.replace(origin,origin+'/mobile');
    location.href = replace;
}


function closeFooter(){
    $('.btn_showbox').removeClass('active');
    $('.showbox').stop().slideUp();
}

function closeNewsletter(){
    setCloseNews();

    $('.newsletter_box').addClass('hide');
}

function showFooter(target,name){
    if($('.'+name).hasClass('active')){
        closeFooter();
    }else{
        closeFooter();
        $('.'+target).slideDown();
        $('.'+name).addClass('active');
        TweenMax.to("html, body", 0.5, {scrollTop:$('body').height()});
    }
}

function eventTrack(google){
    if(google != ''){
        gtag('event', google);
    }
}

$(function(){
    $("html").easeScroll();

    gnbSet();

    $(window).scroll(function(){
        var sTop = $(window).scrollTop();

       if(sTop >= ( $(window).height() )) {
           if(getNewsState() != 'Y' && main != 'main'){
               if($('.newsletter_box').hasClass('stop')){
                   $('.newsletter_box').removeClass('stop');
               }

               if(!$('.newsletter_box').hasClass('show')){
                   $('.newsletter_box').addClass('show');
               }
           }
        }

        if($('.footer').length >= 1){
            if(sTop > $('.footer').offset().top - $(window).height()){
                if(getNewsState() != 'Y' && main != 'main'){
                    if(!$('.newsletter_box').hasClass('stop')){
                        $('.newsletter_box').addClass('stop');
                    }
                }
            }
        }
    });

    function gnbSet(){
        var url = window.location.href;

        if(url.indexOf('club')>-1){
            menuOn(1);
        }else if(url.indexOf('models')>-1){
            if(url.indexOf('the8xseoul')>-1){
                return ;
            }else{
                $('.newsletter_box').addClass('hide');
                menuOn(2);
            }
        }else if(url.indexOf('gallery')>-1){
            menuOn(3);
        }else if(url.indexOf('exhibition')>-1){
            menuOn(4);
        }else if(url.indexOf('newsletter')>-1){
            $('.newsletter_box').addClass('hide');
            menuOn(5);
        }else if(url.indexOf('testdrive')>-1){
            $('.newsletter_box').addClass('hide');
            menuOn(6);
        }else{
            menuOn(0);
        }
    }

//    function menuOn(num){
//        $('.top_gnb').find('li').eq(num).find('a').addClass('active');
//
//        if(num == 0){
//            main = 'main';
//        }
//    }

});