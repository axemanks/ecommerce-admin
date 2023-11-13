import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

// GET
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    // Check for SizeId
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }
    // Search by SizeId
    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });
    // Return Size
    return NextResponse.json(size);
    // Handle Errors
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Delete - sizeId, storeId
export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    // Get userId
    const { userId } = auth();
    // Check if logged in
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    // Check for SizeId
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }
    // Search for store by storeId where userId matches
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });
    // If the store does not match the user - unauthorized
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    // Delete size by sizeId
    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId
      }
    });
  // Return size
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// PATCH - sizeId, storeId
export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    // Get userId
    const { userId } = auth();
    // Get body
    const body = await req.json();
    // Get name and value from body
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
    // Check for SizeId
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }
    // Search for store by storeId where userId matches
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });
    // If the store does not match the user - unauthorized
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    // Update size by sizeId
    const size = await prismadb.size.update({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    });
    // Return size response
    return NextResponse.json(size);
    // Handle Errors
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};