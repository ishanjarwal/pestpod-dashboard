import { Piechart } from "./PieChart";

const Deatils = () => {
  return (
    <div className="w-full h-full rounded-lg grid grid-cols-1 md:grid-cols-3 md:grid-rows-5 gap-x-7 p-3 gap-y-8">
      {/* Image */}
      <div className="img col-span-1 md:col-span-2 md:row-span-3 border bg-card rounded-lg relative">
        <img
          className="size-full rounded-lg object-cover"
          src="https://img.freepik.com/free-photo/growth-grass-nature-environment-leaf_1232-4105.jpg?semt=ais_hybrid&w=740&q=80"
          alt=""
        />
      </div>

      {/* Small details */}
      <div className="details bg-card border col-span-1 rounded-xl md:row-span-3 flex items-cente justify-center">
        <Piechart></Piechart>
      </div>

      {/* Info */}
      <div className="info gap-x-20 col-span-1 md:col-span-3 md:row-span-2 rounded-xl flex flex-col md:flex-row justify-around relative gap-4">
        {/* Left */}
        <div className="left w-full md:w-1/2 bg-card border rounded-xl px-3 py-1">
          <h1 className="w-full flex justify-center pt-1 font-semibold text-lg">
            Information
          </h1>
          <ul className="mt-3">
            <li className="flex items-center gap-x-2">
              Status : <span className="size-2 bg-green-400 rounded-full"></span>{" "}
              Completed
            </li>
            <li className="">Timestamp : 2025-09-26 12:00 PM</li>
            <li className="">Spray Time : 20 minutes</li>
          </ul>
        </div>

        {/* Right */}
        <div className="right w-full md:w-1/2 rounded-xl flex flex-col bg-card border">
          <h1 className="w-full flex justify-center pt-1 font-semibold text-lg">
            Details
          </h1>
          <div className="details px-5 mt-2 list-none">
            <ul>
              <li className="flex items-center gap-x-2">
                <span className="bg-[var(--chart-1)] size-2 rounded-full"></span>{" "}
                Humidity : 20 %
              </li>
              <li className="flex items-center gap-x-2">
                <span className="bg-[var(--chart-2)] size-2 rounded-full"></span>{" "}
                Temperature : 20&deg;C
              </li>
              <li className="flex items-center gap-x-2">
                <span className="bg-[var(--chart-3)] size-2 rounded-full"></span>{" "}
                Moisture : 20 %
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deatils;
