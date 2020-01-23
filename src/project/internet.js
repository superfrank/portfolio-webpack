require("normalize.css/normalize.css");
require("../styles/index.scss");
console.log("test");
import anime from "animejs";

anime({
    targets: ".svg__hand path",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "easeInOutSine",
    duration: 3000
    // direction: "alternate",
    // endDelay: 2000,
    // loop: true
});

anime({
    targets: ".svg__hand",
    keyframes: [{ translateX: -20 }, { translateX: 0 }],
    delay: 3000,
    duration: 1500,
    easing: "spring(1, 80, 10, 0)",
    loop: true
});
