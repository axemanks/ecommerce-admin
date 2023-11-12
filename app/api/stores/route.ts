// route to create a new store
// Global imports
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// Local imports
import prismadb from "@/lib/prismadb";
import next from "next";

export async function POST(
    req: Request,
) {
    try {
        const {userId} = auth(); // get the user id from clerk
        const body = await req.json(); // get the body of the request
        const { name } = body; // get the name from the body
        // Check if the user is logged in
        if (!userId) {
            // No userId - unauthorized
            return new NextResponse("Unauthorized", { status: 401 });
        }
        // Check if the name is provided
        if (!name) {
            // Missing name
            return new NextResponse("Name is required", { status: 400 });
        }
        // create the store
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })
        // return the store
        return NextResponse.json(store);



    } catch (error) {
        console.log(`[STORES_POST]`, error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}