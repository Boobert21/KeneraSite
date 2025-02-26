document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    let isScrolling = false;

    mainContent.addEventListener('wheel', (event) => {
        if (!isScrolling) {
            isScrolling = true;
            const delta = event.deltaY;

            if (delta > 0) {
                // Прокрутка вниз
                scrollNextSection();
            } else {
                // Прокрутка вверх
                scrollPreviousSection();
            }

            setTimeout(() => {
                isScrolling = false;
            }, 800); // Задержка, чтобы избежать случайных прокруток
        }
    });

    function scrollNextSection() {
        const currentSection = getCurrentSection();
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                isScrolling = false; // Останавливаем прокрутку, если нет следующей секции
            }
        }
    }

    function scrollPreviousSection() {
        const currentSection = getCurrentSection();
        if (currentSection) {
            const previousSection = currentSection.previousElementSibling;
            if (previousSection) {
                previousSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                isScrolling = false; // Останавливаем прокрутку, если нет предыдущей секции
            }
        }
    }


    function getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        let currentSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const distance = Math.abs(section.getBoundingClientRect().top);
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });
        return currentSection;
    }

    // Прокрутка по клику на ссылки навигации
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Отменяем стандартное поведение ссылки

            const targetId = link.getAttribute('href').substring(1); // Получаем ID секции
            const targetSection = document.getElementById(targetId); // Ищем элемент с этим ID

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});