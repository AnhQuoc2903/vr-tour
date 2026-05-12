// src/App.jsx

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import { locations } from "./data";

import "./App.css";
import MarzipanoViewer from "./components/MarzipanoViewer";

export default function App() {
  const [current, setCurrent] = useState(locations[0]);

  const [showGuide, setShowGuide] = useState(false);

  const [showMap, setShowMap] = useState(true);

  const [showInfo, setShowInfo] = useState(false);

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const locationSlug = params.get("location");

    if (locationSlug) {
      const found = locations.find((item) => item.slug === locationSlug);

      if (found) {
        setCurrent(found);
      }
    }
  }, []);

  return (
    <div className="app">
      {/* VIEWER */}

      <div className="viewer">
        {current.type === "matterport" ? (
          <iframe title="matterport" src={current.url} allowFullScreen />
        ) : (
          <MarzipanoViewer
            scene={current}
            locations={locations}
            onNavigate={setCurrent}
          />
        )}
      </div>

      {/* INFO PANEL */}

      <div className={`info-panel ${showInfo ? "show" : ""}`}>
        <h2>{current.name}</h2>

        <p className="description">{current.description}</p>

        <audio controls src={current.audio} />

        <button className="guide-btn" onClick={() => setShowGuide(true)}>
          Hướng Dẫn Di Chuyển
        </button>
      </div>

      {/* DESKTOP TOGGLE */}

      <button className="toggle-map-btn" onClick={() => setShowMap(!showMap)}>
        {showMap ? "Ẩn bản đồ" : "Hiện bản đồ"}
      </button>

      {/* MOBILE ACTIONS */}

      <div className="mobile-actions">
        <button onClick={() => setShowInfo(!showInfo)}>ℹ️</button>

        <button onClick={() => setShowMap(!showMap)}>🗺️</button>
      </div>

      {/* MINIMAP */}

      {showMap && (
        <div className="minimap">
          {/* ZOOM */}

          <div className="zoom-controls">
            <button onClick={() => setZoom(zoom + 0.1)}>+</button>

            <button onClick={() => setZoom(Math.max(1, zoom - 0.1))}>-</button>
          </div>

          {/* MAP */}

          <div
            className="map-wrapper"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            <img src="/map.png" alt="map" className="map-image" />

            {/* CURRENT DOT */}

            <div
              className="current-dot"
              style={{
                left: current.x,
                top: current.y,
              }}
            />

            {/* ALL POINTS */}

            {locations.map((item) => (
              <button
                key={item.id}
                className={`point ${current.id === item.id ? "active" : ""}`}
                style={{
                  left: item.x,
                  top: item.y,
                }}
                onClick={() => setCurrent(item)}
              >
                ●
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GUIDE POPUP */}

      {showGuide && (
        <div className="guide-overlay">
          <div className="guide-popup">
            <button className="close-btn" onClick={() => setShowGuide(false)}>
              ✕
            </button>

            <h2>Địa điểm lân cận</h2>

            {current.nearby.map((item) => (
              <div key={item.name} className="nearby-card">
                <h3>{item.name}</h3>

                <p>{item.direction}</p>

                {item.audio && <audio controls src={item.audio} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
