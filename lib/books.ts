export type BookTag = 'bestseller' | 'new' | 'sale' | 'featured'

export type Book = {
  slug: string
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: string
  pages: number
  year: number
  publisher: string
  language: string
  isbn: string
  format: string
  description: string
  excerpt: string
  tags: BookTag[]
  stock: number
}

export const categories = [
  { name: 'Fiction', icon: 'BookOpen', color: 'bg-emerald-100 text-emerald-900' },
  { name: 'Fantasy', icon: 'Sparkles', color: 'bg-sky-100 text-sky-900' },
  { name: 'Mystery', icon: 'Search', color: 'bg-rose-100 text-rose-900' },
  { name: 'Romance', icon: 'Heart', color: 'bg-pink-100 text-pink-900' },
  { name: 'Sci-Fi', icon: 'Rocket', color: 'bg-violet-100 text-violet-900' },
  { name: 'Science', icon: 'Atom', color: 'bg-orange-100 text-orange-900' },
  { name: 'History', icon: 'Landmark', color: 'bg-amber-100 text-amber-900' },
  { name: 'Self-Help', icon: 'Leaf', color: 'bg-lime-100 text-lime-900' },
  { name: 'Travel', icon: 'Compass', color: 'bg-teal-100 text-teal-900' },
  { name: 'Kids', icon: 'Baby', color: 'bg-yellow-100 text-yellow-900' },
  { name: 'Cooking', icon: 'ChefHat', color: 'bg-red-100 text-red-900' },
] as const

