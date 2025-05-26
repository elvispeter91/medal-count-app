import { NextResponse } from "next/server";
import data from "./medals.json";

export async function GET() {
  
  // comment to simulate an error
  return NextResponse.json(data);
  try {
    throw new Error("Something went wrong!");
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
