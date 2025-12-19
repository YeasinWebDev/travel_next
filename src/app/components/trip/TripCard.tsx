import Image from 'next/image';
import Link from 'next/link';
import { format, isAfter, isBefore, differenceInDays } from 'date-fns';
import { ITrip } from '../../types/trips.types';

interface TripCardProps {
  trip: ITrip
}

export default function TripCard({ trip }: TripCardProps) {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const now = new Date();
  
  const tripDuration = differenceInDays(endDate, startDate) + 1;
  const isUpcoming = isAfter(startDate, now);
  const isOngoing = isBefore(startDate, now) && isAfter(endDate, now);
  const isCompleted = isBefore(endDate, now);
  
  const availableSpots = trip.capacity - (trip.participants?.reduce((sum, p) => sum + p.numberOfGuests, 0) || 0);
  const isFull = availableSpots <= 0;
  
  // Calculate status
  const getTripStatus = () => {
    if (isCompleted) return { label: 'Completed', color: 'bg-gray-100 text-gray-800' };
    if (isOngoing) return { label: 'Ongoing', color: 'bg-blue-100 text-blue-800' };
    if (isUpcoming) {
      if (isFull) return { label: 'Full', color: 'bg-red-100 text-red-800' };
      return { label: 'Upcoming', color: 'bg-green-100 text-green-800' };
    }
    return { label: 'Ended', color: 'bg-gray-100 text-gray-800' };
  };
  
  const status = getTripStatus();

  return (
    <Link href={`/trips/${trip._id}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={trip.image || trip.destination?.image?.[0] || '/placeholder-trip.jpg'}
            alt={trip.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            {tripDuration} {tripDuration === 1 ? 'day' : 'days'}
          </div>
          
          {/* Spots Available */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-gray-800">
                    {trip.participants?.reduce((sum, p) => sum + p.numberOfGuests, 0) || 0}/{trip.capacity}
                  </span>
                  <span className="text-xs text-gray-600">spots</span>
                </div>
                {!isFull && (
                  <span className="text-xs text-green-600 font-medium">
                    {availableSpots} available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title and Dates */}
          <div className="mb-4">
            <h1 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{trip.title}</h1>
            
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">
                {format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')}
              </span>
            </div>
          </div>

          {/* Destination Info */}
          {trip.destination && (
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="line-clamp-1">
                {trip.destination.name}, {trip.destination.location}
              </span>
            </div>
          )}

          {/* Creator Info */}
          {trip.creator && (
            <div className="flex items-center justify-between border-t pt-4">
              {/* <div className="flex items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  {trip.creatorDetails.avatar ? (
                    <Image
                      src={trip.creatorDetails.avatar}
                      alt={trip.creatorDetails.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-bold">
                      {trip.creatorDetails.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">By {trip.creatorDetails.name}</span>
              </div> */}
              
              {/* Price if available */}
              {trip?.destination?.price && (
                <div>
                  <h2 className="text-lg font-bold text-blue-600 ">
                    {trip.destination.price} <span className="text-sm">bdt</span>
                  </h2>
                  <div className="text-xs text-gray-500">per person</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}