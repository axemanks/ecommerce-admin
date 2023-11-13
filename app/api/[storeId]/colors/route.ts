// Route to create new color
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

// POST - storeId, userId, name, value
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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
    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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
    // Create color
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
    // Return
    return NextResponse.json(color);
    // Handle errors
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// GET - storeId
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    // Search for colors by storeId
    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
    // Return
    return NextResponse.json(colors);
    // Handle errors
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};