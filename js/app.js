// VARIABLES
const header = document.querySelector('.pageheader')
const navbar = document.querySelector('nav');
const navbarList = document.querySelector('.navbarlist');
const sections = Array.from(document.querySelectorAll('section'));
const fragment = document.createDocumentFragment();

// EVENT LISTENERS
window.addEventListener('scroll', getActive);
navbarList.addEventListener('click', scrollToSection);
window.addEventListener('scroll', hideNavbar, false);

// FUNCTIONS

// The addNavbarItem function creates corresponding navigation item that points to the section ID for each section element.
function addNavbarItem() {
  sections.forEach((section, i) => {
    const navbarItem = document.createElement('li');
    navbarItem.setAttribute('class', 'menuitem');
    navbarItem.innerHTML = `<a href=#section${i + 1} class="menulink">${section.dataset.nav}</a>`;
    fragment.appendChild(navbarItem);
  });
}
addNavbarItem();
navbarList.appendChild(fragment);

// The hideNavbar function hides the navbar when the user is not scrolling.
let scrolling = false;

function hideNavbar(e) {
  if (scrolling !== false) {
    clearTimeout(scrolling);
    header.classList.remove('slideup');
    header.classList.add('slidedown');
  }
  scrolling = setTimeout(function () {
    if (header.matches(':hover')) {
      header.classList.remove('slideup');
    } else {
      header.classList.remove('slidedown');
      header.classList.add('slideup');
    }
  }, 800);
}

// When a page loads, the window.onload function provides visibility for the navbar.
window.onload = function () {
  header.classList.add('slidedown');
};

// The getActive function adds a current state to corresponding navigation item, and it adds and removes active class. It highlights section to the user for each section in the viewport.  
function getActive() {
  sections.forEach(section => {
    const bounding = section.getBoundingClientRect();
    const sectionLink = document.querySelector(`a[href="#${section.getAttribute('id')}"]`);
    const sectionHalfShown = section.offsetTop - (section.offsetHeight * 0.5);
    const sectionBehind = section.offsetTop + (section.offsetHeight * 0.5);
    if (
      (bounding.top >= 0) &&
      (bounding.left >= 0) &&
      (Math.floor(bounding.right) <= window.innerWidth) &&
      (window.pageYOffset > sectionHalfShown) && (window.pageYOffset <= sectionBehind)) {
      section.classList.add('activeclass');
      sectionLink.classList.add('current');
    } else if (window.pageYOffset >= sectionBehind || window.pageYOffset < section.offsetTop) {
      section.classList.remove('activeclass');
      sectionLink.classList.remove('current');
    }
  })
}

// The scrollToSection function scrolls to the corresponding section (whose id is the same as href for the item) for each navigation item clicked.
function scrollToSection(e) {
  navbarList.querySelectorAll('a[href^="#"]').forEach(anchor => {
    e.preventDefault();
    if (anchor === e.target) {
      console.log(anchor);
      document.querySelector(e.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    }
  })
}

