import { ILocation } from "../../types/post";

const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export default function calculateDistance(
  from: ILocation,
  to: ILocation
): number {
  let fromCopy = { ...from };
  let toCopy = { ...to };
  let earthRadiusKm = 6378.1;

  let distanceLatitue = degreesToRadians(toCopy.latitude - fromCopy.latitude);
  let distanceLongitude = degreesToRadians(
    toCopy.longitude - fromCopy.longitude
  );
  fromCopy.latitude = degreesToRadians(fromCopy.latitude);
  toCopy.latitude = degreesToRadians(toCopy.latitude);
  let a =
    Math.sin(distanceLatitue / 2) * Math.sin(distanceLatitue / 2) +
    Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2) *
      Math.cos(fromCopy.latitude) *
      Math.cos(toCopy.latitude);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
