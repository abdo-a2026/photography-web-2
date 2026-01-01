// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar Scroll Effect
const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScroll = currentScroll
})

// Active Navigation Link
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Portfolio Gallery
const portfolioGrid = document.getElementById("portfolioGrid")
const filterBtns = document.querySelectorAll(".filter-btn")
let currentFilter = "all"

// Load gallery items
function loadGallery(filter = "all") {
  portfolioGrid.innerHTML = ""

  const filteredData = filter === "all" ? galleryData : galleryData.filter((item) => item.category === filter)

  filteredData.forEach((item, index) => {
    const portfolioItem = document.createElement("div")
    portfolioItem.className = "portfolio-item"
    portfolioItem.setAttribute("data-category", item.category)
    portfolioItem.style.animationDelay = `${index * 0.1}s`

    portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-category">${item.categoryAr}</p>
            </div>
        `

    portfolioItem.addEventListener("click", () => openLightbox(item.id, filteredData))
    portfolioGrid.appendChild(portfolioItem)
  })
}

// Filter functionality
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")
    currentFilter = filter
    loadGallery(filter)
  })
})

// Lightbox
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const lightboxCaption = document.getElementById("lightboxCaption")
const lightboxClose = document.getElementById("lightboxClose")
const lightboxPrev = document.getElementById("lightboxPrev")
const lightboxNext = document.getElementById("lightboxNext")

let currentImageIndex = 0
let currentGalleryData = []

function openLightbox(imageId, galleryData) {
  currentGalleryData = galleryData
  currentImageIndex = galleryData.findIndex((item) => item.id === imageId)

  showLightboxImage()
  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = ""
}

function showLightboxImage() {
  const item = currentGalleryData[currentImageIndex]
  lightboxImage.src = item.image
  lightboxImage.alt = item.title
  lightboxCaption.textContent = `${item.title} - ${item.categoryAr}`
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentGalleryData.length
  showLightboxImage()
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentGalleryData.length) % currentGalleryData.length
  showLightboxImage()
}

lightboxClose.addEventListener("click", closeLightbox)
lightboxNext.addEventListener("click", prevImage)
lightboxPrev.addEventListener("click", nextImage)

// Close lightbox on background click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return

  if (e.key === "Escape") closeLightbox()
  if (e.key === "ArrowLeft") nextImage()
  if (e.key === "ArrowRight") prevImage()
})

// Contact Form
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector(".btn-submit")
  submitBtn.classList.add("loading")

  // Simulate form submission
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Show success message
  formMessage.className = "form-message success"
  formMessage.textContent = "تم إرسال طلبك بنجاح! سنتواصل معك قريباً."

  submitBtn.classList.remove("loading")
  contactForm.reset()

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = "none"
  }, 5000)
})

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal")

const revealOnScroll = () => {
  const windowHeight = window.innerHeight

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const revealPoint = 100

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)
revealOnScroll() // Initial check

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Initialize gallery on page load
document.addEventListener("DOMContentLoaded", () => {
  loadGallery()
})

// Lazy Loading Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}

// Import gallery data from gallery-data.js
const galleryData = window.galleryData || []
