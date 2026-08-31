import type { Quiz } from '../lib/types';

/** Quizzes de opción múltiple. Cada pregunta incluye explicación. */
export const QUIZZES: Quiz[] = [
  {
    slug: 'animales-imposibles',
    titulo: 'Animales imposibles',
    descripcion: 'Tardígrados, ballenas y pulpos: ¿cuánto aguantas contra la biología más rara del planeta?',
    categoria: 'animales',
    dificultad: 'Media',
    preguntas: [
      {
        texto: '¿Cuántos corazones tiene un pulpo?',
        opciones: ['Uno, como nosotros', 'Dos', 'Tres', 'Nueve'],
        correcta: 2,
        explicacion: 'Tiene tres: dos bombean sangre a las branquias y uno al resto del cuerpo. Los «nueve» son una broma sobre sus supuestos nueve cerebros.',
      },
      {
        texto: '¿Qué animal sobrevivió expuesto al vacío del espacio en 2007?',
        opciones: ['La cucaracha', 'El tardígrado', 'La rata topo desnuda', 'La medusa Turritopsis'],
        correcta: 1,
        explicacion: 'En la misión FOTON-M3 de la ESA, los tardígrados aguantaron el vacío y la radiación solar en criptobiosis. Volvieron vivos y se reprodujeron.',
      },
      {
        texto: '¿Cuánto puede bajar el pulso de una ballena azul al bucear?',
        opciones: ['A unos 40 latidos por minuto', 'A unos 20', 'A unos 2 por minuto', 'Su corazón se detiene'],
        correcta: 2,
        explicacion: 'Stanford midió en 2019 que su pulso cae hasta unos 2 latidos por minuto durante las inmersiones profundas. En superficie late unas 8 veces por minuto.',
      },
      {
        texto: '¿Por qué la sangre del pulpo es azul?',
        opciones: ['Porque tiene cobre (hemocianina)', 'Porque vive a presión', 'Porque es de sangre fría', 'Por su dieta de crustáceos'],
        correcta: 0,
        explicacion: 'Usa hemocianina, una proteína con cobre, en lugar de hemoglobina con hierro. Funciona mejor en aguas frías y pobres en oxígeno.',
      },
      {
        texto: '¿Qué hace un tardígrado para sobrevivir a condiciones extremas?',
        opciones: ['Migra bajo tierra', 'Entra en criptobiosis y se seca', 'Hiberna durante años', 'Reduce su tamaño a la mitad'],
        correcta: 1,
        explicacion: 'Expulsa casi toda su agua y se convierte en un «ton»: su metabolismo cae por debajo del 0,01 %. Puede revivir al rehidratarse.',
      },
    ],
  },
  {
    slug: 'espacio-y-mas-alla',
    titulo: 'Espacio y más allá',
    descripcion: 'Agujeros negros, lluvias de diamantes y física extrema. Abróchate el cinturón gravitatorio.',
    categoria: 'espacio',
    dificultad: 'Difícil',
    preguntas: [
      {
        texto: '¿Qué es la «espaguetización»?',
        opciones: ['Un tipo de nebulosa filamentosa', 'El estiramiento por fuerzas de marea al caer en un agujero negro', 'La cola de los cometas', 'Un error de las sondas espaciales'],
        correcta: 1,
        explicacion: 'Cerca de un agujero negro la gravedad cambia tanto con la distancia que tu cuerpo se estira a lo largo y comprime a lo ancho. Hawking lo describió en «Breve historia del tiempo».',
      },
      {
        texto: '¿En qué planetas se cree que llueve diamantes?',
        opciones: ['Marte y Venus', 'Júpiter y Saturno exclusivamente', 'Neptuno y Urano', 'Mercurio y la Luna'],
        correcta: 2,
        explicacion: 'La enorme presión rompe el metano y el carbono cristaliza en diamante. En 2017 se reprodujo el proceso en laboratorio (SLAC).',
      },
      {
        texto: '¿Por qué el cielo es azul?',
        opciones: ['Porque el mar lo refleja', 'Por la dispersión de Rayleigh en la atmósfera', 'Porque el Sol emite luz azul', 'Por el ozono'],
        correcta: 1,
        explicacion: 'Las moléculas de aire dispersan la luz azul unas 10 veces más que la roja. Lo que ves es luz solar rebotada por la atmósfera.',
      },
      {
        texto: 'En un agujero negro supermasivo, ¿qué notarías al cruzar el horizonte de sucesos?',
        opciones: ['Un golpe de calor extremo', 'Nada especial en ese instante', 'Que el tiempo se detiene para ti', 'Una pared de luz'],
        correcta: 1,
        explicacion: 'El horizonte no es una barrera física: un observador en caída lo cruza sin notar nada localmente. Eso sí, ya no hay vuelta atrás.',
      },
      {
        texto: '¿Qué objeto fotografió el Event Horizon Telescope en 2019?',
        opciones: ['La sombra del agujero negro de M87', 'Un planeta en otra galaxia', 'El núcleo del Sol', 'La cara oculta de la Luna'],
        correcta: 0,
        explicacion: 'Fue la primera imagen directa de la «sombra» de un agujero negro supermasivo, en el centro de la galaxia M87.',
      },
    ],
  },
  {
    slug: 'cuando-paso',
    titulo: '¿Cuándo pasó?',
    descripcion: 'La cronología mundial está más rota de lo que crees. Pon las fechas en su sitio.',
    categoria: 'historia',
    dificultad: 'Fácil',
    preguntas: [
      {
        texto: '¿Qué está más cerca en el tiempo de Cleopatra?',
        opciones: ['La construcción de las pirámides de Guiza', 'El lanzamiento del primer iPhone', 'La fundación de Roma', 'La guerra de Troya'],
        correcta: 1,
        explicacion: 'La Gran Pirámide (≈2560 a. C.) dista unos 2.530 años de Cleopatra (†30 a. C.). El iPhone (2007) solo unos 2.037. Sorprendentemente, el iPhone gana.',
      },
      {
        texto: '¿Qué existía antes?',
        opciones: ['El Imperio azteca', 'La Universidad de Oxford', 'La imprenta de Gutenberg', 'El Coliseo de Roma'],
        correcta: 1,
        explicacion: 'Hay enseñanza en Oxford desde 1096. Tenochtitlan se fundó en 1325, la imprenta es de 1440 y el Coliseo, aunque anterior (80 d. C.), no era una institución en funcionamiento.',
      },
      {
        texto: '¿Cuánto duró la guerra más corta registrada?',
        opciones: ['Un día', 'Seis horas', 'Entre 38 y 45 minutos', 'Una semana'],
        correcta: 2,
        explicacion: 'La guerra anglo-zanzibarí de 1896 terminó en menos de una hora. Los buques británicos abrieron fuego a las 9:02 y hacia las 9:40 todo había acabado.',
      },
      {
        texto: '¿Qué es más antiguo?',
        opciones: ['Stonehenge', 'Las pirámides de Guiza', 'Göbekli Tepe', 'El Panteón de Roma'],
        correcta: 2,
        explicacion: 'Göbekli Tepe data de ≈9600 a. C., unos 7.000 años antes que las pirámides. Fue construido por cazadores-recolectores.',
      },
      {
        texto: '¿De qué siglo es el mecanismo de Anticitera?',
        opciones: ['Siglo II a. C.', 'Siglo VIII d. C.', 'Siglo XV', 'Siglo I d. C., época de Cristo'],
        correcta: 0,
        explicacion: 'Se fecha hacia el siglo II a. C. Es un calculador astronómico de engranajes que predecía eclipses; nada igual reapareció hasta el siglo XIV.',
      },
    ],
  },
  {
    slug: 'el-cuerpo-humano',
    titulo: 'El cuerpo humano',
    descripcion: 'Tu cuerpo es más raro de lo que te contaron. Compruébalo.',
    categoria: 'cuerpo',
    dificultad: 'Media',
    preguntas: [
      {
        texto: '¿Cada cuánto se renueva por completo el revestimiento del estómago?',
        opciones: ['Cada pocas horas', 'Cada 3-6 días', 'Cada mes', 'Nunca: se regenera solo si hay heridas'],
        correcta: 1,
        explicacion: 'El moco protector neutraliza el ácido (pH 1-2) en la superficie y las células se renuevan cada 3-6 días. Es una carrera contra su propia química.',
      },
      {
        texto: 'Según los experimentos de Libet, ¿cuándo empieza el cerebro a preparar una decisión motora?',
        opciones: ['Después de que seas consciente', 'Unos 350 ms antes de la consciencia de decidir', 'Exactamente a la vez', 'Solo cuando la verbalizas'],
        correcta: 1,
        explicacion: 'El «potencial de disposición» aparece ~350 ms antes del momento consciente de decidir. Estudios con fMRI ven patrones predictivos hasta 7 s antes.',
      },
      {
        texto: '¿Dónde vive la mayor parte de las neuronas de un pulpo?',
        opciones: ['En su cabeza', 'En sus brazos', 'En su corazón', 'Repartidas igual por todo el cuerpo'],
        correcta: 1,
        explicacion: 'Unos dos tercios de sus ~500 millones de neuronas están en los brazos, que pueden explorar y resolver problemas con autonomía relativa.',
      },
      {
        texto: '¿Qué pH tiene el jugo gástrico?',
        opciones: ['Neutro, alrededor de 7', 'Entre 5 y 6', 'Entre 1 y 2', 'Entre 9 y 10'],
        correcta: 2,
        explicacion: 'pH 1-2, tan ácido que puede corroer metales ligeros. Esteriliza la comida: una herencia de nuestros antepasados carroñeros.',
      },
    ],
  },
  {
    slug: 'verdad-o-leyenda',
    titulo: '¿Verdad o leyenda?',
    descripcion: 'Datos que parecen mentira y leyendas que parecen verdad. Elige con cuidado.',
    categoria: 'misterios',
    dificultad: 'Fácil',
    preguntas: [
      {
        texto: '«El manuscrito Voynich lleva 600 años sin descifrarse». ¿Verdad o leyenda?',
        opciones: ['Verdad documentada', 'Leyenda: ya se descifró', 'Leyenda: no existe tal libro', 'Verdad, pero tiene solo 200 años'],
        correcta: 0,
        explicacion: 'Verdad. El radiocarbono data su pergamino entre 1404 y 1438 y sigue en la biblioteca Beinecke de Yale sin traducción aceptada.',
      },
      {
        texto: '«La miel encontrada en tumbas egipcias sigue comestible». ¿Verdad o leyenda?',
        opciones: ['Leyenda romántica', 'Verdad: su química impide que se estropee', 'Verdad, pero solo si se hierve', 'Leyenda: era cera, no miel'],
        correcta: 1,
        explicacion: 'Su baja humedad (~17 %), su acidez (pH 3-4,5) y el peróxido de hidrógeno que genera la hacen inhóspita para cualquier microorganismo.',
      },
      {
        texto: '«El primer SMS decía “Merry Christmas”». ¿Verdad o leyenda?',
        opciones: ['Verdad, en 1992', 'Leyenda: decía “Hola”', 'Verdad, pero en 1983', 'Leyenda: el primero fue en japonés'],
        correcta: 0,
        explicacion: 'Verdad. Neil Papworth lo envió el 3 de diciembre de 1992 desde un ordenador al móvil de un directivo de Vodafone durante su fiesta de Navidad.',
      },
      {
        texto: '«En Neptuno podría llover diamantes». ¿Verdad o leyenda?',
        opciones: ['Leyenda de ciencia ficción', 'Verdad: se reprodujo en laboratorio en 2017', 'Verdad, pero solo en Saturno', 'Leyenda: solo llueve metano'],
        correcta: 1,
        explicacion: 'En 2017, en el SLAC, se comprimió material rico en carbono hasta condiciones de Neptuno y cristalizaron diamantes. Los modelos indican que «llueven» hacia el núcleo.',
      },
      {
        texto: '«El Panteón de Roma está hecho de hormigón que se repara solo». ¿Verdad o leyenda?',
        opciones: ['Verdad: la cal viva sella las grietas', 'Leyenda: se restaura cada década', 'Verdad, pero gracias al acero interior', 'Leyenda: es piedra, no hormigón'],
        correcta: 0,
        explicacion: 'Verdad. El MIT y Harvard demostraron en 2023 que los fragmentos de cal viva del hormigón romano reaccionan con el agua de las grietas y las sellan.',
      },
    ],
  },
];

export const quizPorSlug = new Map(QUIZZES.map((q) => [q.slug, q]));
