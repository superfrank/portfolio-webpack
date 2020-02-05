require("normalize.css/normalize.css");
require("../styles/index.scss");
console.log("test");
import inView from "in-view";
import anime from "animejs";

const mqDesktop = window.matchMedia( "(min-width: 980px)" );

if (mqDesktop.matches) {
    // window width is at least 500px
    anime({
        targets: ".svg__hand--desktop",
        keyframes: [{ translateX: -20 }, { translateX: 0 }],
        delay: 3000,
        duration: 1500,
        easing: "spring(1, 80, 10, 0)",
        loop: true
    });
    } else {
    }



anime({
    targets: ".svg__arrow--link",
    keyframes: [{ translateX: -8 }, { translateX: 0 }],
    delay: 2000,
    duration: 1500,
    easing: "spring(1, 80, 10, 0)",
    loop: true
});

// inView(".caption__header")
//     .on("enter", section => {
//         // classList.add adds a class
//         console.log("in-view");
//         anime({
//             targets: ".svg__hand path",
//             strokeDashoffset: [anime.setDashoffset, 0],
//             easing: "easeInOutSine",
//             duration: 3000
//             // direction: "alternate",
//             // endDelay: 2000,
//             // loop: true
//         });
//     })
//     .on("exit", section => {
//         console.log("out-view");
//     });
