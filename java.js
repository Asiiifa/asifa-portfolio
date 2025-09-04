// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Hide/show header based on scroll direction
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down - hide header
    header.style.transform = 'translateY(-100%)';
    mobileMenuToggle.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up - show header
    header.style.transform = 'translateY(0)';
    mobileMenuToggle.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
}

// Throttle scroll events for better performance
let ticking = false;
function updateHeader() {
  handleScroll();
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

// Theme toggle functionality
const toggleBtn = document.getElementById('theme-toggle');
const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');
const mobileIconMoon = document.getElementById('mobile-icon-moon');
const mobileIconSun = document.getElementById('mobile-icon-sun');

// Mobile menu functionality
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileMenuToggle.querySelector('i');

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
    mobileIconMoon.classList.add('hidden');
    mobileIconSun.classList.remove('hidden');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
    mobileIconSun.classList.add('hidden');
    mobileIconMoon.classList.remove('hidden');
  }
}

// Toggle theme function
function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
    mobileIconSun.classList.add('hidden');
    mobileIconMoon.classList.remove('hidden');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
    mobileIconMoon.classList.add('hidden');
    mobileIconSun.classList.remove('hidden');
    localStorage.setItem('theme', 'dark');
  }
}

// Toggle mobile menu function
function toggleMobileMenu() {
  mobileMenu.classList.toggle('show');
  
  // Change icon
  if (mobileMenu.classList.contains('show')) {
    mobileMenuIcon.classList.remove('fa-bars');
    mobileMenuIcon.classList.add('fa-times');
  } else {
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
  }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  mobileMenu.classList.remove('show');
  mobileMenuIcon.classList.remove('fa-times');
  mobileMenuIcon.classList.add('fa-bars');
}

// Smooth scrolling for anchor links
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Add loading animation to elements
function addLoadingAnimation() {
  const elements = document.querySelectorAll('.card, .project-card, .skill-card');
  elements.forEach((element, index) => {
    element.classList.add('loading');
    setTimeout(() => {
      element.classList.remove('loading');
      element.classList.add('loaded');
    }, index * 100);
  });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Handle window resize
function handleResize() {
  if (window.innerWidth > 768) {
    // Close mobile menu on desktop
    closeMobileMenu();
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Load theme
  loadTheme();
  
  // Add loading animation
  addLoadingAnimation();
  
  // Setup intersection observer
  setupIntersectionObserver();
  
  // Theme toggle
  toggleBtn.addEventListener('click', toggleTheme);
  mobileToggleBtn.addEventListener('click', toggleTheme);
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Scroll event listener for header behavior
  window.addEventListener('scroll', requestTick);
  
  // Close mobile menu when clicking on links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      smoothScrollTo(targetId);
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', handleResize);
  
  // Add scroll effect to header
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
});

// Add hover effects for skill icons
document.addEventListener('DOMContentLoaded', function() {
  const skillIcons = document.querySelectorAll('.skill-icon');
  
  skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect if needed
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('#hero');
  const heroImage = hero.querySelector('img');
  
  if (heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Add active state to navigation links
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
  .nav-link.active,
  .mobile-nav-link.active {
    color: #0366d6 !important;
    background-color: #f3f4f6 !important;
  }
  
  body.dark .nav-link.active,
  body.dark .mobile-nav-link.active {
    color: #58a6ff !important;
    background-color: #374151 !important;
  }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could be used for navigation
    } else {
      // Swipe down - could be used for navigation
    }
  }
}

// Add loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function() {
    this.style.opacity = '0.7';
    setTimeout(() => {
      this.style.opacity = '1';
    }, 1000);
  });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
  });
});

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
  @media print {
    #theme-toggle,
    #mobile-menu-toggle,
    #mobile-menu {
      display: none !important;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
    
    .card,
    .project-card,
    .skill-card {
      box-shadow: none !important;
      border: 1px solid #ccc !important;
    }
  }
`;
document.head.appendChild(printStyles);
