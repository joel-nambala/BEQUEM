'use strict';

// Select DOM elements
const copyYear = document.querySelector('.copy-year');
const btnModal = document.querySelectorAll('.btn-modal');
const contactModal = document.querySelector('.contact');
const contactFormModal = document.querySelector('.contact-form');
const navRespond = document.querySelector('.nav-respond');
const linksContainer = document.querySelector('.links-container');
const navList = document.querySelector('.nav-list');
const nav = document.querySelector('.nav');

// Change copyright year
const changeCopyrightYear = function () {
  // Get the present year
  const today = new Date().getFullYear();

  // Update the UI
  copyYear.textContent = today;
};
changeCopyrightYear();

// Show modal
const showModal = function (e) {
  e.preventDefault();
  contactModal.classList.add('show-modal');
  contactFormModal.classList.add('show-modal');
};

// Hide modal
const hideModal = function () {
  contactModal.classList.remove('show-modal');
  contactFormModal.classList.remove('show-modal');
};

btnModal.forEach(function (btn, i, arr) {
  btn.addEventListener('click', showModal);
});

contactModal.addEventListener('click', hideModal);

// Responsive navigation bar
const responsiveNavigation = function () {
  // Calculate the heights
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const navHeight = navList.getBoundingClientRect().height;

  // Append the heights
  if (containerHeight === 0) linksContainer.style.height = `${navHeight}px`;
  else linksContainer.style.height = 0;
};

navRespond.addEventListener('click', responsiveNavigation);

// Fixed navigation bar
const fixedNavigation = function () {
  // Calculate the heights
  const scrollHeight = window.scrollY;
  const navHeight = navList.getBoundingClientRect().height;

  // Append the navigation
  if (scrollHeight > navHeight) nav.classList.add('fixed');
  else nav.classList.remove('fixed');
};

window.addEventListener('scroll', fixedNavigation);
