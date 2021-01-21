var modelsGate = (function(){

    return{
        init : function(){
            modelsGate.loadInMotion();

        },
        loadInMotion : function(){
            for(var i = 1; i<5 ; i++){
                TweenMax.to($('.model_info .model_inner>div').eq(i-1),1.5,{height:'100%',delay:0.2*i,ease: Power2.easeOut});
                TweenMax.to($('.model_info .model_inner>div').eq(i-1).find('.tit'),0.8,{opacity:1,y:0,delay:0.4*i});
                TweenMax.to($('.model_info .model_inner>div').eq(i-1).find('.sub_txt'),0.8,{opacity:1,y:0,delay:0.5*i});
            }

            TweenMax.to($('.model_info .model_bg_line>div'),1,{delay:1,height:'100%',ease: Power2.easeOut});

            $('.model_info .model1').delay(2000).queue(function(){
                $(this).removeClass('soon');
                TweenMax.set($('.model_info .model_inner>div').find('.car_img img'),{autoAlpha:1})

            });
            $('.model_info .model2').delay(2000).queue(function(){
                $(this).removeClass('soon');
                TweenMax.set($('.model_info .model_inner>div').find('.car_img img'),{autoAlpha:1})

            });
            $('.model_info .model3').delay(2000).queue(function(){
                $(this).removeClass('soon');
                TweenMax.set($('.model_info .model_inner>div').find('.car_img img'),{autoAlpha:1})

            });
            $('.model_info .model4').delay(2000).queue(function(){
                $(this).removeClass('soon');
                TweenMax.set($('.model_info .model_inner>div').find('.car_img img'),{autoAlpha:1})

            });
        },
        resizeEvent : function(){
            $('.model_info .model_inner>div').css('height',$(window).height())
        }

    }

})();

