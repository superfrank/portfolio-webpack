import React from "react";
import { projects } from "../data";

export const ProjectList = () => {
    return (
        <section className="project-list wrapper">
            <div className="project-list__grid">
                <div className="project-list__col-1 animated-type">
                    <h2 className="animate first">Selected</h2>
                    <h2 className="animate second">Work</h2>
                    <h2 className="animate third">‘19—‘26</h2>
                </div>
                <div className="project-list__col-2">
                    {projects.map((project) => (
                        <div key={project.id} className="project-list__item block">
                            <a
                                href={project.href}
                                className="project-list__header project-list__link block__link"
                            >
                                <h2 className="featured-project__header">
                                    <span className="project-list__number">{project.id}</span>
                                    {" "}
                                    {project.title} <sup className="project-list__arrow">↗</sup>
                                </h2>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
