/* eslint-disable react-hooks/exhaustive-deps */
// MarzipanoViewer.jsx

import { useEffect, useRef } from "react";
import Marzipano from "marzipano";

export default function MarzipanoViewer({ scene, locations, onNavigate }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    viewerRef.current.innerHTML = "";

    const viewer = new Marzipano.Viewer(viewerRef.current);

    const source = Marzipano.ImageUrlSource.fromString(scene.image);

    const geometry = new Marzipano.EquirectGeometry([
      {
        width: 4000,
      },
    ]);

    const limiter = Marzipano.RectilinearView.limit.traditional(
      4096,
      (120 * Math.PI) / 180,
    );

    const view = new Marzipano.RectilinearView(
      {
        yaw: 0,
        pitch: 0,

        fov: 1.6,
      },
      limiter,
    );

    const marzipanoScene = viewer.createScene({
      source,
      geometry,
      view,
    });

    marzipanoScene.switchTo();

    let isZooming = false;
    let lastTimestamp = 0;
    const ZOOM_COOLDOWN = 50;

    const handleWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastTimestamp < ZOOM_COOLDOWN) {
        return;
      }
      lastTimestamp = now;

      if (isZooming) return;
      isZooming = true;

      requestAnimationFrame(() => {
        const currentFov = view.fov();
        const zoomSpeed = 0.03;
        const minFov = 1;
        const maxFov = 1.8;

        if (e.deltaY > 0 && currentFov >= maxFov) {
          isZooming = false;
          return;
        }

        if (e.deltaY < 0 && currentFov <= minFov) {
          isZooming = false;
          return;
        }

        let newFov =
          e.deltaY > 0 ? currentFov + zoomSpeed : currentFov - zoomSpeed;
        newFov = Math.max(minFov, Math.min(maxFov, newFov));

        if (Math.abs(newFov - currentFov) > 0.0001) {
          view.setFov(newFov);
        }

        isZooming = false;
      });
    };

    viewer
      .domElement()
      .addEventListener("wheel", handleWheel, { passive: false });

    scene.nearby?.forEach((item) => {
      const element = document.createElement("div");

      element.className = "image-hotspot";
      element.innerHTML = `
  <div class="bubble-wrapper">

    <div class="bubble-float">

      <div class="bubble-label">
        ${item.name}
      </div>

      <div class="bubble-glow"></div>

      <div class="bubble-image">
        <img
          src="${item.preview}"
          alt="${item.name}"
        />
      </div>
      <div class="bubble-tooltip">
  ${item.direction || ""}
</div>

    </div>

  </div>
`;

      element.addEventListener("click", () => {
        const found = locations.find((loc) => loc.name === item.name);

        if (found) {
          onNavigate(found);
        }
      });

      marzipanoScene.hotspotContainer().createHotspot(
        element,
        {
          yaw: (item.yaw * Math.PI) / 180,
          pitch: (item.pitch * Math.PI) / 180,
        },
        {
          perspective: {
            radius: 1200,
          },
        },
      );
    });

    return () => {
      viewer.domElement().removeEventListener("wheel", handleWheel);

      viewer.destroy();
    };
  }, [scene]);

  return <div ref={viewerRef} className="marzipano-viewer" />;
}
