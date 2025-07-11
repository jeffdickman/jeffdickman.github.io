// Typing animation for the hero section
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    const phrases = ['Software Developer', 'Problem Solver', 'Tech Enthusiast'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (isDeleting) {
            typingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = phrases[phraseIndex].substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === phrases[phraseIndex].length) {
            isDeleting = true;
            typingSpeed = 50;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 100;
        }

        setTimeout(type, typingSpeed);
    }

    type();

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Blog functionality
    const adminLoginBtn = document.getElementById('admin-login');
    const adminOverlay = document.createElement('div');
    adminOverlay.className = 'admin-overlay';
    document.body.appendChild(adminOverlay);

    const blogPostsContainer = document.querySelector('.blog-posts');
    let blogPosts = [];
    let token = localStorage.getItem('blogToken');

    async function loadBlogPosts() {
        try {
            const response = await fetch('/data/blog/posts.json');
            blogPosts = await response.json();
            blogPostsContainer.innerHTML = '';
            blogPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                    <div class="post-image">
                        ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
                    </div>
                    <h3>${post.title}</h3>
                    <div class="meta">
                        ${new Date(post.date).toLocaleDateString()} • ${post.readTime} min read
                    </div>
                    <p>${post.excerpt}</p>
                `;
                blogPostsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }

    loadBlogPosts();

    adminLoginBtn.addEventListener('click', () => {
        adminOverlay.style.display = 'flex';
        
        const adminForm = document.createElement('div');
        adminForm.className = 'admin-form';
        adminForm.innerHTML = `
            <h3>Admin Login</h3>
            <input type="password" id="admin-password" placeholder="Password">
            <button class="submit-btn">Login</button>
        `;
        
        adminOverlay.appendChild(adminForm);

        const submitBtn = adminForm.querySelector('.submit-btn');
        const passwordInput = adminForm.querySelector('#admin-password');

        submitBtn.addEventListener('click', async () => {
            const password = passwordInput.value;
            try {
                // For GitHub Pages, we'll use a simple password check
                if (password === 'admin123') { // Change this to your desired password
                    localStorage.setItem('blogToken', 'admin_token');
                    adminOverlay.style.display = 'none';
                    showAdminPanel();
                } else {
                    throw new Error('Invalid password');
                }
            } catch (error) {
                alert(error.message);
            }
        });
    });

    function showAdminPanel() {
        const adminForm = document.createElement('div');
        adminForm.className = 'admin-form';
        adminForm.innerHTML = `
            <h3>Create New Post</h3>
            <div class="image-upload">
                <label for="post-image">Featured Image:</label>
                <input type="file" id="post-image" accept="image/*">
                <div id="image-preview" class="image-preview"></div>
            </div>
            <input type="text" id="post-title" placeholder="Title">
            <input type="text" id="post-excerpt" placeholder="Excerpt">
            <input type="number" id="post-read-time" placeholder="Read Time (min)">
            <textarea id="post-content" placeholder="Content"></textarea>
            <button class="submit-btn">Publish Post</button>
        `;
        
        adminOverlay.appendChild(adminForm);
        adminOverlay.style.display = 'flex';

        const submitBtn = adminForm.querySelector('.submit-btn');
        const imageInput = adminForm.querySelector('#post-image');
        const imagePreview = adminForm.querySelector('#image-preview');

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.innerHTML = `<img src="${e.target.result}" class="preview-image">`;
                };
                reader.readAsDataURL(file);
            }
        });

        submitBtn.addEventListener('click', async () => {
            const newPost = {
                title: adminForm.querySelector('#post-title').value,
                excerpt: adminForm.querySelector('#post-excerpt').value,
                content: adminForm.querySelector('#post-content').value,
                readTime: adminForm.querySelector('#post-read-time').value,
                image: imagePreview.querySelector('img') ? imagePreview.querySelector('img').src : '',
                date: new Date().toISOString()
            };

            try {
                // For GitHub Pages, we'll save the post directly to localStorage
                const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
                posts.unshift(newPost);
                localStorage.setItem('blogPosts', JSON.stringify(posts));
                
                // Update the posts.json file
                fetch('/data/blog/posts.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(posts)
                });

                loadBlogPosts();
                adminOverlay.style.display = 'none';
                
                // Reset form
                adminForm.querySelector('#post-title').value = '';
                adminForm.querySelector('#post-excerpt').value = '';
                adminForm.querySelector('#post-read-time').value = '';
                adminForm.querySelector('#post-content').value = '';
                adminForm.querySelector('#post-image').value = '';
                imagePreview.innerHTML = '';
            } catch (error) {
                console.error('Error creating post:', error);
                alert('Failed to create post. Please try again.');
            }

            blogPosts.unshift(newPost);
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            loadBlogPosts();
            adminOverlay.style.display = 'none';
            
            // Reset form
            adminForm.querySelector('#post-title').value = '';
            adminForm.querySelector('#post-excerpt').value = '';
            adminForm.querySelector('#post-read-time').value = '';
            adminForm.querySelector('#post-content').value = '';
            adminForm.querySelector('#post-image').value = '';
            imagePreview.innerHTML = '';
        });
    }

    adminOverlay.addEventListener('click', (e) => {
        if (e.target === adminOverlay) {
            adminOverlay.style.display = 'none';
            adminOverlay.innerHTML = '';
        }
    });
});
