'use client'

import type { CSSProperties } from 'react'

interface InsleyGridProps {
  opacity?: number
  variant?: 'hero' | 'section' | 'dark' | 'elevation' | 'opaque-city' | 'passage'
  className?: string
}

export default function InsleyGrid({
  opacity = 1,
  variant = 'hero',
}: InsleyGridProps) {
  const strokeColor = variant === 'dark' ? '#f4f1ea' : '#1a1916'

  const svgStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity,
  }

  if (variant === 'elevation') {
    return (
      <svg style={svgStyle} viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {/* Diagonal ray fans from upper left — warm terracotta */}
        <g opacity="0.90">
          <line x1="0" y1="0" x2="1200" y2="480" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1200" y2="420" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1200" y2="360" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1200" y2="300" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1200" y2="240" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1200" y2="180" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="1100" y2="0" stroke="#c87060" strokeWidth="1.0"/>
          <line x1="0" y1="0" x2="900" y2="0" stroke="#c87060" strokeWidth="0.4"/>
        </g>
        {/* Diagonal rays from upper right — cool blue */}
        <g opacity="0.80">
          <line x1="1200" y1="0" x2="0" y2="480" stroke="#8090b8" strokeWidth="1.0"/>
          <line x1="1200" y1="0" x2="0" y2="420" stroke="#8090b8" strokeWidth="1.0"/>
          <line x1="1200" y1="0" x2="0" y2="360" stroke="#8090b8" strokeWidth="1.0"/>
          <line x1="1200" y1="0" x2="0" y2="300" stroke="#8090b8" strokeWidth="1.0"/>
          <line x1="1200" y1="0" x2="0" y2="240" stroke="#8090b8" strokeWidth="1.0"/>
          <line x1="1200" y1="0" x2="100" y2="0" stroke="#8090b8" strokeWidth="0.8"/>
          <line x1="1200" y1="0" x2="300" y2="0" stroke="#8090b8" strokeWidth="0.8"/>
        </g>
        {/* Denser fan lines — terracotta */}
        <g opacity="0.70">
          <line x1="0" y1="0" x2="1200" y2="450" stroke="#b06050" strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="1200" y2="390" stroke="#b06050" strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="1200" y2="330" stroke="#b06050" strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="1200" y2="270" stroke="#b06050" strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="1200" y2="210" stroke="#b06050" strokeWidth="0.8"/>
          <line x1="0" y1="0" x2="1200" y2="150" stroke="#b06050" strokeWidth="0.8"/>
        </g>
        {/* Orthogonal background grid */}
        <g opacity="0.11">
          {[80,160,240,320,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#1a1916" strokeWidth="0.5"/>)}
          {[80,160,240,320,400,480,560,640,720,800,880,960,1040,1120].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" stroke="#1a1916" strokeWidth="0.5"/>)}
        </g>
        {/* Horizon line */}
        <line x1="0" y1="290" x2="1200" y2="290" stroke="#1a1916" strokeWidth="0.5" opacity="0.25"/>
        {/* Building elevation silhouette */}
        <g opacity="0.20" fill="none" stroke="#1a1916" strokeWidth="0.5">
          <rect x="0" y="340" width="1200" height="6"/><rect x="0" y="350" width="1200" height="4"/>
          <rect x="0" y="358" width="1200" height="3"/><rect x="0" y="365" width="1200" height="3"/>
          <line x1="60" y1="200" x2="60" y2="340"/><line x1="62" y1="200" x2="62" y2="340"/>
          <line x1="120" y1="210" x2="120" y2="340"/><line x1="200" y1="195" x2="200" y2="340"/>
          <line x1="280" y1="205" x2="280" y2="340"/><line x1="400" y1="200" x2="400" y2="340"/>
          <line x1="560" y1="185" x2="560" y2="340"/><line x1="600" y1="165" x2="600" y2="340"/>
          <line x1="602" y1="165" x2="602" y2="340"/><line x1="720" y1="200" x2="720" y2="340"/>
          <line x1="800" y1="205" x2="800" y2="340"/><line x1="880" y1="195" x2="880" y2="340"/>
          <line x1="960" y1="210" x2="960" y2="340"/><line x1="1040" y1="200" x2="1040" y2="340"/>
          <line x1="1120" y1="205" x2="1120" y2="340"/>
          <line x1="0" y1="240" x2="1200" y2="240"/><line x1="0" y1="260" x2="1200" y2="260"/>
          <line x1="0" y1="280" x2="1200" y2="280"/>
        </g>
        {/* Terracotta crosshatch band */}
        <g opacity="0.85">
          {[310,316,322,328,334,340].map(y => <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#c07060" strokeWidth="0.5"/>)}
        </g>
        {/* Stepped bracket forms */}
        <g opacity="0.80" fill="none" stroke="#c07060" strokeWidth="0.5">
          <path d="M80,340 L80,322 L100,322 L100,328 L120,328 L120,322 L140,322 L140,340"/>
          <path d="M200,340 L200,322 L220,322 L220,328 L240,328 L240,322 L260,322 L260,340"/>
          <path d="M320,340 L320,322 L340,322 L340,328 L360,328 L360,322 L380,322 L380,340"/>
          <path d="M440,340 L440,322 L460,322 L460,328 L480,328 L480,322 L500,322 L500,340"/>
          <path d="M560,340 L560,322 L580,322 L580,328 L600,328 L600,322 L620,322 L620,340"/>
          <path d="M680,340 L680,322 L700,322 L700,328 L720,328 L720,322 L740,322 L740,340"/>
          <path d="M800,340 L800,322 L820,322 L820,328 L840,328 L840,322 L860,322 L860,340"/>
          <path d="M920,340 L920,322 L940,322 L940,328 L960,328 L960,322 L980,322 L980,340"/>
          <path d="M1040,340 L1040,322 L1060,322 L1060,328 L1080,328 L1080,322 L1100,322 L1100,340"/>
        </g>
      </svg>
    )
  }

  if (variant === 'opaque-city') {
    return (
      <svg style={svgStyle} viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {/* Primary isometric lines going right-down */}
        <g opacity="0.65" stroke="#c07060" strokeWidth="0.8">
          {[-200,-120,-40,40,120,200,280,360,440,520,600,680,760,840,920,1000,1080,1160].map(x => (
            <line key={`rd${x}`} x1={x} y1="0" x2={x+1200} y2="480"/>
          ))}
        </g>
        {/* Isometric lines going left-down */}
        <g opacity="0.65" stroke="#5070a0" strokeWidth="0.8">
          {[200,280,360,440,520,600,680,760,840,920,1000,1080,1160,1240,1320,1400].map(x => (
            <line key={`ld${x}`} x1={x} y1="0" x2={x-1200} y2="480"/>
          ))}
        </g>
        {/* Vertical lines */}
        <g opacity="0.50" stroke="#1a1916" strokeWidth="0.5">
          {[80,160,240,320,400,480,560,640,720,800,880,960,1040,1120].map(x => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480"/>
          ))}
        </g>
        {/* Crosshatch blocks */}
        <g opacity="0.72" fill="none" stroke="#c07060" strokeWidth="0.6">
          {[80,88,96,104,112,120,128,136,144,152,160].map(y => <line key={`b1${y}`} x1="80" y1={y} x2="160" y2={y}/>)}
          {[120,128,136,144,152,160,168,176,184].map(y => <line key={`b2${y}`} x1="240" y1={y} x2="320" y2={y}/>)}
          {[80,88,96,104,112,120,128,136,144,152].map(y => <line key={`b3${y}`} x1="480" y1={y} x2="560" y2={y}/>)}
          {[200,208,216,224,232,240,248,256].map(y => <line key={`b4${y}`} x1="640" y1={y} x2="720" y2={y}/>)}
          {[160,168,176,184,192,200,208,216,224,232].map(y => <line key={`b5${y}`} x1="880" y1={y} x2="960" y2={y}/>)}
          {[280,288,296,304,312,320,328,336].map(y => <line key={`b6${y}`} x1="160" y1={y} x2="240" y2={y}/>)}
          {[320,328,336,344,352,360,368].map(y => <line key={`b7${y}`} x1="400" y1={y} x2="480" y2={y}/>)}
        </g>
        {/* Ellipses */}
        <g opacity="0.70" fill="none" stroke="#5070a0" strokeWidth="0.8">
          <ellipse cx="200" cy="200" rx="18" ry="9" transform="rotate(-30 200 200)"/>
          <ellipse cx="440" cy="140" rx="16" ry="8" transform="rotate(-25 440 140)"/>
          <ellipse cx="680" cy="300" rx="20" ry="10" transform="rotate(-35 680 300)"/>
          <ellipse cx="900" cy="120" rx="15" ry="7" transform="rotate(-28 900 120)"/>
          <ellipse cx="1050" cy="360" rx="18" ry="9" transform="rotate(-32 1050 360)"/>
          <ellipse cx="340" cy="380" rx="16" ry="8" transform="rotate(-30 340 380)"/>
          <ellipse cx="760" cy="200" rx="17" ry="8" transform="rotate(-26 760 200)"/>
        </g>
        {/* Vertical spires */}
        <g opacity="0.75" stroke="#1a1916" strokeWidth="0.7">
          <line x1="200" y1="0" x2="200" y2="480"/><line x1="201" y1="0" x2="201" y2="480"/>
          <line x1="440" y1="0" x2="440" y2="480"/><line x1="441" y1="0" x2="441" y2="480"/>
          <line x1="680" y1="0" x2="680" y2="480"/><line x1="681" y1="0" x2="681" y2="480"/>
          <line x1="920" y1="0" x2="920" y2="480"/><line x1="921" y1="0" x2="921" y2="480"/>
          <line x1="1100" y1="0" x2="1100" y2="480"/>
        </g>
      </svg>
    )
  }

  if (variant === 'passage') {
    return (
      <svg style={svgStyle} viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="1200" height="480" fill="rgba(192,80,64,0.06)"/>
        {/* Fine graph paper micro grid */}
        <g opacity="0.22" stroke="#1a1916" strokeWidth="0.3">
          {Array.from({length:47}, (_,i) => (i+1)*10).map(y => <line key={`gy${y}`} x1="0" y1={y} x2="1200" y2={y}/>)}
          {Array.from({length:119}, (_,i) => (i+1)*10).map(x => <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="480"/>)}
        </g>
        {/* Outer border */}
        <rect x="0" y="0" width="1200" height="480" fill="none" stroke="#1a1916" strokeWidth="0.5" opacity="0.75"/>
        {/* Concentric receding frames */}
        <g fill="none" strokeWidth="0.5">
          <rect x="30" y="20" width="1140" height="440" fill="none" stroke="#1a1916" opacity="0.65"/>
          <rect x="70" y="44" width="1060" height="392" fill="none" stroke="#1a1916" opacity="0.62"/>
          <rect x="115" y="70" width="970" height="340" fill="none" stroke="#1a1916" opacity="0.58"/>
          <rect x="165" y="98" width="870" height="284" fill="none" stroke="#c05040" opacity="0.90"/>
          <rect x="220" y="128" width="760" height="224" fill="none" stroke="#1a1916" opacity="0.55"/>
          <rect x="278" y="158" width="644" height="164" fill="none" stroke="#5070a0" opacity="0.80"/>
          <rect x="340" y="186" width="520" height="108" fill="none" stroke="#1a1916" opacity="0.52"/>
          <rect x="400" y="206" width="400" height="68" fill="none" stroke="#c05040" opacity="0.85"/>
          <rect x="460" y="220" width="280" height="40" fill="none" stroke="#1a1916" opacity="0.50"/>
          <rect x="510" y="228" width="180" height="24" fill="none" stroke="#5070a0" opacity="0.75"/>
          <rect x="545" y="233" width="110" height="14" fill="none" stroke="#1a1916" opacity="0.48"/>
          <rect x="568" y="237" width="64" height="6" fill="none" stroke="#c05040" opacity="0.90"/>
          <rect x="583" y="239" width="34" height="2" fill="none" stroke="#1a1916" opacity="0.60"/>
        </g>
        {/* Perspective lines corner to vanishing point */}
        <g stroke="#1a1916" strokeWidth="0.5" opacity="0.65">
          <line x1="0" y1="0" x2="600" y2="240"/>
          <line x1="1200" y1="0" x2="600" y2="240"/>
          <line x1="0" y1="480" x2="600" y2="240"/>
          <line x1="1200" y1="480" x2="600" y2="240"/>
        </g>
        {/* Red accent diagonals */}
        <g stroke="#c05040" strokeWidth="1.0" opacity="0.80">
          <line x1="0" y1="0" x2="600" y2="240"/>
          <line x1="1200" y1="480" x2="600" y2="240"/>
        </g>
        {/* Blue accent diagonals */}
        <g stroke="#5070a0" strokeWidth="1.0" opacity="0.72">
          <line x1="1200" y1="0" x2="600" y2="240"/>
          <line x1="0" y1="480" x2="600" y2="240"/>
        </g>
        {/* Red structural lines */}
        <g stroke="#c05040" strokeWidth="1.0" opacity="0.82">
          <line x1="0" y1="120" x2="600" y2="240"/>
          <line x1="1200" y1="120" x2="600" y2="240"/>
          <line x1="0" y1="360" x2="600" y2="240"/>
          <line x1="1200" y1="360" x2="600" y2="240"/>
        </g>
        {/* Blue structural lines */}
        <g stroke="#5070a0" strokeWidth="1.0" opacity="0.72">
          <line x1="300" y1="0" x2="600" y2="240"/>
          <line x1="900" y1="0" x2="600" y2="240"/>
          <line x1="300" y1="480" x2="600" y2="240"/>
          <line x1="900" y1="480" x2="600" y2="240"/>
        </g>
        {/* Vanishing point mark */}
        <rect x="597" y="237" width="6" height="6" fill="#1a1916" opacity="0.90"/>
        <line x1="600" y1="243" x2="600" y2="258" stroke="#c05040" strokeWidth="0.5" opacity="0.95"/>
      </svg>
    )
  }

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
        strokeWidth="1"
        opacity="0.22"
      />

      {/* Base orthogonal grid — ONECITY labyrinthine structure */}
      <g opacity="0.13">
        {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="800" stroke={strokeColor} strokeWidth="0.8" />
        ))}
        {[80, 160, 240, 320, 400, 480, 560, 640, 720].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1400" y2={y} stroke={strokeColor} strokeWidth="0.8" />
        ))}
      </g>

      {/* Fine sub-grid — Insley's obsessive micro detail */}
      {variant === 'hero' && (
        <g transform="translate(640, 240)" opacity="0.14">
          {[0, 20, 40, 60, 80, 100, 120, 140].map((y) => (
            <line key={`fy${y}`} x1="0" y1={y} x2="320" y2={y} stroke={strokeColor} strokeWidth="0.5" />
          ))}
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
            <line key={`fx${x}`} x1={x} y1="0" x2={x} y2="140" stroke={strokeColor} strokeWidth="0.5" />
          ))}
        </g>
      )}

      {/* Diamond form — ONECITY center, from Building No. 33 isometric */}
      <g transform="translate(80, 80)" opacity="0.18">
        {[0, 40, 80, 120, 160].map((offset, i) => (
          <polygon
            key={`d${i}`}
            points={`200,${offset} ${400 - offset},200 200,${400 - offset} ${offset},200`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={i === 0 ? '0.8' : '0.5'}
          />
        ))}
        <line x1="200" y1="0" x2="200" y2="400" stroke={strokeColor} strokeWidth="0.5" />
        <line x1="0" y1="200" x2="400" y2="200" stroke={strokeColor} strokeWidth="0.5" />
      </g>

      {/* Isometric passage-space fan — Building No. 33 style */}
      <g transform="translate(820, 80)" opacity="0.26">
        {[0, 60, 120, 180, 240, 300].map((offset) => (
          <line
            key={`f${offset}`}
            x1={240 + offset} y1="0"
            x2={offset} y2="360"
            stroke={strokeColor}
            strokeWidth="0.8"
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
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Colored diagonal rays — Insley's pencil elevation drawings */}
      {variant !== 'dark' && (
        <g opacity="0.85">
          {[
            ['rgba(140,110,180,0.95)', 600, 0, 1400, 440],
            ['rgba(140,110,180,0.90)', 660, 0, 1400, 420],
            ['rgba(130,140,200,0.92)', 720, 0, 1400, 400],
            ['rgba(130,140,200,0.85)', 780, 0, 1400, 380],
            ['rgba(210,160,140,0.88)', 840, 0, 1400, 360],
          ].map(([stroke, x1, y1, x2, y2], i) => (
            <line
              key={`r${i}`}
              x1={x1 as number} y1={y1 as number}
              x2={x2 as number} y2={y2 as number}
              stroke={stroke as string}
              strokeWidth="1.5"
            />
          ))}
        </g>
      )}

      {/* Dark variant: pink + blue Insley elevation bands */}
      {variant === 'dark' && (
        <g>
          {['rgba(210,160,140,0.92)', 'rgba(210,160,140,0.82)', 'rgba(210,160,140,0.80)'].map(
            (stroke, i) => (
              <line
                key={`p${i}`}
                x1="0" y1={100 + i * 20}
                x2="1400" y2={300 + i * 20}
                stroke={stroke}
                strokeWidth={i === 0 ? '1.8' : '1.2'}
              />
            )
          )}
          {['rgba(140,165,210,0.88)', 'rgba(140,165,210,0.78)', 'rgba(140,165,210,0.75)'].map(
            (stroke, i) => (
              <line
                key={`b${i}`}
                x1="0" y1={400 + i * 20}
                x2="1400" y2={200 + i * 20}
                stroke={stroke}
                strokeWidth={i === 0 ? '1.8' : '1.2'}
              />
            )
          )}
        </g>
      )}
    </svg>
  )
}
