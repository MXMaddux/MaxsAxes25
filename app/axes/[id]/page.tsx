import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";

interface Guitar {
  _id: string;
  model: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

interface PageProps {
  params: { id: string };
}

const SingleGuitarPage = async ({ params }: PageProps) => {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/guitars/${id}`);
  if (!response.ok) {
    return <div className="text-center py-20">Guitar not found</div>;
  }

  const guitar: Guitar = await response.json();

  return (
    <main className="py-20 bg-blue-800">
      <div className="w-[90vw] max-w-[1170px] mx-auto px-4">
        <Link
          href="/axes"
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-8"
        >
          Back to axes
        </Link>

        <div className="grid gap-16 mt-8 md:grid-cols-2 md:items-center">
          <div className="w-full md:w-[80%]">
            <Image
              src={guitar.image}
              alt={guitar.model}
              width={800}
              height={800}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-300">{guitar.model}</h2>
            <h5 className="text-xl text-white">{formatPrice(guitar.price)}</h5>
            <p className="text-blue-200 leading-relaxed max-w-[45em]">
              {guitar.description}
            </p>
            <p className="text-white grid grid-cols-[125px_1fr]">
              <span className="font-bold text-blue-300">Brand:</span>
              {guitar.brand}
            </p>
            <hr className="border-gray-600 my-4" />
            <AddToCart guitar={guitar} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default SingleGuitarPage;
