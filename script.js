const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const bmiForm = document.getElementById("bmiForm");
const bmiResult = document.getElementById("bmiResult");

if (bmiForm && bmiResult) {
  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const height = Number(document.getElementById("heightInput").value);
    const weight = Number(document.getElementById("weightInput").value);
    const value = weight / Math.pow(height / 100, 2);
    const output = bmiResult.querySelector("strong");
    const message = bmiResult.querySelector("p");

    if (!height || !weight || height <= 0 || weight <= 0) {
      output.textContent = "--";
      message.textContent = "Enter valid height and weight values.";
      return;
    }

    output.textContent = value.toFixed(1);

    if (value < 18.5) {
      message.textContent = "Underweight range. Build a stronger nutrition and training base.";
    } else if (value < 25) {
      message.textContent = "Healthy range. Keep progressing with strength and conditioning.";
    } else if (value < 30) {
      message.textContent = "Overweight range. A structured fat-loss plan can help.";
    } else {
      message.textContent = "Obese range. Start with coach-led movement and nutrition support.";
    }
  });
}

const popup = document.getElementById("membershipPopup");
const closePopup = document.querySelector("[data-close-popup]");

if (popup) {
  window.setTimeout(() => popup.classList.add("show"), 900);
}

if (closePopup && popup) {
  closePopup.addEventListener("click", () => popup.classList.remove("show"));
}

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const testimonials = [...slider.querySelectorAll(".testimonial")];
  const next = slider.querySelector("[data-next]");
  const prev = slider.querySelector("[data-prev]");
  let index = 0;

  const show = (newIndex) => {
    testimonials[index].classList.remove("active");
    index = (newIndex + testimonials.length) % testimonials.length;
    testimonials[index].classList.add("active");
  };

  next.addEventListener("click", () => show(index + 1));
  prev.addEventListener("click", () => show(index - 1));
  window.setInterval(() => show(index + 1), 5500);
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const original = button.textContent;
    button.textContent = "Message Sent";
    window.setTimeout(() => {
      button.textContent = original;
      form.reset();
    }, 1600);
  });
});
