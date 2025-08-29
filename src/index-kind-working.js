require("normalize.css/normalize.css");
require("./styles/index.scss");
import inView from "in-view";
import anime from "animejs";
import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
    // console.log("page-loaded");
});

const mq = window.matchMedia("(max-width: 980px)");

anime({
    targets: ".featured-project__circle",
    rotate: "360deg",
    easing: "linear",
    duration: 15000,
    loop: true,
});

if (mq.matches) {
    anime({
        targets: ".featured-project__mickey-hand--mobile",
        translateY: "-10px",
        direction: "alternate",
        duration: 500,
        delay: 1500,
        easing: "easeInOutSine",
        loop: true,
    });
} else {
    anime({
        targets: ".featured-project__mickey-hand--desktop",
        translateX: "1.6vw",
        direction: "alternate",
        duration: 500,
        delay: 2000,
        easing: "easeInOutSine",
        loop: true,
    });
}

const animateText = (selector, yOffset, delay) => {
    gsap.fromTo(
        selector,
        { y: yOffset, rotation: "-15deg" },
        {
            y: yOffset,
            rotation: "-15deg",
            delay,
            duration: 1,
            ease: "power1.inOut",
        }
    );
};

if (mq.matches) {
    inView(".animated-type h2")
        .on("enter", () => {
            animateText(".first", "16vw", 1000);
            animateText(".second", "16.5vw", 1050);
            gsap.fromTo(
                ".third",
                { y: "16vw" },
                { y: "16vw", delay: 1100, duration: 1, ease: "power1.inOut" }
            );
        })
        .on("exit", () => {
            // console.log("out-view");
        });
} else {
    inView(".animated-type h2")
        .on("enter", () => {
            animateText(".first", "8vw", 1000);
            animateText(".second", "8.5vw", 1050);
            gsap.fromTo(
                ".third",
                { y: "8vw" },
                { y: "8vw", delay: 1100, duration: 1, ease: "power1.inOut" }
            );
        })
        .on("exit", () => {
            // console.log("out-view");
        });
}

inView.threshold(1);

// Image hover
if (!mq.matches) {
    class HoverImgFx2 {
        constructor(el) {
            this.DOM = { el: el };
            this.DOM.reveal = document.createElement("div");
            this.DOM.reveal.className = "hover-reveal";
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector(
                ".hover-reveal__inner"
            );
            this.DOM.revealImg =
                this.DOM.reveal.querySelector(".hover-reveal__img");

            this.initEvents();
        }

        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left:
                        document.body.scrollLeft +
                        document.documentElement.scrollLeft,
                    top:
                        document.body.scrollTop +
                        document.documentElement.scrollTop,
                };
                this.DOM.reveal.style.top = `${
                    mousePos.y + 20 - docScrolls.top
                }px`;
                this.DOM.reveal.style.left = `${
                    mousePos.x + 20 - docScrolls.left
                }px`;
            };

            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
            };
            this.mousemoveFn = (ev) =>
                requestAnimationFrame(() => {
                    this.positionElement(ev);
                });
            this.mouseleaveFn = () => {
                this.hideImage();
            };

            this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
            this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
            this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
        }

        showImage() {
            gsap.killTweensOf(this.DOM.revealInner);
            gsap.killTweensOf(this.DOM.revealImg);

            this.tl = gsap
                .timeline({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        gsap.set(this.DOM.el, { zIndex: 1000 });
                    },
                })
                .to(this.DOM.revealInner, {
                    x: "0%",
                    y: "0%",
                    duration: 0.4,
                    ease: "power3.out",
                })
                .to(
                    this.DOM.revealImg,
                    {
                        x: "0%",
                        y: "0%",
                        duration: 0.4,
                        ease: "power3.out",
                    },
                    "-=0.4"
                ); // Overlap with the previous animation
        }

        hideImage() {
            gsap.killTweensOf(this.DOM.revealInner);
            gsap.killTweensOf(this.DOM.revealImg);

            this.tl = gsap
                .timeline({
                    onStart: () => {
                        gsap.set(this.DOM.el, { zIndex: 999 });
                    },
                    onComplete: () => {
                        gsap.set(this.DOM.el, { zIndex: "" });
                        gsap.set(this.DOM.reveal, { opacity: 0 });
                    },
                })
                .to(this.DOM.revealInner, {
                    x: "100%",
                    y: "100%",
                    duration: 0.3,
                    ease: "power3.out",
                })
                .to(
                    this.DOM.revealImg,
                    {
                        x: "-100%",
                        y: "-100%",
                        duration: 0.3,
                        ease: "power3.out",
                    },
                    "-=0.3"
                ); // Overlap with the previous animation
        }
    }

    [...document.querySelectorAll('[data-fx="2"] > a, a[data-fx="2"]')].forEach(
        (link) => new HoverImgFx2(link)
    );

    // Demo purpose only: Preload all the images in the page..
    const contentel = document.querySelector(".preview");
    [
        ...document.querySelectorAll(
            ".block__title, .block__link, .preview__text-link"
        ),
    ].forEach((el) => {
        const imgsArr = el.dataset.img.split(",");
        for (let i = 0, len = imgsArr.length; i <= len - 1; ++i) {
            const imgel = document.createElement("img");
            imgel.style.visibility = "hidden";
            imgel.style.width = 0;
            imgel.src = imgsArr[i];
            imgel.className = "preload";
            // contentel.appendChild(imgel);
        }
    });
    imagesLoaded(document.querySelectorAll(".preload"), () =>
        document.body.classList.remove("loading")
    );
}

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;

    if (e) {
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx =
                e.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy =
                e.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop;
        }
    }

    return { x: posx, y: posy };
};
