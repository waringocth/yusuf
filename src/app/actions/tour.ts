'use server';

import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

import { tours as mockTours } from '../../data/tours';

export async function getTours() {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Fallback to mock data if DB is empty (not seeded yet)
    if (tours.length === 0) return mockTours;
    return tours;
  } catch (error) {
    console.error('Error fetching tours from DB, falling back to mock data:', error);
    return mockTours;
  }
}

export async function getTourById(id: number) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { id }
    });
    if (!tour) return mockTours.find(t => t.id === id) || null;
    return tour;
  } catch (error) {
    console.error(`Error fetching tour ${id} from DB, falling back to mock data:`, error);
    return mockTours.find(t => t.id === id) || null;
  }
}

export async function getTourBySlug(slug: string) {
  try {
    const tour = await prisma.tour.findUnique({
      where: { slug }
    });
    if (!tour) return mockTours.find(t => t.slug === slug) || null;
    return tour;
  } catch (error) {
    console.error(`Error fetching tour by slug ${slug} from DB, falling back to mock data:`, error);
    return mockTours.find(t => t.slug === slug) || null;
  }
}

export async function updateTour(id: number, data: any) {
  try {
    // Remove id from data to avoid updating the primary key
    const { id: _, createdAt, updatedAt, ...updateData } = data;
    
    const tour = await prisma.tour.update({
      where: { id },
      data: updateData,
    });
    
    // Revalidate paths to ensure the frontend gets the latest data
    revalidatePath('/');
    revalidatePath('/admin/programs');
    revalidatePath(`/admin/programs/${id}`);
    revalidatePath(`/program/${tour.slug}`);
    
    return { success: true, tour };
  } catch (error) {
    console.error(`Error updating tour ${id}:`, error);
    return { success: false, error: 'Veritabanı güncellenirken bir hata oluştu.' };
  }
}

export async function deleteTour(id: number) {
  try {
    await prisma.tour.delete({
      where: { id }
    });
    revalidatePath('/');
    revalidatePath('/admin/programs');
    return { success: true };
  } catch (error) {
    console.error(`Error deleting tour ${id}:`, error);
    return { success: false, error: 'Tur silinirken bir hata oluştu.' };
  }
}
