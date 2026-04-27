import { PrismaClient } from '@prisma/client';
import { tours } from '../src/data/tours';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with mock tours...');

  for (const tour of tours) {
    const createdTour = await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: {}, // Don't override if it already exists during seed, or we could map all fields here
      create: {
        slug: tour.slug,
        title: tour.title,
        category: tour.category,
        badge: tour.badge,
        duration: tour.duration,
        date: tour.date,
        price: tour.price,
        currency: tour.currency,
        seats: tour.seats,
        rating: tour.rating,
        image: tour.image,
        description: tour.description,
        
        // Prisma Json types accept standard JS arrays/objects seamlessly
        included: tour.included || [],
        excluded: tour.excluded || [],
        importantNotes: tour.importantNotes || [],
        highlights: tour.highlights || [],
        itinerary: tour.itinerary || [],
        hotels: tour.hotels || [],
      },
    });
    console.log(`Upserted tour: ${createdTour.title}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
