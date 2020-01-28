require("normalize.css/normalize.css");
require("./styles/index.scss");
import inView from "in-view";
import anime from "animejs";

// const myVideo = require("./assets/media/internetone.mp4");

document.addEventListener("DOMContentLoaded", () => {
    console.log("test");
});

anime({
    targets: ".featured-project__circle",
    rotate: "720deg",
    easing: "linear",
    duration: 8000,
    direction: "alternate",
    loop: true
});

inView(".animated-type h2")
    .on("enter", section => {
        // classList.add adds a class
        console.log("in-view");
        anime({
            targets: ".first",
            translateY: "8vw",
            rotate: "-15deg",
            delay: 2000,
            easing: "spring(2, 80, 10, 0)"
        });
        anime({
            targets: ".second",
            translateY: "8.5vw",
            rotate: "15deg",
            delay: 2050,
            easing: "spring(2, 80, 10, 0)"
        });
        anime({
            targets: ".third",
            translateY: "8vw",
            delay: 2100,
            easing: "spring(2, 80, 10, 0)"
        });
    })
    .on("exit", section => {
        console.log("out-view");
    });

inView.threshold(1);

// window.addEventListener("load", function() {
//     var delay = 2;
//     var nodes = document.querySelectorAll(".animate");
//     for (var i = 0; i < nodes.length; i++) {
//         var words = nodes[i].innerText.split(" ");
//         nodes[i].innerHTML = "";
//         for (var i2 = 0; i2 < words.length; i2++) {
//             var item = document.createElement("span");
//             item.innerText = words[i2];
//             var calc = delay + (nodes.length + i2) / 3;
//             item.style.animationDelay = calc + "s";
//             nodes[i].appendChild(item);
//         }
//     }
// });
