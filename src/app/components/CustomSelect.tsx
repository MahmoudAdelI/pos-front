import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const CustomSelect = ({
  children,
  control,
  label,
  name,
}: {
  children: React.ReactNode;
  control: any;
  label: string;
  name: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="relative border-0 bg-Fg text-SecondaryTextColor focus:ring-0">
            <SelectValue placeholder={label} />
            <span className="absolute -top-6 left-0 text-PrimaryTextColor">
              {label}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {children}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CustomSelect;
