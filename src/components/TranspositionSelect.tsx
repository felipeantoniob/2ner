import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRANSPOSITION_ITEMS = [
  { label: "C (-12)" },
  { label: "C# (-11)" },
  { label: "D (-10)" },
  { label: "D# (-9)" },
  { label: "E (-8)" },
  { label: "F (-7)" },
  { label: "F# (-6)" },
  { label: "G (-5)" },
  { label: "G# (-4)" },
  { label: "A (-3)" },
  { label: "A# (-2)" },
  { label: "B (-1)" },
  { label: "C (0)" },
  { label: "C# (+1)" },
  { label: "D (+2)" },
  { label: "D# (+3)" },
  { label: "E (+4)" },
  { label: "F (+5)" },
  { label: "F# (+6)" },
  { label: "G (+7)" },
  { label: "G# (+8)" },
  { label: "A (+9)" },
  { label: "A# (+10)" },
  { label: "B (+11)" },
  { label: "C (+12)" },
] as const;

const TranspositionSelect = () => {
  return (
    <Select>
      <SelectTrigger className="text-body w-20 text-slate-100">
        <SelectValue placeholder="C (0)" className="text-body" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TRANSPOSITION_ITEMS.map((item) => (
            <SelectItem value={item.label}>{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TranspositionSelect;
