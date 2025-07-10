document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        document.querySelector('.preloader').classList.add('loaded');
    });

    const platos = [
        {
            id: 1,
            nombre: "Asado de tira",
            descripcion: "Corte tradicional que proviene de las costillas delanteras de la res, presentado en tiras gruesas con hueso. Cocinado lentamente a la parrilla, combina carne, grasa y hueso en una explosión de sabor ahumado y jugoso. Ideal para los verdaderos amantes de la carne.",
            precio: 37.00,
            categoria: "carne",
            imagen: "img/ASADO-TIRA.jpg",
            esCarne: true
        },
        {
            id: 2,
            nombre: "Picaña",
            descripcion: "Extraída de la parte alta de la cadera, la picaña tiene una capa de grasa natural que se derrite al asarse, impregnando la carne con sabor profundo y jugoso. Se sirve en láminas gruesas, tiernas y doradas.",
            precio: 42.00,
            categoria: "carne",
            imagen: "img/picaña.jpeg",
            esCarne: true
        },
        {
            id: 3,
            nombre: "Bife angosto",
            descripcion: "Proviene del lomo corto de la res. Corte rectangular con textura firme y jugosa. A la parrilla, desarrolla una costra dorada por fuera y un interior tierno y lleno de sabor. Ideal para quienes buscan carácter y jugosidad.",
            precio: 41.00,
            categoria: "carne",
            imagen: "img/Bife-angosto-Arg.jpg",
            esCarne: true
        },
        {
            id: 4,
            nombre: "Bife ancho",
            descripcion: "Ubicado en la parte delantera del lomo, con abundante marmoleo que aporta jugosidad. Su grasa entreverada se funde durante la cocción, logrando una textura suave y sabor profundo.",
            precio: 41.00,
            categoria: "carne",
            imagen: "img/bife-ancho.jpg",
            esCarne: true
        },
        {
            id: 5,
            nombre: "Rib-eye",
            descripcion: "Corte premium del costillar, con marmoleo abundante y un ojo central de grasa que se derrite al asarse. Textura suave y sabor rico e intenso. Dorado por fuera, jugoso por dentro.",
            precio: 43.00,
            categoria: "carne",
            imagen: "img/rib-eye.webp",
            esCarne: true
        },
        {
            id: 6,
            nombre: "Cuadril",
            descripcion: "Corte de la parte trasera del lomo, con sabor auténtico y textura firme pero jugosa. Su capa de grasa aporta gusto profundo. Ideal para quienes buscan un corte tradicional, sabroso y generoso.",
            precio: 42.00,
            categoria: "carne",
            imagen: "img/cuadril.webp",
            esCarne: true
        },
        {
            id: 7,
            nombre: "Portehouse",
            descripcion: "Corte grueso y jugoso que une lomo fino y bife de chorizo en una sola pieza, separados por un hueso en T. Al cocinarse a la brasa, conserva jugosidad y aroma. Una experiencia completa de ternura y sabor.",
            precio: 82.00,
            categoria: "carne",
            imagen: "img/portehouse.webp",
            esCarne: true
        },
        {
            id: 8,
            nombre: "T-bone",
            descripcion: "Corte con lomo fino y bife de chorizo unidos por un hueso en forma de T. Cada lado desarrolla su propia textura y sabor. Cocción pareja y experiencia completa de dos cortes premium.",
            precio: 51.00,
            categoria: "carne",
            imagen: "img/T-bone.webp",
            esCarne: true
        },
        {
            id: 9,
            nombre: "Lomo fino",
            descripcion: "Uno de los cortes más suaves y elegantes. Magro, jugoso, sin nervios ni grasa. Perfecto para una experiencia refinada. Cocción uniforme que resalta su sabor natural.",
            precio: 52.00,
            categoria: "carne",
            imagen: "img/lomo-fino.jpg",
            esCarne: true
        },
        {
            id: 10,
            nombre: "TOMAHAWK",
            descripcion: "Corte con hueso largo del costillar, con abundante marmoleo y gran tamaño. Dorado por fuera, jugoso por dentro. Ideal para una experiencia robusta, visual y sabrosa. Se recomienda pedir con 1h de anticipación.",
            precio: 66.00,
            categoria: "carne",
            imagen: "img/TOMAHAWK.jpg",
            esCarne: true
        },
        {
            id: 11,
            nombre: "Pierna de cordero",
            descripcion: "La pierna de cordero es un corte grande y jugoso, ideal para una cocción lenta a la parrilla. Su textura firme y sabor pronunciado la hacen perfecta para quienes disfrutan carnes con carácter. Acompañada de papas grilladas, ensalada y salsas.",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-piernaa.jpg",
            esCarne: false,
        },
        {
            id: 12,
            nombre: "Costilla de cordero",
            descripcion: "La costilla de cordero, también conocida como chuleta, es tierna, jugosa y de sabor delicado. Cocinada a la brasa, presenta un equilibrio ideal entre carne y grasa, ofreciendo una experiencia suave y sabrosa.",
            precio: 37.00,
            categoria: "cordero",
            imagen: "img/cordero-costilla.jpeg",
            esCarne: false
        },
        {
            id: 13,
            nombre: "Lomo de cordero",
            descripcion: "El lomo de cordero es un corte magro y tierno, con textura suave y sabor fino. Ideal para quienes prefieren cortes elegantes con cocción precisa y acompañamiento ligero. Servido con papas, ensalada y salsas.",
            precio: 39.00,
            categoria: "cordero",
            imagen: "img/cordero-lomo.avif",
            esCarne: false
        },
        {
            id: 14,
            nombre: "Lomo saltado",
            descripcion: "Clásico de la cocina peruana preparado con cortes de res salteados al wok con cebolla, tomate, ají amarillo y sillao. Servido con papas fritas y arroz blanco.",
            precio: 34.00,
            categoria: "criollos",
            imagen: "img/lomo-saltado.png",
            esCarne: true
        },
        {
            id: 15,
            nombre: "Milanesa de res",
            descripcion: "Clásica y reconfortante, nuestra milanesa está empanizada al estilo casero y frita a la perfección. Crujiente por fuera, jugosa por dentro. Acompañada con papas y ensalada.",
            precio: 28.00,
            categoria: "criollos",
            imagen: "img/milanesa-res.jpg",
            esCarne: false
        },
        {
            id: 16,
            nombre: "Milanesa de pollo",
            descripcion: "Preparada con filetes de pechuga de pollo frescos, empanizados artesanalmente y dorados al punto justo. Una opción ligera y sabrosa.",
            precio: 32.00,
            categoria: "criollos",
            imagen: "img/milaneza-pollo.webp",
            esCarne: false
        },
        {
            id: 17,
            nombre: "Chicharrón de chancho",
            descripcion: "Elaborado con cortes de panceta de cerdo, cocidos lentamente y dorados en su propia grasa. Crujientes por fuera, suaves por dentro. Acompañado con sarsa criolla y yuca.",
            precio: 32.00,
            categoria: "criollos",
            imagen: "img/chicharon-de-chancho.jpg",
            esCarne: false
        },
        {
            id: 18,
            nombre: "Anticuchos",
            descripcion: "Corte marinado de corazón de res, previamente macerado en ají panca y vinagre. A la parrilla, logra un sabor intenso y textura firme. Servido con papas y choclo.",
            precio: 25.00,
            categoria: "criollos",
            imagen: "img/corazon-parrilla.webp",
            esCarne: true
        },
        {
            id: 19,
            nombre: "Alitas limón",
            descripcion: "Alitas jugosas bañadas en salsa de limón natural, ligeramente ácida y refrescante. Acompañadas de papas fritas crocantes.",
            precio: 25.00,
            categoria: "alitas",
            imagen: "img/alitas-limon.jpg",
            esCarne: false
        },
        {
            id: 20,
            nombre: "Alitas picantes",
            descripcion: "Preparadas con salsa especial de ají y especias ahumadas, estas alitas ofrecen un sabor potente y un picor irresistible.",
            precio: 25.00,
            categoria: "alitas",
            imagen: "img/alitas-picantes.jpg",
            esCarne: false
        },
        {
            id: 21,
            nombre: "Alitas BBQ",
            descripcion: "Bañadas en una deliciosa salsa barbacoa, dulce y ahumada. Doradas a la perfección para un mordisco jugoso y caramelizado.",
            precio: 25.00,
            categoria: "alitas",
            imagen: "img/alitas-bbq.jpg",
            esCarne: false
        },
        {
            id: 22,
            nombre: "Alitas maracuyá",
            descripcion: "Una combinación inesperada: alitas crujientes con una salsa de maracuyá agridulce. Tropicales, jugosas y adictivas.",
            precio: 25.00,
            categoria: "alitas",
            imagen: "img/alitas-maracuya.jpg",
            esCarne: false
        },
        {
            id: 23,
            nombre: "Alitas broaster",
            descripcion: "Crujientes y doradas al estilo clásico broaster, con sabor casero. Exterior crocante y carne suave. Acompañadas de papas.",
            precio: 25.00,
            categoria: "alitas",
            imagen: "img/alitas-broaster.jpg",
            esCarne: false
        },
        {
            id: 24,
            nombre: "Arroz blanco",
            descripcion: "Arroz graneado y suave, ideal para acompañar cualquier plato principal sin opacar su sabor.",
            precio: 6.00,
            categoria: "guarniciones",
            imagen: "img/arroz-blanco.jpg",
            esCarne: false
        },
        {
            id: 25,
            nombre: "Papas fritas",
            descripcion: "Papas doradas al estilo casero, con el balance justo entre crocancia y suavidad interior.",
            precio: 7.00,
            categoria: "guarniciones",
            imagen: "img/papas-fritas.jpg",
            esCarne: false
        },
        {
            id: 26,
            nombre: "Chorizo artesanal",
            descripcion: "Mitad de chorizo artesanal, jugoso y con sabor profundo a la parrilla. Ideal para complementar carnes.",
            precio: 9.00,
            categoria: "guarniciones",
            imagen: "img/chorizo.jpg",
            esCarne: false
        },
        {
            id: 27,
            nombre: "Huevo frito",
            descripcion: "Huevo con yema blanda y bordes crocantes. Ideal para coronar platos criollos o carnes.",
            precio: 2.50,
            categoria: "guarniciones",
            imagen: "img/huevo-frito.jpg",
            esCarne: false
        },
        {
            id: 28,
            nombre: "Ensalada fresca",
            descripcion: "Ensalada fresca del día. Ligera y perfecta para equilibrar un plato contundente.",
            precio: 8.00,
            categoria: "guarniciones",
            imagen: "img/ensalada.jpg",
            esCarne: false
        },
        {
            id: 29,
            nombre: "Salchipapa clásica",
            descripcion: "Nuestra versión tradicional, perfecta para un antojo contundente. Papas fritas doradas acompañadas de salchicha en rodajas, ideal para compartir o disfrutar solo.",
            precio: 13.00,
            categoria: "salchipapas",
            imagen: "img/salchipapa-clasica.jpg",
            esCarne: true
        },
        {
            id: 30,
            nombre: "Salchipapa con broaster",
            descripcion: "Ideal para niños (o grandes con corazón de niño). Combina papas fritas con trozos de pollo broaster, crujientes por fuera y suaves por dentro.",
            precio: 16.00,
            categoria: "salchipapas",
            imagen: "img/salchibroster.jpg",
            esCarne: true
        },
        {
            id: 31,
            nombre: "Salchipapa con huevo",
            descripcion: "La versión más contundente. Papas crocantes con salchichas doradas, coronadas con huevo frito y salsas caseras.",
            precio: 17.00,
            categoria: "salchipapas",
            imagen: "img/salchipapa-huevo.jpg",
            esCarne: true
        },
        {
            id: 32,
            nombre: "Salchipapa con nuggets",
            descripcion: "Mezcla perfecta entre lo clásico y lo crujiente. Papas fritas con nuggets de pollo empanizados. Ideal para los más chicos o para picar en grupo.",
            precio: 15.00,
            categoria: "salchipapas",
            imagen: "img/salchipapa-nuggets.jpg",
            esCarne: true
        },
        {
            id: 33,
            nombre: "Parrilla personal",
            descripcion: "Una opción completa para una persona con lo mejor de la parrilla: 1 corte a elección, 1 guarnición, ensalada y bebida incluida. Ideal para disfrutar todo el sabor sin compartir.",
            precio: 55.00,
            categoria: "compartir",
            imagen: "img/parrilla-personal.jpg",
            esCarne: true
        },
        {
            id: 34,
            nombre: "Parrilla doble",
            descripcion: "Perfecta para compartir entre dos. Puedes elegir 2 cortes distintos, 2 guarniciones, ensalada fresca y 2 bebidas. Equilibrio entre sabor, abundancia y variedad.",
            precio: 57.00,
            categoria: "compartir",
            imagen: "img/parrilla-doble.jpg",
            esCarne: true
        },
        {
            id: 35,
            nombre: "Parrilla triple",
            descripcion: "Ideal para 3 a 4 personas. Incluye 1 parrilla surtida con 3 cortes, 3 guarniciones, ensalada grande y jarra de bebida. Pensado para compartir sin límites.",
            precio: 85.00,
            categoria: "compartir",
            imagen: "img/parrilla-triple.jpg",
            esCarne: true
        },
        {
            id: 36,
            nombre: "Limonada Natural (1L)",
            descripcion: "Bebida cítrica natural, preparada al momento. Refrescante y ligera, ideal para acompañar carnes a la parrilla.",
            precio: 15.00,
            categoria: "bebidas",
            imagen: "img/limonada.jpg",
            esCarne: false
        },
        {
            id: 37,
            nombre: "Limonada Natural (1/2L)",
            descripcion: "Bebida cítrica natural, preparada al momento. Refrescante y ligera, ideal para acompañar carnes a la parrilla.",
            precio: 8.00,
            categoria: "bebidas",
            imagen: "img/limonada.jpg",
            esCarne: false
        },
        {
            id: 38,
            nombre: "Limonada con Hierbabuena (1L)",
            descripcion: "Refrescante fusión de limón natural con hierbabuena fresca. Perfecta para un toque herbal y cítrico.",
            precio: 16.00,
            categoria: "bebidas",
            imagen: "img/limonada-hierbabuena.jpg",
            esCarne: false
        },
        {
            id: 39,
            nombre: "Limonada con Hierbabuena (1/2L)",
            descripcion: "Refrescante fusión de limón natural con hierbabuena fresca. Perfecta para un toque herbal y cítrico.",
            precio: 8.50,
            categoria: "bebidas",
            imagen: "img/limonada-hierbabuena.jpg",
            esCarne: false
        },
        {
            id: 40,
            nombre: "Limonada con Menta (1L)",
            descripcion: "Deliciosa combinación de limón con un toque mentolado suave y revitalizante. Ideal para días calurosos.",
            precio: 16.00,
            categoria: "bebidas",
            imagen: "img/limonada-menta.jpg",
            esCarne: false
        },
        {
            id: 41,
            nombre: "Pisco Sour",
            descripcion: "El cóctel bandera del Perú. Pisco, limón, jarabe de goma, clara de huevo y amargo de angostura.",
            precio: 17.00,
            categoria: "cocteles",
            imagen: "img/pisco-sour.jpg",
            esCarne: false
        },
        {
            id: 42,
            nombre: "Maracuyá Sour",
            descripcion: "Variante tropical del clásico. Pisco con jugo de maracuyá fresco, dulce y ácido.",
            precio: 16.00,
            categoria: "cocteles",
            imagen: "img/maracuya-sour.jpg",
            esCarne: false
        },
        {
            id: 43,
            nombre: "Machu Picchu",
            descripcion: "Cóctel vibrante por capas: granadina, naranja, menta y pisco.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/machu-picchu.webp",
            esCarne: false
        },
        {
            id: 44,
            nombre: "Coctel de Algarrobina",
            descripcion: "Pisco con leche, huevo y jarabe de algarrobina. Dulce y cremoso.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/algarrobina.jpg",
            esCarne: false
        },
        {
            id: 45,
            nombre: "Mojito Clásico",
            descripcion: "Ron blanco, hierbabuena, limón, azúcar y soda. Refrescante.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/mojito clasico.webp",
            esCarne: false
        },
        {
            id: 46,
            nombre: "Mojito de Frutos Rojos",
            descripcion: "Refrescante combinación con hierbabuena y frutos del bosque.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/mojito-frutosrojos.jpg",
            esCarne: false
        },
        {
            id: 47,
            nombre: "Mojito Pasión",
            descripcion: "Toque de maracuyá al clásico mojito. Tropical y aromático.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/mojito-pasion.jpg",
            esCarne: false
        },
        {
            id: 48,
            nombre: "Piña Colada",
            descripcion: "Ron, piña y coco en una mezcla cremosa y tropical.",
            precio: 19.00,
            categoria: "cocteles",
            imagen: "img/pina-colada.jpg",
            esCarne: false
        },
        {
            id: 49,
            nombre: "Cuba Libre",
            descripcion: "Ron oscuro con cola y limón. Clásico y directo.",
            precio: 16.00,
            categoria: "cocteles",
            imagen: "img/cuba-libre.jpg",
            esCarne: false
        },
        {
            id: 50,
            nombre: "Tinto de Verano",
            descripcion: "Vino tinto con soda y rodajas de fruta. Suave y refrescante.",
            precio: 16.00,
            categoria: "cocteles",
            imagen: "img/tinto-verano.jpg",
            esCarne: false
        },
        {
            id: 51,
            nombre: "Laguna Azul",
            descripcion: "Vodka, curaçao azul, limón y soda. Exótico y vibrante.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/laguna-azul.jpg",
            esCarne: false
        },
        {
            id: 52,
            nombre: "Sunrise",
            descripcion: "Tequila con jugo de naranja y granadina. Visual y sabroso.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/sunrise.jpg",
            esCarne: false
        },
        {
            id: 53,
            nombre: "Margarita Corona",
            descripcion: "Margarita tradicional con una mini corona invertida.",
            precio: 24.00,
            categoria: "cocteles",
            imagen: "img/margarita-corona.jpg",
            esCarne: false
        },
        {
            id: 54,
            nombre: "Long Island Blue",
            descripcion: "Versión azul del clásico Long Island con vodka, ron, tequila y curaçao.",
            precio: 22.00,
            categoria: "cocteles",
            imagen: "img/long-island-blue.jpg",
            esCarne: false
        },
        {
            id: 55,
            nombre: "Aperol Spritz",
            descripcion: "Aperol, prosecco y soda. Ligeramente amargo y muy elegante.",
            precio: 20.00,
            categoria: "cocteles",
            imagen: "img/aperol.jpg",
            esCarne: false
        },
        {
            id: 56,
            nombre: "Baileys Pasión",
            descripcion: "Crema de whisky Baileys con frutas tropicales. Suave y exótico.",
            precio: 21.00,
            categoria: "cocteles",
            imagen: "img/baileys-pasion.jpg",
            esCarne: false
        },
        {
            id: 57,
            nombre: "Orgasmo",
            descripcion: "Licor de café, amaretto y crema. Fuerte, cremoso y dulce.",
            precio: 19.00,
            categoria: "cocteles",
            imagen: "img/orgasmo.jpg",
            esCarne: false
        },
        {
            id: 58,
            nombre: "Negroni",
            descripcion: "Ginebra, vermut rojo y Campari. Amargo, sofisticado y clásico.",
            precio: 20.00,
            categoria: "cocteles",
            imagen: "img/negroni.jpg",
            esCarne: false
        },
        {
            id: 59,
            nombre: "Gin Tonic",
            descripcion: "Ginebra con agua tónica y rodajas de limón. Refrescante y aromático.",
            precio: 20.00,
            categoria: "cocteles",
            imagen: "img/gin-tonic.jpg",
            esCarne: false
        },
        {
            id: 60,
            nombre: "Gin Berries",
            descripcion: "Ginebra con frutos rojos y toque de tónica. Dulce y ácido.",
            precio: 21.00,
            categoria: "cocteles",
            imagen: "img/gin-berries.jpg",
            esCarne: false
        },
        {
            id: 61,
            nombre: "Gin Tonic Pepino",
            descripcion: "Ginebra infusionada con pepino y enebro. Suave y refrescante.",
            precio: 21.00,
            categoria: "cocteles",
            imagen: "img/gin-pepino.jpg",
            esCarne: false
        },
        {
            id: 62,
            nombre: "Fernet Branca",
            descripcion: "Fernet con Coca-Cola. Intenso, amargo y para paladares fuertes.",
            precio: 18.00,
            categoria: "cocteles",
            imagen: "img/fernet.jpg",
            esCarne: false
        },
        {
            id: 63,
            nombre: "S. Queirolo Borgoña",
            descripcion: "Vino tinto dulce de uva borgoña. Ideal para acompañar carnes suaves o postres.",
            precio: 34.00,
            categoria: "vinos",
            imagen: "img/Santiago-Queirolo.jpg",
            esCarne: false
        },
        {
            id: 64,
            nombre: "H. del Abuelo Borgoña",
            descripcion: "Vino dulce y suave con aroma a frutas rojas. Ideal para cenas relajadas.",
            precio: 34.00,
            categoria: "vinos",
            imagen: "img/h-abuelo.jpg",
            esCarne: false
        },
        {
            id: 65,
            nombre: "Tabernero Tinto",
            descripcion: "Vino tinto semi seco con cuerpo ligero. Marida bien con carnes y quesos.",
            precio: 34.00,
            categoria: "vinos",
            imagen: "img/Gran-Tinto-Tabernero.jpg",
            esCarne: false
        },
        {
            id: 66,
            nombre: "Intipalka",
            descripcion: "Vino peruano de calidad superior, con notas frutales y final redondo.",
            precio: 60.00,
            categoria: "vinos",
            imagen: "img/Intipalka.avif",
            esCarne: false
        },
        {
            id: 67,
            nombre: "Tacama",
            descripcion: "Vino peruano elegante de sabor suave y afrutado. Perfecto para ocasiones especiales.",
            precio: 55.00,
            categoria: "vinos",
            imagen: "img/tacama.webp",
            esCarne: false
        }, {
            id: 68,
            nombre: "Stella Artois",
            descripcion: "Cerveza premium de origen belga. Suave, refrescante y con final ligeramente amargo.",
            precio: 11.00,
            categoria: "cervezas",
            imagen: "img/Stella Artois.jpg",
            esCarne: false
        },
        {
            id: 69,
            nombre: "Heineken",
            descripcion: "Cerveza lager de sabor limpio y burbujeante. Ideal para maridar carnes a la parrilla.",
            precio: 11.00,
            categoria: "cervezas",
            imagen: "img/Heineken.jpg",
            esCarne: false
        },
        {
            id: 70,
            nombre: "Corona",
            descripcion: "Cerveza clara ideal con rodaja de limón. Perfecta para tardes relajadas.",
            precio: 10.00,
            categoria: "cervezas",
            imagen: "img/Corona.webp",
            esCarne: false
        },
        {
            id: 71,
            nombre: "Cusqueña Negra",
            descripcion: "Cerveza oscura con notas a malta tostada y caramelo. Cuerpo robusto y sabor intenso.",
            precio: 9.00,
            categoria: "cervezas",
            imagen: "img/CUSQUENA-NEGRA.jpg",
            esCarne: false
        },
        {
            id: 72,
            nombre: "Cusqueña Dorada",
            descripcion: "Cerveza lager clara, suave y bien equilibrada. Refrescante y ligera.",
            precio: 9.00,
            categoria: "cervezas",
            imagen: "img/cusqueña dorada.jpg",
            esCarne: false
        }, {
            id: 73,
            nombre: "Sangría de la Casa",
            descripcion: "Preparada con vino tinto, frutas frescas y un toque cítrico. Refrescante, dulce y perfecta para compartir.",
            precio: 36.00,
            categoria: "sangrias",
            imagen: "img/sangria-casa.jpg",
            esCarne: false
        },
        {
            id: 74,
            nombre: "Sangría de Verano",
            descripcion: "Sangría clara y suave hecha con vino blanco, frutas cítricas y soda. Ideal para días calurosos.",
            precio: 35.00,
            categoria: "sangrias",
            imagen: "img/Sangría de Verano.png",
            esCarne: false
        }, {
            id: 75,
            nombre: "Johnnie Walker Black Label",
            descripcion: "Whisky escocés de mezcla superior. Suave, con notas ahumadas y vainilla. Envejecido 12 años.",
            precio: 23.00,
            categoria: "whiskies",
            imagen: "img/Johnnie Walker Black Label.webp",
            esCarne: false
        },
        {
            id: 76,
            nombre: "Ballantine’s Whisky",
            descripcion: "Whisky escocés clásico, mezcla equilibrada con suaves toques de chocolate y vainilla.",
            precio: 23.00,
            categoria: "whiskies",
            imagen: "img/Ballantine’s.webp",
            esCarne: false
        },
        {
            id: 77,
            nombre: "Jack Daniel’s",
            descripcion: "Tennessee Whiskey con 40° de alcohol. Notas de caramelo, vainilla y roble tostado.",
            precio: 24.00,
            categoria: "whiskies",
            imagen: "img/Jack-Daniels.jpg",
            esCarne: false
        },
        {
            id: 78,
            nombre: "Chivas Regal",
            descripcion: "Whisky escocés envejecido 12 años. Suave, elegante, con notas de miel, vainilla y manzana.",
            precio: 23.00,
            categoria: "whiskies",
            imagen: "img/Chivas Regal.webp",
            esCarne: false
        },
        {
            id: 79,
            nombre: "Johnnie Walker Red Label",
            descripcion: "Mezcla escocesa con carácter fuerte, ideal para cócteles o con hielo.",
            precio: 21.00,
            categoria: "whiskies",
            imagen: "img/Johnnie Walker Red Label.webp",
            esCarne: false
        }


    ];


    let pedido = {
        tipo: "reservacion",
        items: [],
        costoDelivery: 0,
        subtotal: 0,
        total: 0
    };

    let platoActual = null;

    const mesaSelect = document.getElementById('mesa-numero');
    if (mesaSelect) {
        for (let i = 1; i <= 24; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Mesa ${i}`;
            mesaSelect.appendChild(option);
        }
    }

    const opcionesPedido = document.querySelectorAll('.opcion');

    opcionesPedido.forEach(opcion => {
        opcion.addEventListener('click', () => {
            opcionesPedido.forEach(o => o.classList.remove('activo'));
            opcion.classList.add('activo');

            const tipo = opcion.dataset.tipo;
            pedido.tipo = tipo;

            document.querySelectorAll('.formulario-pedido').forEach(form => {
                form.classList.remove('activo');
            });
            document.getElementById(`form-${tipo}`).classList.add('activo');

            if (tipo === 'delivery') {
                actualizarCostoDelivery();
            } else {
                pedido.costoDelivery = 0;
                actualizarTotales();
            }

            document.getElementById('costo-delivery-container').style.display =
                tipo === 'delivery' ? 'flex' : 'none';

            // Mostrar el bloque oculto con animación
            // === MOSTRAR EL BLOQUE INTERACTIVO CON ANIMACIÓN Y SCROLL ===
            const bloque = document.getElementById('bloque-interactivo');
            bloque.style.display = 'none';

            setTimeout(() => {
                bloque.style.display = 'block';
                bloque.classList.remove('fade-in');
                void bloque.offsetWidth;
                bloque.classList.add('fade-in');

                // 👇 Esta es la línea que hace scroll automático hacia abajo
                bloque.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

        });
    });

    const distritoSelect = document.getElementById('distrito-delivery');
    if (distritoSelect) {
        distritoSelect.addEventListener('change', actualizarCostoDelivery);
    }

    function actualizarCostoDelivery() {
        const distrito = distritoSelect.value;
        if (!distrito) {
            pedido.costoDelivery = 0;
            document.getElementById('costo-delivery').textContent = 'S/0.00';
            actualizarTotales();
            return;
        }
        const costoTexto = distritoSelect.options[distritoSelect.selectedIndex].text;
        const match = costoTexto.match(/S\/(\d+\.\d{2})/);
        if (match && match[1]) {
            pedido.costoDelivery = parseFloat(match[1]);
            document.getElementById('costo-delivery').textContent = `S/${pedido.costoDelivery.toFixed(2)}`;
            actualizarTotales();
        }
    }

    function cargarPlatos(categoria = 'todos') {
        const listaPlatos = document.querySelector('.lista-platos');
        listaPlatos.innerHTML = '';
        const platosFiltrados = platos.filter(plato => plato.categoria === categoria);

        platosFiltrados.forEach(plato => {
            const platoItem = document.createElement('div');
            platoItem.className = 'plato-item';
            platoItem.dataset.id = plato.id;

            const itemsPlato = pedido.items.filter(item => item.id === plato.id);
            const cantidad = itemsPlato.length;

            platoItem.innerHTML = `
                <div class="plato-imagen"><img src="${plato.imagen}" alt="${plato.nombre}"></div>
                <div class="plato-info">
                    <h3>${plato.nombre}</h3>
                    <p class="plato-desc">${plato.descripcion}</p>
                    <div class="plato-footer">
                        <div class="precio-plato">S/${plato.precio.toFixed(2)}</div>
                        <div class="contador-plato">
                            <button class="contador-btn decrementar">-</button>
                            <span class="contador-valor">${cantidad}</span>
                            <button class="contador-btn incrementar">+</button>
                        </div>
                    </div>
                </div>
            `;
            listaPlatos.appendChild(platoItem);

            platoItem.querySelector('.decrementar').addEventListener('click', () => eliminarPlato(plato.id));
            platoItem.querySelector('.incrementar').addEventListener('click', () => agregarPlato(plato));
        });
    }

    function agregarPlato(plato) {
        platoActual = plato;
        if (plato.esCarne) {
            document.getElementById('modal-nombre-plato').textContent = plato.nombre;
            document.getElementById('modal-termino').value = '';
            document.getElementById('modal-acompanamiento').value = '';
            document.getElementById('modal-notas').value = '';
            document.getElementById('modal-opciones').classList.add('activo');
        } else {
            agregarItemPedido(plato.id, plato.nombre, plato.precio, 'no-carne');
        }
    }

    function agregarItemPedido(id, nombre, precio, tipo, opciones = {}) {
        const nuevoItem = { id, nombre, precio, tipo, opciones };
        pedido.items.push(nuevoItem);
        actualizarResumen();
        cargarPlatos();
    }

    function eliminarPlato(platoId) {
        const index = pedido.items.findIndex(item => item.id === platoId);
        if (index > -1) {
            pedido.items.splice(index, 1);
            actualizarResumen();
            cargarPlatos();
        }
    }

    function actualizarResumen() {
        const tbody = document.getElementById('items-pedido');
        tbody.innerHTML = '';
        pedido.subtotal = 0;

        pedido.items.forEach((item, index) => {
            let precioItem = item.precio;
            let textoTaper = '';
            let extraTaper = 0;

            // Agregar costo de taper si es delivery o recojo
            if (pedido.tipo === 'delivery' || pedido.tipo === 'recojo') {
                if (item.nombre.toLowerCase().includes("tomahawk") || item.nombre.toLowerCase().includes("portehouse")) {
                    extraTaper = 2.00;
                    textoTaper = '<div><small class="taper-cobro">+ S/ 2.00 por envase grande</small></div>';
                } else {
                    extraTaper = 1.50;
                    textoTaper = '<div><small class="taper-cobro">+ S/ 1.50 por envase</small></div>';
                }
            }

            const precioTotal = precioItem + extraTaper;
            pedido.subtotal += precioTotal;

            let opcionesHTML = '';
            if (item.tipo === 'carne') {
                opcionesHTML += `
                <div><small>Término: ${item.opciones.termino || '-'}</small></div>
                <div><small>Acompañamiento: ${item.opciones.acompanamiento || '-'}</small></div>
            `;
                if (item.opciones.notas) {
                    opcionesHTML += `<div><small>Notas: ${item.opciones.notas}</small></div>`;
                }
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${item.nombre}${opcionesHTML}${textoTaper}</td>
            <td>1</td>
            <td>S/${precioTotal.toFixed(2)}</td>
            <td>S/${precioTotal.toFixed(2)}</td>
            <td class="eliminar-item" data-index="${index}"><i class="fas fa-trash"></i></td>
        `;
            tbody.appendChild(tr);
        });

        actualizarTotales();

        document.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                pedido.items.splice(index, 1);
                actualizarResumen();
                cargarPlatos(document.querySelector('.filtro-btn.active').dataset.categoria);
            });
        });
    }



    function actualizarTotales() {
        pedido.total = pedido.subtotal + pedido.costoDelivery;
        document.getElementById('subtotal').textContent = `S/${pedido.subtotal.toFixed(2)}`;
        document.getElementById('total-pedido').textContent = `S/${pedido.total.toFixed(2)}`;
    }

    document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.qr-container').forEach(qr => qr.classList.remove('activo'));
            if (this.value === 'yape') {
                document.getElementById('qr-yape').classList.add('activo');
            }
        });
    });

    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const categoria = this.dataset.categoria;
            cargarPlatos(categoria);
        });
    });

    document.querySelector('.btn-confirmar').addEventListener('click', function () {
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

        if (pedido.items.length === 0) {
            formularioValido = false;
            alert('Por favor seleccione al menos un plato');
        }

        if (!formularioValido) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        fetch('puente.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...pedido,
                mesa: pedido.tipo === 'mesa' ? document.getElementById('mesa-numero').value : null,
                mozo: pedido.tipo === 'mesa' ? document.getElementById('mozo-mesa').value : null
            })
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
                document.querySelectorAll('input,select,textarea').forEach(el => {
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
    });

    document.getElementById('modal-agregar').addEventListener('click', function () {
        const termino = document.getElementById('modal-termino').value;
        const acompanamiento = document.getElementById('modal-acompanamiento').value;
        const notas = document.getElementById('modal-notas').value;

        if (!termino || !acompanamiento) {
            alert('Por favor seleccione el término y el acompañamiento');
            return;
        }

        agregarItemPedido(platoActual.id, platoActual.nombre, platoActual.precio, 'carne', {
            termino: termino,
            acompanamiento: acompanamiento,
            notas: notas
        });

        document.getElementById('modal-opciones').classList.remove('activo');
    });

    document.querySelector('.modal-cerrar').addEventListener('click', function () {
        document.getElementById('modal-opciones').classList.remove('activo');
    });

    document.getElementById('modal-opciones').addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('activo');
        }
    });
    // Reinicia el pedido si el cliente cambia el tipo de servicio (delivery, recojo, mesa, etc.)
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.addEventListener('click', function () {
            const nuevoTipo = this.dataset.tipo;

            // Confirmar si ya había ítems en el carrito
            if (pedido.items.length > 0) {
                const confirmar = confirm("Cambiar el tipo de servicio eliminará todos los platos seleccionados. ¿Deseas continuar?");
                if (!confirmar) return;
            }

            // Quitar clase "activo" de todos
            document.querySelectorAll('.opcion').forEach(o => o.classList.remove('activo'));
            // Activar la opción seleccionada
            this.classList.add('activo');

            // Guardar tipo en objeto pedido
            pedido.tipo = nuevoTipo;
            pedido.items = [];
            pedido.subtotal = 0;

            actualizarResumen();

            // Detectar categoría activa o activar la primera si no hay
            let categoriaActiva = document.querySelector(".filtro-btn.active");
            if (!categoriaActiva) {
                categoriaActiva = document.querySelector(".filtro-btn");
                if (categoriaActiva) categoriaActiva.classList.add("active");
            }

            // Obtener el nombre de la categoría y cargar sus platos
            const nombreCategoria = categoriaActiva?.dataset.categoria;
            if (nombreCategoria) {
                cargarPlatos(nombreCategoria);
            }

        });
    });


    cargarPlatos("carne"); // O cualquier otra categoría si prefieres otra por defecto

});
