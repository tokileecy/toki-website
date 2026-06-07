import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.tokileecy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: '2023-04-01T07:59:39+00:00',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: '2023-04-01T07:59:39+00:00',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work/`,
      lastModified: '2023-04-01T07:59:39+00:00',
      priority: 0.8,
    },
  ]
}
