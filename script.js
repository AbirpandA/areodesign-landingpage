gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




function initLoader() {
    const preloader = document.querySelector('.preloader');
    const loaderText = document.querySelector('.loader h1');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Set initial state
    gsap.set('.page1-content', { opacity: 0, y: 100 });
    document.body.style.overflow = 'hidden';
    
    const loaderTl = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = '';
            locoScroll.start();
        }
    });

    loaderTl
        .from(loaderText, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .to(loadingProgress, {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to(preloader, {
            y: '-100%',
            duration: 1,
            ease: 'power4.inOut'
        })
        .to('.page1-content', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power4.out'
        })
        .from('.page1-content h1 span', {
            y: 200,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            rotate: 15,
            ease: "elastic.out(1, 0.3)"
        }, '-=0.3');
}



window.addEventListener('load', () => {
    initLoader();
    initPage3Animations();
    initSlider();
    initPage5Animations();
    initPage6Animations();
    



function cursorEffect(){
    var page1Content = document.querySelector('.page1-content');
var cursor = document.querySelector('#cursor');

page1Content.addEventListener('mousemove', function(e) {
  gsap.to(cursor, {
    x: e.clientX - (cursor.offsetWidth / 2),
        y: e.clientY - (cursor.offsetHeight / 2),
    ease: 'power3.out',
  });
});

page1Content.addEventListener('mouseenter', function() {
  gsap.to(cursor, {
    opacity: 1,
    scale: 1,
    ease: 'power3.out',
  });
});

page1Content.addEventListener('mouseleave', function() {
  gsap.to(cursor, {
    scale: 0,
    opacity: 0,
    ease: 'power4.out',
    
    
  });
});
}

cursorEffect();





function animateElements() {
    // First page title animation
    gsap.from(".page1-content h1 span", {
        y: 200,
        opacity: 0,
        stagger: 0.1,
        delay: 0.5,
        duration: 1,
        rotate: 15,
        ease: "elastic.out(1, 0.7)",
        
    });

    // Page 2 animations with ScrollTrigger
    gsap.from(".page2-content h1", {
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 60%",
            end: "top 40%",
            scrub: 2
        },
        rotateX: 90,
        opacity: 0,
        transformOrigin: "0% 50%",
        duration: 2,
        ease: "power4.out"
    });

    gsap.from(".page2-content p", {
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top 50%",
            end: "top 30%",
            scrub: 2
        },
        y: 100,
        opacity: 0,
        stagger: {
            each: 0.05,
            from: "start"
        },
        ease: "power2.out"
    });
}

animateElements();



function initMenu() {
    const menuBtn = document.querySelector('.nav h4');
    const closeBtn = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const nav = document.querySelector('.nav');
    
    const menuTl = gsap.timeline({
        paused: true,
        defaults: {ease: 'power4.inOut'}
    });

    // Menu Timeline Animation
    menuTl
        .to(nav, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3
        })
        .to(menuOverlay, {
            display: 'block',
            duration: 0
        })
        .to(menuOverlay, {
            opacity: 1,
            duration: 0.5
        })
        .from('.menu-header', {
            y: -50,
            opacity: 0,
            duration: 0.5
        })
        .from('.menu-item', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5
        }, '-=0.3');

    // Menu Open
    menuBtn.addEventListener('click', () => {
        menuTl.play();
        locoScroll.stop();
    });

    // Menu Close
    closeBtn.addEventListener('click', () => {
        menuTl.reverse();
        setTimeout(() => {
            locoScroll.start();
            gsap.to(nav, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            });
        }, 1000);
    });

    // Menu Items Hover Effect
    gsap.utils.toArray('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('h2'), {
                x: 20,
                color: '#FFD700', 
                duration: 0.3
            });
            gsap.to(item.querySelector('p'), {
                opacity: 0.5,
                color: '#FFD700', 
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('h2'), {
                x: 0,
                color: 'white',
                duration: 0.3
            });
            gsap.to(item.querySelector('p'), {
                opacity: 1,
                color: 'white',
                duration: 0.3
            });
        });
    });
}

initMenu();


});



