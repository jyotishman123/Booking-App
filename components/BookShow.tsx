"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Update the ShowData type based on your API response
type ShowData = {
  name: string;
  description: string;
  time: string;
  address: string;
  imageUrl: string;
  date: string;
  bookSeat:[
    {
      "id":number,
      "showId":number,
      "SeatNumber":number,
      "bookingId":number
    }
  ]
};

const BookShowContent = () => {
  const searchParams = useSearchParams();
  const showId = searchParams.get("show");

  const [showData, setShowData] = useState<ShowData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [requesting, setRequesting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // State for selected seats

  useEffect(() => {
    const fetchShowData = async () => {
      if (!showId) return;
      try {
        const response = await fetch(`/api/showbyid?id=${showId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch show data");
        }
        const data = await response.json();
        setShowData(data.show);
      } catch (error) {
        console.error("Error fetching show data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
  }, [showId]);

  console.log(showData?.bookSeat)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!showData) {
    return <div>No show data available</div>;
  }

  const handleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); // Remove seat if already selected
    } else {
      if (selectedSeats.length < 20) {
        setSelectedSeats([...selectedSeats, seatNumber]); // Add seat if not already selected
      } else {
        alert("You can only select up to 20 seats.");
      }
    }
  };

  const handleBook = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      setRequesting(true);
      const response = await fetch("/api/book", {
        method: "POST",
        body: JSON.stringify({ id: showId, seats: selectedSeats }),
      });

      if (response.status === 401) {
        alert("User is not logged in");
        setRequesting(false);
        return;
      }
      if (response.status !== 200) {
        alert("Failed to Book");
        setRequesting(false);
        return;
      }
      alert("Movie Booked Successfully");
      setRequesting(false);
      setModalOpen(false); // Close the modal after booking
      window.location.href="/dashboard"
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      setRequesting(false);
    } finally {
      setRequesting(false);
    }
  };

  const renderSeatGrid = () => {
    const seats = Array.from({ length: 20 }, (_, index) => index + 1); // Generate 20 seats
  
    return seats.map((seatNumber) => {
      // Check if the seat is already booked by looking in showData.BookSeat
      const isBooked = showData.bookSeat?.some((bookedSeat) => bookedSeat?.SeatNumber == seatNumber);
      console.log(isBooked)
  
      return (
        <button
          key={seatNumber}
          className={`p-4 m-2 ${
            selectedSeats.includes(seatNumber)
              ? "bg-blue-500"
              : isBooked
              ? "bg-red-500 cursor-not-allowed" // Disabled booked seats
              : "bg-gray-300"
          } rounded-md`}
          onClick={() => handleSeatSelection(seatNumber)}
          disabled={isBooked} // Disable the button if the seat is booked
        >
          Seat {seatNumber}
        </button>
      );
    });
  };
  

  return (
    <div className="container mx-auto p-6">
      {/* Show Image */}
      <div className="flex justify-center mb-6">
        <img
          src={showData.imageUrl}
          alt={showData.name}
          className="w-full max-w-2xl rounded-lg shadow-lg"
        />
      </div>

      {/* Show Info */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">{showData.name}</h1>
        <p className="text-lg text-gray-700 mb-4">{showData.description}</p>

        <div className="flex justify-center gap-8 mb-6">
          <div>
            <strong className="text-lg">Time:</strong>
            <p>{showData.time}</p>
          </div>
          <div>
            <strong className="text-lg">Date:</strong>
            <p>{showData.date}</p>
          </div>
          <div>
            <strong className="text-lg">Location:</strong>
            <p>{showData.address}</p>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center">
          <button
            className="bg-orange-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-orange-500 transition duration-300"
            disabled={requesting}
            onClick={() => setModalOpen(true)} // Open modal on click
          >
            {requesting ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>

      {/* Modal for Seat Selection */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl mb-4">Select Your Seats</h2>
            <div className="grid grid-cols-4 gap-2">{renderSeatGrid()}</div>
            <div className="mt-4 text-center">
              <button
                className="bg-orange-600 text-white py-2 px-6 rounded-md"
                onClick={handleBook}
                disabled={requesting}
              >
                {requesting ? "Booking..." : "Confirm Booking"}
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md ml-4"
                onClick={() => setModalOpen(false)} // Close modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookShow = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookShowContent />
    </Suspense>
  );
};

export default BookShow;
