import connectDb from "@/config/database";
import Guitar, { IGuitar } from "@/models/Guitar";
import { NextResponse } from "next/server";

// GET: Fetch all guitars
export const GET = async (): Promise<NextResponse> => {
  try {
    await connectDb();

    const guitars: IGuitar[] = await Guitar.find({});

    return new NextResponse(JSON.stringify(guitars), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching guitars:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// POST: Add a new guitar
export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    await connectDb();

    const body = await request.json();
    const { brand, model, price, description } = body;

    // Validate required fields
    if (!brand || !model || !price || !description) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const newGuitar = new Guitar({ brand, model, price, description });
    const savedGuitar = await newGuitar.save();

    return new NextResponse(JSON.stringify(savedGuitar), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding guitar:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// PATCH: Update a guitar by ID
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectDb();

    const body = await request.json();
    const { id } = params;

    const updatedGuitar = await Guitar.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedGuitar) {
      return new NextResponse(JSON.stringify({ message: "Guitar not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify(updatedGuitar), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating guitar:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// DELETE: Delete a guitar by ID
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectDb();

    const { id } = params;

    const deletedGuitar = await Guitar.findByIdAndDelete(id);

    if (!deletedGuitar) {
      return new NextResponse(JSON.stringify({ message: "Guitar not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Guitar deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting guitar:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
