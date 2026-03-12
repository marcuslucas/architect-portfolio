'use client'

interface ArchDrawingProps {
  variant: 'elevation' | 'section' | 'plan' | 'isometric'
  color?: string
}

export default function ArchDrawing({ variant, color = '#1a1916' }: ArchDrawingProps) {
  const s = `rgba(26,25,22,0.18)`
  const sf = `rgba(26,25,22,0.06)`

  if (variant === 'elevation') {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', bottom: 0, left: 0 }}
      >
        <line x1="0" y1="285" x2="400" y2="285" stroke={s} strokeWidth="0.5" />
        <rect x="60" y="145" width="240" height="140" fill={sf} stroke={s} strokeWidth="0.5" />
        <rect x="120" y="95" width="140" height="50" fill="rgba(26,25,22,0.04)" stroke={s} strokeWidth="0.5" />
        <line x1="40" y1="145" x2="360" y2="145" stroke={color} strokeOpacity="0.3" strokeWidth="0.8" />
        <rect x="80" y="180" width="48" height="72" fill="rgba(26,25,22,0.07)" stroke={s} strokeWidth="0.5" />
        <rect x="152" y="180" width="48" height="72" fill="rgba(26,25,22,0.07)" stroke={s} strokeWidth="0.5" />
        <rect x="224" y="180" width="48" height="72" fill="rgba(26,25,22,0.05)" stroke={s} strokeWidth="0.5" />
        <rect x="140" y="110" width="44" height="28" fill="rgba(26,25,22,0.06)" stroke={s} strokeWidth="0.4" />
        <rect x="200" y="110" width="44" height="28" fill="rgba(26,25,22,0.06)" stroke={s} strokeWidth="0.4" />
        <rect x="320" y="230" width="60" height="6" fill="rgba(140,165,200,0.25)" stroke={s} strokeWidth="0.4" />
        <rect x="320" y="236" width="60" height="49" fill="rgba(26,25,22,0.02)" stroke={s} strokeWidth="0.4" />
        <line x1="60" y1="298" x2="300" y2="298" stroke={s} strokeWidth="0.4" />
        <line x1="60" y1="294" x2="60" y2="302" stroke={s} strokeWidth="0.4" />
        <line x1="300" y1="294" x2="300" y2="302" stroke={s} strokeWidth="0.4" />
        <text x="180" y="295" textAnchor="middle" fill="rgba(26,25,22,0.2)" fontSize="7" fontFamily="Georgia,serif" letterSpacing="1">1 : 200</text>
      </svg>
    )
  }

  if (variant === 'section') {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <rect x="40" y="40" width="320" height="220" fill="none" stroke={s} strokeWidth="0.5" />
        <line x1="40" y1="100" x2="360" y2="100" stroke={s} strokeWidth="0.3" />
        <line x1="40" y1="160" x2="360" y2="160" stroke={s} strokeWidth="0.3" />
        <line x1="40" y1="220" x2="360" y2="220" stroke={s} strokeWidth="0.3" />
        <line x1="120" y1="40" x2="120" y2="260" stroke={s} strokeWidth="0.3" />
        <line x1="200" y1="40" x2="200" y2="260" stroke={s} strokeWidth="0.3" />
        <line x1="280" y1="40" x2="280" y2="260" stroke={s} strokeWidth="0.3" />
        {[0, 60, 80, 20].map((dy, i) => (
          <line
            key={i}
            x1={280 + i * 20} y1={40}
            x2={300 + i * 20} y2={40 - 20}
            stroke={s} strokeWidth="0.4"
          />
        ))}
      </svg>
    )
  }

  if (variant === 'plan') {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        <rect x="40" y="30" width="320" height="240" fill="none" stroke={s} strokeWidth="0.5" />
        <rect x="60" y="50" width="120" height="80" fill="none" stroke={s} strokeWidth="0.4" />
        <rect x="60" y="150" width="120" height="100" fill="none" stroke={s} strokeWidth="0.4" />
        <rect x="220" y="50" width="120" height="80" fill="none" stroke={s} strokeWidth="0.4" />
        <rect x="220" y="150" width="120" height="100" fill="none" stroke={s} strokeWidth="0.4" />
        <rect x="180" y="30" width="40" height="240" fill="rgba(26,25,22,0.03)" stroke={s} strokeWidth="0.3" />
        <rect x="40" y="135" width="320" height="30" fill="rgba(26,25,22,0.03)" stroke={s} strokeWidth="0.3" />
        <circle cx="200" cy="150" r="6" fill="none" stroke={s} strokeWidth="0.4" />
        <line x1="370" y1="20" x2="370" y2="40" stroke={s} strokeWidth="0.5" />
        <text x="368" y="17" fill="rgba(26,25,22,0.25)" fontSize="8" fontFamily="Georgia,serif">N</text>
      </svg>
    )
  }

  // isometric
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }}
    >
      <g opacity="0.14">
        {[0, 60, 120, 180, 240, 300].map((offset) => (
          <line
            key={`f${offset}`}
            x1={140 + offset} y1="0"
            x2={offset} y2="300"
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
        {[
          [0, 0, 340, 300],
          [40, 0, 340, 260],
          [80, 0, 340, 220],
          [0, 40, 300, 300],
          [0, 80, 260, 300],
          [0, 120, 220, 300],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.3" />
        ))}
      </g>
    </svg>
  )
}
