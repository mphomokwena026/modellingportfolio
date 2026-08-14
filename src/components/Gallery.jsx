import Smooth3DSlideshow from './Smooth3DSlideshow';
import SpiralImages from './SpiralImages';

export default function Gallery() {
  return (
    <section id="gallery">
      {/* Dynamic Spiral Background Layer */}
      <div className="gallery-bg-layer" aria-hidden="true">
        <SpiralImages />
        <div className="gallery-bg-overlay" />
      </div>

      <div className="gallery-shell">
        <p className="eyebrow reveal">Gallery</p>
        <h2 className="section-title reveal">
          Portfolio <em>archive</em>
        </h2>

        <div className="gallery-container reveal">
          <Smooth3DSlideshow />
        </div>
      </div>
    </section>
  );
}

