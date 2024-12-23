import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type AccidentalSelectProps = {
  displayAsSharp: boolean;
  setDisplayAsSharp: Dispatch<SetStateAction<boolean>>;
};

const AccidentalSelect = ({
  displayAsSharp,
  setDisplayAsSharp,
}: AccidentalSelectProps) => {
  function handleValueChange(value: "#" | "b") {
    setDisplayAsSharp(value === "#");
  }

  return (
    <Select
      value={displayAsSharp ? "#" : "b"}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="text-body w-24 text-xl text-slate-100">
        <SelectValue placeholder="♯" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="#" className="text-xl">
            ♯
          </SelectItem>
          <SelectItem value="b" className="text-xl">
            ♭
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccidentalSelect;
