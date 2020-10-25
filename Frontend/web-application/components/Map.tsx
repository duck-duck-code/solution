import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DG from "2gis-maps";
import { Box, BoxProps, Center, Text } from "@chakra-ui/core";
import { AppState } from "../state/reducers";
import { GeoState } from "../state/reducers/geo";
import uuid from "react-uuid";
import { setMode } from "../state/actions/site";

if (window && !localStorage.getItem("id")) {
  localStorage.setItem("id", uuid());
}

export default function Map(props: BoxProps) {
  const dispatch = useDispatch();

  if (localStorage.getItem("mode")) {
    dispatch(setMode(localStorage.getItem("mode") as "light" | "dark"));
  }

  const [error, setError] = useState(undefined);
  const [map, setMap] = useState(undefined);
  const [markersToRemove, setMarkers] = useState(undefined);
  const geo: GeoState = useSelector((state: AppState) => state.geo);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!map) {
          const map = DG.map("map", {
            center: [pos.coords.latitude, pos.coords.longitude],
            zoom: 13,
            skin: "dark",
          });

          setMap(map);

          const icon = DG.icon({
            iconUrl:
              "https://duck-duck-code.s3.eu-central-1.amazonaws.com/icons/duckholder.svg",
            iconSize: [35, 52],
            iconAnchor: [17, 52],
          });

          DG.marker([pos.coords.latitude, pos.coords.longitude], {
            icon: icon,
          })
            .addTo(map)
            .bindPopup("Ваше местоположение");
        }

        if (markersToRemove) {
          markersToRemove.removeFrom(map);
        }

        const markers = DG.featureGroup();
        geo.points.forEach((point) => {
          if (point?.point?.lat && point?.point?.lon) {
            DG.marker([point.point.lat, point.point.lon])
              .addTo(markers)
              .bindPopup(point.name);
          }
        });
        if (geo.points.length > 0) {
          markers.addTo(map);

          setMarkers(markers);
        }
      },
      (err) => {
        setError(true);
      }
    );
  }, [geo]);

  if (error)
    return (
      <Center {...props}>
        <Text>Your geo data is uknown</Text>
      </Center>
    );

  return <Box id="map" {...props} />;
}
