"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

interface Booking {
  id: number;
  userId: number;
  showId: number;
  createdAt: string;
  user: {
    id: number;
    email: string;
    name: string;
    profileImage: string;
  };
  show: {
    id: number;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    time: string;
    date: string;
    price:string
  };
  bookedSeat: {
    id: number;
    showId: number;
    SeatNumber: number;
    bookingId: number;
  }[];
}

const BookedShow: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/adminbookedshow");
        const data = await response.json();
        if (data.status === "success") {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Booked Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={booking.show.imageUrl}
              alt={booking.show.name}
              className="rounded-t-md w-full object-cover"
              width={400}
              height={200}
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{booking.show.name}</h2>
              <p className="text-gray-600">{booking.show.description}</p>
              <p className="text-gray-600">📍 {booking.show.address}</p>
              <p className="text-gray-600">
                🗓️ {booking.show.date} | 🕒 {booking.show.time}
              </p>
              <p className="text-gray-600">💵 {booking.show.price}</p>
              <div className="mt-4">
                <h3 className="font-medium">Booked Seats:</h3>
                <p>
                  {booking.bookedSeat
                    .map((seat) => `#${seat.SeatNumber}`)
                    .join(", ")}
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <Avatar
                  alt={booking.user.name}
                  src={booking.user.profileImage}
                  sx={{ width: 50, height: 50 }}
                />
                <div className="ml-3">
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-gray-600 text-sm">{booking.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedShow;
