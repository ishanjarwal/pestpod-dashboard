"use client"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

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

export const description = "Hourly Humidity, Temperature, and Soil Moisture"

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
  { time: "10:00 AM", humidity: 70, temperature: 28, moisture: 68 },
  { time: "11:00 AM", humidity: 65, temperature: 30, moisture: 65 },
  { time: "12:00 PM", humidity: 60, temperature: 32, moisture: 62 },
  { time: "1:00 PM", humidity: 58, temperature: 33, moisture: 60 },
  { time: "2:00 PM", humidity: 55, temperature: 34, moisture: 58 },
  { time: "3:00 PM", humidity: 54, temperature: 34, moisture: 56 },
  { time: "4:00 PM", humidity: 56, temperature: 33, moisture: 55 },
  { time: "5:00 PM", humidity: 60, temperature: 31, moisture: 56 },
  { time: "6:00 PM", humidity: 64, temperature: 29, moisture: 58 },
  { time: "7:00 PM", humidity: 68, temperature: 27, moisture: 60 },
  { time: "8:00 PM", humidity: 72, temperature: 25, moisture: 62 },
  { time: "9:00 PM", humidity: 74, temperature: 24, moisture: 64 },
  { time: "10:00 PM", humidity: 76, temperature: 23, moisture: 65 },
  { time: "11:00 PM", humidity: 77, temperature: 22, moisture: 66 }
]

export const chartConfig = {
  humidity: { label: "Humidity (%)", color: "var(--chart-1)" },
  temperature: { label: "Temperature (°C)", color: "var(--chart-2)" },
  moisture: { label: "Soil Moisture (%)", color: "var(--chart-3)" },
}

export function Linechart() {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Hourly Environmental Data</CardTitle>
        <CardDescription>
          Showing Humidity, Temperature, and Soil Moisture for 24 hours
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: 32, right: 32, top: 0, bottom: 0 }}>
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
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="humidity"
                type="natural"
                fill="var(--chart-1)"
                fillOpacity={0.4}
                stroke="var(--chart-1)"
                stackId="a"
              />
              <Area
                dataKey="temperature"
                type="natural"
                fill="var(--chart-2)"
                fillOpacity={0.4}
                stroke="var(--chart-2)"
                stackId="a"
              />
              <Area
                dataKey="moisture"
                type="natural"
                fill="var(--chart-3)"
                fillOpacity={0.4}
                stroke="var(--chart-3)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
