import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

// GET /api/products
// GET /api/products?fail=1   -> deliberately returns 500, for the
// assignment's required "simulate network failure" / unsuccessful-scenario
// test evidence, without needing to fake anything.
export async function GET(request: NextRequest) {
  const fail = request.nextUrl.searchParams.get("fail");

  // Small artificial delay so the client's loading state is genuinely
  // observable (and screenshot-able) rather than instantaneous.
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (fail) {
    return NextResponse.json(
      { error: "Upstream catalog service is unavailable. Please try again." },
      { status: 500 }
    );
  }

  const products = getAllProducts();
  return NextResponse.json({ products });
}
