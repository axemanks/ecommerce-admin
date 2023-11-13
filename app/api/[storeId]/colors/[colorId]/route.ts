import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// GET - colorId
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    // Check for colorId in params
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    // Find color by id
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
    });
    // Return
    return NextResponse.json(color);
    // Handle errors
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// DELTE - colorId, storeId, userId
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {
    // Get userId from clerk
    const { userId } = auth();
    // Check if logged in
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    // Check for colorId in params
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    // Search for store by storeId and userId
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });
    // If store belongs to a different user - unauthorized
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    // Delete color
    const color = await prismadb.color.delete({
      where: {
        id: params.colorId
      }
    });
    // Return
    return NextResponse.json(color);
    // Handle errors
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// PATCH - colorId, storeId, userId
export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {
    // Get userId from clerk
    const { userId } = auth();
    // Get body from request
    const body = await req.json();
    // Extract name and value from body
    const { name, value } = body;
    // Check if logged in
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    // Check for name
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    // Check for value
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    // Check for colorId in params
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
    // Search for store by storeId and userId
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });
    // If store belongs to a different user - unauthorized
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    // Update color
    const color = await prismadb.color.update({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    });
    // Return
    return NextResponse.json(color);
    // Handle errors
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};