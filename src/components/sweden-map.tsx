'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, MarkerClusterer } from '@react-google-maps/api';

// Replace with your actual API key (restrict to maps.googleapis.com)
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type Group = {
  id: number;
  name: string;
  members: number;
  nextEvent: string;
  image: string;
  tags: string[];
};

type Region = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  groups: number;
  activeGroups: Group[];
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

const REGIONS: Region[] = [
  {
    id: 'stockholm',
    name: 'Stockholm',
    lat: 59.3293,
    lng: 18.0686,
    groups: 42,
    activeGroups: [
      {
        id: 1,
        name: 'Swedish Fika & Language Exchange',
        members: 24,
        nextEvent: 'Tomorrow at 4:00 PM',
        image: '/placeholder.svg',
        tags: ['Language Exchange', 'Coffee'],
      },
      {
        id: 2,
        name: 'Stockholm Tech Meetup',
        members: 56,
        nextEvent: 'Friday at 6:00 PM',
        image: '/placeholder.svg',
        tags: ['Technology'],
      },
      {
        id: 3,
        name: 'International Food Festival',
        members: 38,
        nextEvent: 'Saturday at 12:00 PM',
        image: '/placeholder.svg',
        tags: ['Food & Drink'],
      },
    ],
  },
  {
    id: 'gothenburg',
    name: 'Gothenburg',
    lat: 57.7089,
    lng: 11.9746,
    groups: 28,
    activeGroups: [
      {
        id: 4,
        name: 'Gothenburg Hiking Club',
        members: 32,
        nextEvent: 'Sunday at 9:00 AM',
        image: '/placeholder.svg',
        tags: ['Hiking'],
      },
      {
        id: 5,
        name: 'Swedish Film Nights',
        members: 19,
        nextEvent: 'Wednesday at 7:00 PM',
        image: '/placeholder.svg',
        tags: ['Cinema'],
      },
    ],
  },
  {
    id: 'malmo',
    name: 'Malmö',
    lat: 55.605,
    lng: 13.0038,
    groups: 23,
    activeGroups: [
      {
        id: 6,
        name: 'Malmö International Meetup',
        members: 45,
        nextEvent: 'Thursday at 6:30 PM',
        image: '/placeholder.svg',
        tags: ['Social'],
      },
      {
        id: 7,
        name: 'Swedish Traditions Workshop',
        members: 16,
        nextEvent: 'Saturday at 2:00 PM',
        image: '/placeholder.svg',
        tags: ['Cultural'],
      },
    ],
  },
  {
    id: 'uppsala',
    name: 'Uppsala',
    lat: 59.8586,
    lng: 17.6389,
    groups: 18,
    activeGroups: [
      {
        id: 8,
        name: 'Uppsala Student Exchange',
        members: 37,
        nextEvent: 'Monday at 5:00 PM',
        image: '/placeholder.svg',
        tags: ['Education'],
      },
    ],
  },
  {
    id: 'umea',
    name: 'Umeå',
    lat: 63.8258,
    lng: 20.263,
    groups: 12,
    activeGroups: [
      {
        id: 9,
        name: 'Northern Lights Photography',
        members: 22,
        nextEvent: 'Friday at 8:00 PM',
        image: '/placeholder.svg',
        tags: ['Photography'],
      },
    ],
  },
  {
    id: 'kiruna',
    name: 'Kiruna',
    lat: 67.8558,
    lng: 20.2253,
    groups: 8,
    activeGroups: [
      {
        id: 10,
        name: 'Arctic Circle Adventures',
        members: 14,
        nextEvent: 'Saturday at 10:00 AM',
        image: '/placeholder.svg',
        tags: ['Adventure'],
      },
    ],
  },
  {
    id: 'lulea',
    name: 'Luleå',
    lat: 65.5848,
    lng: 22.1569,
    groups: 10,
    activeGroups: [
      {
        id: 11,
        name: 'Ice Fishing Club',
        members: 18,
        nextEvent: 'Sunday at 7:00 AM',
        image: '/placeholder.svg',
        tags: ['Outdoors'],
      },
    ],
  },
  {
    id: 'jonkoping',
    name: 'Jönköping',
    lat: 57.7815,
    lng: 14.1562,
    groups: 15,
    activeGroups: [
      {
        id: 12,
        name: 'Lake Vättern Sailing',
        members: 26,
        nextEvent: 'Saturday at 11:00 AM',
        image: '/placeholder.svg',
        tags: ['Sailing'],
      },
    ],
  },
];

export function SwedenMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [selected, setSelected] = useState<Region | null>(null);

  const mapCenter = useMemo(() => ({ lat: 62.0, lng: 15.0 }), []);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      zoom: 5.5,
      styles: MAP_STYLE,
      minZoom: 4,
      maxZoom: 12,
      disableDefaultUI: true, // disables all controls
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
      gestureHandling: 'greedy', // or 'none' for no interaction
    }),
    []
  );

  const onMarkerClick = useCallback((region: Region) => {
    setSelected(region);
  }, []);

  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <GoogleMap mapContainerStyle={{ width: '100%', height: '600px' }} center={mapCenter} options={mapOptions}>
      <MarkerClusterer
        options={{
          gridSize: 60,
          maxZoom: 12,
        }}
      >
        {(clusterer) => (
          <>
            {REGIONS.map((region) => (
              <Marker
                key={region.id}
                position={{ lat: region.lat, lng: region.lng }}
                clusterer={clusterer}
                onClick={() => onMarkerClick(region)}
                animation={window.google.maps.Animation.DROP}
                icon={{
                  url: '/marker.svg', // your new SVG
                  scaledSize: new window.google.maps.Size(48, 56), // preserve its natural size
                  anchor: new window.google.maps.Point(24, 56), // bottom-center point
                }}
              />
            ))}
          </>
        )}
      </MarkerClusterer>

      {selected && (
        <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
          <div
            style={{
              maxWidth: 280,
              borderRadius: 12,
              boxShadow: '0 2px 12px #0002',
              padding: 16,
              background: '#fff',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <h3 style={{ margin: '0 0 0.5em 0', fontSize: 20, color: '#1a237e' }}>
              {selected.name} <span style={{ color: '#607d8b', fontWeight: 400 }}>({selected.groups} groups)</span>
            </h3>
            {selected.activeGroups.map((g) => (
              <div
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1em',
                  background: '#f5f7fa',
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <img
                  src={g.image}
                  alt={g.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    marginRight: 10,
                    objectFit: 'cover',
                    background: '#eee',
                  }}
                />
                <div>
                  <strong style={{ fontSize: 16 }}>{g.name}</strong>
                  <br />
                  <span style={{ fontSize: 13, color: '#607d8b' }}>
                    {g.members} members • {g.nextEvent}
                  </span>
                  <br />
                  <small style={{ color: '#1976d2' }}>{g.tags.join(', ')}</small>
                </div>
              </div>
            ))}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
