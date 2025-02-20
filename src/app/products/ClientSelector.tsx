"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../components/FormInput";

const clientSchema = z.object({
  clientId: z.string({ required_error: "Client is required" }).nonempty(),
});
type Client = z.infer<typeof clientSchema>;

const ClientSelector = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<Client>({ resolver: zodResolver(clientSchema) });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <div className="text-2xl font-semibold">Client</div>
      <form onSubmit={onSubmit}>
        {/* <CustomSelect
          control={control}
          name="clientId"
          error={errors.clientId?.message}
        ></CustomSelect> */}
        <FormInput
          placeholder="clientId"
          {...register("clientId")}
          error={errors.clientId?.message}
        />
      </form>
    </>
  );
};

export default ClientSelector;
