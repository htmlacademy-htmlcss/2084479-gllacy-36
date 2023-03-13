const slider = document.querySelector('.product-slider');
const sliderItems = document.querySelectorAll('.product-item');
const prev = document.querySelector('.slider-button-prev');
const next = document.querySelector('.slider-button-next');
const bullits = document.querySelectorAll('.slider-pagination-item');

document.querySelector('.dropdown-link').addEventListener('click', evt => {
    evt.preventDefault();
    document.querySelector('.dropdown').classList.toggle('dropdown--opened');
});


if (slider) {
    const createSkeleton = (tagsList) => {
        return [...Array(tagsList.length)].map((item, index) => index === 0 ? true : false);
    };

    const model = createSkeleton(sliderItems);

    const renderActiveScreen = (index) => {
        document.querySelector('.product-item-active').classList.remove('product-item-active');
        Array.from(sliderItems)[index].classList.add('product-item-active');
        Array.from(sliderItems).slice(index).forEach((item, i) => {
            item.style.order = i;
        });
        Array.from(sliderItems).slice(0, index).forEach((item, i) => {
            item.style.order = sliderItems.length - index + i;
        });

        document.body.classList.remove(...document.body.classList);
        document.body.classList.add(`slide-${index + 1}`);

        document.querySelector('.slider-pagination-button-current').classList.remove('slider-pagination-button-current');
        Array.from(bullits)[index].querySelector('button').classList.add('slider-pagination-button-current');
    }

    const getNextScreen = () => {
        let current = model.findIndex(item => item === true);
        model[current] = false;
        current = current < model.length - 1 ? current + 1 : 0;
        model[current] = true;
        return current;
    };

    const getPrevScreen = () => {
        let current = model.findIndex(item => item === true);
        model[current] = false;
        current = current > 0 ? current - 1 : model.length - 1;
        model[current] = true;
        return current;

    };

    const getActiveScreen = (numberBullit) => {
        let current = model.findIndex(item => item === true);
        model[current] = false;
        current = numberBullit;
        model[current] = true;
        return current;
    }

    const addListeners = () => {
        prev.addEventListener('click', (e) => {
            e.preventDefault();
            renderActiveScreen(getPrevScreen());
        });

        next.addEventListener('click', (e) => {
            e.preventDefault();
            renderActiveScreen(getNextScreen());
        });

        bullits.forEach((bullit, index) => {
            bullit.addEventListener('click', (e) => {
                e.preventDefault();
                renderActiveScreen(getActiveScreen(index));

            });
        });
    }
    addListeners();
}
