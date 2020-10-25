export interface SearchDto {
  category: string;
  identity: string;
  lat: number;
  long: number;
}

export interface SearchResponse {
  meta: {
    api_version: string | number;
    code: number;
    issue_date: string;
  };
  result: {
    items: [
      {
        address_name: string;
        id: string | number;
        name: string;
        point: {
          lat: number;
          lon: number;
        };
        type: string;
      }
    ];
  };
}
