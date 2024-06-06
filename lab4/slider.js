//Завдання 2.....................................................................................

    const interval = 3000; 
    const speed = 1; 


    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    let currentIndex = 0;


    const firstSlideClone = slides[0].cloneNode(true);
    slider.appendChild(firstSlideClone);

    slider.style.width = `${(slides.length + 1) * slideWidth}px`;

    const nextSlide = () => {
        currentIndex++;
        slider.style.transition = `transform ${speed}s ease-in-out`;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const resetSlider = () => {
        currentIndex = 0;
        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        setTimeout(nextSlide, 100);
    };

    const intervalId = setInterval(nextSlide, interval);

    document.getElementById('slider-container').addEventListener('mouseenter', () => clearInterval(intervalId));

    document.getElementById('slider-container').addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, interval));

    window.addEventListener('resize', resetSlider);