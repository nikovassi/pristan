import { paths, sections } from '../lib/paths'

export const navItems = [
  { label: 'За мен', to: { pathname: paths.home, hash: sections.about } },
  { label: 'Теми', to: { pathname: paths.home, hash: sections.help } },
  { label: 'Консултации', to: { pathname: paths.home, hash: sections.services } },
  { label: 'Как протича', to: { pathname: paths.home, hash: sections.process } },
  { label: 'Полезно', to: { pathname: paths.articles } },
  { label: 'Контакти', to: { pathname: paths.home, hash: sections.contact } },
]
