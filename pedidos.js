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
            imagen: "img/ASADO.jpg"
        },
        {
            id: 2,
            nombre: "Picaña",
            descripcion: "Corte triangular con capa de grasa natural, jugoso y de sabor intenso",
            precio: 42.00,
            categoria: "carne",
            imagen: "img/Picaña.png"
        },
        {
            id: 3,
            nombre: "Bife angosto",
            descripcion: "Corte de lomo corto con equilibrio perfecto entre músculo y grasa",
            precio: 41.00,
            categoria: "carne",
            imagen: "img/Bife-angosto-Arg.jpg"
        },
        {
            id: 4,
            nombre: "Cordero pierna",
            descripcion: "Pierna de cordero cocinada lentamente, jugosa y de sabor profundo",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-piernaa.jpg"
        },
        {
            id: 5,
            nombre: "Cordero costilla",
            descripcion: "Costilla de cordero con hueso, sabrosa y jugosa",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-costilla.jpeg"
        },
        {
            id: 6,
            nombre: "Lomo saltado",
            descripcion: "Clásico peruano con lomo fino salteado con cebolla, tomate y sillao",
            precio: 34.00,
            categoria: "especiales",
            imagen: "img/lomo-saltado.png"
        },
        {
            id: 7,
            nombre: "Chicharrón de cerdo",
            descripcion: "Panceta de cerdo cocida en su grasa con piel crocante y carne suave",
            precio: 32.00,
            categoria: "especiales",
            imagen: "img/chicharon-de-chancho.jpg"
        },
        {
            id: 8,
            nombre: "Corazón a la parrilla",
            descripcion: "Corazón de res marinado y asado a la parrilla, textura firme y jugosa",
            precio: 25.00,
            categoria: "especiales",
            imagen: "img/corazon-parrilla.webp"
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
            const itemPedido = pedido.items.find(item => item.id === plato.id);
            const cantidad = itemPedido ? itemPedido.cantidad : 0;

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

            decrementar.addEventListener('click', () => actualizarCantidad(plato.id, -1));
            incrementar.addEventListener('click', () => actualizarCantidad(plato.id, 1));
        });
    }

    // Actualizar cantidad de un plato
    function actualizarCantidad(platoId, cambio) {
        const plato = platos.find(p => p.id === platoId);
        const itemIndex = pedido.items.findIndex(item => item.id === platoId);

        if (itemIndex > -1) {
            // Actualizar cantidad existente
            pedido.items[itemIndex].cantidad += cambio;

            // Eliminar si la cantidad llega a 0
            if (pedido.items[itemIndex].cantidad <= 0) {
                pedido.items.splice(itemIndex, 1);
            }
        } else if (cambio > 0) {
            // Agregar nuevo item
            pedido.items.push({
                id: plato.id,
                nombre: plato.nombre,
                precio: plato.precio,
                cantidad: 1
            });
        }

        // Actualizar contador en la lista de platos
        const contadorValor = document.querySelector(`.plato-item[data-id="${platoId}"] .contador-valor`);
        if (contadorValor) {
            const item = pedido.items.find(item => item.id === platoId);
            contadorValor.textContent = item ? item.cantidad : '0';
        }

        // Actualizar resumen
        actualizarResumen();
    }

    // Actualizar resumen del pedido
    function actualizarResumen() {
        const tbody = document.getElementById('items-pedido');
        tbody.innerHTML = '';

        pedido.subtotal = 0;

        pedido.items.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            pedido.subtotal += subtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>S/ ${item.precio.toFixed(2)}</td>
                <td>S/ ${subtotal.toFixed(2)}</td>
                <td class="eliminar-item" data-id="${item.id}"><i class="fas fa-trash"></i></td>
            `;
            tbody.appendChild(tr);
        });

        // Actualizar totales
        actualizarTotales();

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = parseInt(this.dataset.id);
                actualizarCantidad(id, -pedido.items.find(item => item.id === id).cantidad);
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
        fetch('guardar-pedido.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Mensaje del servidor (PHP)
                // Limpieza visual si todo salió bien
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    if (el.type !== 'radio' && el.type !== 'checkbox') {
                        el.value = '';
                    }
                });
                pedido = {
                    tipo: "reservacion",
                    items: [],
                    costoDelivery: 0,
                    subtotal: 0,
                    total: 0
                };
                actualizarResumen();
                cargarPlatos();
            })
            .catch(error => {
                alert('❌ Error al enviar el pedido.');
                console.error(error);
            });


        // Resetear formulario
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.type !== 'radio' && el.type !== 'checkbox') {
                el.value = '';
            }
        });
        pedido = {
            tipo: "reservacion",
            items: [],
            costoDelivery: 0,
            subtotal: 0,
            total: 0
        };
        actualizarResumen();
        cargarPlatos();
    });

    // Inicializar
    cargarPlatos();
});