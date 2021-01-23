// Define Global Variables
const sections = Array.from(document.querySelectorAll('section'));
const navbarMenu = document.getElementById('navbarlist');
let navbarItems = sections.length;

// build the nav
function getNavbarItem() {
    for (section of sections) {
        nameOfSection = section.getAttribute('data-nav');
        goToSection = section.getAttribute('id');
        getItem = document.createElement('li');
        getItem.innerHTML = `<a class="menulink" href="#${goToSection}">${nameOfSection}</a>`;
        navbarMenu.appendChild(getItem);
    }
}

// Add class 'active' to section when near top of viewport
function sectionInViewPort (elem) {
    let positionOfSection = elem.getBoundingClientRect();
    return (positionOfSection.top >= 0);
}

function getActive() {
    for (section of sections) {
        if (sectionInViewPort(section)) {
            if (section.classList.contains('youractiveclass') !=null) {
                section.classList.add('youractiveclass');
            }
        } else { 
            section.classList.remove('youractiveclass');
        }
    }
}

// Scroll to anchor ID using the scroll event
getNavbarItem();
document.addEventListener('scroll', getActive);
