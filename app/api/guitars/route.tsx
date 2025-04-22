import connectDb from "@/config/database";
import Guitar, { IGuitar } from "@/models/Guitar";
import { NextResponse } from "next/server";

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
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(error);
  }
};
