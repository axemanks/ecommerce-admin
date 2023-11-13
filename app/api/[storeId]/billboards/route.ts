// route for handleing billboards

// Global imports
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
// Local imports
import prismadb from '@/lib/prismadb';
import next from 'next';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth(); // get the user id from clerk
    const body = await req.json(); // get the body of the request
    const { label, imageUrl } = body; // get label and imageUrl from the body

    // Check for all items needed from the body
    // Check if the user is logged in
    if (!userId) {
      // No userId - UnAuthenticated
      return new NextResponse('UnAuthenticated', { status: 401 });
    }

    // Check if the label is provided
    if (!label) {
      // Missing label
      return new NextResponse('Label is required', { status: 400 });
    }

    // Check if the imageUrl is provided
    if (!imageUrl) {
      // Missing imageUrl
      return new NextResponse('ImageUrl is required', { status: 400 });
    }

    // Check for storeId
    if (!params.storeId) {
      // Missing storeId
      return new NextResponse('StoreId is required', { status: 400 });
    }

    // Check if the storeId exists for the user - we don't want authenticated users to create billboards for other users
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId, // storeId
        userId, // userId
      },
    });
    if (!storeByUserId) {
      // No store found for the user
      return new NextResponse('Unauthorized for this store', { status: 403 });
    }

    // create the billboard
    const store = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    // return the store
    return NextResponse.json(store);
  } catch (error) {
    console.log(`[BILLBOARDS_POST]`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// GET - get all billboards for a store - user auth not checked on get
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth(); // get the user id from clerk

    // Check for storeId
    if (!params.storeId) {
      // Missing storeId
      return new NextResponse('StoreId is required', { status: 400 });
    }

    // get the billboards
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    // return the billboards
    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[BILLBOARDS_GET]`, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
