'use client';

import { IDestination } from '@/src/types/destination.types';
import { Calendar, MapPin, Clock, Activity, Utensils, Hotel } from 'lucide-react';
import { useState } from 'react';

interface TripItineraryProps {
  duration: number;
  startDate: Date;
  endDate: Date;
  destination: IDestination;
}

// Sample itinerary data - in a real app, this would come from your database
const sampleItinerary = (duration: number,destination: IDestination) => {
  const itinerary = [];
  
  for (let day = 1; day <= duration; day++) {
    itinerary.push({
      day: day,
      title: day === 1 ? 'Arrival & Welcome' : 
             day === duration ? 'Departure & Farewell' :
             `Day ${day}: Adventure Day`,
      description: day === 1 ? 
        'Arrive at the destination, check into accommodation, welcome dinner, and trip briefing.' :
        day === duration ?
        'Final breakfast, farewell ceremony, and departure transfers.' :
        `Explore the ${destination.activities.join(', ')} with guided tours and activities.`,
      activities: day === 1 ? 
        ['Airport Transfer', 'Accommodation Check-in', 'Welcome Dinner'] :
        day === duration ?
        ['Breakfast', 'Check-out', 'Departure Transfer'] :
        ['Morning Activity', 'Lunch', 'Afternoon Exploration', 'Evening Social'],
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Local Hotel/Resort',
      highlights: day === 1 ? 
        ['Meet the group', 'Trip orientation'] :
        day === duration ?
        ['Group photos', 'Memory sharing'] :
        ['Main attractions', 'Cultural experiences']
    });
  }
  
  return itinerary;
};

export default function TripItinerary({ duration, startDate, endDate, destination }: TripItineraryProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const itinerary = sampleItinerary(duration,destination);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const formatDayDate = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Itinerary Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trip Itinerary</h3>
            <p className="text-gray-600">
              {duration} days of adventure in {destination.name}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-4">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-5 cursor-pointer text-left flex flex-col md:flex-row items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-600 whitespace-nowrap">Day {day.day}</span>
                  <span className="text-sm text-gray-500">{formatDayDate(day.day)}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{day.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{day.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  day.day === 1 || day.day === duration
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {day.day === 1 ? 'Arrival' : day.day === duration ? 'Departure' : 'Full Day'}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    expandedDay === day.day ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Day Details (Collapsible) */}
            {expandedDay === day.day && (
              <div className="px-5 pb-5 border-t pt-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Activities */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Activity className="w-5 h-5" />
                      <h5 className="font-semibold">Activities</h5>
                    </div>
                    <ul className="space-y-2">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meals */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Utensils className="w-5 h-5" />
                      <h5 className="font-semibold">Meals Included</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Hotel className="w-5 h-5" />
                      <h5 className="font-semibold">Accommodation</h5>
                    </div>
                    <p className="text-gray-600">{day.accommodation}</p>
                  </div>
                </div>

                {/* Highlights */}
                {day.highlights && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <MapPin className="w-5 h-5" />
                      <h5 className="font-semibold">Highlights</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Daily Note */}
                {day.day === 1 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
      <strong>Note:</strong> Please arrive at the destination airport by 2 PM to ensure smooth transfer to the accommodation. Welcome dinner starts at 7 PM.
    </p>
  </div>
)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
        <h4 className="font-bold text-amber-800 mb-3">Important Information</h4>
        <ul className="space-y-2 text-amber-700">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Itinerary is subject to change based on weather conditions and group preferences</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>All participants must have valid travel insurance</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Please inform the organizer of any dietary restrictions in advance</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Moderate level of fitness is required for some activities</span>
          </li>
        </ul>
      </div>
    </div>
  );
}