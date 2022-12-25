import * as bootstrap from "bootstrap";

export function initNavbar() {
  const mainNav = document.querySelector("#mainNav");

  if (mainNav) {
    const navbarCollapse = mainNav.querySelector(".navbar-collapse");

    if (navbarCollapse) {
        const collapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
        });

        const navbarItems = navbarCollapse.querySelectorAll("a") as any;

        // Closes responsive menu when a scroll trigger link is clicked
        for (const item of navbarItems) {
            item.addEventListener("click", (event: Event) => {
            collapse.hide();
            });
        }
    }

    // Collapse Navbar
    const collapseNavbar = function () {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);

    // Hide navbar when modals trigger
    const modals = document.querySelectorAll(".portfolio-modal") as any;

    for (const modal of modals) {
        modal.addEventListener("shown.bs.modal", (event: Event) => {
        mainNav.classList.add("d-none");
      });

      modal.addEventListener("hidden.bs.modal", (event: Event) => {
        mainNav.classList.remove("d-none");
      });
    }
  }
}
