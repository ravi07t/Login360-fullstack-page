document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.getElementById("sliderTrack");

    if (sliderTrack) {
        // Clone all images for smooth looping
        const images = Array.from(sliderTrack.children);
        images.forEach(img => {
            const clone = img.cloneNode(true);
            sliderTrack.appendChild(clone);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const openModalButtons = document.querySelectorAll(".callback-btn"); // Select all buttons
    const closeModalButton = document.getElementById("closeModalBtn");
    const modal = document.getElementById("modal");

    function toggleModal() {
        modal.style.display = modal.style.display === "none" || modal.style.display === "" ? "block" : "none";
    }

    openModalButtons.forEach(button => {
        button.addEventListener("click", toggleModal);
    });

    closeModalButton.addEventListener("click", toggleModal);

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            toggleModal();
        }
    });
});

// -----------------Video section-------------------


const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const openVideoModal1 = document.getElementById("openVideoModal");
const closeVideoModal = document.getElementById("closeVideoModal");
const images = document.querySelectorAll(".carousel-images img");
let currentIndex = 0;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Function to open video modal with the correct URL
function openVideo(url) {
    videoFrame.src = url;
    videoModal.style.display = "flex";
}

// Click event for the first image
openVideoModal1.addEventListener("click", function () {
    openVideo("https://www.youtube.com/embed/BI7aY4a4aUg?autoplay=1");
});

// Add event listener to all images
images.forEach((img, index) => {
    img.addEventListener("click", function () {
        if (index === 0) {
            openVideo("https://www.youtube.com/embed/8wBVJON6jm8?autoplay=1");
        }
    });
});

// Close modal and stop video
closeVideoModal.addEventListener("click", function () {
    videoModal.style.display = "none";
    videoFrame.src = ""; // Reset iframe src to stop playback
});

// Carousel Navigation
function updateCarousel() {
    images.forEach((img, index) => {
        img.classList.toggle("active", index === currentIndex);
    });
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

document.addEventListener("DOMContentLoaded", updateCarousel);



// ----------------------video section end----------------------

document.querySelectorAll('.module-title').forEach(module => {
    module.addEventListener('click', function () {
        let content = this.nextElementSibling;
        let icon = this.querySelector('i');

        if (content.style.display === "block") {
            content.style.display = "none";
            icon.style.transform = "rotate(0deg)";
        } else {
            content.style.display = "block";
            icon.style.transform = "rotate(180deg)";
        }
    });
});


let minutes = 30;
let seconds = 59;

function updateTimerDisplay() {
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

function startCountdown() {
    let countdown = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

updateTimerDisplay();
startCountdown();


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");

    // Duplicate images dynamically to ensure smooth infinite scrolling
    const images = Array.from(slider.children);
    images.forEach(img => {
        let clone = img.cloneNode(true);
        slider.appendChild(clone);
    });
});


let currentIndexreels = 0;
const carousel = document.getElementById("reels-carousel");
const totalItems = document.querySelectorAll(".reels-card").length;
const visibleItems = 3; // Adjust based on how many items should be visible
const itemWidth = 260; // Card width + gap

function moveSlide(direction) {
    const maxIndex = totalItems - visibleItems;

    currentIndexreels += direction;

    // Ensure the next button remains functional
    if (currentIndexreels < 0) {
        currentIndexreels = 0;
    } else if (currentIndexreels > maxIndex) {
        currentIndexreels = maxIndex;
    }

    // Move the carousel
    carousel.style.transform = `translateX(${-currentIndexreels * itemWidth}px)`;

    // Enable or disable buttons dynamically
    document.querySelector(".reels-prev").disabled = currentIndexreels === 0;
    document.querySelector(".reels-next").disabled = currentIndexreels === maxIndex;
}

// Ensure buttons are enabled/disabled on load
document.addEventListener("DOMContentLoaded", () => {
    moveSlide(0);
});


// -------------reels dialog----------------

function openReelModal(reelUrl) {
    const modal = document.getElementById('reelModal');
    const embedContainer = document.getElementById('reelEmbedContainer');
    
    // Clear previous content
    embedContainer.innerHTML = '';

    // Convert Instagram reel link to embed link
    let embedHtml = `
        <blockquote class="instagram-media" data-instgrm-permalink="${reelUrl}" data-instgrm-version="14"></blockquote>
        <script async src="https://www.instagram.com/embed.js"></script>
    `;

    // Add embed code to modal
    embedContainer.innerHTML = embedHtml;

    // Display modal
    modal.style.display = 'flex';

    // Reload Instagram embed script
    setTimeout(() => {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, 500);
}

function closeReelModal() {
    document.getElementById('reelModal').style.display = 'none';
}

