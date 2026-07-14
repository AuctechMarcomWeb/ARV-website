(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function () {
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */
	if ($('.active-sticky-header').length) {
		$window.on('resize', function () {
			setHeaderHeight();
		});

		function setHeaderHeight() {
			$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}

		$window.on("scroll", function () {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}

	/* Slick Menu JS */
	$('#menu').slicknav({
		label: '',
		prependTo: '.responsive-menu'
	});

	if ($("a[href='#top']").length) {
		$(document).on("click", "a[href='#top']", function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Slider — initialized dynamically after API load (see bottom of file) */

	/* How We Work Client Logo Slider JS */
	if ($('.how-work-company-slider').length) {
		const how_work_company_slider = new Swiper('.how-work-company-slider .swiper', {
			slidesPerView: 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 5,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 60,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.our-client-slider').length) {
		const testimonial_slider = new Swiper('.our-client-slider .swiper', {
			slidesPerView: 2,
			speed: 1000,
			spaceBetween: 60,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 4,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function () {
			$('.skillbar').each(function () {
				$(this).find('.count-bar').animate({
					width: $(this).attr('data-percent')
				}, 2000);
			});
		}, {
			offset: '50%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 5, time: 2000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});
			tl.set(container, {
				autoAlpha: 1
			});
			tl.from(container, 1, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1, {
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: Power2.out
			});
		});
	}

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount = 0.05,
			translateXValue = 0,
			delayValue = 0.5,
			animatedTextElements = document.querySelectorAll('.text-anime-style-1');

		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	if ($('.text-anime-style-2').length) {
		let staggerAmount = 0.03,
			translateXValue = 20,
			delayValue = 0.1,
			easeType = "power2.out",
			animatedTextElements = document.querySelectorAll('.text-anime-style-2');

		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
			gsap.from(animationSplitText.chars, {
				duration: 1,
				delay: delayValue,
				x: translateXValue,
				autoAlpha: 0,
				stagger: staggerAmount,
				ease: easeType,
				scrollTrigger: { trigger: element, start: "top 85%" },
			});
		});
	}

	if ($('.text-anime-style-3').length) {
		let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

		animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element, start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if ($parallaxie.length && ($window.width() > 991)) {
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300,
			opener: function (element) {
				return element.find('img');
			}
		}
	});

	/* ── Gallery Page — Dynamic Loader ── */
	if ($("#galleryRow").length) {
		ARV_API.getGallery()
			.then(function (res) { return res.json(); })
			.then(function (response) {
				if (!response.success || !response.data.gallery.length) return;

				// sirf isActive: true wali images lo
				var items = response.data.gallery.filter(function (g) { return g.isActive; });
				if (!items.length) return;

				var $row = $("#galleryRow");
				$row.empty();

				items.forEach(function (item, index) {
					var delay = (index % 3) * 0.2;
					var altText = item.title || "ArchiVastu Consultants Gallery";
					var col = [
						'<div class="col-lg-4 col-md-6">',
						'  <div class="photo-gallery wow fadeInUp" data-wow-delay="' + delay + 's">',
						'    <a href="' + item.url + '" data-cursor-text="View">',
						'      <figure>',
						'        <img src="' + item.url + '" alt="' + altText + '">',
						'      </figure>',
						'    </a>',
						'  </div>',
						'</div>'
					].join("");
					$row.append(col);
				});

				// Magnific Popup reinit after dynamic inject
				$('.gallery-items').magnificPopup({
					delegate: 'a',
					type: 'image',
					closeOnContentClick: false,
					closeBtnInside: false,
					mainClass: 'mfp-with-zoom',
					image: { verticalFit: true },
					gallery: { enabled: true },
					zoom: {
						enabled: true,
						duration: 300,
						opener: function (element) { return element.find('img'); }
					}
				});

				// WOW reinit for new elements
				new WOW().init();
			})
			.catch(function (err) {
				console.warn("Gallery load failed.", err);
			});
	}
	/* ── Gallery Page End ── */

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	/* Book Consultation form */
	var $bookingForm = $("#bookingForm");
	$bookingForm.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitBooking();
		}
	});

	/* Contact form logic to be added for api  */
	function submitForm() {
		var formData = {
			name: $("#name").val(),
			email: $("#email").val(),
			phone: $("#phone").val(),
			message: $("#message").val(),
		};

		ARV_API.submitContact(formData)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					$contactform[0].reset();
					submitMSG(true, "Message Sent Successfully!");
				} else {
					submitMSG(false, data.message || "Something went wrong.");
				}
			})
			.catch(() => submitMSG(false, "Server error. Please try again."));
	}
	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	/* Book Consultation submit logic */
	function submitBooking() {
		var $btn = $bookingForm.find("button[type='submit']");
		$btn.prop("disabled", true).text("Booking...");

		var bookingData = {
			name:    $("#fullname").val(),
			email:   $("#emailaddress").val(),
			phone:   $("#phone").val(),
			date:    $("#consultation_date").val(),
			slot:    $("#consultation_time").val(),
			address: $("#address").val(),
			remarks: $("#msg").val(),
		};

		ARV_API.submitBookConsultation(bookingData)
			.then(function (res) { return res.json(); })
			.then(function (data) {
				if (data.success) {
					$bookingForm[0].reset();
					bookingMSG(true, "Appointment booked successfully! We'll reach out to confirm shortly.");
				} else {
					bookingMSG(false, data.message || "Something went wrong. Please try again.");
				}
			})
			.catch(function () {
				bookingMSG(false, "Server error. Please try again later.");
			})
			.finally(function () {
				$btn.prop("disabled", false).text("Book Appointment Now");
			});
	}

	function bookingMSG(valid, msg) {
		var msgClasses = valid ? "h4 text-success" : "h4 text-danger";
		$("#bookingForm #msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Our Project (filtering) Start */
	$window.on("load", function () {
		if ($(".project-item-boxes").length) {

			/* Init Isotope */
			var $menuitem = $(".project-item-boxes").isotope({
				itemSelector: ".project-item-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});

			/* Filter items on click */
			var $menudisesnav = $(".our-Project-nav li a");
			$menudisesnav.on('click', function (e) {

				var filterValue = $(this).attr('data-filter');
				$menuitem.isotope({
					filter: filterValue
				});

				$menudisesnav.removeClass("active-btn");
				$(this).addClass("active-btn");
				e.preventDefault();
			});
			$menuitem.isotope({ filter: "*" });
		}
	});
	/* Our Project (filtering) End */

	/* ── Hero Section — Dynamic Swiper Slider ── */
	if ($("#heroSwiper").length) {
		ARV_API.getHomeSliders()
			.then(function (res) { return res.json(); })
			.then(function (response) {
				if (!response.success || !response.data.sliders.length) {
					// API fail — fallback slide raho, Swiper init karo
					initHeroSwiper();
					return;
				}

				// sirf active sliders lo
				var sliders = response.data.sliders.filter(function (s) { return s.isActive; });
				if (!sliders.length) { initHeroSwiper(); return; }

				// fallback slide hata do
				$("#heroFallbackSlide").remove();

				// har slider ke liye ek swiper-slide banao
				var $wrapper = $("#heroSwiperWrapper");
				sliders.forEach(function (s) {
					var slide = [
						'<div class="swiper-slide hero-slide">',
						'  <div class="hero-slider-image">',
						'    <img src="' + (s.image || "images/hero-bg.jpg") + '" alt="' + (s.heading || "ArchiVastu Consultants") + '">',
						'  </div>',
						'  <div class="container">',
						'    <div class="row align-items-center">',
						'      <div class="col-lg-10">',
						'        <div class="hero-content">',
						'          <div class="section-title">',
						'            <h3>' + (s.title || "") + '</h3>',
						'            <h1 data-cursor="-opaque">' + (s.heading || "") + '</h1>',
						'            <p>' + (s.subHeading || "") + '</p>',
						'          </div>',
						'          <div class="hero-btn">',
						'            <a href="about.html" class="btn-default">explore more</a>',
						'            <a href="book-consultation.html" class="btn-default btn-highlighted">book a consultation</a>',
						'          </div>',
						'        </div>',
						'      </div>',
						'    </div>',
						'  </div>',
						'</div>'
					].join("");
					$wrapper.append(slide);
				});

				initHeroSwiper();
			})
			.catch(function (err) {
				console.warn("Hero slider API failed, using static fallback.", err);
				initHeroSwiper();
			});
	}

	function initHeroSwiper() {
		new Swiper("#heroSwiper", {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".hero-pagination",
				clickable: true,
			},
		});
	}
	/* ── Hero Section End ── */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

})(jQuery);
/* ARV Enterprises — auto-highlight current page in nav */
jQuery(function ($) {
	var path = window.location.pathname.split("/").pop() || "index.html";
	$("#menu > li > a").each(function () {
		var href = $(this).attr("href");
		if (href === path) { $(this).addClass("active-page"); }
	});
	$("#menu > li.submenu").each(function () {
		if ($(this).find("ul a").filter(function () { return $(this).attr("href") === path; }).length) {
			$(this).find("> a").addClass("active-page");
		}
	});
});
