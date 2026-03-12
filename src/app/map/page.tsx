"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Map, { Marker, Popup, NavigationControl, Source, Layer } from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, X, Layers, Crosshair } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const formatPrice = (price: number) => {
  if (!price) return "N/A";
  if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`;
  if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(0)}M`;
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
};

export default function InteractiveMapPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .not('lat', 'is', null)
        .not('lng', 'is', null);
        
      if (!error && data) setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const geojson = useMemo(() => ({
    type: "FeatureCollection",
    features: properties.map((prop) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [prop.lng, prop.lat] },
      properties: { ...prop, propertyId: prop.id }
    }))
  }), [properties]);

  // Cluster Layers Styles (Light Theme)
  const clusterLayer: any = {
    id: 'clusters',
    type: 'circle',
    source: 'properties',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#1F7A63', 10, '#145544', 30, '#103D31'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 40],
      'circle-stroke-width': 4,
      'circle-stroke-color': '#FFFFFF'
    }
  };

  const clusterCountLayer: any = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'properties',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 14
    },
    paint: { 'text-color': '#FFFFFF' }
  };

  const unclusteredPointLayer: any = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'properties',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#1F7A63',
      'circle-radius': 8,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#FFFFFF'
    }
  };

  const handleMapClick = (event: any) => {
    const feature = event.features && event.features[0];
    if (!feature) return setSelectedProperty(null);

    if (feature.layer.id === 'clusters') {
      const clusterId = feature.properties.cluster_id;
      const mapboxSource = mapRef.current.getSource('properties');
      mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;
        mapRef.current.easeTo({ center: feature.geometry.coordinates, zoom, duration: 500 });
      });
    } else if (feature.layer.id === 'unclustered-point') {
      setSelectedProperty(feature.properties);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center text-brand-dark">
        <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 text-brand-dark/40 hover:text-brand-emerald transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <MapPin size={80} className="text-brand-emerald/20 mb-8" />
        <h1 className="text-4xl font-serif mb-4">Map Configuration Required</h1>
        <p className="text-brand-dark/50 text-lg max-w-xl mb-10">
           Configure your <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to unlock the luxury property map locator.
        </p>
        <Link href="/properties" className="bg-brand-emerald text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-brand-emerald/10">
           Browse Search Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-[#f9f9f9] flex flex-col pt-16">
      <Header />
      
      {/* Overlays */}
      <div className="absolute top-24 left-6 z-10 flex flex-col gap-4">
        <Link href="/properties" className="bg-white border border-gray-100 px-6 py-3 rounded-2xl flex items-center gap-3 text-brand-dark text-xs font-black uppercase tracking-widest hover:bg-brand-emerald hover:text-white transition-all shadow-xl shadow-gray-200/50">
          <ArrowLeft size={14} /> Back to List
        </Link>
        <div className="bg-white border border-gray-100 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-gray-200/50">
           <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
           <span className="text-brand-dark font-black uppercase tracking-widest text-[10px]">{loading ? "Refreshing..." : `${properties.length} Estates Found`}</span>
        </div>
      </div>

      {/* Map Control Shortcuts */}
      <div className="absolute bottom-10 left-6 z-10 flex flex-col gap-2">
         <button className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-brand-dark hover:text-brand-emerald transition-all shadow-xl shadow-gray-200/50">
           <Layers size={20} />
         </button>
         <button className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-brand-dark hover:text-brand-emerald transition-all shadow-xl shadow-gray-200/50">
           <Crosshair size={20} />
         </button>
      </div>

      <div className="flex-1 w-full relative">
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          initialViewState={{ longitude: 3.4215, latitude: 6.4531, zoom: 11 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          interactiveLayerIds={['clusters', 'unclustered-point']}
          onClick={handleMapClick}
        >
          <NavigationControl position="top-right" />
          
          {geojson.features.length > 0 && (
            <Source id="properties" type="geojson" data={geojson as any} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          )}

          {selectedProperty && (
            <Popup
              longitude={selectedProperty.lng}
              latitude={selectedProperty.lat}
              anchor="bottom"
              onClose={() => setSelectedProperty(null)}
              closeButton={false}
              maxWidth="300px"
              offset={15}
            >
              <div className="bg-white rounded-[24px] overflow-hidden shadow-2xl border border-gray-50 flex flex-col p-2">
                 <div className="relative w-full h-[160px] rounded-[18px] overflow-hidden mb-3">
                    <Image 
                      src={selectedProperty.images?.[0] || "/hero_background.jpg"} 
                      alt={selectedProperty.title} 
                      fill 
                      className="object-cover"
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedProperty(null); }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-brand-dark shadow-xl"
                    >
                       <X size={12} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-brand-emerald text-white px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                       {selectedProperty.type || 'For Sale'}
                    </div>
                 </div>
                 <div className="px-3 pb-3">
                    <h3 className="text-brand-dark font-serif text-base mb-1 leading-tight line-clamp-1">{selectedProperty.title}</h3>
                    <p className="text-brand-emerald font-black text-sm mb-4 leading-none">{formatPrice(selectedProperty.price)}</p>
                    <Link 
                      href={`/properties/${selectedProperty.propertyId}`} 
                      className="flex items-center justify-center w-full bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-brand-emerald transition-colors"
                    >
                      View Details
                    </Link>
                 </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>

      <style jsx global>{`
        .mapboxgl-popup-content { background: transparent !important; padding: 0 !important; border-radius: 24px !important; box-shadow: none !important; }
        .mapboxgl-popup-tip { border-top-color: #FFFFFF !important; }
      `}</style>
    </div>
  );
}
