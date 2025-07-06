// pedidos.js
document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    window.addEventListener('load', function () {
        document.querySelector('.preloader').classList.add('loaded');
    });

    // Datos de los platos
    const platos = [
        {
            id: 1,
            nombre: "Asado de tira",
            descripcion: "Corte tradicional de costillas con hueso, cocinado lentamente a la parrilla",
            precio: 37.00,
            categoria: "carne",
            imagen: "img/ASADO.jpg",
            esCarne: true
        },
        {
            id: 2,
            nombre: "Picaña",
            descripcion: "Corte triangular con capa de grasa natural, jugoso y de sabor intenso",
            precio: 42.00,
            categoria: "carne",
            imagen: "img/Picaña.png",
            esCarne: true
        },
        {
            id: 3,
            nombre: "Bife angosto",
            descripcion: "Corte de lomo corto con equilibrio perfecto entre músculo y grasa",
            precio: 41.00,
            categoria: "carne",
            imagen: "img/Bife-angosto-Arg.jpg",
            esCarne: true
        },
        {
            id: 4,
            nombre: "Cordero pierna",
            descripcion: "Pierna de cordero cocinada lentamente, jugosa y de sabor profundo",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-piernaa.jpg",
            esCarne: false
        },
        {
            id: 5,
            nombre: "Cordero costilla",
            descripcion: "Costilla de cordero con hueso, sabrosa y jugosa",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-costilla.jpeg",
            esCarne: false
        },
        {
            id: 6,
            nombre: "Lomo saltado",
            descripcion: "Clásico peruano con lomo fino salteado con cebolla, tomate y sillao",
            precio: 34.00,
            categoria: "especiales",
            imagen: "img/lomo-saltado.png",
            esCarne: true
        },
        {
            id: 7,
            nombre: "Chicharrón de cerdo",
            descripcion: "Panceta de cerdo cocida en su grasa con piel crocante y carne suave",
            precio: 32.00,
            categoria: "especiales",
            imagen: "img/chicharon-de-chancho.jpg",
            esCarne: true
        },
        {
            id: 8,
            nombre: "Corazón a la parrilla",
            descripcion: "Corazón de res marinado y asado a la parrilla, textura firme y jugosa",
            precio: 25.00,
            categoria: "especiales",
            imagen: "img/corazon-parrilla.webp",
            esCarne: true
        }
    ];

    // Variables globales
    let pedido = {
        tipo: "reservacion",
        items: [],
        costoDelivery: 0,
        subtotal: 0,
        total: 0
    };
    let platoActual = null;

    // Generar opciones de mesa (1-24)
    const mesaSelect = document.getElementById('mesa-numero');
    if (mesaSelect) {
        for (let i = 1; i <= 24; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Mesa ${i}`;
            mesaSelect.appendChild(option);
        }
    }

    // Cambiar tipo de pedido
    const opcionesPedido = document.querySelectorAll('.opcion');
    opcionesPedido.forEach(opcion => {
        opcion.addEventListener('click', () => {
            // Remover activo de todas las opciones
            opcionesPedido.forEach(o => o.classList.remove('activo'));

            // Agregar activo a la opción clickeada
            opcion.classList.add('activo');

            // Obtener tipo de pedido
            const tipo = opcion.dataset.tipo;
            pedido.tipo = tipo;

            // Mostrar formulario correspondiente
            document.querySelectorAll('.formulario-pedido').forEach(form => {
                form.classList.remove('activo');
            });
            document.getElementById(`form-${tipo}`).classList.add('activo');

            // Actualizar costo de delivery si es necesario
            if (tipo === 'delivery') {
                actualizarCostoDelivery();
            } else {
                pedido.costoDelivery = 0;
                actualizarTotales();
            }

            // Ocultar/mostrar sección de delivery
            document.getElementById('costo-delivery-container').style.display =
                tipo === 'delivery' ? 'flex' : 'none';
        });
    });

    // Manejar cambio de distrito para delivery
    const distritoSelect = document.getElementById('distrito-delivery');
    if (distritoSelect) {
        distritoSelect.addEventListener('change', actualizarCostoDelivery);
    }

    function actualizarCostoDelivery() {
        const distrito = distritoSelect.value;
        if (!distrito) {
            pedido.costoDelivery = 0;
            document.getElementById('costo-delivery').textContent = 'S/ 0.00';
            actualizarTotales();
            return;
        }

        // Extraer el costo del texto de la opción
        const costoTexto = distritoSelect.options[distritoSelect.selectedIndex].text;
        const match = costoTexto.match(/S\/ (\d+\.\d{2})/);

        if (match && match[1]) {
            pedido.costoDelivery = parseFloat(match[1]);
            document.getElementById('costo-delivery').textContent = `S/ ${pedido.costoDelivery.toFixed(2)}`;
            actualizarTotales();
        }
    }

    // Cargar lista de platos
    function cargarPlatos(categoria = 'todos') {
        const listaPlatos = document.querySelector('.lista-platos');
        listaPlatos.innerHTML = '';

        const platosFiltrados = categoria === 'todos'
            ? platos
            : platos.filter(plato => plato.categoria === categoria);

        platosFiltrados.forEach(plato => {
            const platoItem = document.createElement('div');
            platoItem.className = 'plato-item';
            platoItem.dataset.id = plato.id;

            // Verificar si el plato ya está en el pedido
            const itemsPlato = pedido.items.filter(item => item.id === plato.id);
            const cantidad = itemsPlato.length;

            platoItem.innerHTML = `
                <div class="plato-imagen">
                    <img src="${plato.imagen}" alt="${plato.nombre}">
                </div>
                <div class="plato-info">
                    <h3>${plato.nombre}</h3>
                    <p class="plato-desc">${plato.descripcion}</p>
                    <div class="plato-footer">
                        <div class="precio-plato">S/ ${plato.precio.toFixed(2)}</div>
                        <div class="contador-plato">
                            <button class="contador-btn decrementar">-</button>
                            <span class="contador-valor">${cantidad}</span>
                            <button class="contador-btn incrementar">+</button>
                        </div>
                    </div>
                </div>
            `;

            listaPlatos.appendChild(platoItem);

            // Agregar event listeners a los botones
            const decrementar = platoItem.querySelector('.decrementar');
            const incrementar = platoItem.querySelector('.incrementar');
            const contadorValor = platoItem.querySelector('.contador-valor');

            decrementar.addEventListener('click', () => eliminarPlato(plato.id));
            incrementar.addEventListener('click', () => agregarPlato(plato));
        });
    }

    // Abrir modal para agregar plato de carne con opciones
    function agregarPlato(plato) {
        platoActual = plato;

        // Si es un plato de carne, abrir modal para seleccionar opciones
        if (plato.esCarne) {
            document.getElementById('modal-nombre-plato').textContent = plato.nombre;
            document.getElementById('modal-termino').value = '';
            document.getElementById('modal-acompanamiento').value = '';
            document.getElementById('modal-notas').value = '';
            document.getElementById('modal-opciones').classList.add('activo');
        } else {
            // Para platos no carne, agregar directamente sin opciones
            agregarItemPedido(plato.id, plato.nombre, plato.precio, 'no-carne');
        }
    }

    // Agregar ítem al pedido con opciones
    function agregarItemPedido(id, nombre, precio, tipo, opciones = {}) {
        const nuevoItem = {
            id: id,
            nombre: nombre,
            precio: precio,
            tipo: tipo,
            opciones: opciones
        };

        pedido.items.push(nuevoItem);
        actualizarResumen();
        cargarPlatos();
    }

    // Eliminar un plato (último del mismo tipo)
    function eliminarPlato(platoId) {
        const itemIndex = pedido.items.findIndex(item => item.id === platoId);
        if (itemIndex > -1) {
            pedido.items.splice(itemIndex, 1);
            actualizarResumen();
            cargarPlatos();
        }
    }

    // Actualizar resumen del pedido
    function actualizarResumen() {
        const tbody = document.getElementById('items-pedido');
        tbody.innerHTML = '';

        pedido.subtotal = 0;

        pedido.items.forEach((item, index) => {
            pedido.subtotal += item.precio;

            let opcionesHTML = '';
            if (item.tipo === 'carne') {
                opcionesHTML = `<div><small>Término: ${item.opciones.termino || '-'}</small></div>
                                <div><small>Acompañamiento: ${item.opciones.acompanamiento || '-'}</small></div>`;
                if (item.opciones.notas) {
                    opcionesHTML += `<div><small>Notas: ${item.opciones.notas}</small></div>`;
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nombre}${opcionesHTML ? '<br>' + opcionesHTML : ''}</td>
                <td>1</td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td class="eliminar-item" data-index="${index}"><i class="fas fa-trash"></i></td>
            `;
            tbody.appendChild(tr);
        });

        // Actualizar totales
        actualizarTotales();

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                pedido.items.splice(index, 1);
                actualizarResumen();
                cargarPlatos();
            });
        });
    }

    // Actualizar totales
    function actualizarTotales() {
        pedido.total = pedido.subtotal + pedido.costoDelivery;

        document.getElementById('subtotal').textContent = `S/ ${pedido.subtotal.toFixed(2)}`;
        document.getElementById('total-pedido').textContent = `S/ ${pedido.total.toFixed(2)}`;
    }

    // Manejar cambio de método de pago
    document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.qr-container').forEach(qr => {
                qr.classList.remove('activo');
            });

            if (this.value === 'yape') {
                document.getElementById('qr-yape').classList.add('activo');
            }
        });
    });

    // Filtros de platos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filtro-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');

            const categoria = this.dataset.categoria;
            cargarPlatos(categoria);
        });
    });

    // Botón confirmar pedido
    document.querySelector('.btn-confirmar').addEventListener('click', function () {
        // Validar formulario según el tipo de pedido
        let formularioValido = true;

        if (pedido.tipo === 'reservacion') {
            if (!document.getElementById('nombre-reserva').value ||
                !document.getElementById('celular-reserva').value ||
                !document.getElementById('fecha-reserva').value ||
                !document.getElementById('hora-reserva').value ||
                !document.getElementById('personas-reserva').value) {
                formularioValido = false;
            }
        } else if (pedido.tipo === 'delivery') {
            if (!document.getElementById('nombre-delivery').value ||
                !document.getElementById('celular-delivery').value ||
                !document.getElementById('direccion-delivery').value ||
                !document.getElementById('distrito-delivery').value) {
                formularioValido = false;
            }
        } else if (pedido.tipo === 'recojo') {
            if (!document.getElementById('nombre-recojo').value ||
                !document.getElementById('celular-recojo').value ||
                !document.getElementById('hora-recojo').value) {
                formularioValido = false;
            }
        } else if (pedido.tipo === 'mesa') {
            if (!document.getElementById('mesa-numero').value ||
                !document.getElementById('mozo-mesa').value) {
                formularioValido = false;
            }
        }

        // Validar que haya platos seleccionados
        if (pedido.items.length === 0) {
            formularioValido = false;
            alert('Por favor seleccione al menos un plato');
        }

        if (!formularioValido) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        // Aquí normalmente enviarías los datos al servidor
        // Crear el mensaje para WhatsApp
        let mensaje = `=== NUEVO PEDIDO - ${pedido.tipo.toUpperCase()} ===\n\n`;

        pedido.items.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.nombre} - S/ ${item.precio.toFixed(2)}\n`;
            if (item.tipo === 'carne') {
                mensaje += `  > Término: ${item.opciones.termino}\n`;
                mensaje += `  > Acompañamiento: ${item.opciones.acompanamiento}\n`;
                if (item.opciones.notas) {
                    mensaje += `  > Notas: ${item.opciones.notas}\n`;
                }
            }
            mensaje += `\n`;
        });

        mensaje += `Subtotal: S/ ${pedido.subtotal.toFixed(2)}\n`;
        if (pedido.tipo === 'delivery') {
            mensaje += `Delivery: S/ ${pedido.costoDelivery.toFixed(2)}\n`;
        }
        mensaje += `TOTAL: S/ ${pedido.total.toFixed(2)}\n\n`;

        if (pedido.tipo === 'reservacion') {
            mensaje += `Nombre: ${document.getElementById('nombre-reserva').value}\n`;
            mensaje += `Celular: ${document.getElementById('celular-reserva').value}\n`;
            mensaje += `Fecha: ${document.getElementById('fecha-reserva').value}\n`;
            mensaje += `Hora: ${document.getElementById('hora-reserva').value}\n`;
            mensaje += `Personas: ${document.getElementById('personas-reserva').value}\n`;
        } else if (pedido.tipo === 'delivery') {
            mensaje += `Nombre: ${document.getElementById('nombre-delivery').value}\n`;
            mensaje += `Celular: ${document.getElementById('celular-delivery').value}\n`;
            mensaje += `Dirección: ${document.getElementById('direccion-delivery').value}\n`;
            mensaje += `Distrito: ${document.getElementById('distrito-delivery').value}\n`;
            mensaje += `Referencia: ${document.getElementById('referencia-delivery').value}\n`;
        } else if (pedido.tipo === 'recojo') {
            mensaje += `Nombre: ${document.getElementById('nombre-recojo').value}\n`;
            mensaje += `Celular: ${document.getElementById('celular-recojo').value}\n`;
            mensaje += `Hora de Recojo: ${document.getElementById('hora-recojo').value}\n`;
        } else if (pedido.tipo === 'mesa') {
            mensaje += `Mesa: ${document.getElementById('mesa-numero').value}\n`;
            mensaje += `Mozo: ${document.getElementById('mozo-mesa').value}\n`;
        }

        const telefonoAdmin = '519'; // reemplaza con el tuyo
        const url = `https://wa.me/${telefonoAdmin}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

    });

    // Manejar modal de opciones
    document.getElementById('modal-agregar').addEventListener('click', function () {
        const termino = document.getElementById('modal-termino').value;
        const acompanamiento = document.getElementById('modal-acompanamiento').value;
        const notas = document.getElementById('modal-notas').value;

        if (!termino || !acompanamiento) {
            alert('Por favor seleccione el término y el acompañamiento');
            return;
        }

        agregarItemPedido(
            platoActual.id,
            platoActual.nombre,
            platoActual.precio,
            'carne',
            {
                termino: termino,
                acompanamiento: acompanamiento,
                notas: notas
            }
        );

        document.getElementById('modal-opciones').classList.remove('activo');
    });

    // Cerrar modal
    document.querySelector('.modal-cerrar').addEventListener('click', function () {
        document.getElementById('modal-opciones').classList.remove('activo');
    });

    // Cerrar modal al hacer clic fuera del contenido
    document.getElementById('modal-opciones').addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('activo');
        }
    });

    // Inicializar
    cargarPlatos();
});