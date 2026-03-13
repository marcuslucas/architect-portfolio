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
  coverImage: string
  images: string[]
}

export const projects: Project[] = [
  {
    id: 'house-01',
    number: '001',
    title: 'Project I',
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
    coverImage: '/images/projects/house-01/01.JPG',
    images: [
      '/images/projects/house-01/01.JPG',
      '/images/projects/house-01/02.JPG',
    ],
  },
  {
    id: 'house-02',
    number: '002',
    title: 'Project II',
    location: 'Naples, Florida',
    year: '2023',
    type: 'Residence',
    status: 'Built',
    area: '8,200 sf',
    description:
      'A composition of interlocking white volumes organized around a central reflecting pool. The house negotiates between its dense botanical context and the sky.',
    longDescription:
      "Set within a mature tropical garden, this residence required a strategy that honored both the existing landscape and the clients' desire for light-filled interior volumes. The solution was a cruciform plan that creates four distinct garden quadrants while allowing natural cross-ventilation through every major room.",
    tags: ['Garden', 'Pool', 'White Render', 'Tropical'],
    featured: false,
    coverColor: '#d4d0c8',
    coverImage: '/images/projects/house-02/01.JPG',
    images: [
      '/images/projects/house-02/01.JPG',
      '/images/projects/house-02/02.JPG',
      '/images/projects/house-02/03.JPG',
    ],
  },
  {
    id: 'house-03',
    number: '003',
    title: 'Project III',
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
    coverImage: '/images/projects/house-03/01.JPG',
    images: [
      '/images/projects/house-03/01.JPG',
      '/images/projects/house-03/02.JPG',
      '/images/projects/house-03/03.JPG',
    ],
  },
  {
    id: 'house-04',
    number: '004',
    title: 'Project IV',
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
    coverImage: '/images/projects/house-04/01.JPG',
    images: [
      '/images/projects/house-04/01.JPG',
      '/images/projects/house-04/02.JPG',
    ],
  },
]

export const getFeaturedProject = (): Project =>
  projects.find((p) => p.featured) ?? projects[0]

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id)
