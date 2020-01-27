require("normalize.css/normalize.css");
require("./styles/index.scss");
import inView from "in-view";

// const myVideo = require("./assets/media/internetone.mp4");

document.addEventListener("DOMContentLoaded", () => {
    console.log("test");
});

inView(".animated-type h2")
    .on("enter", section => {
        // classList.add adds a class
        section.classList.add("animate");
        console.log("in-view");
    })
    .on("exit", section => {
        section.classList.remove("in-viewport");
        console.log("out-view");
    });

inView.threshold(0.2);

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
