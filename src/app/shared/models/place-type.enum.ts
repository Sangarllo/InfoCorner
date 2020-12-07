export enum PlaceType {
  Other = 'OTRO',
  Nature = 'ESPACIO NATURAL',
  Bar = 'BAR', // Bar, Restaurante, Cafetería...
  Store = 'TIENDA', // Tienda o Supermercado
  Road = 'CALLE',
  Cinema = 'CINE',
  Church = 'IGLESIA',
  Sport = 'ESPACIO DEPORTIVO',
  Public = 'EDIFICIO PÚBLICO',
  Private = 'LOCAL PRIVADO',
  Square = 'PLAZA',
  Association = 'SEDE DE ASOCIACIÓN',
  Town = 'MUNICIPIO',
  TownHall = 'AYUNTAMIENTO',
}

const PLACE_TYPES: PlaceType[] = [
  PlaceType.Other,
  PlaceType.TownHall,
  PlaceType.Bar,
  PlaceType.Road,
  PlaceType.Cinema,
  PlaceType.Nature,
  PlaceType.Public,
  PlaceType.Sport,
  PlaceType.Church,
  PlaceType.Private,
  PlaceType.Town,
  PlaceType.Square,
  PlaceType.Association,
  PlaceType.Store,
];

export { PLACE_TYPES };
