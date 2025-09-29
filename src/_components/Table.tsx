import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

export default function EnvironmentalDataTable({
  data,
  setActive,
}: {
  data: any[];
  setActive: (a: any) => void;
}) {
  const refined = data.map((el) => ({
    id: el.id,
    picture: el.id,
    timestamp: el.createdAt,
    status: el.status,
    humidity: el.humidity,
    temperature: el.temperature,
    moisture: el.moisture,
    pesticideSprayTime: el.spray_duration_sec,
    confidence_score: (Math.random() * 10).toFixed(2),
  }));

  return (
    <div className="h-full w-full flex flex-col p-5">
      <div className="flex-1 overflow-auto rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Picture</TableHead>
              <TableHead className="text-right">TimeStamp</TableHead>
              <TableHead className="text-right">Humidity</TableHead>
              <TableHead className="text-right">Temperature</TableHead>
              <TableHead className="text-right">
                Spray <br />
                Duration
              </TableHead>
              <TableHead className="text-right">
                Confidence <br /> Score
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refined.map((el) => (
              <TableRow
                key={el.id}
                onClick={() => {
                  setActive(el);
                }}
              >
                <TableCell className="font-medium">
                  {el.id.slice(16, 30)}
                </TableCell>
                <TableCell>
                  <Badge
                    className={clsx(
                      el.status === "completed"
                        ? "bg-green-500/15 border-green-500 border text-green-500"
                        : "bg-blue-500/15 border-blue-600 border text-blue-600"
                    )}
                  >
                    {el.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <img
                    src={el.picture}
                    className="w-24 aspect-square object-cover object-center"
                  />
                </TableCell>
                <TableCell>{el.temperature} C</TableCell>
                <TableCell>{el.humidity}</TableCell>
                <TableCell>{el.moisture}</TableCell>
                <TableCell className="text-right">
                  {el.pesticideSprayTime}
                </TableCell>
                <TableCell className="text-right">
                  {el.confidence_score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
