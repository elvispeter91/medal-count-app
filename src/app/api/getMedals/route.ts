import { NextResponse } from "next/server";
import data from "./medals.json";

export async function GET() {
  
  return NextResponse.json(data);
  // uncomment to simulate an error
  try {
    throw new Error("Something went wrong!");
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
