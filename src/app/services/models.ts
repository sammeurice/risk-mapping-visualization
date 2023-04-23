export interface Asset {
  "Asset Name": string;
  "Business Category": string;
  Lat: number;
  Long: number;
  "Risk Factors": string;
  "Risk Rating": number;
  Year: number;
}

export interface ParsedAsset {
  "Asset Name": string;
  "Business Category": string;
  Lat: number;
  Long: number;
  "Risk Factors": object;
  "Risk Rating": number;
  Year: number;
}