function initPage3Animations() {
    const cards = [
        { id: '#card1', endTranslateX: -2000, endTranslateY: 0, rotate: 45 },
        { id: '#card2', endTranslateX: -1000, endTranslateY: 0, rotate: -30 },
        { id: '#card3', endTranslateX: -2000, endTranslateY: 0, rotate: 45 },
        { id: '#card4', endTranslateX: -1500, endTranslateY: 0, rotate: -30 },
        { id: '#card5', endTranslateX: -2200, endTranslateY: 0, rotate: 45 },
        { id: '#card6', endTranslateX: -1200, endTranslateY: 0, rotate: -30 },
        { id: '#card7', endTranslateX: -1800, endTranslateY: 0, rotate: 45 },
        
    ];

    gsap.set('.page3', {
        backgroundColor: 'black'
    });

    // Main container animation
    gsap.to('.page3', {
        scrollTrigger: {
            trigger: '.page3',
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 4,
            anticipatePin: 1,
            onEnter: () => {
                gsap.to('.page3', {
                    backgroundColor: 'brown',
                    duration: 1
                });
            },
            onLeaveBack: () => {
                gsap.to('.page3', {
                    backgroundColor: 'black',
                    duration: 1
                });
            },
            scroller: '.main'
        },
        xPercent: -75,
        ease: 'power1.inOut'
    });

    // Cards animation
    cards.forEach((card, index) => {
        gsap.to(card.id, {
            scrollTrigger: {
                trigger: '.page3',
                start: 'top top',
                end: '+=200%',
                scrub: 1,
                scroller: '.main'
            },
            x: card.endTranslateX,
            y: card.endTranslateY,
            rotate: card.rotate,
            ease: 'none',
            force3D: true, // Enable hardware acceleration
            zIndex: index % 2 === 0 ? 10 : 1, 
            immediateRender: true
        });
    });

}


function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;



    function goToSlide(index) {
        currentSlide = index;
        gsap.to(slider, {
            x: `-${currentSlide * 33.333}%`,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
        
        // Animate slide content
        gsap.from(slides[currentSlide].children, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // Event listeners
    next.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    });

    prev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });


    // Initialize first slide
    goToSlide(0);


    gsap.to('.services-heading', {
        scrollTrigger: {
            trigger: '.page4',
            start: 'top center',
            scroller: '.main'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });

}

 
           
function initPage5Animations() {
    // Page 5 Fade Animations
    gsap.from(".page5 h1", {
        scrollTrigger: {
            trigger: ".page5",
            start: "top center",
            scroller: ".main"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from(".page5-item", {
        scrollTrigger: {
            trigger: ".page5-grid",
            start: "top center",
            scroller: ".main"
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    });

    

    // Smooth transition between pages
    ScrollTrigger.create({
        trigger: ".page5",
        start: "bottom bottom",
        end: "bottom top",
        scroller: ".main",
        scrub: 1,
        onUpdate: (self) => {
            gsap.to(".main", {
                backgroundColor: gsap.utils.interpolate(
                    "#111",
                    "#000",
                    self.progress
                )
            });
        }
    });
}

function initPage6Animations() {
    //  initial states
    gsap.set(".car-item", { autoAlpha: 0 });
    
    gsap.set(".hero-text", { 
        opacity: 0,
        y: 100
    });

    // Hero text animation timeline
    const heroTextTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page6",
            start: "top center",
            end: "+=50%",
            scrub: 1.5,
            scroller: ".main",
        }
    });

    heroTextTl
        .to(".hero-text", {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out"
        })
        .to(".hero-text", {
            opacity: 0,
            y: -100,
            duration: 2,
            delay: 2,
            ease: "power2.in"
        });

    // Animate each car
    gsap.utils.toArray('.car-item').forEach((car, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".page6",
                start: `${i * 55}% top`,
                end: `${(i + 1) * 55}% center`,
                scrub: 5,
                scroller: ".main"
            }
        });

        tl.to(car, {
            autoAlpha: 1,
            duration: 3,
            ease: 'power2.inOut',
        })
        .from(car.querySelector('img'), {
            scale: 1.5,
            duration: 3.5
        }, "-=1.5")
        .from(car.querySelector('.car-info'), {
            y: 100,
            opacity: 0,
            duration: 3,
            ease: 'power2.out'
        }, "-=1.5");
    });

    // Pin the section
    ScrollTrigger.create({
        trigger: ".page6",
        start: "top top",
        end: "+=300%",
        pin: true,
        scroller: ".main"
    });
}