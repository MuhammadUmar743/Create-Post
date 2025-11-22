        const authButtons = document.getElementById('authButtons');
        const profileInfo = document.getElementById('profileInfo');
        const sellBtn = document.getElementById('sellBtn');
        const signinBtn = document.getElementById('signinBtn');
        const signupBtn = document.getElementById('signupBtn');
        const heroSignupBtn = document.getElementById('heroSignupBtn');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userAvatar = document.getElementById('userAvatar');
        const adsContainer = document.getElementById('adsContainer');
        const successMessage = document.getElementById('successMessage');

        const signupModal = document.getElementById('signupModal');
        const signinModal = document.getElementById('signinModal');
        const sellModal = document.getElementById('sellModal');

      
        const signupForm = document.getElementById('signupForm');
        const signinForm = document.getElementById('signinForm');
        const sellForm = document.getElementById('sellForm');

     
        const closeSignup = document.getElementById('closeSignup');
        const closeSignin = document.getElementById('closeSignin');
        const closeSell = document.getElementById('closeSell');

 
        let currentUser = null;
        let userAds = [];

        const sampleProducts = [
            {
                id: 1,
                title: "Vintage Leather Jacket",
                price: 129.99,
                description: "Genuine leather jacket in excellent condition. Perfect for autumn weather.",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                seller: "FashionStore"
            },
            {
                id: 2,
                title: "Professional DSLR Camera",
                price: 899.99,
                description: "Like-new DSLR camera with multiple lenses. Perfect for photography enthusiasts.",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=898&q=80",
                seller: "CameraPro"
            },
            {
                id: 3,
                title: "Handcrafted Wooden Desk",
                price: 349.99,
                description: "Beautiful solid wood desk with ample storage space. Handcrafted with attention to detail.",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
                seller: "WoodCraft"
            },
            {
                id: 4,
                title: "Limited Edition Smartwatch",
                price: 249.99,
                description: "Feature-packed smartwatch with health monitoring and premium design.",
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
                seller: "TechGadgets"
            },
            {
                id: 5,
                title: "Designer Handbag",
                price: 459.99,
                description: "Authentic designer handbag in pristine condition. Includes original dust bag.",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                seller: "LuxuryBags"
            },
            {
                id: 6,
                title: "Noise Cancelling Headphones",
                price: 199.99,
                description: "Premium wireless headphones with industry-leading noise cancellation technology.",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                seller: "AudioElite"
            }
        ];

       
        function checkAuthStatus() {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                currentUser = JSON.parse(userData);
                updateUIForLoggedInUser();
            }
            
         
            const savedAds = localStorage.getItem('userAds');
            if (savedAds) {
                userAds = JSON.parse(savedAds);
            }
            
     
            loadProducts();
        }

        function updateUIForLoggedInUser() {
            authButtons.style.display = 'none';
            profileInfo.style.display = 'flex';
            sellBtn.disabled = false;
            
            userName.textContent = currentUser.name;
            userEmail.textContent = currentUser.email;
            userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        }


        function loadProducts() {
            displayProducts(sampleProducts);
        }

      
        function displayProducts(products) {
            adsContainer.innerHTML = '';
            
   
            userAds.forEach(ad => {
                const adElement = createAdElement(ad, true);
                adsContainer.appendChild(adElement);
            });
            
           
            products.forEach(product => {
                const adElement = createAdElement(product, false);
                adsContainer.appendChild(adElement);
            });
            
            if (adsContainer.children.length === 0) {
                adsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-box-open"></i>
                        <h3>No listings available</h3>
                        <p>Be the first to post an item for sale!</p>
                    </div>
                `;
            }
        }

  
        function createAdElement(ad, isUserAd) {
            const adCard = document.createElement('div');
            adCard.className = 'ad-card';
            
            adCard.innerHTML = `
                ${isUserAd ? '<div class="ad-badge">Your Listing</div>' : ''}
                <img src="${ad.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80'}" alt="${ad.title}" class="ad-image">
                <div class="ad-details">
                    <h3 class="ad-title">${ad.title}</h3>
                    <div class="ad-price">$${ad.price}</div>
                    <p class="ad-description">${ad.description}</p>
                    <div class="ad-seller">
                        <div class="seller-avatar">${ad.seller ? ad.seller.charAt(0).toUpperCase() : 'U'}</div>
                        <span>${ad.seller || 'User'}</span>
                    </div>
                </div>
            `;
            
            return adCard;
        }

        function showSuccessMessage(message) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }

     
        function showModal(modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }

    
        function hideModal(modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

   
        signupBtn.addEventListener('click', () => {
            showModal(signupModal);
        });

        signinBtn.addEventListener('click', () => {
            showModal(signinModal);
        });

        heroSignupBtn.addEventListener('click', () => {
            showModal(signupModal);
        });

        sellBtn.addEventListener('click', () => {
            if (currentUser) {
                showModal(sellModal);
            }
        });

        closeSignup.addEventListener('click', () => {
            hideModal(signupModal);
        });

        closeSignin.addEventListener('click', () => {
            hideModal(signinModal);
        });

        closeSell.addEventListener('click', () => {
            hideModal(sellModal);
        });

        window.addEventListener('click', (e) => {
            if (e.target === signupModal) {
                hideModal(signupModal);
            }
            if (e.target === signinModal) {
                hideModal(signinModal);
            }
            if (e.target === sellModal) {
                hideModal(sellModal);
            }
        });

        
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
           
            let isValid = true;
            
            if (name.length < 2) {
                document.getElementById('signupNameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('signupNameError').style.display = 'none';
            }
            
            if (!email.includes('@')) {
                document.getElementById('signupEmailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('signupEmailError').style.display = 'none';
            }
            
            if (password.length < 6) {
                document.getElementById('signupPasswordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('signupPasswordError').style.display = 'none';
            }
            
            if (isValid) {
                
                currentUser = {
                    name,
                    email,
                    password
                };
                
            
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
            
                updateUIForLoggedInUser();
                
                
                hideModal(signupModal);
                showSuccessMessage('Account created successfully! You can now post listings.');
                
        
                signupForm.reset();
            }
        });

        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            
            
            let isValid = true;
            
            if (!email.includes('@')) {
                document.getElementById('signinEmailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('signinEmailError').style.display = 'none';
            }
            
            if (password.length < 1) {
                document.getElementById('signinPasswordError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('signinPasswordError').style.display = 'none';
            }
            
            if (isValid) {
                
                const savedUser = localStorage.getItem('currentUser');
                
                if (savedUser) {
                    const userData = JSON.parse(savedUser);
                    
                    if (userData.email === email && userData.password === password) {
                        currentUser = userData;
                        
                        
                        updateUIForLoggedInUser();
                        
                    
                        hideModal(signinModal);
                        showSuccessMessage('Signed in successfully! Welcome back.');
                        
        
                        signinForm.reset();
                    } else {
                        document.getElementById('signinPasswordError').textContent = 'Invalid email or password';
                        document.getElementById('signinPasswordError').style.display = 'block';
                    }
                } else {
                    document.getElementById('signinPasswordError').textContent = 'No account found with this email';
                    document.getElementById('signinPasswordError').style.display = 'block';
                }
            }
        });

        sellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('adTitle').value;
            const price = document.getElementById('adPrice').value;
            const description = document.getElementById('adDescription').value;
            const image = document.getElementById('adImage').value;
            
            
            let isValid = true;
            
            if (title.length < 3) {
                document.getElementById('adTitleError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('adTitleError').style.display = 'none';
            }
            
            if (!price || price < 0) {
                document.getElementById('adPriceError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('adPriceError').style.display = 'none';
            }
            
            if (description.length < 10) {
                document.getElementById('adDescriptionError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('adDescriptionError').style.display = 'none';
            }
            
            if (image && !image.startsWith('http')) {
                document.getElementById('adImageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('adImageError').style.display = 'none';
            }
            
            if (isValid) {
                
                const newAd = {
                    id: Date.now(),
                    title,
                    price: parseFloat(price),
                    description,
                    image: image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
                    seller: currentUser.name
                };
                
    
                userAds.unshift(newAd);
                

                localStorage.setItem('userAds', JSON.stringify(userAds));
                
    
                displayProducts(sampleProducts);
                
                hideModal(sellModal);
                showSuccessMessage('Your listing has been posted successfully!');
                
            
                sellForm.reset();
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            checkAuthStatus();
        });
    
function limitDescriptions() {
    document.querySelectorAll('.ad-description').forEach(desc => {
        if (desc.textContent.length > 100) {
            desc.textContent = desc.textContent.substring(0, 100) + '...';
        }
    });
}

