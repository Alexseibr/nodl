export interface GeoPoint {
  type: "Point";
  coordinates: [number, number]; // [lng, lat]
}

export interface GeoAddressRef {
  countryCode: string; // "BY" | "RU" | "PL" | ...
  countryId?: string;
  regionId?: string;
  cityId?: string;
  districtId?: string;
  addressLine?: string;
}

