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

	/* ── Portfolio List Page — Dynamic Loader ── */
	if ($("#portfolioRow").length) {
		ARV_API.getPortfolios()
			.then(function (res) { return res.json(); })
			.then(function (response) {
				if (!response.success || !response.data.portfolios.length) return;

				// sirf activeStatus: true aur meaningful slug wale lo
				var items = response.data.portfolios.filter(function (p) {
					return p.activeStatus && p.slug && p.title.length > 5;
				});
				if (!items.length) return;

				var $row = $("#portfolioRow");
				$row.empty();

				items.forEach(function (item, index) {
					var delay = (index % 2 === 0) ? "" : ' data-wow-delay="0.2s"';
					// Local dev pe ?slug=, production (koi bhi domain) pe clean URL
					var isLocalDev = window.location.hostname === "127.0.0.1" ||
					                 window.location.hostname === "localhost" ||
					                 window.location.protocol === "file:";
					var detailUrl = (isLocalDev || !item.slug)
						? "portfolio-detail.html?slug=" + item.slug
						: "/" + item.slug;
					var thumb = item.thumbnailImage || "images/project-1.jpg";
					var col = [
						'<div class="col-lg-6 col-md-6">',
						'  <div class="project-item wow fadeInUp"' + delay + '>',
						'    <div class="project-featured-image">',
						'      <a href="' + detailUrl + '" data-cursor-text="View">',
						'        <figure class="image-anime">',
						'          <img src="' + thumb + '" alt="' + item.title + '">',
						'        </figure>',
						'      </a>',
						'    </div>',
						'    <div class="project-btn">',
						'      <a href="' + detailUrl + '"><img src="images/arrow-white.svg" alt=""></a>',
						'    </div>',
						'    <div class="project-content">',
						'      <h3>' + item.category + '</h3>',
						'      <h2><a href="' + detailUrl + '">' + item.title + '</a></h2>',
						'    </div>',
						'  </div>',
						'</div>'
					].join("");
					$row.append(col);
				});

				new WOW().init();
			})
			.catch(function (err) {
				console.warn("Portfolio list load failed.", err);
			});
	}
	/* ── Portfolio List Page End ── */

	/* ── Portfolio Detail Page — Dynamic Loader ── */
	if ($("#detailPageTitle").length) {
		// URL se slug padhlo: portfolio-detail.html?slug=riverside-villa-interior-design
		var urlParams = new URLSearchParams(window.location.search);
		var slug = urlParams.get("slug");

		if (!slug) {
			$("#detailPageTitle").text("Project Not Found");
			return;
		}

		ARV_API.getPortfolioBySlug(slug)
			.then(function (res) { return res.json(); })
			.then(function (response) {
				if (!response.success || !response.data) {
					$("#detailPageTitle").text("Project Not Found");
					return;
				}

				var p = response.data;

				// Page title + breadcrumb
				document.title = p.title + " | ArchiVastu Consultants";
				$("#detailPageTitle").text(p.title);
				$("#detailBreadcrumb").text(p.title);

				// Sidebar fields
				$("#detailClient").text(p.clientName || "—");
				$("#detailCategory").text(p.category || "—");
				$("#detailLocation").text(p.location || "—");
				$("#detailDuration").text(p.duration || "—");

				// Banner image
				if (p.bannerImage) {
					$("#detailBannerImage").attr("src", p.bannerImage).attr("alt", p.title);
				}

				// Title + description (HTML allowed)
				$("#detailTitle").text(p.title);
				$("#detailDescription").html(p.description || "");

				// Gallery images
				if (p.galleryImages && p.galleryImages.length) {
					var $gallery = $("#detailGallery");
					$gallery.empty();
					p.galleryImages.forEach(function (imgUrl) {
						// skip agar URL nahi hai (kuch entries mein IDs hain)
						if (!imgUrl || !imgUrl.startsWith("http")) return;
						$gallery.append(
							'<div class="project-gallery-img">' +
							'  <a href="' + imgUrl + '" data-cursor-text="View">' +
							'    <figure><img src="' + imgUrl + '" alt="' + p.title + '"></figure>' +
							'  </a>' +
							'</div>'
						);
					});

					// Magnific Popup init for gallery
					$(".project-gallery-images").magnificPopup({
						delegate: "a",
						type: "image",
						closeOnContentClick: false,
						closeBtnInside: false,
						mainClass: "mfp-with-zoom",
						image: { verticalFit: true },
						gallery: { enabled: true },
						zoom: {
							enabled: true,
							duration: 300,
							opener: function (el) { return el.find("img"); }
						}
					});
				}

				new WOW().init();
			})
			.catch(function (err) {
				console.warn("Portfolio detail load failed.", err);
				$("#detailPageTitle").text("Failed to load project.");
			});
	}
	/* ── Portfolio Detail Page End ── */

	/* ── Blog List Page — Dynamic Loader ── */
	if ($("#blogRow").length) {
		ARV_API.getBlogs()
			.then(function (res) { return res.json(); })
			.then(function (response) {
				if (!response.success || !response.data.blogs.length) return;

				var blogs = response.data.blogs.filter(function (b) { return b.isActive; });
				if (!blogs.length) return;

				var $row = $("#blogRow");
				$row.empty();

				blogs.forEach(function (blog, index) {
					var delay = ["", ' data-wow-delay="0.2s"', ' data-wow-delay="0.4s"'][index % 3];
					// Local dev pe ?id=, production (koi bhi domain) pe clean URL slug
					var isLocalDev = window.location.hostname === "127.0.0.1" ||
					                 window.location.hostname === "localhost" ||
					                 window.location.protocol === "file:";
					var detailUrl = (isLocalDev || !blog.url)
						? "blog-detail.html?id=" + blog._id
						: "/" + blog.url;
					var img = blog.mainImage || ("images/post-" + ((index % 6) + 1) + ".jpg");
					var desc = blog.shortDescription || "";
					var col = [
						'<div class="col-lg-4 col-md-6">',
						'  <div class="post-item wow fadeInUp"' + delay + '>',
						'    <div class="post-featured-image">',
						'      <a href="' + detailUrl + '" data-cursor-text="View">',
						'        <figure class="image-anime">',
						'          <img src="' + img + '" alt="' + blog.heading + '">',
						'        </figure>',
						'      </a>',
						'    </div>',
						'    <div class="post-item-content">',
						'      <h3><a href="' + detailUrl + '">' + blog.heading + '</a></h3>',
						'      <p>' + desc + '</p>',
						'    </div>',
						'    <div class="post-item-btn">',
						'      <a href="' + detailUrl + '">read more</a>',
						'    </div>',
						'  </div>',
						'</div>'
					].join("");
					$row.append(col);
				});

				new WOW().init();
			})
			.catch(function (err) {
				console.warn("Blog list load failed.", err);
			});
	}
	/* ── Blog List Page End ── */

	/* ── Blog Detail Page — Dynamic Loader ── */
	if ($("#blogPageTitle").length) {
		var urlParams = new URLSearchParams(window.location.search);
		var blogId   = urlParams.get("id");
		var blogSlug = urlParams.get("slug") || null;

		// Netlify clean URL — path se slug lo (no query param)
		if (!blogId && !blogSlug) {
			var pathParts = window.location.pathname.replace(/\/$/, "").split("/");
			var lastSegment = pathParts[pathParts.length - 1] || "";
			if (lastSegment && lastSegment.indexOf(".html") === -1) {
				blogSlug = lastSegment;
			}
		}

		if (!blogId && !blogSlug) {
			$("#blogPageTitle").text("Post Not Found");
		} else {
			// id hoga to getBlogById, slug hoga to getBlogByUrl
			var apiCall = blogId
				? ARV_API.getBlogById(blogId)
				: ARV_API.getBlogByUrl(blogSlug);

			apiCall
				.then(function (res) { return res.json(); })
				.then(function (response) {
					if (!response.success || !response.data) {
						$("#blogPageTitle").text("Post Not Found");
						return;
					}

					var b = response.data.blog || response.data;

					// Page meta
					document.title = b.heading + " | ArchiVastu Consultants";
					if (b.seoTitle) document.title = b.seoTitle + " | ArchiVastu Consultants";
					$("#metaDescription").attr("content", b.shortDescription || "");
					$("#metaKeywords").attr("content", b.metaKeywords || "");

					// Page header
					$("#blogPageTitle").text(b.heading);
					$("#blogBreadcrumb").text(b.heading);

					// Main image
					if (b.mainImage) {
						$("#blogMainImage").attr("src", b.mainImage).attr("alt", b.heading);
					}

					// Meta line — first tag + date
					var firstTag = (b.tags && b.tags.length) ? b.tags[0] : "ArchiVastu Consultants";
					var dateStr = b.createdAt
						? new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
						: "";
					$("#blogMeta").html("<strong>" + firstTag + "</strong>" + (dateStr ? " &nbsp;&middot;&nbsp; " + dateStr : ""));

					// Heading + content
					$("#blogHeading").text(b.heading);
					$("#blogDetails").html(b.details || "");

					// Tags — dynamic
					if (b.tags && b.tags.length) {
						var tagsHtml = 'Tags: ';
						b.tags.forEach(function (tag) {
							tagsHtml += '<a href="blog.html">' + tag + '</a> ';
						});
						$(".post-tags .tag-links").html(tagsHtml);
					} else {
						$(".post-tags").hide();
					}

					new WOW().init();
				})
				.catch(function (err) {
					console.warn("Blog detail load failed.", err);
					$("#blogPageTitle").text("Failed to load post.");
				});
		}
	}
	/* ── Blog Detail Page End ── */

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
