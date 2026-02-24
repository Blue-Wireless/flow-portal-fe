import { useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import ActiveIcon from '../assets/green-circle.svg?react';
import InactiveIcon from '../assets/red-circle.svg?react';
import L from 'leaflet';

type terminalStatus = 'online' | 'offline';
export type Terminal = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status?: terminalStatus;
};

type Props = {
  terminals: Terminal[];
};

const FitBounds = ({ terminals }: { terminals: Terminal[] }) => {
  const map = useMap();
  useEffect(() => {
    if (!terminals.length) return;
    const bounds = L.latLngBounds(
      terminals.map((t) => [t.latitude, t.longitude] as [number, number]),
    );

    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 6 });
  }, [map, terminals]);

  return null;
};

const getCounts = (terminals: Terminal[]) => {
  const online = terminals.filter((t) => t.status === 'online').length;
  const offline = terminals.filter((t) => t.status === 'offline').length;
  return { total: terminals.length, online, offline };
};

const getMarkerColor = (status?: terminalStatus) => {
  return status === 'online' ? '#216E4E' : '#AE2E24';
};

const makeTerminalMarker = (status?: terminalStatus) => {
  const color = getMarkerColor(status);
  const html = `<div style="
      width: 16px; height: 16px; border-radius: 9999px;
      background: ${color};
      box-shadow: 0 0 0 2px ${color}33;
      border: 2px solid white;
    "></div>
  `;

  return L.divIcon({
    className: '',
    html,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const makeClusterMarker = (cluster: any) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 24 : count < 50 ? 40 : 36;
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:${size}px;height:${size}px;border-radius:9999px;
        background:#0F4C81;color:white;
        display:flex;align-items:center;justify-content:center;
        font-weight:700;font-size:12px;
        box-shadow:0 0 0 6px rgba(15,76,129,0.18);
        border:2px solid white;
      ">
        ${count}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const GlobalMap = ({ terminals }: Props) => {
  const counts = useMemo(() => {
    return getCounts(terminals);
  }, [terminals]);

  return (
    <div>
      <span>Interactive Map</span>
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-900">
          {counts.total} terminals worldwide
        </span>
        <div className="text-sm font-semibold text-slate-900">|</div>
        <ActiveIcon />
        <span className="font-semibold text-slate-900">
          {counts.online} online
        </span>
        <div className="text-sm font-semibold text-slate-900">|</div>
        <InactiveIcon />
        <span className="font-semibold text-slate-900">
          {counts.offline} offline
        </span>
      </div>

      <div className="mt-4 h-[222px] w-full overflow-hidden">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom
          className="h-full w-full"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds terminals={terminals} />
          {terminals.map((t) => {
            return (
              <MarkerClusterGroup
                chunkedLoading
                spiderfyOnMaxZoom
                showCoverageOnHover={false}
                disableClusteringAtZoom={5}
                iconCreateFunction={makeClusterMarker}
              >
                {terminals.map((t) => (
                  <Marker
                    key={t.id}
                    position={[t.latitude, t.longitude]}
                    icon={makeTerminalMarker(t.status)}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">{t.name}</div>
                        <div>Status: {t.status ?? 'offline'}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default GlobalMap;