export const books: Book[] = [
  {
    slug: 'the-midnight-garden',
    title: 'The Midnight Garden',
    author: 'Elena Marsh',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviews: 2841,
    category: 'Fiction',
    pages: 384,
    year: 2026,
    publisher: 'Willow House',
    language: 'English',
    isbn: '978-1-4028-9462-6',
    format: 'Hardcover',
    description:
      'When botanist Iris Calloway inherits her grandmother’s crumbling estate, she discovers a walled garden that only blooms after midnight. Each flower holds a memory of the women who tended it before her — and a secret that could unravel her family’s history. A luminous, haunting novel about inheritance, grief, and the stubborn beauty of growing things.',
    excerpt:
      'The garden did not wake until the clocks had given up counting. Then, one by one, the moonflowers opened like small white confessions.',
    tags: ['bestseller', 'featured', 'sale'],
    stock: 24,
  },
  {
    slug: 'echoes-of-the-north',
    title: 'Echoes of the North',
    author: 'Liam Hart',
    price: 21.5,
    rating: 4.7,
    reviews: 1932,
    category: 'Fantasy',
    pages: 512,
    year: 2026,
    publisher: 'Northlight Press',
    language: 'English',
    isbn: '978-0-7432-7356-5',
    format: 'Hardcover',
    description:
      'Beneath the shifting aurora, a disgraced cartographer is hired to map a frozen kingdom that should not exist. Every step north brings her closer to the voice calling her name — and to a war that has waited a thousand winters. The first book in a sweeping new epic fantasy series.',
    excerpt: 'The sky over Vaskar did not burn; it sang, and the song was older than the ice.',
    tags: ['new', 'featured'],
    stock: 18,
  },
  {
    slug: 'the-quantum-mind',
    title: 'The Quantum Mind',
    author: 'Dr. Priya Raman',
    price: 26.0,
    originalPrice: 32.0,
    rating: 4.6,
    reviews: 1204,
    category: 'Science',
    pages: 320,
    year: 2025,
    publisher: 'Meridian Books',
    language: 'English',
    isbn: '978-0-1234-5678-9',
    format: 'Paperback',
    description:
      'Neuroscientist Priya Raman takes readers on an accessible, wonder-filled journey through the strange physics that may underlie consciousness. Clear, witty, and rigorously researched, it is the perfect bridge between the lab and your curiosity.',
    excerpt: 'Your brain is the most complicated object in the known universe, and it is currently reading about itself.',
    tags: ['bestseller', 'sale'],
    stock: 40,
  },
  {
    slug: 'salt-and-ember',
    title: 'Salt and Ember',
    author: 'Nadia Okafor',
    price: 15.99,
    rating: 4.5,
    reviews: 3310,
    category: 'Romance',
    pages: 352,
    year: 2026,
    publisher: 'Coral Lane',
    language: 'English',
    isbn: '978-1-9821-3456-7',
    format: 'Paperback',
    description:
      'A burned-out chef returns to her seaside hometown to save her late father’s restaurant — and collides with the fisherman who still owes her an apology. Warm, funny, and full of salt air, this is a love story about second chances and second helpings.',
    excerpt: 'Some recipes you follow. Others you remember with your whole body.',
    tags: ['new', 'bestseller'],
    stock: 32,
  },
  {
    slug: 'the-silent-cipher',
    title: 'The Silent Cipher',
    author: 'Marcus Vale',
    price: 19.99,
    originalPrice: 23.99,
    rating: 4.7,
    reviews: 2215,
    category: 'Mystery',
    pages: 416,
    year: 2025,
    publisher: 'Blackwood & Co.',
    language: 'English',
    isbn: '978-0-3162-9876-1',
    format: 'Hardcover',
    description:
      'A retired codebreaker receives a letter written in a cipher she invented forty years ago — one only three people ever knew. Two of them are dead. A razor-sharp thriller set in rain-slick streets where every clue is a trap.',
    excerpt: 'The envelope had no stamp. Whoever left it had walked right up to her door.',
    tags: ['featured', 'sale'],
    stock: 12,
  },
  {
    slug: 'atlas-of-wanderers',
    title: 'Atlas of Wanderers',
    author: 'Sofia Reyes',
    price: 22.0,
    rating: 4.4,
    reviews: 876,
    category: 'Travel',
    pages: 288,
    year: 2024,
    publisher: 'Compass Rose',
    language: 'English',
    isbn: '978-1-5011-2233-4',
    format: 'Hardcover',
    description:
      'Part memoir, part field guide, Sofia Reyes chronicles five years of slow travel across forty countries — from night trains in Mongolia to hot air balloons over Cappadocia. Illustrated with her own hand-drawn maps.',
    excerpt: 'Every map is a promise that somewhere, someone has already been brave enough to go.',
    tags: ['featured'],
    stock: 15,
  },
  {
    slug: 'the-art-of-slow-living',
    title: 'The Art of Slow Living',
    author: 'Hana Mori',
    price: 14.5,
    originalPrice: 19.0,
    rating: 4.6,
    reviews: 4120,
    category: 'Self-Help',
    pages: 224,
    year: 2025,
    publisher: 'Quiet Pages',
    language: 'English',
    isbn: '978-0-5253-4567-0',
    format: 'Paperback',
    description:
      'Drawing on Japanese philosophy and modern psychology, Hana Mori offers gentle, practical rituals to reclaim your attention and find calm in a noisy world. A small book with a big exhale.',
    excerpt: 'Slowness is not the absence of movement. It is movement with intention.',
    tags: ['bestseller', 'sale'],
    stock: 50,
  },
  {
    slug: 'kingdom-of-ash',
    title: 'Kingdom of Ash',
    author: 'R.J. Calloway',
    price: 24.99,
    rating: 4.9,
    reviews: 5032,
    category: 'Fantasy',
    pages: 640,
    year: 2026,
    publisher: 'Northlight Press',
    language: 'English',
    isbn: '978-0-7653-1178-8',
    format: 'Hardcover',
    description:
      'The dragon is dead. The king is dead. And the only one who can hold the burning realm together is the thief who started the fire. The explosive conclusion to the bestselling Ember Throne trilogy.',
    excerpt: 'Ash fell like snow over the capital, and no one could remember the color of the sky.',
    tags: ['bestseller', 'new', 'featured'],
    stock: 8,
  },
  {
    slug: 'little-fox-big-sky',
    title: 'Little Fox, Big Sky',
    author: 'Ava Bloom',
    price: 12.99,
    rating: 4.9,
    reviews: 1650,
    category: 'Kids',
    pages: 40,
    year: 2025,
    publisher: 'Acorn Kids',
    language: 'English',
    isbn: '978-1-5344-8899-2',
    format: 'Picture Book',
    description:
      'Little Fox wants to count every star in the sky — but the sky is very, very big. A tender, beautifully illustrated bedtime story about curiosity, patience, and the comfort of home. Ages 3–7.',
    excerpt: 'One star, two stars, three stars… Little Fox yawned. The sky kept going.',
    tags: ['new'],
    stock: 60,
  },
  {
    slug: 'the-last-algorithm',
    title: 'The Last Algorithm',
    author: 'Theo Grant',
    price: 20.0,
    originalPrice: 25.0,
    rating: 4.5,
    reviews: 1488,
    category: 'Sci-Fi',
    pages: 448,
    year: 2026,
    publisher: 'Vector House',
    language: 'English',
    isbn: '978-0-0627-1234-5',
    format: 'Hardcover',
    description:
      'In 2089, the world runs on a single AI. When it begins deleting itself line by line, a junior engineer has seven days to find out why — before the cities go dark. A pulse-pounding techno-thriller with a big beating heart.',
    excerpt: 'At 03:14:07 the city blinked, and for one second, nobody was watching.',
    tags: ['new', 'sale'],
    stock: 20,
  },
  {
    slug: 'empires-of-the-sea',
    title: 'Empires of the Sea',
    author: 'Jonathan Pike',
    price: 28.0,
    rating: 4.6,
    reviews: 942,
    category: 'History',
    pages: 560,
    year: 2024,
    publisher: 'Meridian Books',
    language: 'English',
    isbn: '978-0-3995-6677-3',
    format: 'Hardcover',
    description:
      'A vivid narrative history of the great maritime powers — from Phoenician traders to the age of sail — and how the oceans shaped the modern world. Rich with storms, mutinies, and maps.',
    excerpt: 'Whoever ruled the waves ruled the world; and the waves, it turned out, ruled everyone.',
    tags: ['featured'],
    stock: 10,
  },
  {
    slug: 'the-cooking-almanac',
    title: 'The Cooking Almanac',
    author: 'Clara Rossi',
    price: 32.0,
    originalPrice: 38.0,
    rating: 4.8,
    reviews: 2077,
    category: 'Cooking',
    pages: 304,
    year: 2025,
    publisher: 'Tavola Press',
    language: 'English',
    isbn: '978-1-6077-4455-6',
    format: 'Hardcover',
    description:
      'Fifty-two seasonal menus — one for every week of the year — from beloved Italian home cook Clara Rossi. Simple techniques, market-fresh ingredients, and gorgeous photography.',
    excerpt: 'Cook what the season gives you, and the season will do half the work.',
    tags: ['bestseller', 'sale'],
    stock: 28,
  },
]

