// SOLUCIÓN DEFINITIVA PARA OVERFLOW HORIZONTAL
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
    // Función para forzar la reproducción del video en móviles
    function forceVideoPlay() {
        const video = document.querySelector('.video-fondo');

        if (video && window.innerWidth < 768) {
            // Reiniciar video
            video.currentTime = 0;
            video.load();

            // Intentar reproducir
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Video reproduciéndose");
                        video.classList.add('playing');
                    })
                    .catch(error => {
                        console.log("Error reproduciendo video:", error);
                        // Mostrar fallback si hay error
                        const fallback = document.querySelector('.video-fallback');
                        if (fallback) {
                            fallback.style.display = 'block';
                            video.style.display = 'none';
                        }
                    });
            }
        }
    }

    // Ejecutar cuando el contenido esté cargado
    document.addEventListener('DOMContentLoaded', function () {
        forceVideoPlay();

        // Volver a intentar después de 1 segundo
        setTimeout(forceVideoPlay, 1000);

        // Intentar cuando el usuario interactúe
        document.body.addEventListener('click', function () {
            if (!document.querySelector('.video-fondo.playing')) {
                forceVideoPlay();
            }
        });
    });

    // También intentar cuando cambie la orientación del dispositivo
    window.addEventListener('orientationchange', forceVideoPlay);
    // Menú hamburguesa
    const hamburguesa = document.querySelector('.hamburguesa');
    const menuNav = document.querySelector('.menu-nav');

    if (hamburguesa) {
        hamburguesa.addEventListener('click', function () {
            this.classList.toggle('active');
            menuNav.classList.toggle('active');

            // Bloquear scroll cuando el menú está abierto
            if (menuNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburguesa && menuNav) {
                hamburguesa.classList.remove('active');
                menuNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Categorías del menú
    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    const platos = document.querySelectorAll('.tarjeta-plato');

    if (botonesCategorias.length > 0) {
        // Mostrar todos los platos inicialmente
        platos.forEach(plato => plato.classList.add('activo'));

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
                if (categoria === 'todos') {
                    platos.forEach(plato => plato.classList.add('activo'));
                } else {
                    const platosCategoria = document.querySelectorAll(`.tarjeta-plato.${categoria}`);
                    platosCategoria.forEach(plato => plato.classList.add('activo'));
                }

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

            const target = document.querySelector(this.getAttribute('href'));
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

});