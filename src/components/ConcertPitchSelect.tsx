import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const OPTIONS: number[] = [...Array(490 - 390 + 1).keys()].map((i) => i + 390);

type ConcertPitchSelectProps = {
  concertPitch: number;
  setConcertPitch: Dispatch<SetStateAction<number>>;
};

const ConcertPitchSelect = ({
  concertPitch,
  setConcertPitch,
}: ConcertPitchSelectProps) => {
  function handleValueChange(value: string) {
    setConcertPitch(parseInt(value));
  }

  return (
    <Select value={concertPitch.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="text-body w-24 text-slate-100">
        <SelectValue placeholder="440hz" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {OPTIONS.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {item}hz
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ConcertPitchSelect;
