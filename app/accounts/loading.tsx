import { PageSpinner } from "@/components/Spinner";
export default function Loading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <PageSpinner />
    </div>
  );
}
