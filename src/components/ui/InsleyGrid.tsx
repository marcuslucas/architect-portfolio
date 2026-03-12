'use client'

interface InsleyGridProps {
  opacity?: number
  variant?: 'hero' | 'section' | 'dark'
  className?: string
}

export default function InsleyGrid({
  opacity = 1,
  variant = 'hero',
}: InsleyGridProps) {
  const strokeColor = variant === 'dark' ? '#f4f1ea' : '#1a1916'

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
      }}
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Primary horizon line — Insley's central axis */}
      <line
        x1="0" y1="440" x2="1400" y2="440"
        stroke={strokeColor}
        strokeWidth="0.5"
        opacity="0.08"
      />

      {/* Base orthogonal grid — ONECITY labyrinthine structure */}
      <g opacity="0.04">
        {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="800" stroke={strokeColor} strokeWidth="0.5" />
        ))}
        {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1400" y2={y} stroke={strokeColor} strokeWidth="0.5" />
        ))}
      </g>

      {/* Fine sub-grid — Insley's obsessive micro detail */}
      {variant === 'hero' && (
        <g transform="translate(640, 240)" opacity="0.05">
          {[0, 20, 40, 60, 80, 100, 120, 140].map((y) => (
            <line key={`fy${y}`} x1="0" y1={y} x2="320" y2={y} stroke={strokeColor} strokeWidth="0.3" />
          ))}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
            <line key={`fx${x}`} x1={x} y1="0" x2={x} y2="140" stroke={strokeColor} strokeWidth="0.3" />
          ))}
        </g>
      )}

      {/* Diamond form — ONECITY center, from Building No. 33 isometric */}
      <g transform="translate(80, 80)" opacity="0.06">
        {[0, 40, 80, 120, 160].map((offset, i) => (
          <polygon
            key={`d${i}`}
            points={`200,${offset} ${400 - offset},200 200,${400 - offset} ${offset},200`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={i === 0 ? '0.5' : '0.3'}
          />
        ))}
        <line x1="200" y1="0" x2="200" y2="400" stroke={strokeColor} strokeWidth="0.3" />
        <line x1="0" y1="200" x2="400" y2="200" stroke={strokeColor} strokeWidth="0.3" />
      </g>

      {/* Isometric passage-space fan — Building No. 33 style */}
      <g transform="translate(820, 80)" opacity="0.1">
        {[0, 60, 120, 180, 240, 300].map((offset) => (
          <line
            key={`f${offset}`}
            x1={240 + offset} y1="0"
            x2={offset} y2="360"
            stroke={strokeColor}
            strokeWidth="0.5"
          />
        ))}
        {[
          [0, 0, 540, 360],
          [60, 0, 540, 320],
          [120, 0, 540, 280],
          [0, 60, 480, 360],
          [0, 120, 420, 360],
          [0, 180, 360, 360],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={`c${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={strokeColor}
            strokeWidth="0.3"
          />
        ))}
      </g>

      {/* Colored diagonal rays — Insley's pencil elevation drawings */}
      {variant !== 'dark' && (
        <g opacity="0.055">
          {[
            ['rgba(140,110,180,0.7)', 600, 0, 1400, 440],
            ['rgba(140,110,180,0.6)', 660, 0, 1400, 420],
            ['rgba(130,140,200,0.65)', 720, 0, 1400, 400],
            ['rgba(130,140,200,0.55)', 780, 0, 1400, 380],
            ['rgba(210,160,140,0.5)', 840, 0, 1400, 360],
          ].map(([stroke, x1, y1, x2, y2], i) => (
            <line
              key={`r${i}`}
              x1={x1 as number} y1={y1 as number}
              x2={x2 as number} y2={y2 as number}
              stroke={stroke as string}
              strokeWidth="0.5"
            />
          ))}
        </g>
      )}

      {/* Dark variant: pink + blue Insley elevation bands */}
      {variant === 'dark' && (
        <g>
          {['rgba(210,160,140,0.25)', 'rgba(210,160,140,0.18)', 'rgba(210,160,140,0.18)'].map(
            (stroke, i) => (
              <line
                key={`p${i}`}
                x1="0" y1={100 + i * 20}
                x2="1400" y2={300 + i * 20}
                stroke={stroke}
                strokeWidth={i === 0 ? '1' : '0.5'}
              />
            )
          )}
          {['rgba(140,165,210,0.22)', 'rgba(140,165,210,0.16)', 'rgba(140,165,210,0.14)'].map(
            (stroke, i) => (
              <line
                key={`b${i}`}
                x1="0" y1={400 + i * 20}
                x2="1400" y2={200 + i * 20}
                stroke={stroke}
                strokeWidth={i === 0 ? '1' : '0.5'}
              />
            )
          )}
        </g>
      )}
    </svg>
  )
}
