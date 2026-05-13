// src/App.jsx

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useRef, useState } from "react";

import { locations } from "./data";

import "./App.css";

import MarzipanoViewer from "./components/MarzipanoViewer";

export default function App() {
  const [current, setCurrent] = useState(locations[0]);

  const [showMap, setShowMap] = useState(true);

  const [showInfo, setShowInfo] = useState(false);

  const [zoom, setZoom] = useState(1);

  const [audioEnabled, setAudioEnabled] = useState(true);

  const [cleanView, setCleanView] = useState(false);

  const audioRef = useRef(null);

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

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();

    audioRef.current.currentTime = 0;

    audioRef.current.load();

    if (audioEnabled) {
      audioRef.current.play().catch(() => {});
    }
  }, [current, audioEnabled]);

  const handleNavigate = useCallback((location) => {
    window.history.pushState({}, "", `/?location=${location.slug}`);

    setCurrent(location);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setAudioEnabled(!audioEnabled);
  };

  // FULLSCREEN
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        setCleanView(true);
      } else {
        await document.exitFullscreen();

        setCleanView(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`app ${cleanView ? "clean-mode" : ""}`}>
      {/* VIEWER */}

      <div className="viewer">
        {current.type === "matterport" ? (
          <iframe title="matterport" src={current.url} allowFullScreen />
        ) : (
          <MarzipanoViewer
            scene={current}
            locations={locations}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {!cleanView && (
        <div className={`info-panel ${showInfo ? "show" : ""}`}>
          <h2>{current.name}</h2>

          <p className="description">{current.description}</p>

          {/* AUDIO */}

          <audio ref={audioRef}>
            <source src={current.audio} type="audio/mpeg" />
          </audio>

          <button className="audio-toggle" onClick={toggleAudio}>
            {audioEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      )}

      {!cleanView && (
        <button className="toggle-map-btn" onClick={() => setShowMap(!showMap)}>
          {showMap ? "Ẩn bản đồ" : "Hiện bản đồ"}
        </button>
      )}

      <div className="mobile-actions">
        <button onClick={() => setShowInfo(!showInfo)}>ℹ️</button>

        <button onClick={() => setShowMap(!showMap)}>🗺️</button>
      </div>

      <button className="clean-view-btn" onClick={toggleFullscreen}>
        {cleanView ? "❌" : "⛶"}
      </button>

      {/* MINIMAP */}

      {showMap && !cleanView && (
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

            {/* CURRENT */}

            <div
              className="current-dot"
              style={{
                left: current.x,
                top: current.y,
              }}
            />

            {/* POINTS */}

            {locations.map((item) => (
              <button
                key={item.id}
                className={`point ${current.id === item.id ? "active" : ""}`}
                style={{
                  left: item.x,
                  top: item.y,
                }}
                onClick={() => handleNavigate(item)}
              >
                ●
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
