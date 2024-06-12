

  function goTop() {
    var $w = $(window);
    wh = $w.height(),
    st = $(window).scrollTop(),
    dh = $(document).height();
    $(window).on('scroll', function() {
      $(window).scrollTop() > (wh / 2) ? $('#top').slideDown(0) :  $('#top').fadeOut(100);
      ($(window).scrollTop() > dh - ($('footer').height() - 60) - wh) ?
      $('#top').addClass('at-footer') : $('#top').removeClass('at-footer');
    });
    $('#top').on('click', function() {
      $('html, body').delay(0).animate({
        scrollTop: 0
      }, 1000);
      return false;
    });
  }goTop();


  function infoWindow() {
    var info = $('.info-window');
    $(document).ready(function() {
      if(info.hasClass('loading') || info.hasClass('maintain')) {
        $('body').css('overflow-y', 'hidden');
        setTimeout(function() {
          info.addClass('done');
          $('body').css('overflow-y', 'auto');
        }, 2000);
      } else {
        false;
      }
    });

  }//infoWindow();

  function toggleDropdowntext() {

      $('.dropdown-set .dropdown-menu').find('> *').each(function(i, text) {

        $(text).on('click', function() {
          var t = $(text).text();
          $(text).addClass('active').siblings().removeClass('active');
          $('.dropdown-set .btn').text(t)
        });
      });
  }
    $('.dropdown-set').length !== 0 ? toggleDropdowntext() : false;

    function fitHeader() {
      var prev = 0,
          $window = $(window),
          hd = $('header');
     $window.on('scroll', function(event){
        var scrollTop = $window.scrollTop();
        if(prev < 1) {
          hd.removeClass('is-hidden');
        }
            hd.toggleClass('is-hidden', scrollTop > prev);
            prev = scrollTop;




        if(hd.is('.is-hidden')) {
          setTimeout(function(event) {
            $('#m-check').prop('checked', false);
          }, 1000);
          return false;
        }
      });
    }

    $(window).width() >= 1024 ? fitHeader() : false;

    function autoFocus() {
      $('#search-ctrl').on('change', function() {
        if($(this).prop('checked') == true) {
          $('#search').focus();
        }
      });
    }

    function loadNavFooter() {
      $(document).ready(function() {
        $('header nav').load('nav-footer.html #menu > *', function() {

            autoFocus();

          $('.menu a').each(function() {
            var pageName = $('title').text().split('|');
            if($(this).text() === $.trim(pageName[0])) {

              $(this).addClass('active');
            }

          });
          if($(window).width() < 1024) {
            $('#m-ctrl').on('change', function() {
              if($(this).prop('checked') !== true) {
                $('[name="sub-ctrl"]').each(function() {
                  setTimeout(function() {
                  $('[name="sub-ctrl"]').prop('checked', false);
                  }, 500);
                });
              }
            });
          }

        }).end();
        $('footer').load('nav-footer.html #footer > *');


      });
    }//loadNavFooter();

    function loadeds() {
      $('.jump-dots').before('<p>。。&ensp;載入中&ensp;。。</p>');
      $(window).on('load', function() {
        setTimeout(function() {
          $('.loading-window').addClass('done');
        }, 800);
      });
    }loadeds();

    function cssDrop() {
      $(function() {
        if($(window).width() < 1024  && $(window).resize() ) {
          var current = $('.css-dropdown a.active').text();
          $('.css-dropdown label').text(''+current+'');
        }
      })
    }

    $('.css-dropdown').length !== 0 ? cssDrop() : false;

    function tlTop() {
      $(function() {
        if($(window).width() > 1024) {
          $('[data-bs-toggle="tooltip"]').tooltip();
        }
      })
    } tlTop();
