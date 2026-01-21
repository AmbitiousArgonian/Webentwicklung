import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
document.addEventListener("DOMContentLoaded", () => {

  const header = document.getElementById("header");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  /* Abbruch, wenn keine Navbar existiert */
  if (!header || !mobileBtn || !navMenu) return;

  /* Scroll Effekt */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* Mobile Menü Toggle */
  mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  /* Menü schließen nach Klick */
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

});