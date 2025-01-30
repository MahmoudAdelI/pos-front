import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <h2 className="mb-8 text-3xl font-semibold">Add Product</h2>
      <form className="motion-preset-slide-up-sm flex w-[60vw] flex-col gap-12 rounded-md bg-form p-16 shadow">
        <Skeleton className="bg-skeleton h-9" />
        <div className="relative flex gap-4">
          <Skeleton className="bg-skeleton h-9 w-full" />
          <Skeleton className="bg-skeleton h-9 w-full" />
        </div>
        <div className="relative flex gap-4">
          <Skeleton className="bg-skeleton h-9 w-full" />
          <Skeleton className="bg-skeleton h-9 w-full" />
        </div>
        <Skeleton className="bg-skeleton h-9 w-full" />
        <Skeleton className="bg-skeleton h-9 w-full" />

        <Skeleton className="bg-skeleton h-12 w-32" />
      </form>
    </>
  );
};

export default loading;
