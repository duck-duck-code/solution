export interface SearchDto {
  search: string;
  identity: string;
  lat: number;
  long: number;
}

export interface SearchResponse {
  result: {
    items: [PointData];
  };
}

export interface PointData {
  isFavourite: boolean;
  address_name: string;
  name: string;
  point: {
    lat: number;
    lon: number;
  };
}
