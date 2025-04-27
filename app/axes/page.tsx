"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Guitar {
  _id: string; // Use _id consistently
  image: string;
  model: string;
}

const AxesPage: React.FC = () => {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const response = await fetch("/api/guitars");
        if (!response.ok) {
          throw new Error("Failed to fetch guitars");
        }
        const data: Guitar[] = await response.json();
        setGuitars(data);
      } catch (err) {
        console.error("Error fetching guitars:", err);
        setError("Failed to load guitars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuitars();
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-blue-700 w-full py-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading guitars...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] bg-blue-700 w-full py-8 flex items-center justify-center">
        <p className="text-red-200 text-xl">{error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] bg-blue-700 w-full py-8 overflow-hidden">
      <div className="w-[90vw] max-w-[1170px] mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3 lg:grid-cols-3">
          {guitars.map((guitar) => {
            const { _id, image, model } = guitar;
            return (
              <div
                key={_id}
                className="group relative w-full hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="relative pb-[100%] overflow-hidden rounded-lg shadow-lg shadow-gray-950">
                  <Image
                    src={image}
                    alt={model}
                    fill
                    className="object-cover brightness-100 group-hover:brightness-75 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Link href={`/axes/${_id}`}>
                      <h2 className="text-blue-100 text-xl md:text-2xl">
                        Info
                      </h2>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AxesPage;
