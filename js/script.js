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
const closeModal = document.querySelector('.close-modal');
const locationContainer = document.querySelector('#location');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const header = document.getElementById('header');
const btnUp = document.querySelector('.btn-up');

// Get all countries in the world
const searchCountries = async function () {
  try {
    // Get the countries data from an API
    const response = await fetch('https://restcountries.com/v3.1/all');

    // Throw an exception
    if (!response.ok) throw new Error('Failed to fetch countries');

    // Conert the data to a json string
    const data = await response.json();

    // Initialize the locations array
    const locations = [];

    // Loop over the countries data and push the names to the location array
    data.forEach(function (country, i, arr) {
      locations.push(country.name.common);
    });

    // Sort the locations alphabetically
    locations.sort();

    // Loop over the locations array with the country names
    locations.forEach(function (locale, i, arr) {
      // Generate markup
      const html = `<option value="${locale}">${locale}</option>`;

      // Append to the UI
      locationContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    // Display an error message
    console.error(error.message);
  }
};
searchCountries();

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
  linksContainer.style.height = 0;
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
closeModal.addEventListener('click', hideModal);

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

// Back to top link
const backToTop = function () {
  const scrollHeight = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;
  const navHeight = nav.getBoundingClientRect().height;

  if (scrollHeight > headerHeight - navHeight - 10) btnUp.style.opacity = 1;
  else btnUp.style.opacity = 0;
};

window.addEventListener('scroll', function (e) {
  fixedNavigation();
  backToTop();
});

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

// Slider component
const sliderComponent = function () {
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Create dots
  const createDots = function () {
    slides.forEach(function (_, i, arr) {
      const html = `<button class="dots-dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  // Activate dots
  const activateDot = function (slide) {
    document.querySelectorAll(`.dots-dot`).forEach(function (dot) {
      dot.classList.remove('dots-dot--active');
    });

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot--active');
  };

  // Go to a slide
  const goToSlide = function (slide) {
    slides.forEach(function (s, i, arr) {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Init function
  const slidesInit = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  slidesInit();

  // Event handlers
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  setInterval(nextSlide, 10000);
};

sliderComponent();
