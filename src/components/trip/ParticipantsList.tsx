"use client";

import { IPrecipitants, IUser } from "@/src/types/trips.types";
import { CheckCircle, User } from "lucide-react";

interface ParticipantsListProps {
  participants: IPrecipitants[];
  creator: IUser;
  currentUser: IUser | null;
}

export default function ParticipantsList({ participants, creator, currentUser }: ParticipantsListProps) {
  return (
    <div className="space-y-4">
      {/* Creator Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={creator.profileImage} alt={creator.name} className="w-14 h-14 rounded-full border-2 object-cover border-blue-200" />
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{creator.name}</h4>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Organizer</span>
              </div>
              <p className="text-sm text-gray-600">Trip Creator</p>
            </div>
          </div>
          {creator.role === "admin" && <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Verified</span>}
        </div>
      </div>

      {/* Participants List */}
      <div>
        <h4 className="font-semibold mb-3">Participants ({participants.length})</h4>
        <div className="space-y-3">
          {participants.map((participant) => (
            <div key={participant.paymentId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className="bg-gray-200 p-2 rounded-full">
                  <User />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{participant.user.name}</h4>
                    {currentUser?._id === participant.user._id && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">You</span>}
                  </div>
                  <p className="text-sm text-gray-600">
                    {participant.numberOfGuests} guest{participant.numberOfGuests > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Joined {new Date(participant.joinedAt).toLocaleDateString()}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Paid</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
