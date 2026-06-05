export interface Manager {
  slug: string
  name: string
  phone: string // formato: 5551999999999 (sem + e sem traço)
  photo: string
}

export const managers: Manager[] = [
  { slug: 'jardim',  name: 'Jardim',  phone: '5551999630731', photo: '/GESTORES/jardim.webp' },
  { slug: 'raffael', name: 'Raffael', phone: '5551993777440', photo: '/GESTORES/raffael.webp' },
  { slug: 'renato',  name: 'Renato',  phone: '5551997196469', photo: '/GESTORES/renato.webp' },
  { slug: 'charles', name: 'Charles', phone: '5551992427285', photo: '/GESTORES/charles.webp' },
  { slug: 'nishi',   name: 'Nishi',   phone: '5551991214230', photo: '/GESTORES/nishi.webp' },
]

export function getManager(slug: string): Manager | undefined {
  return managers.find(m => m.slug === slug)
}
