// layout general
import React from "react";
import DestinationsList from "./components/DestinationsList";
import "./App.css";

export default function App() {
  //   return (
  //     <>
  //       <h1>HotelBediaX</h1>
  //       <h2>Destinations</h2>
  //       <div className="card">
  //         <DestinationsList />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4">Data Selector</h2>
          <select className="w-full border p-2 rounded mb-2">
            <option value="">All</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Create Destiny
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Modify Destiny
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Remove Destiny
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow-lg overflow-auto">
          <DestinationsList />
        </div>
      </main>
    </div>
  );
}
