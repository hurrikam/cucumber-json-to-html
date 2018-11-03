'use strict';

function showFeature(activeIndex) {
    document.querySelectorAll('.feature-list button')
        .forEach((button, index) => {
            const buttonClassLit = button.classList;
            if (index === activeIndex) {
                buttonClassLit.add('active');
            } else {
                buttonClassLit.remove('active');
            }
        });
    document.querySelectorAll('.feature-details .feature')
        .forEach((featureDiv, index) => {
            const featureClassLit = featureDiv.classList;
            if (index === activeIndex) {
                featureClassLit.remove('feature-hidden');
            } else {
                featureClassLit.add('feature-hidden');
            }
        });
}

window.onload = () => document.querySelector('.feature-list button').click();
