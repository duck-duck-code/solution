export interface SearchDto {
  search: string;
  identity: string;
  lat: number;
  long: number;
}

export interface SearchResponse {
  result: {
    meta: {
      api_version: string | number;
      code: number;
      issue_date: string;
    };
    result: {
      items: [PointData];
    };
  };
}

export interface PointData {
  address_name: string;
  id: string | number;
  name: string;
  point: {
    lat: number;
    lon: number;
  };
  type: string;
}
