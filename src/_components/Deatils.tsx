"use client"

import { Piechart } from "./PieChart"

const Details = () => {
  return (
    <div className="w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-3 md:grid-rows-5 gap-4 p-5">
      {/* Image */}
      <div className="img col-span-1 md:col-span-2 md:row-span-3 border bg-card rounded-lg relative overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://img.freepik.com/free-photo/growth-grass-nature-environment-leaf_1232-4105.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Environmental"
        />
      </div>

      {/* Small details / Piechart */}
      <div className="details bg-card border col-span-1 rounded-xl md:row-span-3 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <Piechart />
        </div>
      </div>

      {/* Info Section */}
      <div className="info col-span-1 md:col-span-3 md:row-span-2 rounded-xl flex flex-col md:flex-row justify-around gap-4">
        {/* Left Box */}
        <div className="left bg-card border rounded-xl p-3 flex-1">
          <h1 className="text-center font-semibold text-lg">Information</h1>
          <ul className="text-sm space-y-1 break-words">
            <li className="flex items-center gap-2">
              Status: <span className="h-2 w-2 bg-green-400 rounded-full"></span> Completed
            </li>
            <li>Timestamp: 2025-09-26 12:00 PM</li>
            <li>Spray Time: 20 minutes</li>
          </ul>
        </div>

        {/* Right Box */}
        <div className="right bg-card border rounded-xl p-3 flex-1">
          <h1 className="text-center font-semibold text-lg">Details</h1>
          <ul className="text-sm space-y-1 break-words">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--chart-1)] rounded-full"></span> Humidity: 20 %
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--chart-2)] rounded-full"></span> Temperature: 20&deg;C
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--chart-3)] rounded-full"></span> Moisture: 20 %
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Details
