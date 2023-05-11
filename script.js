'use strict';

// Select DOM elements

// Functions
const fixedNavigation = function () {
  const scrollHeight = window.scrollY;
  console.log(scrollHeight);
};

window.addEventListener('scroll', fixedNavigation);
