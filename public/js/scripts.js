/*================
 Template Name: ProLanding - Product Landing Page Template
 Description: ProLanding is a powerful 100% Responsive Product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/htmllover/portfolio
 =======================*/

// TABLE OF CONTENTS

//  1. preloader
//  2. easeScroll
//  3. navbar or menu
//  4. client testimonial
//  5. hero slider
//  6. customers slider
//  7. magnify popup video
//  8. back to top
//  9. product slider
//  10. product details popup

jQuery(function ($) {
  "use strict";

  //  1. preloader
  $(window).ready(function () {
    $("#preloader").delay(200).fadeOut("fade");
  });

  //  2. easeScroll
  // $("html").easeScroll();

  //  3. navbar or menu
  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // navbar active link
  $("#myNavbar >ul li").on("click", function (e) {
    e.preventDefault();
    $("li").removeClass("active");
    $(this).addClass("active");
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on(
      "click",
      "#myNavbar > ul li a.page-scroll",
      function (event) {
        var $anchor = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top - 59,
            },
            600,
            "easeInOutExpo"
          );
        event.preventDefault();
      }
    );
  });
  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function (event) {
    if (!$(this).parent().hasClass("dropdown"))
      $(".navbar-collapse").collapse("hide");
  });

  //nav menu active color
  $(".header-nav li").on("click", function (e) {
    $(this).addClass("active").siblings().removeClass("active");
  });

  //  4. client testimonial
  $(".testimonial-slider").owlCarousel({
    rtl: true,
    responsiveClass: true,
    margin: 20,
    dots: false,
    autoWidth: false,
    nav: true,
    autoplay: true,
    navText: [
      '<span class="fa fa-angle-right"></span>',
      '<span class="fa fa-angle-left"></span>',
    ],
    autoplayTimeout: 3000,
    autoplayStopOnLast: false,
    items: 1,
  });

  //  5. hero slider
  $(".mobile-slider")["owlCarousel"]({
    rtl: true,
    loop: true,
    margin: 0,
    autoplay: true,
    dots: false,
    items: 1,
  });
  var u = $(".mobile-slider"),
    p = $("#next"),
    m = $("#prev");
  p.on("click", function () {
    u.trigger("next.owl.carousel", [400]);
  });
  m.on("click", function () {
    u.trigger("prev.owl.carousel", [400]);
  });

  //hero slider two
  $(".hero-content-slider").owlCarousel({
    rtl: true,
    loop: true,
    margin: 70,
    dots: false,
    nav: true,
    smartSpeed: 700,
    autoplay: 4000,
    navText: [
      '<span class="fa fa-angle-right"></span>',
      '<span class="fa fa-angle-left"></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      800: {
        items: 1,
      },
      1024: {
        items: 1,
      },
      1200: {
        items: 1,
      },
    },
  });

  // 6. customers slider
  $(".customers-slider").owlCarousel({
    rtl: true,
    autoplay: true,
    loop: true,
    margin: 25,
    dots: false,
    slideTransition: "linear",
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    autoplaySpeed: 4500,
    responsive: {
      0: {
        items: 2,
      },
      500: {
        items: 3,
      },
      600: {
        items: 3,
      },
      800: {
        items: 4,
      },
      1200: {
        items: 4,
      },
    },
  });

  // 7. magnify popup video
  $(".video").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  // 8. back to top
  (function () {
    $("body").append(
      '<div id="toTop"><span><i class="fa fa-angle-up"></i></span></div>'
    );

    $(window).on("scroll", function (e) {
      if ($(this).scrollTop() != 0) {
        $("#toTop").fadeIn();
      } else {
        $("#toTop").fadeOut();
      }
    });

    $("#toTop").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  })();

  //  9. product slider
  $(".biz-products").owlCarousel({
    rtl: true,
    responsiveClass: true,
    margin: 30,
    dots: false,
    autoplay: 2400,
    loop: true,
    autoplayStopOnLast: false,
    autoWidth: false,
    nav: true,
    navText: [
      "<i class='fa fa-angle-right'></i>",
      "<i class='fa fa-angle-left'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 2,
      },
      1200: {
        items: 4,
      },
    },
  });

  //  10. product details popup
  $(".popup-details").magnificPopup({
    type: "inline",
    fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-slide-bottom",
  });
}); // JQuery end
