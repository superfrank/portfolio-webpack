require("normalize.css/normalize.css");
require("./styles/index.scss");
import inView from "in-view";
import anime from "animejs";
// import Marquee3k from "marquee3000";
import imagesLoaded from "imagesloaded";
import TweenMax from "./assets/TweenMax.min.js";
// Marquee3k.init();

document.addEventListener("DOMContentLoaded", () => {
    // console.log("page-loaded");
});

const mq = window.matchMedia("(max-width: 980px)");

anime({
    targets: ".featured-project__circle",
    rotate: "360deg",
    easing: "linear",
    duration: 15000,
    loop: true
});

if (mq.matches) {
    anime({
        targets: ".featured-project__mickey-hand--mobile",
        translateY: "-10px",
        direction: "alternate",
        duration: "500",
        delay: 1500,
        easing: "easeInOutSine",
        loop: true
    });
} else {
    anime({
        targets: ".featured-project__mickey-hand--desktop",
        translateX: "1.6vw",
        direction: "alternate",
        duration: "500",
        delay: 2000,
        easing: "easeInOutSine",
        loop: true
    });
}

if (mq.matches) {
    inView(".animated-type h2")
        .on("enter", section => {
            // classList.add adds a class
            // console.log("in-view");
            anime({
                targets: ".first",
                translateY: "16vw",
                rotate: "-15deg",
                delay: 1000,
                easing: "spring(2, 80, 10, 0)"
            });
            anime({
                targets: ".second",
                translateY: "16.5vw",
                rotate: "15deg",
                delay: 1050,
                easing: "spring(2, 80, 10, 0)"
            });
            anime({
                targets: ".third",
                translateY: "16vw",
                delay: 1100,
                easing: "spring(2, 80, 10, 0)"
            });
        })
        .on("exit", section => {
            // console.log("out-view");
        });
} else {
    inView(".animated-type h2")
        .on("enter", section => {
            // classList.add adds a class
            // console.log("in-view");
            anime({
                targets: ".first",
                translateY: "8vw",
                rotate: "-15deg",
                delay: 1000,
                easing: "spring(2, 80, 10, 0)"
            });
            anime({
                targets: ".second",
                translateY: "8.5vw",
                rotate: "15deg",
                delay: 1050,
                easing: "spring(2, 80, 10, 0)"
            });
            anime({
                targets: ".third",
                translateY: "8vw",
                delay: 1100,
                easing: "spring(2, 80, 10, 0)"
            });
        })
        .on("exit", section => {
            // console.log("out-view");
        });
}

inView.threshold(1);

// image hover //
if (mq.matches) {
} else {
    !(function(e) {
        "undefined" == typeof module
            ? (this.charming = e)
            : (module.exports = e);
    })(function(e, n) {
        "use strict";
        n = n || {};
        var t = n.tagName || "span",
            o = null != n.classPrefix ? n.classPrefix : "char",
            r = 1,
            a = function(e) {
                for (
                    var n = e.parentNode, a = e.nodeValue, c = a.length, l = -1;
                    ++l < c;

                ) {
                    var d = document.createElement(t);
                    o && ((d.className = o + r), r++),
                        d.appendChild(document.createTextNode(a[l])),
                        n.insertBefore(d, e);
                }
                n.removeChild(e);
            };
        return (
            (function c(e) {
                for (
                    var n = [].slice.call(e.childNodes), t = n.length, o = -1;
                    ++o < t;

                )
                    c(n[o]);
                e.nodeType === Node.TEXT_NODE && a(e);
            })(e),
            e
        );
    });

    {
        const getMousePos = e => {
            let posx = 0;
            let posy = 0;
            if (!e) e = window.event;
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
            return { x: posx, y: posy };
        };

        // Effect 2
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
                this.DOM.revealInner.style.overflow = "hidden";
                this.DOM.revealImg = this.DOM.revealInner.querySelector(
                    ".hover-reveal__img"
                );

                this.initEvents();
            }
            initEvents() {
                this.positionElement = ev => {
                    const mousePos = getMousePos(ev);
                    const docScrolls = {
                        left:
                            document.body.scrollLeft +
                            document.documentElement.scrollLeft,
                        top:
                            document.body.scrollTop +
                            document.documentElement.scrollTop
                    };
                    this.DOM.reveal.style.top = `${mousePos.y +
                        20 -
                        docScrolls.top}px`;
                    this.DOM.reveal.style.left = `${mousePos.x +
                        20 -
                        docScrolls.left}px`;
                };
                this.mouseenterFn = ev => {
                    this.positionElement(ev);
                    this.showImage();
                };
                this.mousemoveFn = ev =>
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
                TweenMax.killTweensOf(this.DOM.revealInner);
                TweenMax.killTweensOf(this.DOM.revealImg);

                this.tl = new TimelineMax({
                    onStart: () => {
                        this.DOM.reveal.style.opacity = 1;
                        TweenMax.set(this.DOM.el, { zIndex: 1000 });
                    }
                })
                    .add("begin")
                    .add(
                        new TweenMax(this.DOM.revealInner, 0.4, {
                            ease: Quint.easeOut,
                            startAt: { x: "-100%", y: "-100%" },
                            x: "0%",
                            y: "0%"
                        }),
                        "begin"
                    )
                    .add(
                        new TweenMax(this.DOM.revealImg, 0.4, {
                            ease: Quint.easeOut,
                            startAt: { x: "100%", y: "100%" },
                            x: "0%",
                            y: "0%"
                        }),
                        "begin"
                    );
            }
            hideImage() {
                TweenMax.killTweensOf(this.DOM.revealInner);
                TweenMax.killTweensOf(this.DOM.revealImg);

                this.tl = new TimelineMax({
                    onStart: () => {
                        TweenMax.set(this.DOM.el, { zIndex: 999 });
                    },
                    onComplete: () => {
                        TweenMax.set(this.DOM.el, { zIndex: "" });
                        TweenMax.set(this.DOM.reveal, { opacity: 0 });
                    }
                })
                    .add("begin")
                    .add(
                        new TweenMax(this.DOM.revealInner, 0.3, {
                            ease: Quint.easeOut,
                            x: "100%",
                            y: "100%"
                        }),
                        "begin"
                    )

                    .add(
                        new TweenMax(this.DOM.revealImg, 0.3, {
                            ease: Quint.easeOut,
                            x: "-100%",
                            y: "-100%"
                        }),
                        "begin"
                    );
            }
        }

        [
            ...document.querySelectorAll('[data-fx="2"] > a, a[data-fx="2"]')
        ].forEach(link => new HoverImgFx2(link));

        // Demo purpose only: Preload all the images in the page..
        const contentel = document.querySelector(".preview");
        [
            ...document.querySelectorAll(
                ".block__title, .block__link, .preview__text-link"
            )
        ].forEach(el => {
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
}
