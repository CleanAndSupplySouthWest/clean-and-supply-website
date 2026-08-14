// Common JavaScript functionality for both pages

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = mobileMenuBtn.querySelector('[data-lucide="menu"]')
  const closeIcon = mobileMenuBtn.querySelector('[data-lucide="x"]')
  const lucide = window.lucide // Declare the lucide variable

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden")

      if (isOpen) {
        mobileMenu.classList.add("hidden")
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>'
      } else {
        mobileMenu.classList.remove("hidden")
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>'
      }

      // Reinitialize Lucide icons
      if (lucide) {
        lucide.createIcons()
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
          mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>'
          if (lucide) {
            lucide.createIcons()
          }
        }
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 1500)
    })
  }

  // Add loading states to buttons
  document.querySelectorAll("button").forEach((button) => {
    if (button.type !== "submit") {
      button.addEventListener("click", function () {
        // Add subtle loading effect for better UX
        this.style.transform = "scale(0.98)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 100)
      })
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll("section, .card, .product-card").forEach((el) => {
    observer.observe(el)
  })

  // Add page transition effect
  document.body.classList.add("page-transition")

  // Enhanced Intersection Observer for scroll animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target

          // Add appropriate animation class based on element type
          if (element.classList.contains("fade-in-up")) {
            element.classList.add("animate")
          } else if (element.classList.contains("fade-in-left")) {
            element.classList.add("animate")
          } else if (element.classList.contains("fade-in-right")) {
            element.classList.add("animate")
          } else if (element.classList.contains("scale-in")) {
            element.classList.add("animate")
          } else if (element.classList.contains("reveal")) {
            element.classList.add("active")
          }

          // Unobserve after animation to improve performance
          animationObserver.unobserve(element)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe all elements with animation classes
  document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .reveal").forEach((el) => {
    animationObserver.observe(el)
  })

  // Parallax effect for hero section
  const heroSection = document.querySelector("section")
  const heroImage = heroSection?.querySelector("img")

  if (heroImage) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        heroImage.style.transform = `translateY(${rate}px)`
      }, 16),
    )
  }

  // Enhanced button interactions
  document.querySelectorAll("button, .btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1)"
    })
  })

  // Staggered animation for navigation items
  const navItems = document.querySelectorAll("nav a")
  navItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(-20px)"
    item.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"

    setTimeout(
      () => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      },
      100 + index * 100,
    )
  })

  // Add floating animation to service icons
  document.querySelectorAll("[data-lucide]").forEach((icon, index) => {
    if (icon.closest("#services")) {
      setTimeout(() => {
        icon.classList.add("float")
      }, index * 200)
    }
  })

  // Smooth reveal for service cards
  const serviceCards = document.querySelectorAll("#services .group")
  serviceCards.forEach((card, index) => {
    card.classList.add("reveal")
    card.style.transitionDelay = `${index * 0.1}s`
  })

  // Enhanced hover effects for contact section
  const contactItems = document.querySelectorAll("#contact .flex.items-start")
  contactItems.forEach((item) => {
    item.classList.add("hover-lift")
  })

  // Easter Egg: Falling Header Animation
  let idleTimer = null
  let isIdle = false
  let lastScrollTime = Date.now()
  let easterEggTriggered = false

  // Reset idle timer
  function resetIdleTimer() {
    clearTimeout(idleTimer)
    isIdle = false
    lastScrollTime = Date.now()

    // Only set new timer if easter egg hasn't been triggered yet
    if (!easterEggTriggered) {
      idleTimer = setTimeout(() => {
        isIdle = true
        checkForEasterEgg()
      }, 40000) // Changed from 120000ms (2 minutes) to 40000ms (40 seconds)
    }
  }

  // Check if conditions are met for easter egg
  function checkForEasterEgg() {
    const header = document.querySelector("header")
    const headerRect = header.getBoundingClientRect()
    const isHeaderVisible = headerRect.top >= 0 && headerRect.bottom <= window.innerHeight

    if (isIdle && isHeaderVisible && !easterEggTriggered) {
      triggerEasterEgg()
    }
  }

  // Trigger the easter egg animation
  function triggerEasterEgg() {
    console.log("[v0] Easter egg triggered! 🔨")
    easterEggTriggered = true

    const header = document.querySelector("header")
    const body = document.body

    // Create hammer element
    const hammer = document.createElement("div")
    hammer.className = "hammer"
    hammer.innerHTML = "🔨"
    body.appendChild(hammer)

    // Create nail element
    const nail = document.createElement("div")
    nail.className = "nail"
    body.appendChild(nail)

    // Create sparkle effects
    for (let i = 1; i <= 3; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = `sparkle sparkle-${i}`
      body.appendChild(sparkle)
    }

    // Create sorry message
    const sorryMessage = document.createElement("div")
    sorryMessage.className = "sorry-message"
    sorryMessage.textContent = "Sorry about that! 😅"
    body.appendChild(sorryMessage)

    // Start the animation sequence
    setTimeout(() => {
      // Step 1: Header falls
      header.classList.add("header-falling")

      setTimeout(() => {
        // Step 2: Hammer moves across screen
        hammer.classList.add("hammer-moving")

        setTimeout(() => {
          // Step 3: Header gets restored
          header.classList.remove("header-falling")
          header.classList.add("header-restoring")

          setTimeout(() => {
            // Step 4: Nail appears
            nail.classList.add("nail-appearing")

            setTimeout(() => {
              // Step 5: Sorry message shows
              sorryMessage.classList.add("sorry-message-showing")

              setTimeout(() => {
                // Cleanup after animation completes
                header.classList.remove("header-restoring")

                setTimeout(() => {
                  // Remove all easter egg elements
                  hammer.remove()
                  nail.remove()
                  sorryMessage.remove()
                  document.querySelectorAll(".sparkle").forEach((sparkle) => sparkle.remove())

                  // Reset for potential future triggers (if user stays on page long enough)
                  setTimeout(() => {
                    easterEggTriggered = false
                    resetIdleTimer()
                  }, 300000) // Reset after 5 minutes
                }, 1000)
              }, 7000) // Wait for sorry message to finish
            }, 500) // Wait for nail to appear
          }, 1500) // Wait a bit before restoring header
        }, 1500) // Reduced from 1000ms to 1500ms to account for faster fall
      }, 1000) // Reduced from 2000ms to 1000ms for faster sequence
    }, 500) // Small delay before starting
  }

  // Event listeners for user activity
  const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]

  activityEvents.forEach((event) => {
    document.addEventListener(event, resetIdleTimer, true)
  })

  // Special handling for scroll events to track scroll activity
  let scrollTimeout
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      // User has stopped scrolling
      if (!easterEggTriggered) {
        resetIdleTimer()
      }
    }, 150)
  })

  // Initialize idle timer
  resetIdleTimer()

  console.log("[v0] Easter egg system initialized! Wait 40 seconds while idle to see the magic ✨") // Updated console message to reflect new timing
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn("Could not save to localStorage:", e)
  }
}

function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.warn("Could not load from localStorage:", e)
    return null
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    }, 0)
  })
}
