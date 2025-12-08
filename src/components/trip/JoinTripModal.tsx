"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { ITrip } from "@/src/types/trips.types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { createBooking } from "@/src/services/booking/booking";
import toast from "react-hot-toast";


function JoinTripModal({ trip, visible, onClose,remainingSpots }: { trip: ITrip; visible: boolean; onClose: () => void,remainingSpots: number }) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [amount, _] = useState(trip.destination.price);
  const [loading, setLoading] = useState(false)

  const handleJoinTrip = async() => {
    if(numberOfGuests > remainingSpots) {
      return toast.error(`Available Spots: ${remainingSpots}`);
    }

    setLoading(true);
    const payload = {
      trip: trip._id!,
      numberOfGuests : Number(numberOfGuests || 1),
      amount,
    };

    const res = await createBooking(payload);
    if(res.data.paymentUrl){
      toast.success(res.message)
      setLoading(false);

      setTimeout(() => {
        window.location.href = res.data.paymentUrl;
      }, 800)
    }
    
  };
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          <h1 className="text-3xl font-bold">Join Trip</h1>
        </DialogHeader>

        <Label>Trip</Label>
        <Input type="text" value={trip.title} disabled/>

        <Label>Number of Guest</Label>
        <Input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} placeholder="Number of Guest" />
        <span className="text-sm text-muted-foreground">Available Spots: {remainingSpots}</span>

        <Label>Amount</Label>
        <Input type="number" value={amount * numberOfGuests} disabled />

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={onClose}>Cancel</Button>
          <Button disabled={loading} onClick={handleJoinTrip}>{loading ? "Joining..." : "Join Trip"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JoinTripModal;
