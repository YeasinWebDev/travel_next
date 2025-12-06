import DestinationDetailPage from '@/src/components/destination/DestinationDetailPage';
import { getDestinationById } from '@/src/services/destination/destination';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const destination  = await getDestinationById(id);
  
  if (!destination) {
    return {
      title: 'Destination Not Found',
    };
  }

  return {
    title: `${destination.data.name}`,
    description: destination.data.description.substring(0, 160),
    openGraph: {
      title: destination.data.title,
      description: destination?.data?.description.substring(0, 160) || '',
      images: destination?.data?.image[0],
      type: 'website',
    },
  };
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = await getDestinationById(id);
   if (!destination.data) {
      notFound();
    }
  return (
    <DestinationDetailPage destination={destination.data} />
  )
}

export default page