import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { act, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AddCoordinates } from "./AddCoordinates";
import clsx from "clsx";

const HexagonalMap = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);

  console.log(showSlider);
  console.log(sliderValue);

  const activeIndexes = [2, 13, 23, 6, 10, 38, 29, 16];

  return (
    <div className="grid gap-6 p-10 h-full w-full grid-cols-1 grid-rows-auto md:grid-cols-3 md:grid-rows-3 relative">
      <div className="left md:col-span-2 grid grid-cols-8 grid-rows-4 md:row-span-3 border bg-card rounded-xl h-64 md:h-auto">
        {Array.from({ length: 48 }).map((el, index) => {
          return (
            <div
              className={clsx(
                "border-border border",
                activeIndexes.includes(index) && "bg-green-500/25"
              )}
            ></div>
          );
        })}
      </div>

      <div
        className={clsx(
          "right border bg-card rounded-xl p-5 flex flex-col items-center relative",
          "col-span-1 row-span-1 md:row-span-2",
          showSlider ? "justify-start" : ""
        )}
      >
        <div className="switch w-full flex justify-end bg-red-200 relative">
          <div className="wrap flex items-center gap-x-3 absolute size-fit right-0">
            <Switch
              id="toggle"
              onClick={() => {
                setShowSlider(!showSlider);
                setSliderValue(1);
              }}
            />
            <Label htmlFor="Auto">Auto</Label>
          </div>
        </div>

        {showSlider && (
          <div className="slider w-full mt-10 flex flex-col text-center items-center">
            <Slider
              defaultValue={[1]}
              step={1}
              max={10}
              onValueChange={(value) => setSliderValue(value[0])}
            />
            <div className="text mt-3">Run for {sliderValue} hours</div>
          </div>
        )}

        <div className="pod md:absolute md:bottom-3 flex items-center justify-between">
          <AddCoordinates />
          {showSlider && <Button className="w-2/6 cursor-pointer">Run</Button>}
        </div>
      </div>
    </div>
  );
};

export default HexagonalMap;
