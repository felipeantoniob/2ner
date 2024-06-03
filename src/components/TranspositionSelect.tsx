import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRANSPOSITION_ITEMS = [
  { label: "C (-12)", value: -12 },
  { label: "C# (-11)", value: -11 },
  { label: "D (-10)", value: -10 },
  { label: "D# (-9)", value: -9 },
  { label: "E (-8)", value: -8 },
  { label: "F (-7)", value: -7 },
  { label: "F# (-6)", value: -6 },
  { label: "G (-5)", value: -5 },
  { label: "G# (-4)", value: -4 },
  { label: "A (-3)", value: -3 },
  { label: "A# (-2)", value: -2 },
  { label: "B (-1)", value: -1 },
  { label: "C (0)", value: 0 },
  { label: "C# (+1)", value: 1 },
  { label: "D (+2)", value: 2 },
  { label: "D# (+3)", value: 3 },
  { label: "E (+4)", value: 4 },
  { label: "F (+5)", value: 5 },
  { label: "F# (+6)", value: 6 },
  { label: "G (+7)", value: 7 },
  { label: "G# (+8)", value: 8 },
  { label: "A (+9)", value: 9 },
  { label: "A# (+10)", value: 10 },
  { label: "B (+11)", value: 11 },
  { label: "C (+12)", value: 12 },
] as const;

type TranspositionValue = (typeof TRANSPOSITION_ITEMS)[number]["value"];
type TranspositionValueString = `${TranspositionValue}`;

type TranspositionSelectProps = {
  transposition: number;
  setTransposition: Dispatch<SetStateAction<number>>;
};

const TranspositionSelect = ({
  transposition,
  setTransposition,
}: TranspositionSelectProps) => {
  function handleValueChange(value: TranspositionValueString) {
    setTransposition(parseInt(value) as TranspositionValue);
  }

  return (
    <Select value={transposition.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="text-body w-24 text-slate-100">
        <SelectValue placeholder="C (0)" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TRANSPOSITION_ITEMS.map((item) => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TranspositionSelect;
