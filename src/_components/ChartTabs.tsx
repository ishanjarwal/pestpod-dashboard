"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Linechart from "./Linechart";
import { Barchart } from "./Barchart";

export function ChartTabs({ data }: { data: any }) {
  return (
    <div className="w-full h-full p-4 rounded-lg relative">
      <Tabs defaultValue="line" className="w-full h-full flex flex-col">
        <div className="flex items-center justify-end ">
          <TabsList className="flex space-x-2 bg-transparent p-0 border-0">
            <TabsTrigger value="line" className="px-3 py-1 text-sm">
              Area Chart
            </TabsTrigger>
            <TabsTrigger value="bar" className="px-3 py-1 text-sm">
              Bar Chart
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="line" className="flex-1">
          <Linechart data={data} />
        </TabsContent>

        <TabsContent value="bar" className="flex-1">
          <Barchart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
