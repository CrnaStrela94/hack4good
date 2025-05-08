'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, MarkerClusterer } from '@react-google-maps/api';

// Replace with your actual API key
const Maps_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type Event = {
  id: number;
  title: string;
  image: string;
  hostName: string;
  hostImage: string;
  date: string;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: string;
  interestMatch?: number;
  attendees: number;
  spotsLeft: number;
  tags: string[];
};

const MAP_STYLE = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ saturation: -20 }, { lightness: 10 }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const DEFAULT_CENTER = { lat: 62.0, lng: 15.0 };
const DEFAULT_ZOOM = 5.5;

type SwedenMapProps = {
  events?: Event[];
  filterTags?: string[];
};

export function SwedenMap({ events = [], filterTags = [] }: SwedenMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: Maps_API_KEY,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<{
    position: google.maps.LatLngLiteral;
    events: Event[];
  } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerMap = useRef<Map<google.maps.Marker, Event>>(new Map());
  // No need to store mapZoom in state if only used in callbacks, can get from mapRef.current.getZoom()

  const filteredEvents = useMemo(() => {
    if (filterTags.length === 0) return events;
    return events.filter((event) => event.tags.some((tag) => filterTags.includes(tag)));
  }, [events, filterTags]);

  const mapCenter = useMemo(() => DEFAULT_CENTER, []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      zoom: DEFAULT_ZOOM,
      styles: MAP_STYLE,
      minZoom: 4,
      maxZoom: 12, // Map's maximum zoom level
      disableDefaultUI: true,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      scaleControl: false,
      rotateControl: false,
      panControl: false,
      keyboardShortcuts: false,
      draggableCursor: 'pointer',
      gestureHandling: 'greedy',
    }),
    []
  );

  const onEventClick = useCallback((event: Event) => {
    setSelectedEvent(event);
    setSelectedCluster(null);
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // If you need to react to zoom changes for other UI elements, you can keep a zoom listener:
    // map.addListener('zoom_changed', () => {
    //   const currentZoom = map.getZoom();
    //   if (currentZoom) { /* set some state if needed */ }
    // });
  }, []);

  const onClusterClick = useCallback(
    (cluster: any) => {
      // cluster object from the marker clusterer library
      try {
        const clusterMarkers = cluster.getMarkers() as google.maps.Marker[];
        const currentMapZoom = mapRef.current?.getZoom() || DEFAULT_ZOOM;
        const mapActualMaxZoom = mapOptions.maxZoom || 12;

        const clusterEvents: Event[] = [];
        clusterMarkers.forEach((marker: google.maps.Marker) => {
          const event = markerMap.current.get(marker);
          if (event) clusterEvents.push(event);
        });

        if (currentMapZoom >= mapActualMaxZoom) {
          // AT MAX ZOOM: If a "cluster" (even for co-located points) is clicked, show the list of events.
          if (clusterEvents.length > 0) {
            const centerLatLng = cluster.getCenter(); // This is a google.maps.LatLng object
            setSelectedCluster({
              position: { lat: centerLatLng.lat(), lng: centerLatLng.lng() }, // Convert to literal for state
              events: clusterEvents,
            });
            setSelectedEvent(null); // Ensure individual event window is closed
          } else {
            // This case (cluster click at max zoom but no events resolved) should ideally not happen if markers are managed correctly.
            console.warn('Cluster clicked at max zoom, but no events resolved from its markers.');
          }
        } else {
          // NOT AT MAX ZOOM: Zoom in to the cluster.
          if (mapRef.current) {
            mapRef.current.fitBounds(cluster.getBounds());
            setSelectedEvent(null); // Clear selections when zooming
            setSelectedCluster(null);
          }
        }
      } catch (error) {
        console.error('Error handling cluster click:', error);
        if (mapRef.current && cluster && typeof cluster.getBounds === 'function') {
          mapRef.current.fitBounds(cluster.getBounds()); // Fallback zoom
        }
      }
    },
    [mapOptions.maxZoom, onEventClick] // onEventClick is not directly called, but logic is related. Simpler: [mapOptions.maxZoom]
    // setSelectedEvent, setSelectedCluster are stable setters from useState. markerMap.current is accessed.
    // Sticking to minimal necessary dependencies: [mapOptions.maxZoom]
  );

  // Handler for clicking an event within the cluster list InfoWindow
  const handleEventListItemClick = useCallback(
    (event: Event) => {
      onEventClick(event); // This will set selectedEvent and close selectedCluster
    },
    [onEventClick]
  );

  if (!isLoaded)
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 rounded-full border-t-blue-600 mb-2"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%', minHeight: '300px' }}
      center={mapCenter}
      options={mapOptions} // Default zoom is in mapOptions
      onLoad={onMapLoad}
    >
      <MarkerClusterer
        options={{
          gridSize: 60,
          // This maxZoom for the clusterer is crucial.
          // If map maxZoom is 12:
          // - clusterer maxZoom 11: At zoom 12, markers are individual. Clicks go to Marker onClick.
          // - clusterer maxZoom 12: At zoom 12, if points are co-located, clusterer might still
          //                          provide a "cluster" object to onClusterClick, especially if zoomOnClick is false.
          //                          This seems to be the scenario you want to handle.
          maxZoom: 12, // Match map's max zoom if you want onClusterClick to handle co-located points at max zoom.
          averageCenter: true,
          minimumClusterSize: 2,
          zoomOnClick: false, // Critical: We handle click logic in onClusterClick
        }}
      >
        {(clusterer) => {
          if (
            clusterer &&
            typeof (clusterer as any).addListener === 'function' &&
            !(clusterer as any)._onClickListenerAdded
          ) {
            (clusterer as any).addListener('clusterclick', (cluster: any) => {
              onClusterClick(cluster);
            });
            (clusterer as any)._onClickListenerAdded = true;
          }

          markerMap.current.clear();

          return (
            <>
              {filteredEvents
                .filter((event) => event.coordinates)
                .map((event) => (
                  <Marker
                    key={`event-${event.id}`}
                    position={event.coordinates!}
                    clusterer={clusterer}
                    onClick={() => onEventClick(event)}
                    icon={{
                      url: '/marker.svg',
                      scaledSize: new window.google.maps.Size(36, 44),
                      anchor: new window.google.maps.Point(18, 44),
                    }}
                    onLoad={(marker) => {
                      if (marker && marker instanceof window.google.maps.Marker) {
                        markerMap.current.set(marker, event);
                      }
                    }}
                  />
                ))}
            </>
          );
        }}
      </MarkerClusterer>

      {selectedEvent && selectedEvent.coordinates && (
        <InfoWindow
          position={selectedEvent.coordinates}
          onCloseClick={() => setSelectedEvent(null)}
          options={{ pixelOffset: new google.maps.Size(0, -38) }}
        >
          <div className="p-3 max-w-xs">
            <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-600">{selectedEvent.location}</p>
            <p className="text-sm text-gray-600 mb-2">{selectedEvent.date}</p>
            <div className="flex items-center mt-2 mb-3">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img
                  src={selectedEvent.hostImage || '/default-host.png'}
                  alt={selectedEvent.hostName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm">Hosted by {selectedEvent.hostName}</p>
            </div>
            <div className="flex gap-1 flex-wrap mb-2">
              {selectedEvent.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`/event/${selectedEvent.id}`}
              className="text-blue-600 text-sm font-medium hover:underline block mt-2"
            >
              View details →
            </a>
          </div>
        </InfoWindow>
      )}

      {selectedCluster && (
        <InfoWindow
          position={selectedCluster.position}
          onCloseClick={() => setSelectedCluster(null)}
          options={{ pixelOffset: new google.maps.Size(0, -30) }}
        >
          <div className="p-3 max-w-xs">
            <h3 className="font-bold text-lg mb-2">Events at this location</h3>
            <div className="space-y-1 mt-3 max-h-60 md:max-h-80 overflow-y-auto">
              {selectedCluster.events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEventListItemClick(event)} // Event items in list are clickable
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3 shrink-0">
                    <img
                      src={event.image || '/default-event.png'}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate" title={event.title}>
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {event.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 2 && <span className="text-xs text-gray-500">+{event.tags.length - 2}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
