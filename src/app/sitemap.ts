import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with actual domain
  const baseUrl = 'https://kilincturizm.com';

  // Fetch all tour slugs
  const tours = await prisma.tour.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Create dynamic URLs for each tour
  const tourUrls: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${baseUrl}/program/${tour.slug}`,
    lastModified: tour.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Create static URLs
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...tourUrls];
}
