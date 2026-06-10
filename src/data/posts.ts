export interface Post {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  /** External URL (e.g. Medium) or an internal route. External links open in a new tab. */
  href: string;
}

// Currently one real post (published on Medium). Add more entries here, or graduate to an
// Astro content collection of local Markdown when you start writing posts on-site.
export const posts: Post[] = [
  {
    title: 'Introduction to CryptoCurrency and Mining',
    excerpt:
      'A cryptocurrency is a form of payment that can be exchanged online for goods and services. Cryptocurrency is a kind of digital currency that is intended to act as a medium of exchange.',
    date: '24 July 2021',
    image: 'https://miro.medium.com/max/875/0*j3ZlaQr1dHKFsEJv.jpeg',
    href: 'https://wcewlug.medium.com/introduction-to-cryptocurrency-and-mining-297febd94c76',
  },
];
