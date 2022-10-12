import { useEffect } from "react";
import { Marker, TileLayer, useMapEvents } from "react-leaflet";
import { ILocation } from "../../types/post";

interface IMapComponentProps {
  markerPosition: ILocation;
  handleMarkerPosition: (newPosition: ILocation) => void;
}

export default function MapComponent({
  markerPosition,
  handleMarkerPosition,
}: IMapComponentProps) {
  const map = useMapEvents({
    click: (e: any) => {
      handleMarkerPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });

  useEffect(() => {
    if (!map) return;
    map.flyTo([markerPosition.latitude, markerPosition.longitude]);
  }, [markerPosition, map]);

  return (
    <>
      <Marker
        position={{
          lat: markerPosition.latitude,
          lng: markerPosition.longitude,
        }}
      ></Marker>
      <TileLayer
        // @ts-ignore
        attribution="&copy; HelpNow"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </>
  );
}
