import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from './index.module.scss'

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapOptions, "container">;
  onCreated?(map: mapboxgl.Map): void;
  onLoaded?(map: mapboxgl.Map): void;
  onRemoved?(): void;
  coordinates: number[]
}

export default function GlobalMap({
  initialOptions = {},
  onCreated,
  onLoaded,
  coordinates,
  onRemoved,
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>();

  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: 'pk.eyJ1IjoiMWtleSIsImEiOiJjbTM2YTJ1NHYwMjU0MmtyM2t1cDdtNDB3In0.bwB-LDiE1zTuh4p1UW23-w',
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates[0], coordinates[1]],
      zoom: 12,
      ...initialOptions,
    });

    setMap(mapboxMap);


    // const marker = new mapboxgl.Marker({ color: '#0000E6', rotation: 5 })
    //   .setLngLat([coordinates[0], coordinates[1]])
    //   .addTo(mapboxMap);


    if (onCreated) onCreated(mapboxMap);

    if (onLoaded) mapboxMap.once("load", () => onLoaded(mapboxMap));

    return () => {
      mapboxMap.remove();
      setMap(undefined);
      if (onRemoved) onRemoved();
    };

  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100svh" }} className={styles.global} />;
}

