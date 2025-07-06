document.addEventListener('DOMContentLoaded', function () {
    // Función para corregir overflow
    function fixOverflow() {
        // Eliminar desplazamiento horizontal
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';

        // Forzar a los contenedores a mantenerse dentro de la pantalla
        const containers = document.querySelectorAll('body, html, .contenedor, .nav-contenedor, .grid-menu');
        containers.forEach(container => {
            container.style.maxWidth = '100vw';
            container.style.overflowX = 'hidden';
        });

        // Corregir elementos que podrían causar overflow
        const elements = document.querySelectorAll('.tarjeta-plato, .plato-info, .plato-imagen');
        elements.forEach(element => {
            element.style.maxWidth = '100%';
        });
    }

    // Ejecutar inmediatamente
    fixOverflow();

    // Menú hamburguesa
    const hamburguesa = document.querySelector('.hamburguesa');
    const menuNav = document.querySelector('.menu-nav');

    if (hamburguesa) {
        hamburguesa.addEventListener('click', function () {
            this.classList.toggle('active');
            menuNav.classList.toggle('active');

            // Bloquear scroll cuando el menú está abierto
            document.body.style.overflow = menuNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Cerrar menú al hacer clic en enlaces
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

    // Categorías del menú - MODIFICADO: Eliminada la categoría "Todos"
    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    const platos = document.querySelectorAll('.tarjeta-plato');

    if (botonesCategorias.length > 0) {
        // Activar la primera categoría por defecto (Cortes especiales)
        botonesCategorias[0].classList.add('activo');
        const primeraCategoria = botonesCategorias[0].dataset.categoria;

        // Ocultar todos los platos inicialmente
        platos.forEach(plato => plato.classList.remove('activo'));

        // Mostrar solo los de la primera categoría
        const platosPrimeraCategoria = document.querySelectorAll(`.tarjeta-plato.${primeraCategoria}`);
        platosPrimeraCategoria.forEach(plato => plato.classList.add('activo'));

        botonesCategorias.forEach(boton => {
            boton.addEventListener('click', () => {
                // Remover activo de todos los botones
                botonesCategorias.forEach(btn => btn.classList.remove('activo'));
                // Agregar activo al botón clickeado
                boton.classList.add('activo');

                const categoria = boton.dataset.categoria;

                // Ocultar todos los platos
                platos.forEach(plato => {
                    plato.classList.remove('activo');
                });

                // Mostrar solo los de la categoría seleccionada
                const platosCategoria = document.querySelectorAll(`.tarjeta-plato.${categoria}`);
                platosCategoria.forEach(plato => plato.classList.add('activo'));

                // Corregir overflow después de filtrar
                setTimeout(fixOverflow, 50);

                // Reactivar animaciones
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        });
    }

    // Preloader
    window.addEventListener('load', () => {
        document.querySelector('.preloader').classList.add('loaded');
        // Corregir overflow después de cargar
        setTimeout(fixOverflow, 100);
    });

    // Inicializar animaciones
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
            disable: window.innerWidth < 768
        });
    }

    // Suavizar scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');

            if (href === '#' || href.length < 2) {
                // Scroll al inicio si href es "#"
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Corregir overflow después de desplazarse
                setTimeout(fixOverflow, 300);
            }
        });
    });

    // Ejecutar también al redimensionar
    window.addEventListener('resize', fixOverflow);

    // Ejecutar periódicamente por si hay elementos que se cargan tarde
    setInterval(fixOverflow, 500);

    // Intentar reproducir el video
    const video = document.querySelector('.video-fondo');
    if (video) {
        video.play().catch(e => {
            console.log("Autoplay bloqueado:", e);
            // Mostrar botón de reproducción manual si falla
            const playButton = document.createElement('button');
            playButton.innerHTML = '<i class="fas fa-play"></i> Reproducir Video';
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

    // Funcionalidad para llamar al mozo - NUEVO
    const botonMozo = document.getElementById('llamar-mozo');
    if (botonMozo) {
        botonMozo.addEventListener('click', function (e) {
            e.preventDefault();

            // Crear notificación
            const notificacion = document.createElement('div');
            notificacion.textContent = '🛎️ Un mozo se dirigirá a su mesa en breve';
            notificacion.style.position = 'fixed';
            notificacion.style.bottom = '20px';
            notificacion.style.left = '50%';
            notificacion.style.transform = 'translateX(-50%)';
            notificacion.style.backgroundColor = '#4CAF50'; // Verde
            notificacion.style.color = 'white';
            notificacion.style.padding = '15px 25px';
            notificacion.style.borderRadius = '30px';
            notificacion.style.zIndex = '10000';
            notificacion.style.fontWeight = '600';
            notificacion.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
            notificacion.style.animation = 'fadeInUp 0.5s forwards';

            document.body.appendChild(notificacion);

            // Animación para desaparecer
            setTimeout(() => {
                notificacion.style.animation = 'fadeOutDown 0.5s forwards';
                setTimeout(() => {
                    notificacion.remove();
                }, 500);
            }, 3000);
        });
    }

    // Agregar animaciones CSS para la notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        @keyframes fadeOutDown {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
        }
    `;
    document.head.appendChild(style);
});