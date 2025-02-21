import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, message, response } = await req.json();
    const chat = await prisma.chatHistory.create({
      data: { userId, message, response },
    });
    console.log("saved chat: ", chat);

    return NextResponse.json({ success: true, chat });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
