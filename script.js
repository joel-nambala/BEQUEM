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
const scrollLink = document.querySelectorAll('.scroll-link');

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

// Smooth scroll
scrollLink.forEach(function (link, i, arr) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    // Get the href attribute
    const id = link.getAttribute('href');

    // Select the section to scroll to
    const element = document.querySelector(id);
    if (element === null) return;

    // Calculate the heights
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const navHeight = nav.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains('fixed');

    // Get the position of the element
    let position = element.offsetTop - navHeight;

    // Change the offset position of an element
    if (!fixedNav) position = position - navHeight;
    if (navHeight > 82) position = position + containerHeight;

    // Scroll behaviour
    window.scrollTo({
      left: 0,
      top: position,
      behavior: 'smooth',
    });

    // Set the links container height back to zero
    linksContainer.style.height = 0;
  });
});
