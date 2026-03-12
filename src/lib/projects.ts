export interface Project {
  id: string
  number: string
  title: string
  subtitle?: string
  location: string
  year: string
  type: 'Residence' | 'Development' | 'Condominium' | 'Commercial'
  status: 'Built' | 'Under Construction' | 'Design Development' | 'Concept'
  area: string
  description: string
  longDescription: string
  tags: string[]
  featured: boolean
  coverColor: string
}

export const projects: Project[] = [
  {
    id: 'casa-del-horizonte',
    number: '001',
    title: 'Casa del',
    subtitle: 'Horizonte',
    location: 'Miami Beach, Florida',
    year: '2024',
    type: 'Residence',
    status: 'Built',
    area: '6,400 sf',
    description:
      'A house defined by a single sustained threshold — the point where interior light dissolves into the Atlantic horizon. Concrete, glass, and weathered teak arranged in strict orthogonal planes that dissolve into landscape.',
    longDescription:
      'The commission arose from a simple directive: make the ocean the fourth wall of every room. The response was a sequence of intersecting volumes organized along a primary axis that runs perpendicular to the water — compressing space at arrival and releasing it at the shore. Every material choice was governed by the same logic: nothing that competes with light, nothing that ages poorly under salt air.',
    tags: ['Waterfront', 'Concrete', 'Glass', 'Teak'],
    featured: true,
    coverColor: '#ddd8ce',
  },
  {
    id: 'villa-blanca',
    number: '002',
    title: 'Villa Blanca',
    location: 'Naples, Florida',
    year: '2023',
    type: 'Residence',
    status: 'Built',
    area: '8,200 sf',
    description:
      'A composition of interlocking white volumes organized around a central reflecting pool. The house negotiates between its dense botanical context and the sky.',
    longDescription:
      "Set within a mature tropical garden, Villa Blanca required a strategy that honored both the existing landscape and the clients' desire for light-filled interior volumes. The solution was a cruciform plan that creates four distinct garden quadrants while allowing natural cross-ventilation through every major room.",
    tags: ['Garden', 'Pool', 'White Render', 'Tropical'],
    featured: false,
    coverColor: '#d4d0c8',
  },
  {
    id: 'coconut-grove-penthouse',
    number: '003',
    title: 'Coconut Grove',
    subtitle: 'Penthouse',
    location: 'Coconut Grove, Miami',
    year: '2023',
    type: 'Condominium',
    status: 'Built',
    area: '4,100 sf',
    description:
      'A full-floor penthouse renovation that transforms a conventional plan into a sequence of spatial events, each calibrated to the changing quality of Miami light.',
    longDescription:
      'The existing penthouse was a conventional open-plan space with panoramic views that paradoxically felt undifferentiated. The renovation introduced a series of freestanding volumes — library, wine room, primary suite — that create rooms within a room, giving each view its own framing and purpose.',
    tags: ['Penthouse', 'Renovation', 'City Views', 'Interior'],
    featured: false,
    coverColor: '#cac6be',
  },
  {
    id: 'coral-ridge-development',
    number: '004',
    title: 'Coral Ridge',
    subtitle: 'Development',
    location: 'Fort Lauderdale, Florida',
    year: '2022',
    type: 'Development',
    status: 'Built',
    area: '42,000 sf',
    description:
      'An eight-unit luxury development organized around a shared courtyard. Each residence is distinct while belonging to a coherent formal whole.',
    longDescription:
      "The brief called for eight luxury residences on a corner lot in Fort Lauderdale's Coral Ridge neighborhood. Rather than treating each unit as identical, we developed a kit of parts — standardized structure and services, bespoke volumes and outdoor spaces — that allows each residence to occupy its own relationship to the site.",
    tags: ['Development', 'Courtyard', 'Multi-unit', 'Luxury'],
    featured: false,
    coverColor: '#c8c4bc',
  },
  {
    id: 'pine-island-retreat',
    number: '005',
    title: 'Pine Island',
    subtitle: 'Retreat',
    location: 'Pine Island, Florida',
    year: '2022',
    type: 'Residence',
    status: 'Built',
    area: '3,800 sf',
    description:
      'A compact retreat on the Gulf Coast designed to withstand hurricane conditions while achieving a quality of lightness and openness.',
    longDescription:
      'The structural constraints of coastal construction — elevated slab, hurricane glazing, impact resistance — were treated not as limitations but as the generative logic of the design. The house sits on pilots that acknowledge the flood plain and frame views of the mangrove preserve below.',
    tags: ['Gulf Coast', 'Elevated', 'Sustainable', 'Compact'],
    featured: false,
    coverColor: '#c4c0b8',
  },
  {
    id: 'brickell-tower',
    number: '006',
    title: 'Brickell',
    subtitle: 'Tower',
    location: 'Brickell, Miami',
    year: '2021',
    type: 'Development',
    status: 'Under Construction',
    area: '280,000 sf',
    description:
      'A 32-story residential tower in Miami\'s financial district. The tower\'s faceted facade responds to solar orientation while creating a distinctive skyline presence.',
    longDescription:
      'The tower section is organized around a double-height amenity floor at the midpoint — a sky lobby that interrupts the vertical repetition of a typical residential tower. Below: standard floor plans with city views. Above: larger residences with terrace access and unobstructed bay views.',
    tags: ['Tower', 'High-rise', 'Mixed-use', 'Facade'],
    featured: false,
    coverColor: '#bbb8b0',
  },
]

export const getFeaturedProject = (): Project =>
  projects.find((p) => p.featured) ?? projects[0]

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id)
