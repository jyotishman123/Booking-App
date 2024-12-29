"use client";

import { useState, useEffect, useContext } from "react";
import { SessionProviderContex } from "@/provider/SessionProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

interface User {
  userlogin: boolean;
  data: {
    userlogin: boolean;
    data: {
      profileImage: string;
      id: number;
      email: string;
      name: string;
    };
  };
}

interface Booking {
  id: number;
  userId: number;
  showId: number;
  createdAt: string;
  bookedSeat: {
    id: number;
    showId: number;
    SeatNumber: number;
    bookingId: number;
  }[];
  show: {
    id: number;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    time: string;
    date: string;
  };
}

const UserDetails = () => {
  const user = useContext(SessionProviderContex) as User;
  const userdata = user?.data?.data;
  const userlogin = user?.userlogin;

  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await fetch("/api/userbooking");
        const data = await response.json();
        setUserBookings(data.userBooking);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="py-4 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome Back {userdata?.name}
        </h1>
        <Avatar
          alt={userdata?.name}
          src={userdata?.profileImage}
          sx={{ width: 50, height: 50 }}
        />
      </div>

      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Your Bookings
        </h2>

        {loading ? (
          <div className="flex justify-center items-center my-6">
            <CircularProgress />
          </div>
        ) : userBookings.length === 0 ? (
          <p className="text-gray-600 text-center">
            You have no bookings at the moment.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
              >
                <Image
                  src={booking.show.imageUrl}
                  alt={booking.show.name}
                  className="rounded-md w-full h-48 object-cover mb-4"
                  height={300} // High-resolution height
                  width={400} // High-resolution width
                  priority // Ensures high-resolution images load quickly
                />

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {booking.show.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Address:</strong> {booking.show.address}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Date:</strong> {booking.show.date}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Time:</strong> {booking.show.time}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Description:</strong> {booking.show.description}
                </p>
                <div className="text-gray-600 text-sm">
                  <strong>Seats:</strong>{" "}
                  {booking.bookedSeat.map((seat) => seat.SeatNumber).join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
