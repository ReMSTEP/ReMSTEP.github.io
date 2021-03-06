function setTopPadding(viewportWidth, siteHeaderHeight) {
    if (viewportWidth >= 800) {
        $('body').css('padding-top', siteHeaderHeight);
        $('.main-nav').css('display', 'inline');
    } else {
        $('body').css('padding-top', 0);
    }
}

function openTab(tab){
    //console.log(tab);
    $('.tab, .tab-panel').removeClass('selected');
    $('.tab').attr('aria-selected','false');
    tab.addClass('selected').attr('aria-selected','true');
    var tabPanleId = tab.attr('aria-controls');
    $('.tab-panel[id="'+tabPanleId+'"]').addClass('selected');
}

$(document).ready(function () {


    // set top padding to accomodate fixed header
    var viewportWidth = $(window).width();
    var siteHeaderHeight = $('.site-header').height();
    setTopPadding(viewportWidth, siteHeaderHeight);


    // mobile menu toggle handler
    $('.mobile-menu-toggle').click(function () {
        $('.main-nav').slideToggle();
    });

    // tabs handler
    $('.tab').click(function () {
        var tab = $(this);
        openTab(tab);
    });

    //window scroll handler
    var headerHeight;
    var onThisPagePosition = $('.on-this-page').offset();
    $(window).on("scroll  touchmove", function () {

        var scrollTop = $(document).scrollTop();
        headerHeight = $('header').height();


        // minimise header
        if (scrollTop > 100) {
            $('.site-header').addClass('shrink');
        } else {
            $('.site-header').removeClass('shrink');
        }

        // fix on this page menu when scrolls up
        if ($('.on-this-page').length > 0) {
            if (viewportWidth > 800) {
                if (scrollTop >= (onThisPagePosition.top - headerHeight * 0.7)) {
                    $('.on-this-page').addClass('fixed');
                    $('.on-this-page').css('top', headerHeight);
                } else {
                    $('.on-this-page').removeClass('fixed');
                    $('.on-this-page').css('top', 'auto');
                }
            }
        }
    });

    //smooth scroll
    $('a[href*="#"]:not([href="#"])').click(function () {
        var scrollPosition;
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (viewportWidth > 800) {
                scrollPosition = target.offset().top - 180;
            } else {
                scrollPosition = target.offset().top
            }


            if (target.length) {
                $('html,body').animate({
                    scrollTop: scrollPosition
                        // 260 to clear fixed header and on this page menu
                }, 1000);
                return false;
            }
        }
    });


    $(window).resize(function () {
        // reset top padding to accomodate fixed header when window resized
        viewportWidth = $(window).width();
        siteHeaderHeight = $('.site-header').height();
        setTopPadding(viewportWidth, siteHeaderHeight);
        // make on this page position static in mobile viewports
        if (viewportWidth < 800) {
            $('.on-this-page').removeClass('fixed');
            $('.on-this-page').css('top', 'auto');
        }
    });

    /* slide show */
    var numSlides = $('.slide-show-slides img').length;
    var finalMargin = numSlides * 100 - 100;
    var currentMargin = 0;
    $('.slide-show .control').click(function (event) {
        event.preventDefault();
        if (!($(this).hasClass('disabled'))) {
            if ($(this).hasClass('next')) {
                if (currentMargin < finalMargin) {
                    currentMargin += 100;
                    if (currentMargin == 100) {
                        $('.prev.control').removeClass('disabled');
                    }
                    if (currentMargin == finalMargin) {
                        $('.next.control').addClass('disabled');
                    }
                }
            } else {
                if (currentMargin > 0) {
                    currentMargin -= 100;
                    if (currentMargin == 0) {
                        $('.prev.control').addClass('disabled');
                    }
                    if (currentMargin == finalMargin - 100) {
                        $('.next.control').removeClass('disabled');
                    }
                }
            }
            $('.slide-show-slides').animate({
                marginLeft: '-' + currentMargin + '%'
            });
        }
    });

    /* mailing list sign up */
    $('.mailing-list-link').click(function (event) {
        event.preventDefault();
        $('.mailing-list').fadeIn();
    });
    $('.mailing-list-close').click(function (event) {
        event.preventDefault();
        $('.mailing-list').fadeOut();
    });

    /* info box show/hide */
    $('.info').click(function (event) {
        event.preventDefault();
        var infoBoxId = $(this).attr('data-infoBoxId');
        $('#' + infoBoxId).addClass('open');
    });
    $('.info-box-wrapper').click(function () {
        $(this).removeClass('open');
    });

    /* activity nav toggle */
    $('.activity-nav .list, .overlay').click(function (event) {
        event.preventDefault();
        $(this).toggleClass('open');
        $('.activity-nav').toggleClass('open');
        $('.full-list').fadeToggle();
        $('.overlay').fadeToggle();
    });

    /* activity nav next and previous */
    if ($('.activity-nav').length > 0) {
        var prevLink;
        var nextLink;
        var activityLis = $('.full-list ul li');
        $(activityLis).each(function( index ) {
          if($(this).hasClass('current')){
              //console.log($(activityLis)[index+1]);
              var prevLi = $(activityLis)[index-1];
              prevLink = $(prevLi).children('a').attr('href');
              var nextLi = $(activityLis)[index+1];
              nextLink = $(nextLi).children('a').attr('href');
          }
        });
        if(prevLink != null) {
            $('span.prev').replaceWith('<a class="prev" href="'+prevLink+'">&larr; Previous</a>');
        }
        if(nextLink != null) {
            $('span.next').replaceWith('<a class="next" href="'+nextLink+'">Next &rarr;</a>');
        }
    }
    
    /* spec notes/table click */
    $('.spec-details').click(function (event) {
       $(this).toggleClass('selected').next('table').toggleClass('unselected'); 
    });
    $('.spec-details + table').click(function (event) {
       $(this).toggleClass('unselected').prev('.spec-details').toggleClass('selected'); 
    });
});