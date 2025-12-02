export interface GeoCountry {
  code: string;
  name: string;
  currency: string;
}

export interface GeoRegion {
  countryCode: string;
  name: string;
}

export interface GeoCity {
  countryCode: string;
  regionName?: string;
  name: string;
  lat: number;
  lng: number;
}
