// components/DestinationCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { IDestination } from '../types/destination.types';

interface DestinationCardProps {
  destination: IDestination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <Image
            src={destination.image[0] || '/placeholder.jpg'}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${destination.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {destination.status}
            </span>
          </div>
          {/* Price Tag */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="font-bold text-blue-600">{destination.price} <span className="text-sm">bdt</span></span>
            <span className="text-xs text-gray-600 ml-1">per person</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title and Location */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{destination.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">{destination.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

          {/* Interests/Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.interests.slice(0, 3).map((interest, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {interest}
              </span>
            ))}
            {destination.interests.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{destination.interests.length - 3}
              </span>
            )}
          </div>

          {/* Best Time & Activities */}
          <div className="border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{destination.bestTimeToVisit}</span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">{destination.activities.length}</span> activities
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}