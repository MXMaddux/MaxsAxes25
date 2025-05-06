import connectDb from "@/config/database";
import Guitar from "@/models/Guitar";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Correct import for runtime ObjectId

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    console.log("Database connected successfully");

    console.log("API Route Hit with ID:", params.id);
    const guitar = await Guitar.findById(new ObjectId(params.id)); // Use runtime ObjectId

    if (!guitar) {
      console.log("Guitar not found in database.");
      return NextResponse.json(
        { message: "Guitar not found" },
        { status: 404 }
      );
    }

    const formattedGuitar = {
      _id: guitar._id?.toString() || "unknown",
      brand: guitar.brand || "unknown",
      model: guitar.model || "unknown",
      price: guitar.price || 0,
      stock: guitar.stock || 0,
      image: guitar.image || "",
      description: guitar.description || "",
    };

    console.log("Guitar found:", formattedGuitar);
    return NextResponse.json(formattedGuitar, { status: 200 });
  } catch (error) {
    console.error("Error fetching guitar:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
