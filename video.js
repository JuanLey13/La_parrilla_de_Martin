// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    // Menú hamburguesa
    const hamburguesa = document.querySelector('.hamburguesa');
    const menuNav = document.querySelector('.menu-nav');

    hamburguesa.addEventListener('click', () => {
        hamburguesa.classList.toggle('active');
        menuNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburguesa.classList.remove('active');
            menuNav.classList.remove('active');
        });
    });

    // Categorías del menú
    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    const platos = document.querySelectorAll('.tarjeta-plato');

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesCategorias.forEach(btn => btn.classList.remove('activo'));
            boton.classList.add('activo');

            const categoria = boton.dataset.categoria;

            platos.forEach(plato => {
                plato.style.display = 'none';
            });

            if (categoria === 'todos') {
                platos.forEach(plato => {
                    plato.style.display = 'block';
                });
            } else {
                const platosCategoria = document.querySelectorAll(`.tarjeta-plato.${categoria}`);
                platosCategoria.forEach(plato => {
                    plato.style.display = 'block';
                });
            }
        });
    });

    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.preloader').classList.add('loaded');
        }, 1000);
    });
});