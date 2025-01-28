import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const CustomSelect = ({
  children,
  control,
  label,
  name,
  error,
  disabled,
}: {
  children: React.ReactNode;
  control: any;
  label: string;
  name: string;
  error?: string | undefined;
  disabled?: boolean;
}) => {
  return (
    <div className="flex w-full flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger
              className={classNames({
                "relative border border-navBorder bg-navBackground text-SecondaryTextColor focus:border-label focus:ring-0":
                  true,
                "border-Alert": error,
              })}
            >
              <SelectValue placeholder={label} />
              <span className="absolute -top-6 left-0 text-xs font-medium text-PrimaryTextColor">
                {label}
              </span>
            </SelectTrigger>
            <SelectContent className="border-navBorder bg-navBackground text-SecondaryTextColor">
              <SelectGroup>{children}</SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default CustomSelect;
