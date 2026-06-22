import { PICTOGRAMS, type PictogramId } from '../pictograms/registry'

type PictogramProps = {
  id: PictogramId
  width?: number
  height?: number
}

export function Pictogram({ id, width = 110, height = 55 }: PictogramProps) {
  return (
    <svg
      className="picto"
      width={width}
      height={height}
      viewBox="0 0 80 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={PICTOGRAMS[id].name}
      dangerouslySetInnerHTML={{ __html: PICTOGRAMS[id].svg }}
    />
  )
}

