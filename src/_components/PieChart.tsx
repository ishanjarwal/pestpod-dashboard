"use client"

import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// Single snapshot (latest environmental values)
const snapshot = {
  humidity: 78,
  temperature: 22,
  moisture: 65,
}

// Transform snapshot into Pie-compatible data
const chartData = [
  { key: "humidity", value: snapshot.humidity, fill: "var(--chart-1)" },
  { key: "temperature", value: snapshot.temperature, fill: "var(--chart-2)" },
  { key: "moisture", value: snapshot.moisture, fill: "var(--chart-3)" },
]

export const chartConfig = {
  humidity: { label: "", color: "var(--chart-1)" },
  temperature: { label: "", color: "var(--chart-2)" },
  moisture: { label: "", color: "var(--chart-3)" },
} satisfies ChartConfig

export function Piechart() {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full flex justify-center items-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="value" />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="key"
                innerRadius="40%"
                outerRadius="80%"
                paddingAngle={5}
              >
                <LabelList
                  dataKey="key"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
