import React from "react";
import { FeaturedProject } from "./components/FeaturedProject";
import { ProjectList } from "./components/ProjectList";
import { useFeaturedCircleSpin } from "./hooks/useFeaturedCircleSpin";

export const App = () => {
    useFeaturedCircleSpin();

    return (
        <>
            <header className="logo logo-home fade-down" id="logo">
                <a className="logo__link" href="https://tobefrank.co.uk">
                    Frank Hulley-Jones
                </a>
            </header>

            <div className="about wrapper fade-down">
                <h1 className="about__header">
                    Frank Hulley-Jones
                    <span className="title-alt"> React rebuild in progress.</span>
                </h1>
            </div>

            <main id="one-page">
                <FeaturedProject />
                <ProjectList />
            </main>
        </>
    );
};