var modeilTheX = (function(){

    var player1,player2,player3,player4,player5,player6,player7,player8;
    var mainPlayer;
    var playerId = ['videoExterior','videoInterior','videoConvenience','videoDriving','videoInnovation'];
    var videoPlayer = [];

    var moveFlag = false,
        g_$wrapTheX = $('.wrap.thex7'),
        m_$subNavi = g_$wrapTheX.find('.section_sub_navi'),
        m_$secBoxWrap = $('.section_box_wrap'),
        controller;

    var nowTop;
    var $pop = $('.pop');
    var colorFlag = false;
    var wheelFlag = false;
    var upholsteryFlag = false;
    var trimsFlag = false;
    var selectExterior = 0;
    var selectInterior = 0;
    var selectColorIdx = 0;
    var selectWheelIdx = 0;
    var selectUpholsteryIdx = 0;
    var selectTrimsIdx = 0;
    var carColorArr = [
        [
            {
                "carImg" : "carX7_color1",
                "carNameDetail" : "",
                "coloChip" : "x7_color1",
                "colorName" : "알파인 화이트"
            },
            {
                "carImg" : "carX7_color2",
                "carNameDetail" : "",
                "coloChip" : "x7_color2",
                "colorName" : "블랙 사파이어"
            },
            {
                "carImg" : "carX7_color3",
                "carNameDetail" : "",
                "coloChip" : "x7_color3",
                "colorName" : "미네랄 화이트"
            },
            {
                "carImg" : "carX7_color4",
                "carNameDetail" : "",
                "coloChip" : "x7_color4",
                "colorName" : "선스톤 메탈릭"
            },
            {
                "carImg" : "carX7_color5",
                "carNameDetail" : "",
                "coloChip" : "x7_color5",
                "colorName" : "버몬트 브론즈"
            },
            {
                "carImg" : "carX7_color6",
                "carNameDetail" : "",
                "coloChip" : "x7_color6",
                "colorName" : "아틱 그레이 브릴리언트 이펙트"
            }
        ],
        [
            {
                "carImg" : "carX7design_color1",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color1",
                "colorName" : "알파인 화이트"
            },
            {
                "carImg" : "carX7design_color2",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color2",
                "colorName" : "블랙 사파이어"
            },
            {
                "carImg" : "carX7design_color3",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color3",
                "colorName" : "미네랄 화이트"
            },
            {
                "carImg" : "carX7design_color4",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color4",
                "colorName" : "선스톤 메탈릭"
            },
            {
                "carImg" : "carX7design_color5",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color5",
                "colorName" : "버몬트 브론즈"
            },
            {
                "carImg" : "carX7design_color6",
                "carNameDetail" : "Design Pure <br> Excellence",
                "coloChip" : "x7_color6",
                "colorName" : "아틱 그레이 브릴리언트 이펙트"
            }
        ],
        [
            {
                "carImg" : "carX7msport_color1",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color1",
                "colorName" : "알파인 화이트"
            },
            {
                "carImg" : "carX7msport_color2",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color2",
                "colorName" : "블랙 사파이어"
            },
            {
                "carImg" : "carX7msport_color3",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color3",
                "colorName" : "미네랄 화이트"
            },
            {
                "carImg" : "carX7msport_color4",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color4",
                "colorName" : "선스톤 메탈릭"
            },
            {
                "carImg" : "carX7msport_color5",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color6",
                "colorName" : "버몬트 브론즈"
            },
            {
                "carImg" : "carX7msport_color6",
                "carNameDetail" : "M SPORT <br> PACKAGE",
                "coloChip" : "x7_color7",
                "colorName" : "아틱 그레이 브릴리언트 이펙트"
            }
        ],
        [
            {
                "carImg" : "carX7m50d_color1",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color1",
                "colorName" : "알파인 화이트"
            },
            {
                "carImg" : "carX7m50d_color2",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color2",
                "colorName" : "블랙 사파이어"
            },
            {
                "carImg" : "carX7m50d_color3",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color3",
                "colorName" : "미네랄 화이트"
            },
            {
                "carImg" : "carX7m50d_color4",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color4",
                "colorName" : "선스톤 메탈릭"
            },
            {
                "carImg" : "carX7m50d_color5",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color6",
                "colorName" : "버몬트 브론즈"
            },
            {
                "carImg" : "carX7m50d_color6",
                "carNameDetail" : "M50d",
                "coloChip" : "x7_color7",
                "colorName" : "아틱 그레이 브릴리언트 이펙트"
            }
        ]

    ];
    var carWheelArr = [
        [
            {
                "wheelImg" : "carX7_wheel1",
                "wheelChip" : "carX7_wheelchip1",
                "wheelName" : "휠이름1"
            },
            {
                "wheelImg" : "carX7_wheel2",
                "wheelChip" : "carX7_wheelchip2",
                "wheelName" : "휠이름2"
            }
        ],
        [
            {
                "wheelImg" : "carX7design_wheel1",
                "wheelChip" : "carX7design_wheelchip1",
                "wheelName" : "휠이름1"
            },
            {
                "wheelImg" : "carX7design_wheel2",
                "wheelChip" : "carX7design_wheelchip2",
                "wheelName" : "휠이름2"
            },
            {
                "wheelImg" : "carX7design_wheel3",
                "wheelChip" : "carX7design_wheelchip3",
                "wheelName" : "휠이름3"
            },
            {
                "wheelImg" : "carX7design_wheel4",
                "wheelChip" : "carX7design_wheelchip4",
                "wheelName" : "휠이름4"
            },
            {
                "wheelImg" : "carX7design_wheel5",
                "wheelChip" : "carX7design_wheelchip5",
                "wheelName" : "휠이름5"
            }
        ],
        [
            {
                "wheelImg" : "carX7msport_wheel1",
                "wheelChip" : "carX7msport_wheelchip1",
                "wheelName" : "휠이름1"
            },
            {
                "wheelImg" : "carX7msport_wheel2",
                "wheelChip" : "carX7msport_wheelchip2",
                "wheelName" : "휠이름2"
            },
            {
                "wheelImg" : "carX7msport_wheel3",
                "wheelChip" : "carX7msport_wheelchip3",
                "wheelName" : "휠이름3"
            }
        ],
        [
            {
                "wheelImg" : "carX7m50d_wheel1",
                "wheelChip" : "carX7m50d_wheelchip1",
                "wheelName" : "휠이름1"
            },
            {
                "wheelImg" : "carX7m50d_wheel2",
                "wheelChip" : "carX7m50d_wheelchip2",
                "wheelName" : "휠이름2"
            },
            {
                "wheelImg" : "carX7m50d_wheel3",
                "wheelChip" : "carX7m50d_wheelchip3",
                "wheelName" : "휠이름3"
            },
            {
                "wheelImg" : "carX7m50d_wheel4",
                "wheelChip" : "carX7m50d_wheelchip4",
                "wheelName" : "휠이름4"
            }
        ]
    ];
    var carUpholsteryArr = [
        [
            {
                "upholsteryImg" : "carX7_upholstery1",
                "upholsteryChip" : "x7_upholsterychip1",
                "upholsteryName" : "캔버라 베이지 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7_upholstery2",
                "upholsteryChip" : "x7_upholsterychip2",
                "upholsteryName" : "커피 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7_upholstery3",
                "upholsteryChip" : "x7_upholsterychip3",
                "upholsteryName" : "꼬냑 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7_upholstery4",
                "upholsteryChip" : "x7_upholsterychip4",
                "upholsteryName" : "블랙 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7_upholstery5",
                "upholsteryChip" : "x7_upholsterychip5",
                "upholsteryName" : "아이보리 화이트 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7_upholstery6",
                "upholsteryChip" : "x7_upholsterychip6",
                "upholsteryName" : "커피 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7_upholstery7",
                "upholsteryChip" : "x7_upholsterychip7",
                "upholsteryName" : "블랙 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7_upholstery8",
                "upholsteryChip" : "x7_upholsterychip8",
                "upholsteryName" : "타르투포 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7_upholstery9",
                "upholsteryChip" : "x7_upholsterychip9",
                "upholsteryName" : "아이보리 화이트 / 미드나잇 블루 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            }
        ],
        [
            {
                "upholsteryImg" : "carX7design_upholstery1",
                "upholsteryChip" : "x7_upholsterychip1",
                "upholsteryName" : "캔버라 베이지 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7design_upholstery2",
                "upholsteryChip" : "x7_upholsterychip2",
                "upholsteryName" : "커피 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7design_upholstery3",
                "upholsteryChip" : "x7_upholsterychip3",
                "upholsteryName" : "꼬냑 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7design_upholstery4",
                "upholsteryChip" : "x7_upholsterychip4",
                "upholsteryName" : "블랙 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7design_upholstery5",
                "upholsteryChip" : "x7_upholsterychip5",
                "upholsteryName" : "아이보리 화이트 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7design_upholstery6",
                "upholsteryChip" : "x7_upholsterychip6",
                "upholsteryName" : "커피 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7design_upholstery7",
                "upholsteryChip" : "x7_upholsterychip7",
                "upholsteryName" : "블랙 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7design_upholstery8",
                "upholsteryChip" : "x7_upholsterychip8",
                "upholsteryName" : "타르투포 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7design_upholstery9",
                "upholsteryChip" : "x7_upholsterychip9",
                "upholsteryName" : "아이보리 화이트 / 미드나잇 블루 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            }
        ],
        [
            {
                "upholsteryImg" : "carX7msport_upholstery1",
                "upholsteryChip" : "x7_upholsterychip1",
                "upholsteryName" : "캔버라 베이지 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery2",
                "upholsteryChip" : "x7_upholsterychip2",
                "upholsteryName" : "커피 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery3",
                "upholsteryChip" : "x7_upholsterychip3",
                "upholsteryName" : "꼬냑 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery4",
                "upholsteryChip" : "x7_upholsterychip4",
                "upholsteryName" : "블랙 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery5",
                "upholsteryChip" : "x7_upholsterychip5",
                "upholsteryName" : "아이보리 화이트 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery6",
                "upholsteryChip" : "x7_upholsterychip6",
                "upholsteryName" : "커피 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery7",
                "upholsteryChip" : "x7_upholsterychip7",
                "upholsteryName" : "블랙 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery8",
                "upholsteryChip" : "x7_upholsterychip8",
                "upholsteryName" : "타르투포 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7msport_upholstery9",
                "upholsteryChip" : "x7_upholsterychip9",
                "upholsteryName" : "아이보리 화이트 / 미드나잇 블루 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            }
        ],
        [
            {
                "upholsteryImg" : "carX7m50d_upholstery1",
                "upholsteryChip" : "x7_upholsterychip1",
                "upholsteryName" : "캔버라 베이지 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery2",
                "upholsteryChip" : "x7_upholsterychip2",
                "upholsteryName" : "커피 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery3",
                "upholsteryChip" : "x7_upholsterychip3",
                "upholsteryName" : "꼬냑 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery4",
                "upholsteryChip" : "x7_upholsterychip4",
                "upholsteryName" : "블랙 색상의 버네스카 가죽"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery5",
                "upholsteryChip" : "x7_upholsterychip5",
                "upholsteryName" : "아이보리 화이트 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery6",
                "upholsteryChip" : "x7_upholsterychip6",
                "upholsteryName" : "커피 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery7",
                "upholsteryChip" : "x7_upholsterychip7",
                "upholsteryName" : "블랙 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery8",
                "upholsteryChip" : "x7_upholsterychip8",
                "upholsteryName" : "타르투포 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery9",
                "upholsteryChip" : "x7_upholsterychip9",
                "upholsteryName" : "아이보리 화이트 / 미드나잇 블루 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            },
            {
                "upholsteryImg" : "carX7m50d_upholstery10",
                "upholsteryChip" : "x7_upholsterychip10",
                "upholsteryName" : "아이보리 화이트 / 미드나잇 블루 색상의 BMW 인디비주얼 익스텐디드 메리노 가죽 트림"
            }
        ]
    ];
    var carTrimsArr = [
        [
            {
                "trimsImg" : "carX7_trims1",
                "trimsChip" : "x7_trimschip1",
                "trimsName" : "파인라인 스트라이프 브라운 색상이 적용된 하이글로스 파인우드 트림"
            }
        ],
        [
            {
                "trimsImg" : "carX7design_trims1",
                "trimsChip" : "x7_trimschip1",
                "trimsName" : "파인라인 스트라이프 브라운 색상이 적용된 하이글로스 파인우드 트림"
            },
            {
                "trimsImg" : "carX7design_trims2",
                "trimsChip" : "x7_trimschip2",
                "trimsName" : "포플러 그레인 안트라사이트 브라운 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7design_trims3",
                "trimsChip" : "x7_trimschip3",
                "trimsName" : "애쉬 그레인 블랙 브론즈 이펙트 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7design_trims4",
                "trimsChip" : "x7_trimschip4",
                "trimsName" : "피니셔 피아노 피니쉬 블랙 색상이 적용된 BMW 인디비주얼 인테리어 트림"
            },
            {
                "trimsImg" : "carX7design_trims5",
                "trimsChip" : "x7_trimschip5",
                "trimsName" : "애쉬 그레인 실버 그레이 색상이 적용된 하이글로스 BMW 인디비주얼 파인우드 트림"
            }
        ],
        [
            {
                "trimsImg" : "carX7msport_trims1",
                "trimsChip" : "x7_trimschip1",
                "trimsName" : "파인라인 스트라이프 브라운 색상이 적용된 하이글로스 파인우드 트림"
            },
            {
                "trimsImg" : "carX7msport_trims2",
                "trimsChip" : "x7_trimschip2",
                "trimsName" : "포플러 그레인 안트라사이트 브라운 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7msport_trims3",
                "trimsChip" : "x7_trimschip3",
                "trimsName" : "애쉬 그레인 블랙 브론즈 이펙트 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7msport_trims4",
                "trimsChip" : "x7_trimschip5",
                "trimsName" : "애쉬 그레인 실버 그레이 색상이 적용된 하이글로스 BMW 인디비주얼 파인우드 트림"
            },
            {
                "trimsImg" : "carX7msport_trims5",
                "trimsChip" : "x7_trimschip6",
                "trimsName" : "애쉬 그레인 실버 그레이 색상이 적용된 하이글로스 BMW 인디비주얼 파인우드 트림"
            }
        ],
        [
            {
                "trimsImg" : "carX7m50d_trims1",
                "trimsChip" : "x7_trimschip1",
                "trimsName" : "파인라인 스트라이프 브라운 색상이 적용된 하이글로스 파인우드 트림"
            },
            {
                "trimsImg" : "carX7m50d_trims2",
                "trimsChip" : "x7_trimschip2",
                "trimsName" : "포플러 그레인 안트라사이트 브라운 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7m50d_trims3",
                "trimsChip" : "x7_trimschip3",
                "trimsName" : "애쉬 그레인 블랙 브론즈 이펙트 오픈포어가 적용된 파인우드 트림"
            },
            {
                "trimsImg" : "carX7m50d_trims4",
                "trimsChip" : "x7_trimschip4",
                "trimsName" : "피니셔 피아노 피니쉬 블랙 색상이 적용된 BMW 인디비주얼 인테리어 트림"
            },
            {
                "trimsImg" : "carX7m50d_trims5",
                "trimsChip" : "x7_trimschip5",
                "trimsName" : "애쉬 그레인 실버 그레이 색상이 적용된 하이글로스 BMW 인디비주얼 파인우드 트림"
            },
            {
                "trimsImg" : "carX7m50d_trims6",
                "trimsChip" : "x7_trimschip6",
                "trimsName" : "파인라인 블랙 메탈 이펙트가 적용된 하이글로스 파인우드 트림"
            }
        ]
    ];
    var slideIdx = 0;
    var rollingIdx = 0;
    var $slideUl = $('.slide_ul');
    var $slidePaging =  $('.slide_paging');
    var $slideBar =  $('.slide_bar');
    var $btnSlide = $('.btn_slide');
    var video1 = document.getElementById("video1"),
        video2 = document.getElementById("video2"),
        video3 = document.getElementById("video3"),
        video4 = document.getElementById("video4");

    // slide initial setting
    // slide length
    var $slideleng = parseInt($slideUl.find('li').length),
        $slideBarItemW = parseInt($slidePaging.width() / $slideleng);
    // console.log('last index:' , $slideleng);
    // console.log($slideBarItemW)
    // $slideBar width setting
    $slideBar.css({
        width: $slideBarItemW
    })

    return {
        init : function(_model){
            TweenMax.delayedCall(0.3, function(){
                modeilTheX.mainMot();
            });

            if($('#main_video').length != 0){
                mainPlayer = document.getElementById("main_video");
                mainPlayer.load();
            }

            if(_model !='8' && _model != 'them8xdriving'){
                player1 = document.getElementById(playerId[0]);
                player2 = document.getElementById(playerId[1]);
                player3 = document.getElementById(playerId[2]);
                player4 = document.getElementById(playerId[3]);

                if(_model === 'm8'){
                    player5 = document.getElementById(playerId[4]);
                }
                videoPlayer = [player1, player2, player3, player4, player5];
                player1.load();
                player2.load();

                if(_model === 'm8'){
                    player5.load();
                }

                // driving video load
                if (videoPlayer[4] == 'video#videoDriving'){
                    player4.load();
                }


            }else if(_model === 'them8xdriving'){

                playerId = ['dongkang1','heonhwa_ro1','seongmunbangjoje1','byeolmaro1','jianjae1','35st1','peace_dam1','manhangjae1'];
                player1 = document.getElementById(playerId[0]);
                player2 = document.getElementById(playerId[1]);
                player3 = document.getElementById(playerId[2]);
                player4 = document.getElementById(playerId[3]);
                player5 = document.getElementById(playerId[4]);
                player6 = document.getElementById(playerId[5]);
                player7 = document.getElementById(playerId[6]);
                player8 = document.getElementById(playerId[7]);

                videoPlayer = [player1, player2, player3, player4, player5, player6, player7, player8];
                //player1.load();
                //player2.load();
                //player3.load();
                //player4.load();
                //player5.load();
                //player6.load();
                //player7.load();
                //player8.load();

            }else{

                playerId = ['videoExterior','videoInterior','videoConvenience'];
                player1 = document.getElementById(playerId[0]);
                player2 = document.getElementById(playerId[1]);
                player3 = document.getElementById(playerId[2]);
                videoPlayer = [player1 , player2, player3];
            }


            modeilTheX.roadTopMot(_model);
            //modeilTheX.slideSet();
            if(_model !='8' && _model !='them8xdriving') modeilTheX.scrollMot();

            //modeilTheX.scrollEvent();
            $(window).scroll(function(){
                modeilTheX.scrollEvent(_model)
            });
            modeilTheX.setBtns(_model);
            modeilTheX.selectBox();


            var tabLoad = function(idx){
                m_$secBoxWrap.find('li').removeClass();
                m_$secBoxWrap.find('li').eq(idx).addClass('active');
                m_$subNavi.find('li a').removeClass();
                m_$subNavi.find('li').eq(idx).find('a').addClass('active');
                //$('html,body').animate({'scrollTop':m_$secBoxWrap.find('li').find('.section_box.section_exterior').eq(idx).offset().top}, 500);

                var bgNum = idx+1;
                $('.main_slide_bg').prop('class','main_slide_bg bg'+bgNum);
            };

            //them8xdriving navigation
            if(modeilTheX.getURLParameter('menu') == 'dongkang'){
                tabLoad(0);
            }else if(modeilTheX.getURLParameter('menu') == 'heonhwa_ro'){
                tabLoad(1);
            }else if(modeilTheX.getURLParameter('menu') == 'seongmunbangjoje'){
                tabLoad(2);
            }else if(modeilTheX.getURLParameter('menu') == 'byeolmaro'){
                tabLoad(3);
            }else if(modeilTheX.getURLParameter('menu') == 'jianjae'){
                tabLoad(4);
            }else if(modeilTheX.getURLParameter('menu') == '35st'){
                tabLoad(5);
            }else if(modeilTheX.getURLParameter('menu') == 'peace_dam'){
                tabLoad(6);
            }else if(modeilTheX.getURLParameter('menu') == 'manhangjae'){
                tabLoad(7);
            }
        },
        getURLParameter : function (name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
            );
        },
        mainMot : function(){
            modeilTheX.rollingBg(0);

            TweenMax.delayedCall(0.5, function(){
                $('.art_top').find('.text1').addClass('active');
                modeilTheX.rollingTimer();
                TweenMax.delayedCall(0.5, function(){
                    $('.art_top').find('.text2').addClass('active');

                    TweenMax.delayedCall(0.5, function(){
                        $('.logo').addClass('active');
                        $('.scroll_wrap').addClass('active');
                        // the8xseoul.slideSet();
                    })
                })
            })
        },
        rollingTimer : function(){
            rollingTimer = setInterval(function(){
                rollingIdx += 1;

                if(rollingIdx > 3){
                    rollingIdx = 0;
                }

            },6000);
        },
        rollingBg : function(num){
            TweenMax.to($('.main_slide_bg'), 3, {opacity:0,ease: Power4.easeOut});
            TweenMax.set($('.main_slide_bg').eq(num), {scale:1.25});
            TweenMax.to($('.main_slide_bg').eq(num), 3, {scale:1,opacity:1,ease: Power4.easeOut});
        },
        setBtns : function(_model){
            var m_$subNavi = g_$wrapTheX.find('.section_sub_navi'),
                m_$secNaviBanner = g_$wrapTheX.find('.navi_banner'),
                m_$secExterior = g_$wrapTheX.find('.section_box.section_exterior'),
                m_$secInterior = g_$wrapTheX.find('.section_box.section_interior'),
                m_$secConvenience = g_$wrapTheX.find('.section_box.section_convenience'),
                m_$secDriving = g_$wrapTheX.find('.section_box.section_driving'),
                m_$secBoxWrap = $('.section_box_wrap');

            m_$subNavi.find('ul li a').click(function(){
                var idx = $(this).parent('li').index();

                if(_model != 'them8xdriving'){
                    if(idx == 0){
                        $('html,body').animate({'scrollTop':m_$secExterior.offset().top+72}, 500);
                    }else if(idx == 1){
                        $('html,body').animate({'scrollTop':m_$secInterior.offset().top}, 500);
                    }else if(idx == 2){
                        $('html,body').animate({'scrollTop':m_$secConvenience.offset().top}, 500);
                    }else if(idx == 3){
                        $('html,body').animate({'scrollTop':m_$secDriving.offset().top}, 500);
                    }else if(idx == 4){
                        if((_model === '8') || (_model === 'm8') || (_model === 'm8c')){
                            $(this).parent('li.right').toggleClass('on');
                            m_$secNaviBanner.toggleClass('on');
                            g_$wrapTheX.find('.bg').toggleClass('on');
                        }else{
                            $('html,body').animate({'scrollTop':0}, 500);
                        }
                    }
                }


            });

            g_$wrapTheX.find('.btn_top').click(function(){
                $('html,body').animate({'scrollTop':0}, 500);
            });


            /* exterior */
            $('.btn_prev_exterior').click(function(){
                selectExterior -= 1;
                if(selectExterior < 0){
                    selectExterior = 3;
                }
                modeilTheX.selectExterior(selectExterior);
            });
            $('.btn_next_exterior').click(function(){
                selectExterior += 1;
                if(selectExterior > 3){
                    selectExterior = 0;
                }
                modeilTheX.selectExterior(selectExterior);
            });
            $('.exterior_tab').find('a').click(function(){
                var idx = $(this).parent().index();

                $('.exterior_tab').find('li').removeClass('active');
                $(this).parent('li').addClass('active');

                $('.exterior_contents').removeClass('active');
                $('.exterior_contents').eq(idx).addClass('active');
            });

            /* interior */
            $('.btn_prev_interior').click(function(){
                selectInterior -= 1;
                if(selectInterior < 0){
                    selectInterior = 3;
                }
                modeilTheX.selectInterior(selectInterior);
            });
            $('.btn_next_interior').click(function(){
                selectInterior += 1;
                if(selectInterior > 3){
                    selectInterior = 0;
                }
                modeilTheX.selectInterior(selectInterior);
            });
            $('.interior_tab').find('a').click(function(){
                var idx = $(this).parent().index();

                $('.interior_tab').find('li').removeClass('active');
                $(this).parent('li').addClass('active');

                $('.interior_contents').removeClass('active');
                $('.interior_contents').eq(idx).addClass('active');
            });


            /* 썸네일 슬라이드 */
            $slideUl.find('li').mouseenter(function(e){
                if($(this).hasClass('active')){
                    $(this).find('.btn_a').addClass('active');

                    var offLeft = e.pageX - $(this).offset().left - 54;
                    var offTop = e.pageY - $(this).offset().top - 54;
                    TweenMax.to($btnSlide, 0, {x:offLeft,y:offTop});

                    if(offLeft > 383){
                        if(!$btnSlide.hasClass('next')){
                            $btnSlide.addClass('next').removeClass('prev');
                        }
                    }else{
                        if(!$btnSlide.hasClass('prev')){
                            $btnSlide.addClass('prev').removeClass('next');
                        }
                    }
                }
            });
            $slideUl.find('li').mousemove(function(e){
                if($(this).hasClass('active')){
                    var offLeft = e.pageX - $(this).offset().left - 54;
                    var offTop = e.pageY - $(this).offset().top - 54;

                    if(offTop < 0){
                        offTop = 0;
                    }else if(offTop > 820 - 54){
                        offTop = 460 - 54;
                    }

                    if(offLeft < 0){
                        offLeft = 0;
                    }else if(offLeft > 820 - 54){
                        offLeft = 460 - 54;
                    }

                    if(offLeft > 383){
                        if(!$btnSlide.hasClass('next')){
                            $btnSlide.addClass('next').removeClass('prev');
                        }
                    }else{
                        if(!$btnSlide.hasClass('prev')){
                            $btnSlide.addClass('prev').removeClass('next');
                        }
                    }

                    TweenMax.to($btnSlide, 0.1, {x:offLeft,y:offTop});
                }
            });

            $slideUl.find('li').mouseleave(function(){
                $btnSlide.removeClass('prev , next');
            });

            $slideUl.find('li').click(function(){

                if($(this).hasClass('active')){
                    if($btnSlide.hasClass('next')){
                        slideIdx += 1;

                        if(slideIdx > $slideleng-1){
                            slideIdx = $slideleng-1;
                        }
                        modeilTheX.slideThumb(slideIdx, $slideleng);
                    }else if($btnSlide.hasClass('prev')){
                        slideIdx -= 1;
                        if(slideIdx < 0){
                            slideIdx = 0;
                        }
                        modeilTheX.slideThumb(slideIdx, $slideleng);
                    }
                }
            });



            $('.video_tab').find('a').click(function(){
                var idx = $(this).parent().index();
                modeilTheX.videoShow(idx,_model);
            });


            $('.btn_video_pop1').click(function(){
                modeilTheX.videoShow(3,_model);
                modeilTheX.showPop('pop_video');
            });

            $('.btn_video_pop2').click(function(){
                modeilTheX.videoShow(0,_model);
                modeilTheX.showPop('pop_video');
            });

            $('.btn_video_pop3').click(function(){
                modeilTheX.videoShow(2,_model);
                modeilTheX.showPop('pop_video');
            });

            $('.btn_video_pop4').click(function(){
                modeilTheX.videoShow(1,_model);
                modeilTheX.showPop('pop_video');
            });
        },
        videoPlay : function(target){
            if(target){
                if(target.paused){
                    TweenMax.delayedCall(0.5, function(){
                        target.play();
                    });
                }
            }
        },
        videoPause : function(_model){
            if(_model == '7'){

                video1.pause();
                video2.pause();
                video3.pause();
            }else{
                video1.pause();
                video2.pause();
                video3.pause();
                video4.pause();
            }
        },
        videoShow : function(idx,_model){
            modeilTheX.videoPause(_model);

            $('.video_tab').find('li').removeClass('active');
            $('.video_tab').find('li').eq(idx).addClass('active');

            switch (idx){
                case 0 : modeilTheX.videoPlay(video1); break;
                case 1 : modeilTheX.videoPlay(video2); break;
                case 2 : modeilTheX.videoPlay(video3); break;
                case 3 : modeilTheX.videoPlay(video4); break;
            }

            $('.video_contents').removeClass('active');
            $('.video_contents').eq(idx).addClass('active');
        },
        slideThumb : function(idx, $slideleng){

            var $moveW = $('.slide_paging').width() / $slideleng;

            TweenMax.to($slideUl, 1, {x:idx * -900,ease: Power3.easeOut});
            TweenMax.to($slideBar, 1, {x:idx * $moveW,ease: Power3.easeOut});

            $slideUl.find('li').removeClass('active');
            $slideUl.find('li').eq(idx).addClass('active');
        },
        selectExterior : function(idx){
            var carDom = '',
                wheelDom = '';

            selectColorIdx = 0;
            selectWheelIdx = 0;

            for(var i=0;i<carColorArr[idx].length;i++){
                carDom += '<li>';

                if(i == selectColorIdx){
                    carDom += '<a href="javascript:void(0);" class="mot3 active">';
                }else{
                    carDom += '<a href="javascript:void(0);" class="mot3">';
                }

                carDom += '<img src='+resourceDomain+'/images/models/thex7/exterior/'+carColorArr[idx][i].coloChip+'.jpg alt="">';
                carDom += '</a>';
                carDom += '</li>';
            }

            for(var w=0;w<carWheelArr[idx].length;w++){
                wheelDom += '<li>';

                if(w == selectColorIdx){
                    wheelDom += '<a href="javascript:void(0);" class="mot3 active">';
                }else{
                    wheelDom += '<a href="javascript:void(0);" class="mot3">';
                }

                wheelDom += '<img src='+resourceDomain+'/images/models/thex7/exterior/'+carWheelArr[idx][w].wheelChip+'.png alt="">';
                wheelDom += '</a>';
                wheelDom += '</li>';
            }

            $('.color_chip_ul').html(carDom);
            $('.wheel_chip_ul').html(wheelDom);
            $('.car_model_detail').html(carColorArr[idx][0].carNameDetail);
            $('.now_car').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carColorArr[idx][selectColorIdx].carImg+'.jpg');
            $('.now_wheel').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carWheelArr[idx][selectWheelIdx].wheelImg+'.jpg');
            $('.color_name_box').html(carColorArr[idx][selectColorIdx].wheelName);
            $('.wheel_name_box').html(carWheelArr[idx][selectWheelIdx].wheelName);

            /* 컬러칩 선택시 */
            $('.color_chip_ul').find('a').click(function(){
                if(!colorFlag){
                    colorFlag = true;

                    var _idx = $(this).parent().index();
                    selectColorIdx = _idx;

                    $('.color_chip_ul').find('a').removeClass('active');
                    $(this).addClass('active');

                    $('.color_name_box').html(carColorArr[idx][_idx].colorName);
                    $('.next_car').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carColorArr[idx][selectColorIdx].carImg+'.jpg');
                    $('.next_car').fadeIn(function(){
                        $('.now_car').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carColorArr[idx][selectColorIdx].carImg+'.jpg');
                        $('.next_car').hide();
                        colorFlag = false;
                    });
                }
            });

            /* 휠칩 선택시 */
            $('.wheel_chip_ul').find('a').click(function(){
                if(!wheelFlag){
                    wheelFlag = true;

                    var _idx = $(this).parent().index();
                    selectWheelIdx = _idx;

                    $('.wheel_chip_ul').find('a').removeClass('active');
                    $(this).addClass('active');

                    $('.wheel_name_box').html(carWheelArr[idx][selectWheelIdx].wheelName);
                    $('.next_wheel').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carWheelArr[idx][selectWheelIdx].wheelImg+'.jpg');
                    $('.next_wheel').fadeIn(function(){
                        $('.now_wheel').attr('src',resourceDomain+'/images/models/thex7/exterior/'+carWheelArr[idx][selectWheelIdx].wheelImg+'.jpg');
                        $('.next_wheel').hide();
                        wheelFlag = false;
                    });
                }
            });
        },
        selectInterior : function(idx){
            var upholsteryDom = '',
                trimsDom = '';

            selectUpholsteryIdx = 0;
            selectTrimsIdx = 0;

            for(var i=0;i<carUpholsteryArr[idx].length;i++){
                upholsteryDom += '<li>';

                if(i == selectUpholsteryIdx){
                    upholsteryDom += '<a href="javascript:void(0);" class="mot3 active">';
                }else{
                    upholsteryDom += '<a href="javascript:void(0);" class="mot3">';
                }

                upholsteryDom += '<img src='+resourceDomain+'/images/models/thex7/interior/'+carUpholsteryArr[idx][i].upholsteryChip+'.jpg alt="">';
                upholsteryDom += '</a>';
                upholsteryDom += '</li>';
            }

            for(var w=0;w<carTrimsArr[idx].length;w++){
                trimsDom += '<li>';

                if(w == selectUpholsteryIdx){
                    trimsDom += '<a href="javascript:void(0);" class="mot3 active">';
                }else{
                    trimsDom += '<a href="javascript:void(0);" class="mot3">';
                }

                trimsDom += '<img src='+resourceDomain+'/images/models/thex7/interior/'+carTrimsArr[idx][w].trimsChip+'.jpg alt="">';
                trimsDom += '</a>';
                trimsDom += '</li>';
            }

            $('.upholstery_chip_ul').html(upholsteryDom);
            $('.trims_chip_ul').html(trimsDom);
            $('.car_model_detail').html(carColorArr[idx][0].carNameDetail);
            $('.now_upholstery').attr('src',resourceDomain+'/images/models/thex7/interior/'+carUpholsteryArr[idx][selectUpholsteryIdx].upholsteryImg+'.jpg');
            $('.now_trims').attr('src',resourceDomain+'/images/models/thex7/interior/'+carTrimsArr[idx][selectUpholsteryIdx].trimsImg+'.jpg');
            $('.upholstery_name_box').html(carUpholsteryArr[idx][selectUpholsteryIdx].upholsteryName);
            $('.trims_name_box').html(carTrimsArr[idx][selectTrimsIdx].trimsName);

            /* 시트칩 선택시 */
            $('.upholstery_chip_ul').find('a').click(function(){
                if(!upholsteryFlag){
                    upholsteryFlag = true;

                    var _idx = $(this).parent().index();
                    selectUpholsteryIdx = _idx;

                    $('.upholstery_chip_ul').find('a').removeClass('active');
                    $(this).addClass('active');

                    $('.upholstery_name_box').html(carUpholsteryArr[idx][_idx].upholsteryName);
                    $('.next_upholstery').attr('src',resourceDomain+'/images/models/thex7/interior/'+carUpholsteryArr[idx][selectUpholsteryIdx].upholsteryImg+'.jpg');
                    $('.next_upholstery').fadeIn(function(){
                        $('.now_upholstery').attr('src',resourceDomain+'/images/models/thex7/interior/'+carUpholsteryArr[idx][selectUpholsteryIdx].upholsteryImg+'.jpg');
                        $('.next_upholstery').hide();
                        upholsteryFlag = false;
                    });
                }
            });

            /* 트림칩 선택시 */
            $('.trims_chip_ul').find('a').click(function(){
                if(!trimsFlag){
                    trimsFlag = true;

                    var _idx = $(this).parent().index();
                    selectUpholsteryIdx = _idx;

                    $('.trims_chip_ul').find('a').removeClass('active');
                    $(this).addClass('active');

                    $('.trims_name_box').html(carTrimsArr[idx][selectUpholsteryIdx].trimsName);
                    $('.next_trims').attr('src',resourceDomain+'/images/models/thex7/interior/'+carTrimsArr[idx][selectUpholsteryIdx].trimsImg+'.jpg');
                    $('.next_trims').fadeIn(function(){
                        $('.now_trims').attr('src',resourceDomain+'/images/models/thex7/interior/'+carTrimsArr[idx][selectUpholsteryIdx].trimsImg+'.jpg');
                        $('.next_trims').hide();
                        trimsFlag = false;
                    });
                }
            });
        },
        scrollEvent : function(_model){
            var m_sTop = $(window).scrollTop();
            var m_winHeight = $(window).height();

            if(m_sTop>g_$wrapTheX.find('.video_top').height()){
                if(!g_$wrapTheX.find('.middle_model_info .section_sub_navi').hasClass('show')){
                    g_$wrapTheX.find('.middle_model_info .section_sub_navi').addClass('show');
                    g_$wrapTheX.find('.btn_top').addClass('show')
                }
            }else{
                if(g_$wrapTheX.find('.middle_model_info .section_sub_navi').hasClass('show')){
                    g_$wrapTheX.find('.middle_model_info .section_sub_navi').removeClass('show');
                    if(_model == '8'){
                        g_$wrapTheX.find('.middle_model_info .navi_banner').removeClass('on');
                        g_$wrapTheX.find('.middle_model_info .sub_navi_inner li.right').removeClass('on');
                        g_$wrapTheX.find('.bg').removeClass('on');
                    }

                    g_$wrapTheX.find('.btn_top').removeClass('show')
                }
            }

            if(_model != 'them8xdriving'){
                var sectionTop = [];
                for(var i=0;i<4;i++){
                    sectionTop[i] = $('.section_box').eq(i).offset().top;
                    if(m_sTop >= sectionTop[i] - 72){
                        g_$wrapTheX.find('.middle_model_info .section_sub_navi ul li').find('a').removeClass('active');
                        g_$wrapTheX.find('.middle_model_info .section_sub_navi ul').find('li').eq(i).find('a').addClass('active');
                    }
                }
            }

            /*  */
            $(".onScreen1").each(function(i, e) {
                var elemTop = $(this).offset().top -m_winHeight,
                    elemBottom = elemTop + $(this).outerHeight(),
                    scrollBottom = m_sTop - m_winHeight,
                    dummyHeight = 300;
                var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));
                if(isScrollView){

                    if($(this).hasClass('active')){return;}
                    var targetId = $(this).find('video').attr('id');
                    if(!targetId){return;}

                    if(targetId === playerId[0]){

                        videoPlayer[0].play();
                        $(this).addClass('active');
                    }

                }else{
                    if($(this).hasClass('active')){
                        var id = $(this).find('video').attr('id'),
                            idx = playerId.indexOf(id);
                        if(idx === 0){
                            //videoPlayer[0].currentTime =0;
                        }
                        videoPlayer[0].pause();
                        // $('#videoExterior').attr('controls','controls');
                        // $('#videoExterior').removeAttr('loop');

                        $(this).removeClass('active');
                    }
                }
            });
            /*  */
            $(".onScreen2").each(function(i, e) {
                var elemTop = $(this).offset().top -m_winHeight,
                    elemBottom = elemTop + $(this).outerHeight(),
                    scrollBottom = m_sTop - m_winHeight,
                    dummyHeight = 300;
                var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));

                if(isScrollView){

                    if($(this).hasClass('active')){return;}
                    var targetId = $(this).find('video').attr('id');
                    if(!targetId){return;}

                    if(targetId === playerId[1]){

                        videoPlayer[1].play();
                        $(this).addClass('active');
                        //jyj
                    }

                }else{
                    if($(this).hasClass('active')){
                        var id = $(this).find('video').attr('id'),
                            idx = playerId.indexOf(id);
                        if(idx === 0){
                            //videoPlayer[1].currentTime =0;
                        }
                        videoPlayer[1].pause();
                        // $('#videoExterior').attr('controls','controls');
                        // $('#videoExterior').removeAttr('loop');

                        $(this).removeClass('active');
                    }
                }
            });

            // driving video
            if(_model != '7' && _model != '8' && _model != 'm8c' && _model != 'them8xdriving'){
                $(".onScreen3").each(function(i, e) {

                    var elemTop = $(this).offset().top -m_winHeight,
                        elemBottom = elemTop + $(this).outerHeight(),
                        scrollBottom = m_sTop - m_winHeight,
                        dummyHeight = 300;
                    var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));
                    if(isScrollView){

                        if($(this).hasClass('active')){return;}
                        var targetId = $(this).find('video').attr('id');
                        if(!targetId){return;}

                        if(targetId === playerId[4]){
                            videoPlayer[4].play();
                            $(this).addClass('active');
                        }


                    }else{
                        if($(this).hasClass('active')){
                            var id = $(this).find('video').attr('id'),
                                idx = playerId.indexOf(id);
                            if(idx === 0){
                                //videoPlayer[1].currentTime =0;
                            }
                            videoPlayer[4].pause();
                            $(this).removeClass('active');

                        }
                    }

                });
            }

            if(_model == '7'){
                $(".onScreen3").each(function(i, e) {
                    var elemTop = $(this).offset().top -m_winHeight,
                        elemBottom = elemTop + $(this).outerHeight(),
                        scrollBottom = m_sTop - m_winHeight,
                        dummyHeight = 300;
                    var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));
                    if(isScrollView){

                        if($(this).hasClass('active')){return;}
                        var targetId = $(this).find('video').attr('id');
                        if(!targetId){return;}

                        if(targetId === playerId[3]){
                            videoPlayer[3].play();
                            $(this).addClass('active');
                        }

                    }else{
                        if($(this).hasClass('active')){
                            var id = $(this).find('video').attr('id'),
                                idx = playerId.indexOf(id);
                            videoPlayer[3].pause();

                            $(this).removeClass('active');
                        }
                    }
                });
            }

            if(_model == '8'){
                $(".onScreen3").each(function(i, e) {
                    var elemTop = $(this).offset().top -m_winHeight,
                        elemBottom = elemTop + $(this).outerHeight(),
                        scrollBottom = m_sTop - m_winHeight,
                        dummyHeight = 300;
                    var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));

                    if(isScrollView){

                        if($(this).hasClass('active')){return;}
                        var targetId = $(this).find('video').attr('id');
                        if(!targetId){return;}

                        if(targetId === playerId[2]){

                            videoPlayer[2].play();
                            $(this).addClass('active');
                        }

                    }else{
                        if($(this).hasClass('active')){
                            var id = $(this).find('video').attr('id'),
                                idx = playerId.indexOf(id);
                            if(idx === 0){
                                //videoPlayer[1].currentTime =0;
                            }
                            videoPlayer[2].pause();
                            // $('#videoExterior').attr('controls','controls');
                            // $('#videoExterior').removeAttr('loop');

                            $(this).removeClass('active');

                        }
                    }
                });
            }

            if(_model == 'm8c'){
                $(".onScreen3").each(function(i, e) {
                    var elemTop = $(this).offset().top -m_winHeight,
                        elemBottom = elemTop + $(this).outerHeight(),
                        scrollBottom = m_sTop - m_winHeight,
                        dummyHeight = 300;
                    var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));

                    if(isScrollView){
                        if($(this).hasClass('active')){return;}
                        var targetId = $(this).find('video').attr('id');
                        if(!targetId){return;}

                        if(targetId === playerId[3]){
                            videoPlayer[3].play();
                            $(this).addClass('active');
                        }
                    }else{
                        if($(this).hasClass('active')){
                            var id = $(this).find('video').attr('id'),
                                idx = playerId.indexOf(id);
                            if(idx === 0){
                                //videoPlayer[1].currentTime =0;
                            }

                            videoPlayer[3].pause();
                            $(this).removeClass('active');
                        }

                    }
                });
            }

            // them8xdriving video
            if(_model == 'them8xdriving'){

                var videoNum = playerId.length + 1;
                for(var idx = 1; idx < videoNum; idx++){

                    $(".onScreen"+idx).each(function(i, e) {
                        var elemTop = $(this).offset().top -m_winHeight,
                            elemBottom = elemTop + $(this).outerHeight(),
                            scrollBottom = m_sTop - m_winHeight,
                            dummyHeight = 300;
                        var isScrollView = (elemTop <= (m_sTop -dummyHeight) && elemBottom >= (scrollBottom + dummyHeight));

                        if(isScrollView){
                            if($(this).hasClass('active')){return;}
                            var targetId = $(this).find('video').attr('id');
                            if(!targetId){return;}
                            if(targetId === playerId[idx-1]){
                                videoPlayer[idx-1].play();
                                $(this).addClass('active');
                            }
                        }else{
                            if($(this).hasClass('active')){
                                videoPlayer[idx-1].pause();
                                $(this).removeClass('active');
                            }

                        }
                    });
                }

            }


        },
        slideSet : function(){
            var $searchSlide = $('.slide_area');

            $searchSlide.slidesjs({
                width: 1020,
                height: 450,
                callback: {
                    complete:function(){
                        moveFlag = false;
                    },
                    start: function(number) {
                        moveFlag = true;
                        TweenMax.to($('.slide_paging').find('.bar'), 0.5, {x:116 * (number - 1)});
                        TweenMax.to( $searchSlide.find('.slidesjs-control').find('img'), 0.5, {x:0});
                        $searchSlide.find('.btn_cursor').addClass('active');
                    }
                },
                navigation: false
            });

            modeilTheX.slideHover($searchSlide);
        },
        slideHover : function(target){
            var targetWidth = target.width(),
                halfWidth = targetWidth / 2,
                targetHei = target.height(),
                posLeft,
                $searchSlide = target.find('.slidesjs-control').find('img'),

                $btnCursor = target.find('.btn_cursor');

            target.mouseenter(function(e){
                var offLeft = e.pageX - $(this).offset().left - 27;
                var offTop = e.pageY - $(this).offset().top - 27;

                TweenMax.to( $btnCursor, 0, {x: offLeft,y:offTop});
                posCheck(offLeft);
            });

            target.mousemove(function(e){
                var offLeft = e.pageX - $(this).offset().left - 27;
                var offTop = e.pageY - $(this).offset().top - 27;

                if(offTop < 0){
                    offTop = 0;
                }else if(offTop > targetHei - 54){
                    offTop = targetHei - 54;
                }

                if(offLeft < 0){
                    offLeft = 0;
                }else if(offLeft > targetWidth - 54){
                    offLeft = targetWidth - 54;
                }

                TweenMax.to( $btnCursor, 0.1, {x: offLeft,y:offTop,force3D:true});
                posCheck(offLeft);
            });

            function posCheck(offLeft){
                if(offLeft > halfWidth){
                    if(!$btnCursor.hasClass('next')){
                        $btnCursor.addClass('next').removeClass('prev');
                    }

                    if(moveFlag){
                        return;
                    }

                    if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1 ){
                        posLeft = modeilTheX.relativeValue(offLeft,halfWidth,targetWidth, 0, -100,true);


                        TweenMax.to( $searchSlide, 0.5, {x:posLeft});

                    }
                }else{
                    posLeft = modeilTheX.relativeValue(offLeft,0,halfWidth,100,0,true);

                    if(!$btnCursor.hasClass('prev')){
                        $btnCursor.addClass('prev').removeClass('next');
                    }

                    if(moveFlag){
                        return;
                    }

                    if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1 ){

                        TweenMax.to( $searchSlide, 0.5, {x:posLeft});

                    }
                }
            }

            target.mouseleave(function(){
                $btnCursor.removeClass('prev , next');

                TweenMax.to( $searchSlide, 0.5, {x:0});

            });
        },
        relativeValue : function(value, minR, maxR, minV , maxV , round){
            var num = (value - minR) * (maxV - minV) / (maxR - minR) + minV;

            if(round == true){
                return num.toFixed(0);
            }else{
                return num;
            }
        },
        scrollMot : function(){
            controller = new ScrollMagic.Controller();

            /* ======================================== section_exterior ======================================== */

            new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_video',triggerHook:"onEnter",duration: 0,offset:-200})
                .setTween(
                new TimelineMax().to($('.section_exterior .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                    .to($('.section_exterior .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
                .setTween(
                new TimelineMax().to($('.section_exterior .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_exterior .sec_deco_boco .info_box6'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})

            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);


            new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
                .setTween(
                new TimelineMax().to($('.section_exterior .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                    .to($('.section_exterior .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);


            /* ======================================== section_interior ======================================== */

            new ScrollMagic.Scene({triggerElement: '.section_interior .sec_video',triggerHook:"onEnter",duration: 0,offset:-300})
                .setTween(
                new TimelineMax().to($('.section_interior .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                    .to($('.section_interior .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_interior .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: '.section_interior .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
                .setTween(
                new TimelineMax().to($('.section_interior .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_interior .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})

            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: '.section_interior .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
                .setTween(
                new TimelineMax().to($('.section_interior .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                    .to($('.section_interior .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);


            /* ======================================== section_convenience ======================================== */

            new ScrollMagic.Scene({triggerElement: '.section_convenience .sec_video',triggerHook:"onEnter",duration: 0,offset:-300})
                .setTween(
                new TimelineMax().to($('.section_convenience .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                    .to($('.section_convenience .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_convenience .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_convenience .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_convenience .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);


            /* ======================================== section_driving ======================================== */

            new ScrollMagic.Scene({triggerElement: '.section_driving .sec_intro_top',triggerHook:"onEnter",duration: 0,offset:-300})
                .setTween(
                new TimelineMax().to($('.section_driving .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                    .to($('.section_driving .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_driving .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: '.section_driving .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
                .setTween(
                new TimelineMax().to($('.section_driving .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box6'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                    .to($('.section_driving .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

            new ScrollMagic.Scene({triggerElement: '.section_driving .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
                .setTween(
                new TimelineMax().to($('.section_driving .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                    .to($('.section_driving .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);




            /* ======================================== bottom_etc ======================================== */

            /*new ScrollMagic.Scene({triggerElement: '.bottom_etc .sec_etc_slide_area',triggerHook:"onEnter",duration: 0,offset:600})
             .setTween(
             new TimelineMax().to($('.bottom_etc .sec_etc_slide_area'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
             )
             //.addIndicators()
             .reverse(false)
             .addTo(controller);*/

            new ScrollMagic.Scene({triggerElement: '.bottom_etc .sec_etc_testdrive',triggerHook:"onEnter",duration: 0,offset:280})
                .setTween(
                new TimelineMax().to($('.bottom_etc .sec_etc_testdrive').find('.copy_tit'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
                    .to($('.bottom_etc .sec_etc_testdrive').find('.copy_sub'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
                    .to($('.bottom_etc .sec_etc_testdrive').find('.copy_btn'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
            )
                //.addIndicators()
                .reverse(false)
                .addTo(controller);

        },
        roadTopMot : function(_model){
            TweenMax.to($('.thex7 .video_top'),0.5,{opacity:1,ease: Power2.easeOut});
            TweenMax.to($('.thex7 .video_top .text_box'),0.8,{opacity:1,y:0,delay:0.8,ease: Power2.easeOut});
            if(_model=='8')TweenMax.to($('.thex7 .video_top .text_box span'),0.8,{opacity:1,y:0,delay:1.2,ease: Power2.easeOut});
            TweenMax.to($('.thex7 .video_top .logo'),0.8,{opacity:1,delay:1.2,ease: Power2.easeOut});
            TweenMax.to($('.thex7 .video_top .scroll_wrap'),0.8,{opacity:1,delay:1.1,ease: Power2.easeOut});
        },
        showPop : function(target){
            $('.'+target).fadeIn(function(){
                nowTop = $(window).scrollTop();
                $('body').addClass('fixed');
            });

            if(target == 'pop_exterior'){
                modeilTheX.selectExterior(0);
            }else if(target == 'pop_interior'){
                modeilTheX.selectInterior(0);
            }
        },
        closePop : function(target,_model){
            $pop.fadeOut();
            $('body').removeClass('fixed');
            $('html,body').animate({'scrollTop':nowTop}, 0);

            if(target == 'video'){
                modeilTheX.videoPause(_model);
            }
        },
        selectBox : function(){
            var g_$selArea = $('.gu_sort_area'),
                g_$selBox = $('.gu_selectbox'),
                g_$selBtn = $('.gu_sort_name a'),
                g_$selBtnsList = $('.custom_scroll_content a'),
                selFlag = true;

            if($('.gu_custom_scroll').length != 0){
                $('.gu_custom_scroll').nanoScroller();
            }

            addEvents();
            calcHeight();

            function addEvents() {
                // selectbox on/off
                g_$selBtn.on('click', function(e) {

                    e.stopPropagation();

                    if(selFlag == true){
                        $(this).parents('.gu_sort_area').addClass('open');
                        $(this).parent().next('.gu_selectbox').addClass('on');
                        selFlag = false;
                    }else{
                        $(this).parents('.gu_sort_area').removeClass('open');
                        $(this).parent().next('.gu_selectbox').removeClass('on');
                        selFlag = true;
                    }
                });

                // active selectbox
                g_$selBtnsList.on('click', function() {
                    var m_$selActiveName = $(this).parents('.gu_selectbox').prev('.gu_sort_name').find('a');
                    g_$selArea.removeClass('open');
                    g_$selBox.removeClass('on');
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    selFlag = true;
                    m_$selActiveName.html($(this).text());
                });
            }

            /* 높이 계산 */
            function calcHeight() {
                g_$selBox.each(function() {
                    var m_aLen = $(this).find(g_$selBtnsList).length,
                        m_aH = $(this).find(g_$selBtnsList).innerHeight(),
                        m_selectH = (m_aH * m_aLen);

                    if (m_aLen > 0) {
                        $(this).height(m_selectH)
                    }
                });
            }





        }

    }
})();

var modelThe8 = (function(){
    var controller;

    function init(_type){
        roadTopMot(_type);
        if(_type == 'gate') gateFun();
        else scrollMot();
    }

    function roadTopMot(_type){
        TweenMax.to($('.the8 .video_top'),0.5,{opacity:1,ease: Power2.easeOut});
        TweenMax.to($('.the8 .video_top .text_box'),0.8,{opacity:1,y:0,delay:0.8,ease: Power2.easeOut});
        TweenMax.to($('.the8 .video_top .logo'),0.8,{opacity:1,delay:1.2,ease: Power2.easeOut});
        TweenMax.to($('.the8 .video_top .scroll_wrap'),0.8,{opacity:1,delay:1.1,ease: Power2.easeOut});
        if(_type =='gate'){
            TweenMax.to($('.the8.the8_gate .top_banner'),0.8,{opacity:1,delay:0.2,ease: Power2.easeOut})
        }

    }

    function gateFun(){
        $(window).scroll(function(){
            var m_sTop = $(window).scrollTop();

            if(m_sTop>$('.bottom_etc').offset().top - Math.floor($(window).height()/2)-200){
                TweenMax.to($('.bottom_etc .sec_etc_testdrive').find('.copy_tit'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
                TweenMax.to($('.bottom_etc .sec_etc_testdrive').find('.copy_sub'), 0.6, {opacity:1,y:0,delay:0.4,ease:Power2.easeOut})
                TweenMax.to($('.bottom_etc .sec_etc_testdrive').find('.copy_btn'), 0.6, {opacity:1,y:0,delay:0.7,ease:Power2.easeOut})
            }
        })
    }

    function scrollMot(){

        controller = new ScrollMagic.Controller();

        /* ======================================== section_exterior ======================================== */

        new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_video',triggerHook:"onEnter",duration: 0,offset:-200})
            .setTween(
            new TimelineMax().to($('.section_exterior .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                .to($('.section_exterior .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
            .setTween(
            new TimelineMax().to($('.section_exterior .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                .to($('.section_exterior .sec_deco_boco .info_box6'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})

        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);


        new ScrollMagic.Scene({triggerElement: '.section_exterior .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
            .setTween(
            new TimelineMax().to($('.section_exterior .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                .to($('.section_exterior .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);


        /* ======================================== section_interior ======================================== */

        new ScrollMagic.Scene({triggerElement: '.section_interior .sec_video',triggerHook:"onEnter",duration: 0,offset:-300})
            .setTween(
            new TimelineMax().to($('.section_interior .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                .to($('.section_interior .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: '.section_interior .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
            .setTween(
            new TimelineMax().to($('.section_interior .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_interior .sec_deco_boco .info_box6'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: '.section_interior .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
            .setTween(
            new TimelineMax().to($('.section_interior .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                .to($('.section_interior .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);


        /* ======================================== section_convenience ======================================== */

        new ScrollMagic.Scene({triggerElement: '.section_convenience .sec_video',triggerHook:"onEnter",duration: 0,offset:-300})
            .setTween(
            new TimelineMax().to($('.section_convenience .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                .to($('.section_convenience .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_convenience .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_convenience .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                .to($('.section_convenience .sec_video'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);


        /* ======================================== section_driving ======================================== */

        new ScrollMagic.Scene({triggerElement: '.section_driving .sec_intro_top',triggerHook:"onEnter",duration: 0,offset:-300})
            .setTween(
            new TimelineMax().to($('.section_driving .sec_intro_top .top_title'), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                .to($('.section_driving .sec_intro_top .top_sub_title'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_intro_top .top_line'), 1, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_intro_top .top_etc'), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: '.section_driving .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:600})
            .setTween(
            new TimelineMax().to($('.section_driving .sec_deco_boco .info_box1'), 0.8, {opacity:1,y:0,delay:-1.2,ease: Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box2'), 0.8, {opacity:1,y:0,delay:-0.6,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box3'), 0.8, {opacity:1,y:0,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box5'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box6'), 0.8, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box4').find('.info_box_line1'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box4').find('.thex_info_tit'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box4').find('.info_box_line2'), 0.6, {width:'70px',delay:-0.3,ease:Power2.easeOut})
                .to($('.section_driving .sec_deco_boco .info_box4').find('.thex_info_from'), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: '.section_driving .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:300})
            .setTween(
            new TimelineMax().to($('.section_driving .sec_deco_boco .link_testdrive .mot_bg_area>div'), 1.2, {width:0,delay:-0.4,ease: Circ.easeOut})
                .to($('.section_driving .sec_deco_boco .link_testdrive').find('.testdrive_copy_area'), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);




        /* ======================================== bottom_etc ======================================== */

        /*new ScrollMagic.Scene({triggerElement: '.bottom_etc .sec_etc_slide_area',triggerHook:"onEnter",duration: 0,offset:600})
         .setTween(
         new TimelineMax().to($('.bottom_etc .sec_etc_slide_area'), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
         )
         //.addIndicators()
         .reverse(false)
         .addTo(controller);*/

        new ScrollMagic.Scene({triggerElement: '.bottom_etc .sec_etc_testdrive',triggerHook:"onEnter",duration: 0,offset:280})
            .setTween(
            new TimelineMax().to($('.bottom_etc .sec_etc_testdrive').find('.copy_tit'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
                .to($('.bottom_etc .sec_etc_testdrive').find('.copy_sub'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
                .to($('.bottom_etc .sec_etc_testdrive').find('.copy_btn'), 0.6, {opacity:1,y:0,delay:0.1,ease:Power2.easeOut})
        )
            //.addIndicators()
            .reverse(false)
            .addTo(controller);


    }

    return{
        init : init,
        gateFun : gateFun
    }
})();

var them8xdriving = (function(){
    var controller;

    return{
        init : function(_model){
            them8xdriving.scrollMot();
        },
        scrollMot : function(){
            modeilTheX.getURLParameter('menu');
            controller = new ScrollMagic.Controller();

            /* ======================================== section_exterior ======================================== */

            for(var i = 0; i < $('.section_box_wrap li').length; i++){

                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_exterior.sec'+secNum+' .sec_video',triggerHook:"onEnter",duration: 0,offset:-100})
                    .setTween(
                    new TimelineMax().to($('.section_exterior .sec_intro_top .top_title').eq(i), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                        .to($('.section_exterior .sec_intro_top .top_sub_title').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_exterior .sec_intro_top .top_line').eq(i), 0.8, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_exterior .sec_intro_top .top_etc').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_exterior .sec_video').eq(i), 0.6, {opacity:1,delay:-0.5,ease:Power2.easeOut})
                )
                    .reverse(false)
                    .addTo(controller);
            }


            /* ======================================== section_interior ======================================== */


            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interior.sec'+secNum+' .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:0})
                    .setTween(
                    new TimelineMax().to($('.section_interior .sec_intro_top .top_title').eq(i), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                        .to($('.section_interior .sec_intro_top .top_sub_title').eq(i), 0.6, {opacity:1,y:0,ease:Power2.easeOut})
                        .to($('.section_interior .sec_intro_top .top_line').eq(i), 0.8, {height:'120px',delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_interior .sec_intro_top .top_etc').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box1').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease: Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box2').eq(i).find('.info_box_title'), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box2').eq(i).find('.info_box_text'), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box3').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box4').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_interior .sec_deco_boco .info_box5').eq(i), 0.6, {opacity:1,y:0,delay:0.3,ease:Power2.easeOut})
                )
                    .reverse(false)
                    .addTo(controller);
            }


            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interior.sec'+secNum+' .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:0})
                    .setTween(
                    new TimelineMax().to($('.section_interior .sec_deco_boco .link_testdrive .mot_bg_area>div').eq(i), 0.8, {width:0,delay:-0.2,ease: Circ.easeOut})
                        .to($('.section_interior .sec_deco_boco .link_testdrive').find('.testdrive_copy_area').eq(i), 0.6, {opacity:1,delay:-0.2,ease:Power2.easeOut})
                )
                    //.addIndicators()
                    .reverse(false)
                    .addTo(controller);
            }



            /* ======================================== section_driving ======================================== */

            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_driving.sec'+secNum+' .sec_intro_top',triggerHook:"onEnter",duration: 0,offset:0})
                    .setTween(
                    new TimelineMax().to($('.section_driving .sec_intro_top .top_title').eq(i), 0.6, {opacity:1,y:0,delay:0.5,ease: Power2.easeOut})
                        .to($('.section_driving .sec_intro_top .top_sub_title').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_driving .sec_intro_top .top_line').eq(i), 0.8, {height:'120px',delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_driving .sec_intro_top .top_etc').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                )
                    //.addIndicators()
                    .reverse(false)
                    .addTo(controller);
            }


            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_driving.sec'+secNum+' .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:-100})
                    .setTween(
                    new TimelineMax().to($('.section_driving .sec_deco_boco .info_box1').eq(i), 0.6, {opacity:1,y:0,delay:0.3,ease: Power2.easeOut})
                        .to($('.section_driving .sec_deco_boco .info_box2').find('.info_box_title').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_driving .sec_deco_boco .info_box2').find('.info_box_text').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_driving .sec_deco_boco .info_box3').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_driving .sec_deco_boco .info_box4').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_driving .sec_deco_boco .info_box5').eq(i), 0.6, {opacity:1,y:0,ease:Power2.easeOut})

                )
                    .reverse(false)
                    .addTo(controller);
            }

            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_driving.sec'+secNum+' .sec_deco_boco .link_testdrive',triggerHook:"onEnter",duration: 0,offset:-100})
                    .setTween(
                    new TimelineMax().to($('.section_driving .sec_deco_boco .link_testdrive .mot_bg_area>div').eq(i), 0.8, {width:0,delay:-0.3,ease: Circ.easeOut})
                        .to($('.section_driving .sec_deco_boco .link_testdrive').find('.testdrive_copy_area').eq(i), 0.6, {opacity:1,delay:-0.3,ease:Power2.easeOut})
                )
                    .reverse(false)
                    .addTo(controller);
            }


            /* ======================================== section_interview ======================================== */

            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interview.sec'+secNum+' .sec_video',triggerHook:"onEnter",duration: 0,offset:-100})
                    .setTween(
                    new TimelineMax().to($('.section_interview .sec_intro_top .top_title').eq(i), 0.6, {opacity:1,y:0,ease: Power2.easeOut})
                        .to($('.section_interview .sec_intro_top .top_sub_title').eq(i), 0.6, {opacity:1,y:0,delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_interview .sec_intro_top .top_line').eq(i), 0.8, {height:'120px',delay:-0.3,ease:Power2.easeOut})
                        .to($('.section_interview .sec_intro_top .top_etc').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})
                        .to($('.section_interview .sec_video').eq(i), 0.6, {opacity:1,delay:-0.5,ease:Power2.easeOut})
                )
                    .reverse(false)
                    .addTo(controller);
            }


            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interview.sec'+secNum+' .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:0})
                    .setTween(
                    new TimelineMax().to($('.section_interview .sec_deco_boco .info_box4').find('.info_box_line1').eq(i), 0.6, {width:'70px',delay:0.3,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.thex_info_tit').eq(i), 0.6, {opacity:1,delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.info_box_line2').eq(i), 0.6, {width:'70px',delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.thex_info_from').eq(i), 0.6, {opacity:1,delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box2').eq(i), 0.6, {opacity:1,y:0,delay:-1.2,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box5').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})

                )
                    .reverse(false)
                    .addTo(controller);
            }

            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interview.sec'+secNum+' .sec_deco_boco',triggerHook:"onEnter",duration: 0,offset:0})
                    .setTween(
                    new TimelineMax().to($('.section_interview .sec_deco_boco .info_box4').find('.info_box_line1').eq(i), 0.6, {width:'70px',delay:0.3,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.thex_info_tit').eq(i), 0.6, {opacity:1,delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.info_box_line2').eq(i), 0.6, {width:'70px',delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box4').find('.thex_info_from').eq(i), 0.6, {opacity:1,delay:0.1,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box2').eq(i), 0.6, {opacity:1,y:0,delay:-1.2,ease:Power2.easeOut})
                        .to($('.section_interview .sec_deco_boco .info_box5').eq(i), 0.6, {opacity:1,y:0,delay:-0.5,ease:Power2.easeOut})

                )
                    .reverse(false)
                    .addTo(controller);
            }

            for(var i = 0; i < $('.section_box_wrap li').length; i++){
                var secNum = i+1;
                new ScrollMagic.Scene({triggerElement: '.section_interview.sec'+secNum+' .bottom_banner',triggerHook:"onEnter",duration: 0,offset:100})
                    .setTween(
                    new TimelineMax().to($('.section_interview .bottom_banner').eq(i), 0.6, {opacity:1,delay:0.5,ease:Power2.easeOut})

                )
                    .reverse(false)
                    .addTo(controller);
            }

        }
    }


})();


