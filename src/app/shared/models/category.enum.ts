export enum Category {
  Atletismo = '🏃🏻‍♂️ ATLETISMO',
  Baloncesto = '🏀 BALONCESTO',
  Ciclismo = '🚵‍♂️ CICLISMO',
  Cine = '📽️ CINE',
  Cultura = '🎭 CULTURA',
  Deporte = '🤸 DEPORTE',
  Ecuestre = '🐎 ECUESTRE',
  Educativo = '🎓 EDUCATIVO',
  Fiesta = '🎉 FESTIVO',
  Fútbol = '⚽ FÚTBOL',
  Gastronomia = '🥘 GASTRONOMÍA',
  Hoguera = '🔥 HOGUERA',
  Humor = '🤡 HUMOR',
  Infantil = '🧒 INFANTIL',
  Institutional = '🏛️ INSTITUCIONAL',
  Literatura = '📚 LITERATURA',
  Ludico = '🎲 LÚDICO',
  Música = '🎵 MÚSICA',
  Naturaleza = '🏞️ NATURALEZA',
  Navidad = '🎄 NAVIDAD',
  Religión = '⛪ RELIGIÓN',
  Salud = '🩺 SALUD',
  Social = '👨‍👨‍👧‍👦 SOCIAL',
  Taurino = '🐮 TAURINO',
  TerceraEdad = '🧓 TERCERA EDAD',
  Tradicion = '📜 TRADICIÓN',
  Viaje = '🚌 VIAJE',

  Agua = '🚿 AGUA',
  Aviso = '🔊 AVISO',
  Campana = '🔔 CAMPANA',
  Correo = '📭 CORREO',
  Calendario = '📅 CALENDARIO',
  Dinero = '💰 DINERO',
  Documentacion = '📄 DOCUMENTACION',
  Fuego = '🔥 FUEGO',
  Horario = '⏰ HORARIO',
  Informe = '📊 INFORME DE DATOS',
  Informacion = 'ℹ️ INFORMACIÓN',
  Luz = '💡 LUZ',
  Mascarilla = '😷 MASCARILLA',
  Niños = '🚸 NIÑOS',
  Nieve = '❄️ NIEVE',
  Obras = '🚧 OBRAS',
  OrdenPublico = '👮 ORDEN PUBLICO',
  Peligro = '⚠️ PELIGRO',
  RestriccionesAcceso = '⛔ RESTRICCIONES DE ACCESO',
  Tormenta = '⛈️ TORMENTA',
  Sol = '☀️ SOL',
  Tiempo = '🌡️ TIEMPO',
  Vacuna = '💉 VACUNA',
  Virus = '🦠 VIRUS',
}

const NOTICE_CATEGORIES: Category[] = [
  Category.Agua,
  Category.Aviso,
  Category.Campana,
  Category.Correo,
  Category.Calendario,
  Category.Dinero,
  Category.Documentacion,
  Category.Fuego,
  Category.Horario,
  Category.Informacion,
  Category.Informe,
  Category.Luz,
  Category.Mascarilla,
  Category.Niños,
  Category.Nieve,
  Category.Obras,
  Category.OrdenPublico,
  Category.Peligro,
  Category.RestriccionesAcceso,
  Category.Tormenta,
  Category.Sol,
  Category.Tiempo,
  Category.Vacuna,
  Category.Virus,
];

const EVENT_CATEGORIES: Category[] = [
  Category.Atletismo,
  Category.Baloncesto,
  Category.Ciclismo,
  Category.Cine,
  Category.Cultura,
  Category.Deporte,
  Category.Ecuestre,
  Category.Educativo,
  Category.Gastronomia,
  Category.Fiesta,
  Category.Fútbol,
  Category.Hoguera,
  Category.Humor,
  Category.Infantil,
  Category.Institutional,
  Category.Literatura,
  Category.Ludico,
  Category.Música,
  Category.Navidad,
  Category.Naturaleza,
  Category.Religión,
  Category.Salud,
  Category.Social,
  Category.Taurino,
  Category.TerceraEdad,
  Category.Tradicion,
  Category.Viaje,
];

export { EVENT_CATEGORIES, NOTICE_CATEGORIES };
