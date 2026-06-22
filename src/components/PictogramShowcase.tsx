import { Pictogram } from './Pictogram'
import { PICTOGRAM_ORDER, PICTOGRAMS } from '../pictograms/registry'

export function PictogramShowcase() {
  return (
    <section className="system-mini" id="system-mini">
      <h3 className="serif">The pictogram set.</h3>
      <p>
        Twelve hand-crafted topical illustrations. Each uses your theme's three colors plus an ink ornament
        layer. Same vocabulary across the set: flat shapes, no gradients, no photos. Try switching themes
        (top right) to see all 12 recolor live.
      </p>
      <div className="full-grid">
        {PICTOGRAM_ORDER.map((id) => (
          <div className="item" key={id}>
            <Pictogram id={id} width={100} height={50} />
            <div className="lbl">{PICTOGRAMS[id].name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

