import { ChartTabs } from "@/_components/ChartTabs";
import Deatils from "@/_components/Deatils";
import HexagonalMap from "@/_components/HexagonalMap";
import Table from "@/_components/Table";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/entry"); // replace with your API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return data && !loading ? (
    <>
      <ToastContainer />
      <div className="parent h-screen w-full relative grid grid-cols-2 grid-rows-2">
        <div className="one col-span-1 row-span-1 bg-background relative">
          <HexagonalMap></HexagonalMap>
        </div>
        <div className="one col-span-1 row-span-1 bg-background relative">
          <ChartTabs data={data}></ChartTabs>
        </div>
        <div className="one col-span-1 row-span-1 bg-background relative">
          <Table data={data} setActive={setActive}></Table>
        </div>
        <div className="one col-span-1 row-span-1 bg-background relative">
          <Deatils curr={active}></Deatils>
        </div>
      </div>
    </>
  ) : (
    <div className="h-screen w-full bg-background text-5xl flex items-center justify-center text-center">
      Loading . . .
    </div>
  );
};

export default Dashboard;
