// Create floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particles.appendChild(particle);
    }
  }

  // Function to load projects (using hardcoded data for now)
  function loadProjects() {
      const projects = [
          { 
              title: "Portfolio Website", 
              description: "Website ສ່ວນຕົວທີ່ສວຍງາມ ແລະ ຕອບສະໜອງໄດ້ ສ້າງດ້ວຍ HTML, CSS, JS", 
              icon: "fas fa-globe",
              gradient: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              link: "#" // Replace with actual project link
          }
      ];

      const projectList = document.getElementById("project-list");
      projectList.innerHTML = ''; // Clear existing content

      projects.forEach((project, index) => {
          const col = document.createElement("div");
          col.className = "col-md-6 col-lg-4 animate-zoom-in"; // Added animation class
          col.style.animationDelay = (index * 0.1) + 's'; // Staggered animation delay
          col.innerHTML = `
              <div class="card project-card h-100">
                  <div class="project-image" style="background: ${project.gradient};">
                      <i class="${project.icon}"></i>
                  </div>
                  <div class="card-body d-flex flex-column">
                      <h5 class="card-title">
                      <i class="fas fa-star" style="color: #ffd700; margin-right: 8px;"></i>
                      ${project.title}
                      </h5>
                      <p class="card-text">${project.description}</p>
                      <div class="mt-auto pt-3">
                          <a href="${project.link}" class="btn btn-project" target="_blank" rel="noopener noreferrer">
                              <i class="fas fa-external-link-alt"></i> ดูโปรเจกต์
                          </a>
                      </div>
                  </div>
              </div>
          `;
          projectList.appendChild(col);
      });
  }

  // Function to handle profile image loading error
  function handleProfileImageError() {
      const profileImage = document.getElementById('profileImage');
      const parentContainer = profileImage.parentElement;

      // Hide the problematic image
      profileImage.style.display = 'none';

      // Create a fallback icon
      const fallbackIcon = document.createElement('i');
      fallbackIcon.className = 'fas fa-user'; // FontAwesome user icon
      parentContainer.appendChild(fallbackIcon);

      console.warn('Profile image failed to load. Displaying fallback icon.');
  }

  // Event Listeners and Initializations
  document.addEventListener('DOMContentLoaded', () => {
      // Load projects when the DOM is fully loaded
      loadProjects(); 
      // Initialize floating particles
      createParticles(); 
      
      // Setup Intersection Observer for active navigation links on scroll
      const sections = document.querySelectorAll('section, header#top'); 
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

      const observerOptions = {
          root: null,
          rootMargin: '-50% 0px -49% 0px', 
          threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  navLinks.forEach(link => {
                      link.classList.remove('active');
                      if (link.getAttribute('href') === `#${entry.target.id}`) {
                          link.classList.add('active');
                      } else if (entry.target.id === 'top' && link.getAttribute('href') === '#top') {
                          link.classList.add('active');
                      }
                  });
              }
          });
      }, observerOptions);

      sections.forEach(section => {
          sectionObserver.observe(section);
      });

      // Add error listener for profile image
      const profileImage = document.getElementById('profileImage');
      if (profileImage) {
          profileImage.addEventListener('error', handleProfileImageError);
      }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = targetElement.offsetTop - navbarHeight - 20; 
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active state in navbar (this is also handled by Intersection Observer, but useful for click)
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Contact form validation
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation(); // Prevent default if validation fails

        if (form.checkValidity()) {
          // Simulate form submission
          alert('ขอบคุณที่ติดต่อมาครับ! ผมจะติดต่อกลับไปโดยเร็ว ✨');
          form.reset(); 
          form.classList.remove('was-validated'); 
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();