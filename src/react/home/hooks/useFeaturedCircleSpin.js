import { useEffect } from "react";
import anime from "animejs";

export const useFeaturedCircleSpin = () => {
    useEffect(() => {
        const animation = anime({
            targets: ".featured-project__circle--react",
            rotate: "360deg",
            easing: "linear",
            duration: 15000,
            loop: true,
        });

        return () => animation.pause();
    }, []);
};
