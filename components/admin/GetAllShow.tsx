"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Movie = {
  id: number;
  name: string;
  description: string;
  time: string;
  address: string;
  imageUrl: string;
  date: string;
  price:string
};

const GetAllShow = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [requesting, setRequesting] = useState({ id: 0, status: false });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/getshow");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.movies);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after the API call
      }
    };

    fetchMovies();
  }, []);

  async function handleDelete(id: any) {
    try {
      setRequesting({ id: id, status: true });
      const response = await fetch(`/api/deleteshow?id=${id}`, {
        method: "DELETE",
      });
      if (response.status !== 200) {
        alert("Failed to delete the show");
        setRequesting({ id: 0, status: false });
        return
      }
      alert("Show delete successfully");
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.log(error);
      alert("Something went wrong while deleteing");
      setRequesting({ id: 0, status: false });
      return
    } finally {
      setRequesting({ id: 0, status: false });
    }
  }

  if (loading) {
    return (
      <div className="min-h-50vh flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-500 text-lg font-semibold">
            Loading Shows...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Available Shows
      </h1>

      {error && (
        <p className="text-center text-red-500 text-lg">
          Failed to load shows: {error}
        </p>
      )}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
            >
              <Image
                src={movie.imageUrl}
                alt={movie.name}
                className="h-48 w-full object-cover"
                height={192} // Matches 48 Tailwind h-48
                width={384} // Calculate width proportionally or based on your layout
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {movie.name}
                </h2>
                <p className="text-sm text-gray-700">{movie.description}</p>
                <p className="text-sm text-gray-700 mt-2">Time: {movie.time}</p>
                <p className="text-sm text-gray-700 mt-2">Date: {movie.date}</p>
                <p className="text-sm text-gray-700 mt-2">Rs: {movie.price}</p>
                <p className="text-sm text-gray-700">
                  Address: {movie.address}
                </p>
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md font-semibold"
                  disabled={requesting?.status}
                  onClick={() => {
                    handleDelete(movie?.id);
                  }}
                >
                  {requesting?.id === movie?.id && requesting.status
                    ? "Deleting"
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllShow;
