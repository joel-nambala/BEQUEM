'use strict';

// Select DOM elements
const copyYear = document.querySelector('.copy-year');

// Functions
const changeCopyrightYear = function () {
  // Get the present year
  const today = new Date().getFullYear();

  // Update the UI
  copyYear.textContent = today;
};
changeCopyrightYear();
