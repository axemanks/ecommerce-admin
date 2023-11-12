// Route for updating and deleting store

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// PATCH /api/stores/[storeId] - Update store
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Get the user ID from the session
    const { userId } = auth();
    // get body from request
    const body = await req.json();
    // get name from body
    const { name } = body;

    // Check if the user is logged in
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // Check if name is provided
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    // Get store from database
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_PATCH]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

// DELETE /api/stores/[storeId] - Delete store
export async function DELETE(
  _req: Request, // unused but params has to be the second argument
  { params }: { params: { storeId: string } } // params MUST be the second argument
) {
  try {
    // Get the user ID from clerk
    const { userId } = auth();

    // Check if the user is logged in
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    // Delete store from database - use deleteMany because we have to pass the userId
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId: userId,
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORE_DELETE]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}