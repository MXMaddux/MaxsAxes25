import connectDb from "@/config/database";
import Guitar from "@/models/Guitar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const guitars = await Guitar.find({});
    const formattedGuitars = guitars.map((guitar) => ({
      _id: guitar._id.toString(), // Ensure _id is included and converted to string
      brand: guitar.brand,
      model: guitar.model,
      price: guitar.price,
      stock: guitar.stock,
      image: guitar.image,
      description: guitar.description,
    }));

    console.log("Fetched Guitars:", formattedGuitars); // Log the fetched guitars
    return NextResponse.json(formattedGuitars, { status: 200 });
  } catch (error) {
    console.error("Error fetching guitars:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