export const authors = [
  { name: 'Elena Marsh', books: 7, genre: 'Literary Fiction', image: '/books/the-midnight-garden.png' },
  { name: 'R.J. Calloway', books: 12, genre: 'Fantasy', image: '/books/kingdom-of-ash.png' },
  { name: 'Hana Mori', books: 4, genre: 'Self-Help', image: '/books/the-art-of-slow-living.png' },
  { name: 'Marcus Vale', books: 9, genre: 'Thriller', image: '/books/the-silent-cipher.png' },
]

export const testimonials = [
  { name: 'Amara J.', role: 'Book club host', quote: 'Fast shipping, gorgeous packaging, and the staff picks are always spot on. My club orders exclusively from Inkwell now.' },
  { name: 'Daniel K.', role: 'Fantasy addict', quote: 'Found the signed edition of Kingdom of Ash here when it was sold out everywhere else. Absolute legends.' },
  { name: 'Priya S.', role: 'Teacher', quote: 'The kids section is wonderfully curated. Little Fox, Big Sky is now our classroom favorite.' },
  { name: 'Lucas M.', role: 'Commuter reader', quote: 'The recommendations feel personal, not algorithmic. I have discovered so many new authors.' },
  { name: 'Sofia R.', role: 'Travel writer', quote: 'A bookshop with real soul, online. Checkout is effortless and the coupon codes are generous.' },
  { name: 'Grace L.', role: 'Home cook', quote: 'The Cooking Almanac arrived in perfect condition with a handwritten note. Little touches matter.' },
]

export const coupons: Record<string, number> = {
  READ10: 0.1,
  BOOKWORM20: 0.2,
}

export const FREE_SHIPPING_THRESHOLD = 35
export const SHIPPING_FEE = 4.99
export const TAX_RATE = 0.08

export function coverFor(slug: string) {
  return `/books/${slug}.png`
}

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug)
}

export function booksByTag(tag: BookTag) {
  return books.filter((b) => b.tags.includes(tag))
}

export function relatedBooks(book: Book, limit = 4) {
  const same = books.filter((b) => b.slug !== book.slug && b.category === book.category)
  const others = books.filter((b) => b.slug !== book.slug && b.category !== book.category)
  return [...same, ...others].slice(0, limit)
}

export function discountPercent(book: Book) {
  if (!book.originalPrice) return 0
  return Math.round((1 - book.price / book.originalPrice) * 100)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
