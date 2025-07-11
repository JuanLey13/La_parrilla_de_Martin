document.addEventListener('DOMContentLoaded', function () {
    function fixOverflow() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';

        const containers = document.querySelectorAll('body,html,.contenedor,.nav-contenedor,.grid-menu');
        containers.forEach(container => {
            container.style.maxWidth = '100vw';
            container.style.overflowX = 'hidden';
        });

        const elements = document.querySelectorAll('.tarjeta-plato,.plato-info,.plato-imagen');
        elements.forEach(element => {
            element.style.maxWidth = '100%';
        });
    }

    fixOverflow();

    const hamburguesa = document.querySelector('.hamburguesa');
    const menuNav = document.querySelector('.menu-nav');

    if (hamburguesa) {
        hamburguesa.addEventListener('click', function () {
            this.classList.toggle('active');
            menuNav.classList.toggle('active');
            document.body.style.overflow = menuNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburguesa && menuNav) {
                hamburguesa.classList.remove('active');
                menuNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    const platos = document.querySelectorAll('.tarjeta-plato');

    if (botonesCategorias.length > 0) {
        botonesCategorias[0].classList.add('activo');
        const primeraCategoria = botonesCategorias[0].dataset.categoria;
        platos.forEach(plato => plato.classList.remove('activo'));
        const platosPrimeraCategoria = document.querySelectorAll(`.tarjeta-plato.${primeraCategoria}`);
        platosPrimeraCategoria.forEach(plato => plato.classList.add('activo'));

        botonesCategorias.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesCategorias.forEach(btn => btn.classList.remove('activo'));
                boton.classList.add('activo');
                const categoria = boton.dataset.categoria;

                platos.forEach(plato => {
                    plato.classList.remove('activo');
                });

                const platosCategoria = document.querySelectorAll(`.tarjeta-plato.${categoria}`);
                platosCategoria.forEach(plato => plato.classList.add('activo'));
                // Esperar a que los platos se activen visualmente antes de hacer scroll
                setTimeout(() => {
                    const primerPlatoVisible = document.querySelector(`.tarjeta-plato.${categoria}.activo`);
                    if (primerPlatoVisible) {
                        const offset = primerPlatoVisible.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }
                }, 100); // Espera 100 milisegundos

                setTimeout(fixOverflow, 50);
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }

                // Desplazarse suavemente a los platos
                const seccion = document.getElementById("menu");
                if (seccion) {
                    const topOffset = seccion.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: topOffset,
                        behavior: "smooth"
                    });
                }

            });
        });
    }

    window.addEventListener('load', () => {
        document.querySelector('.preloader').classList.add('loaded');
        setTimeout(fixOverflow, 100);
    });

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
            disable: window.innerWidth < 768
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                setTimeout(fixOverflow, 300);
            }
        });
    });

    window.addEventListener('resize', fixOverflow);
    setInterval(fixOverflow, 500);

    const video = document.querySelector('.video-fondo');
    if (video) {
        video.play().catch(e => {
            console.log("Autoplay bloqueado:", e);
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i>Reproducir Video';
            playButton.style.position = 'absolute';
            playButton.style.bottom = '20px';
            playButton.style.left = '50%';
            playButton.style.transform = 'translateX(-50%)';
            playButton.style.zIndex = '2';
            playButton.classList.add('boton-explorar');
            playButton.addEventListener('click', () => {
                video.play();
                playButton.remove();
            });
            document.querySelector('.hero').appendChild(playButton);
        });
    }

    const botonMozo = document.getElementById('llamar-mozo');
    if (botonMozo) {
        botonMozo.addEventListener('click', function (e) {
            e.preventDefault();
            const notificacion = document.createElement('div');
            notificacion.textContent = '🛎️ Un mozo se dirigirá a su mesa en breve';
            notificacion.style.position = 'fixed';
            notificacion.style.bottom = '20px';
            notificacion.style.left = '50%';
            notificacion.style.transform = 'translateX(-50%)';
            notificacion.style.backgroundColor = '#4CAF50';
            notificacion.style.color = 'white';
            notificacion.style.padding = '15px 25px';
            notificacion.style.borderRadius = '30px';
            notificacion.style.zIndex = '10000';
            notificacion.style.fontWeight = '600';
            notificacion.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            notificacion.style.animation = 'fadeInUp 0.5s forwards';
            document.body.appendChild(notificacion);
            setTimeout(() => {
                notificacion.style.animation = 'fadeOutDown 0.5s forwards';
                setTimeout(() => {
                    notificacion.remove();
                }, 500);
            }, 3000);
        });
    }

    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translate(-50%, 20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeOutDown {
      from { opacity: 1; transform: translate(-50%, 0); }
      to { opacity: 0; transform: translate(-50%, 20px); }
    }
  `;
    document.head.appendChild(style);
});
s