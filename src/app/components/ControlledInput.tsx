import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const ControlledInput = ({
  control,
  label,
  name,
  error,
}: {
  control: any;
  label: string;
  name: string;
  error: string | undefined;
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            onChange={field.onChange}
            value={field.value}
            type="text"
            placeholder={label}
            className="border border-navBorder bg-navBackground !placeholder-SecondaryTextColor ring-0 focus-visible:border-label focus-visible:!ring-0"
          />
        )}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </>
  );
};

export default ControlledInput;
