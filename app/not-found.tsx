import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[100vh] items-center justify-center text-center bg-blue-900">
      <div className="my-auto min-h[calc(100vh - 13rem)]  py-20">
        <h2 className="text-blue-100">Not Found</h2>
        <p className="text-blue-100">Could not find requested resource</p>
        <Button className="mt-4 bg-blue-500">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
