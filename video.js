// Menú hamburguesa
const hamburguesa = document.querySelector('.hamburguesa');
const menuNav = document.querySelector('.menu-nav');

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

// Cerrar menú al hacer clic en enlaces
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburguesa.classList.remove('active');
        menuNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Categorías del menú
document.addEventListener('DOMContentLoaded', function () {
    const botonesCategorias = document.querySelectorAll('.boton-categoria');
    const platos = document.querySelectorAll('.tarjeta-plato');

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

            // Reactivar animaciones
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
});

// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('loaded');
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
        }
    });
});