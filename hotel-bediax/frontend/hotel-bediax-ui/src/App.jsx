// layout general
import React, { useState } from "react";
import DestinationContainer from "./components/DestinationContainer";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("destinations");

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">HotelBediaX</h1>
          <nav className="flex gap-6 text-lg font-medium">
            <button
              onClick={() => setActivePage("destinations")}
              className={`hover:text-blue-600 ${
                activePage === "destinations"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => setActivePage("hotels")}
              className={`hover:text-blue-600 ${
                activePage === "hotels"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setActivePage("bookings")}
              className={`hover:text-blue-600 ${
                activePage === "bookings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActivePage("users")}
              className={`hover:text-blue-600 ${
                activePage === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`}
            >
              Users
            </button>
          </nav>
        </header>

        <div
          className="bg-white rounded shadow-lg p-4"
          style={{ height: "calc(100vh - 7rem)" }}
        >
          {activePage === "destinations" ? (
            <DestinationContainer />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Section under construction...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
