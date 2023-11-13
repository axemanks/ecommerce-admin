// Dynamic Route for GET, PATCH, and DELETE Billboards

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

// PATCH /api/stores/[storeId] - Update store
export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    // Get the user ID from the session
    const { userId } = auth();
    // get body from request
    const body = await req.json();
    // get name from body
    const { label, imageUrl } = body;

    // Check for all items needed from the body - userId, label, imageUrl, storeId, billboardId
    // Check if the user is logged in
    if (!userId) {
      return new NextResponse('Un-Authenticated', { status: 401 });
    }
    // Check if label is provided
    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    // Check if imageUrl is provided
    if (!imageUrl) {
      return new NextResponse('Image Url is required', { status: 400 });
    }
    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }
    // Check for billboardId in params
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    // Check if the storeId exists for the user - we don't want authenticated users to editing billboards for Other users
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

    // Update billboards in database
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

// DELETE - Delete billboard
export async function DELETE(
  _req: Request, // unused but params has to be the second argument
  { params }: { params: { storeId: string; billboardId: string } } // get storeId and billboardId from params
) {
  try {
    // Get the user ID from clerk
    const { userId } = auth();

    // Check for all items needed from the body - userId, storeId, billboardId
    // Check if the user is logged in
    if (!userId) {
      return new NextResponse('Un-Authenticated', { status: 401 });
    }

    // Check for storeId in params
    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    // Check for billboardId in params
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    // Check if the storeId exists for the user - we don't want authenticated users to edit billboards for other users
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

    // Delete billboard from database - use deleteMany because we have to pass the userId
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

// GET - Get billboard - don't need auth to get single billboard
export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } } // get billboardId from params
) {
  try {
    // Check for billboardId in params
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    // GET billboard from database - use deleteMany because we have to pass the userId
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
