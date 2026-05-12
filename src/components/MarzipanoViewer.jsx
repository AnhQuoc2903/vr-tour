// MarzipanoViewer.jsx

import { useEffect, useRef } from "react";
import Marzipano from "marzipano";

export default function MarzipanoViewer({ scene, locations, onNavigate }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // CLEAR VIEWER
    viewerRef.current.innerHTML = "";

    // =========================
    // CREATE VIEWER
    // =========================

    const viewer = new Marzipano.Viewer(viewerRef.current);

    // =========================
    // SOURCE
    // =========================

    const source = Marzipano.ImageUrlSource.fromString(scene.image);

    // =========================
    // GEOMETRY
    // =========================

    const geometry = new Marzipano.EquirectGeometry([
      {
        width: 4000,
      },
    ]);

    // =========================
    // VIEW LIMIT
    // =========================

    const limiter = Marzipano.RectilinearView.limit.traditional(
      1024,
      (100 * Math.PI) / 180,
    );

    // =========================
    // VIEW
    // =========================

    const view = new Marzipano.RectilinearView(
      {
        yaw: 0,
        pitch: 0,
        fov: Math.PI / 2,
      },
      limiter,
    );

    // =========================
    // CREATE SCENE
    // =========================

    const marzipanoScene = viewer.createScene({
      source,
      geometry,
      view,
    });

    marzipanoScene.switchTo();

    // =========================
    // HOTSPOTS
    // =========================

    scene.nearby?.forEach((item) => {
      // CREATE HTML ELEMENT

      const element = document.createElement("div");

      element.className = "image-hotspot";

      // HTML

      element.innerHTML = `

        <div class="bubble-wrapper">

          <!-- LABEL -->

          <div class="bubble-label">
            ${item.name}
          </div>

          <!-- GLOW -->

          <div class="bubble-glow"></div>

          <!-- IMAGE -->

          <div class="bubble-image">

            <img
              src="${item.preview}"
              alt="${item.name}"
            />

          </div>

        </div>

      `;

      // CLICK EVENT

      element.addEventListener("click", () => {
        const found = locations.find((loc) => loc.name === item.name);

        if (found) {
          onNavigate(found);
        }
      });

      // CREATE HOTSPOT

      marzipanoScene.hotspotContainer().createHotspot(element, {
        yaw: (item.yaw * Math.PI) / 180,

        pitch: (item.pitch * Math.PI) / 180,
      });
    });

    // CLEANUP

    return () => {
      viewer.destroy();
    };
  }, [scene, locations, onNavigate]);

  return <div ref={viewerRef} className="marzipano-viewer" />;
}
