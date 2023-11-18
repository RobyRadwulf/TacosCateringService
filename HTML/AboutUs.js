document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevButton = document.createElement('button');
    prevButton.classList.add('prev');
    prevButton.innerHTML = '&lt;';
    slider.appendChild(prevButton);
    const nextButton = document.createElement('button');
    nextButton.classList.add('next');
    nextButton.innerHTML = '&gt;';
    slider.appendChild(nextButton);
    let index = 0;

    function slide() {
        images[index].style.opacity = 0;
        index = (index + 1) % images.length;
        images[index].style.opacity = 1;
    }

    setInterval(slide, 3000);

    prevButton.addEventListener('click', () => {
        images[index].style.opacity = 0;
        index = (index + images.length - 1) % images.length;
        images[index].style.opacity = 1;
    });

    nextButton.addEventListener('click', () => {
        slide();
    });
});
