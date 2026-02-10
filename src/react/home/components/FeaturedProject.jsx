import React from "react";

export const FeaturedProject = () => {
    return (
        <section className="featured-project wrapper fade-up">
            <a href="https://wapo.st/4tq6HgL" className="featured-project__image-wrapper">
                <div className="featured-project__circle featured-project__circle--react">Featured project</div>
                <h2 className="featured-project__header">Why you should let your grass grow</h2>
                <h3 className="featured-project__subheader featured-project__cta">
                    View project <span>+</span>
                </h3>
            </a>
        </section>
    );
};
