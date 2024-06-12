$(document).ready(function(){

    $(window).load(function() {
                    var window_w = $(window).width();  
                    var window_h = $(window).height();  
                    var window_w_first = $(window).width();  
                    var ad_block;






                    if( $("#main_product").length > 0 ){


                    if( $(".type_area").length < 1 ){
                      var masonryOptions = {
                        itemSelector: '.product_box',
                        isAnimated: true,
                        "gutter": 10,
                        "isFitWidth": true,
                      };

                      var $grid = $('.product_area').masonry( masonryOptions );
                    }
                    

                    $("#main_product").css({'min-height': $("#product_type").height() });


                      // var masonryOptions = {
                      //   itemSelector: '.product_box',
                      //   isAnimated: true,
                      //   "gutter": 10,
                      //   "isFitWidth": true,
                      // };

                      // var $grid = $('.product_area').masonry( masonryOptions );

                      var filter=[];
                      var filter_name;
                      $("#product_type .type .box .typename").on( 'click', function( event ) {
                        filter_name= $(this).attr("data-filter");
                        if($(this).hasClass("checked")){
                          filter.remove(filter_name);
                          closeit();
                          // $("#main_news .news_area .news_box."+filter).show();
                        }else{
                          filter.push(filter_name);
                          closeit();
                        }

                        $(this).toggleClass("checked");
                        $("#mobile_choice div span").html('('+ $("#product_type .type .box .typename.checked").length + ')');
                       
                        

                      });



                      function  closeit(){
                       //  $("#main_news .news_area .news_box."+filter_name).show();
                       $("#main_product .product_area .product_box").hide();
                        $.each(filter,function(idx,value){
                          console.log("陣列："+value)
                          $("#main_product .product_area .product_box[data-category="+value+"]").show('scale',300);

                        })


                      }



                    }


                    Array.prototype.indexOf = function(val) {
                    for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                    }
                    return -1;
                    };

                    Array.prototype.remove = function(val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                    this.splice(index, 1);
                    }
                    };





                    $("#mobile_choice div").on( 'click', function( event ) {
                      $("#product_type").slideToggle();
                      $("body").toggleClass("fixed");
                       $("html,body").stop().animate({ scrollTop: 0 }, { duration: 800,  easing: "swing" });
                    });

                    $("#product_type .type h3").on( 'click', function( event ) {
                      $("#product_type").hide('blind',300);
                      $("body").removeClass("fixed");
                    });





                    if( $("#product_detail").length > 0 ){

                      //zoom
                      $("#zoom_03").elevateZoom({gallery:'gallery_01', cursor: 'pointer', galleryActiveClass: 'active', imageCrossfade: true, loadingIcon: 'images/load.gif'});                      

                        var p_gallery_01=$('#gallery_01').bxSlider({
                            controls:true,
                            minSlides: 3,
                            maxSlides: 5,
                            slideWidth: 83,
                            slideMargin: 10,
                            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                            pager:false,
                            captions: false,
                            infiniteLoop:false,
                            hideControlOnEnd:true,
                            onSliderLoad:function(currentIndex){
                              //initial();
                              $("#gallery_01 li").eq(0).find('a').addClass("active");

                              $("#product_detail #thumb_pic a").click(function(){
                                $("#product_detail #thumb_pic a").removeClass("active");
                                $(this).addClass("active");
                              });


                            },
                            onSlideBefore: function($slideElement, oldIndex, newIndex){
                            },
                            onSlideAfter: function($slideElement, oldIndex, newIndex){
                              $slideElement.addClass("active");
                               //console.log("newIndex"+newIndex+'lengt_big'+lengt_big);
                        
                            }
                        });


                        var bx_mobile=$('.bx_mobile').bxSlider({
                            controls:true,
                            slideMargin: 50,
                            speed:500,
                            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
                            pager:false,
                            captions: false,
                            infiniteLoop:false,
                            hideControlOnEnd:true,
                            onSliderLoad:function(currentIndex){

                            },
                            onSlideBefore: function($slideElement, oldIndex, newIndex){
                            },
                            onSlideAfter: function($slideElement, oldIndex, newIndex){
                   
                               //console.log("newIndex"+newIndex+'lengt_big'+lengt_big);
                        
                            }
                        });


                    }





               $(window).resize(function() {
                 var window_w = $(window).width();  
                 var window_h = $(window).height();  


                 // var range=window_w_first-window_w;
                 // if(range<0){range=-range};
                 // if(range>200){
                 //      location.reload();
                 // }



               });



                                      


    });
});

