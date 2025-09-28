"use client"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { ChartConfig } from "@/components/ui/chart"

export const description = "A multiple bar chart for humidity, temperature, and moisture"

const chartData = [
  { time: "12:00 AM", humidity: 78, temperature: 22, moisture: 65 },
  { time: "1:00 AM", humidity: 80, temperature: 21, moisture: 66 },
  { time: "2:00 AM", humidity: 82, temperature: 20, moisture: 67 },
  { time: "3:00 AM", humidity: 83, temperature: 20, moisture: 68 },
  { time: "4:00 AM", humidity: 85, temperature: 19, moisture: 69 },
  { time: "5:00 AM", humidity: 86, temperature: 19, moisture: 70 },
  { time: "6:00 AM", humidity: 84, temperature: 20, moisture: 72 },
  { time: "7:00 AM", humidity: 82, temperature: 22, moisture: 73 },
  { time: "8:00 AM", humidity: 78, temperature: 24, moisture: 72 },
  { time: "9:00 AM", humidity: 74, temperature: 26, moisture: 70 },
  
]

export const chartConfig = {
  humidity: {
    label: "Humidity (%)",
    color: "var(--chart-1)",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "var(--chart-2)",
  },
  moisture: {
    label: "Soil Moisture (%)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function Barchart() {
  return (
    <Card className="h-full w-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>24-hour Humidity, Temperature & Moisture</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%" className={""}>
            <BarChart data={chartData} margin={{ left: 32, right: 32, top: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="humidity" fill="var(--chart-1)" radius={4} />
              <Bar dataKey="temperature" fill="var(--chart-2)" radius={4} />
              <Bar dataKey="moisture" fill="var(--chart-3)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      
    </Card>
  )
}
