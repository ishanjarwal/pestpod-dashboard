import { ChartTabs } from "@/_components/ChartTabs"
import Deatils from "@/_components/Deatils";
import HexagonalMap from "@/_components/HexagonalMap";
import Table from '@/_components/Table';

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-black flex flex-wrap w-full">  
      <div className="one bg-background w-1/2 h-[70vh] relative">
           <HexagonalMap></HexagonalMap>
      </div>
      <div className="two  w-1/2 h-[70vh] relative pb-5">
      <ChartTabs></ChartTabs>
      </div>
      <div className="three  w-1/2 h-[70vh] relative p-5">
        <Table></Table>
      </div>
      <div className="four bg-background w-1/2 h-[70vh] relative p-3">
         <Deatils></Deatils>
      </div>
    </div>
  )
}

export default Dashboard