export interface IPost {
  authorId: string; // Not for design
  title: string;
  description: string;
  address: string;
  addressData: ILocation; // Not for design
  tags: string[];
  dangerLevel: number; // 1 - 10
  isVoluntary: boolean;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
