import connectDb from "@/config/database";
import Guitar from "@/models/Guitar";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for explicit conversion

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    console.log("API Route Hit with ID:", params.id); // Log the ID
    const guitar = await Guitar.findById(new ObjectId(params.id)); // Explicitly convert to ObjectId

    if (!guitar) {
      console.log("Guitar not found in database."); // Log if guitar is not found
      return NextResponse.json(
        { message: "Guitar not found" },
        { status: 404 }
      );
    }

    const formattedGuitar = {
      _id: guitar._id.toString(), // Convert _id to string
      brand: guitar.brand,
      model: guitar.model,
      price: guitar.price,
      stock: guitar.stock,
      image: guitar.image,
      description: guitar.description,
    };

    console.log("Guitar found:", formattedGuitar); // Log the formatted guitar
    return NextResponse.json(formattedGuitar, { status: 200 });
  } catch (error) {
    console.error("Error fetching guitar:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
