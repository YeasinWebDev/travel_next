import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTripById } from '@/src/services/trips/trips';
import { getUser } from '@/src/services/auth/getme';
import TripDetailsClient from '@/src/components/trip/TripDetailsClient';
import { IPrecipitants } from '@/src/types/trips.types';

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const trip = await getTripById(id);
  
  if (!trip) {
    return {
      title: 'Trip Not Found',
    };
  }

  return {
    title: `${trip.data.title} - Adventure Trip`,
    description: trip.data.destination.description.substring(0, 160),
    openGraph: {
      title: trip.data.title,
      description: trip?.data?.destination?.description.substring(0, 160) || '',
      images: trip.image,
      type: 'website',
    },
  };
}

// Server Component
export default async function TripDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const trip = await getTripById(id);
  const currentUser = await getUser();

  if (!trip) {
    notFound();
  }

  // Check if current user is a participant
  const isUserParticipant = currentUser 
    ? trip.participants?.some((p:IPrecipitants) => p.user._id === currentUser._id)
    : false;


  return (
    <TripDetailsClient
      trip={JSON.parse(JSON.stringify(trip?.data || []))} 
      currentUser={currentUser ? JSON.parse(JSON.stringify(currentUser)) : null}
      isUserParticipant={isUserParticipant}
    />
  );
}