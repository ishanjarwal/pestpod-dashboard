import { ChartTabs } from "@/_components/ChartTabs";
import Deatils from "@/_components/Deatils";
import HexagonalMap from "@/_components/HexagonalMap";
import Table from "@/_components/Table";

const Dashboard = () => {
  return (
    <div className="parent h-screen w-full relative grid grid-cols-2 grid-rows-2">
      <div className="one col-span-1 row-span-1 bg-stone-800 relative"><HexagonalMap></HexagonalMap></div>
      <div className="one col-span-1 row-span-1 bg-background relative"><ChartTabs></ChartTabs></div>
      <div className="one col-span-1 row-span-1 bg-background relative"><Table></Table></div>
      <div className="one col-span-1 row-span-1 bg-background relative"><Deatils></Deatils></div>
    </div>
  );
};

export default Dashboard;
