// pages/api/channels/[channelId].tsx

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function generateStaticParams() {
  const channels = await fetchChannels(); // Replace with your actual data fetching function
  return channels.map((channel) => ({
    params: { channelId: channel.id.toString() },
  }));
}

async function fetchChannels() {
  // Replace with your actual database fetch logic
  return await db.channel.findMany(); // Example assuming db.channel.findMany() fetches all channels
}

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const { channelId } = params;
    // Implement your DELETE logic based on channelId
    // Example:
    await db.channel.delete({ where: { id: parseInt(channelId) } });
    
    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("[DELETE_CHANNEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const { channelId } = params;
    const { role } = await req.json();

    // Implement your PATCH logic based on channelId and role
    // Example:
    await db.channel.update({
      where: { id: parseInt(channelId) },
      data: { role },
    });

    return new NextResponse("Updated successfully", { status: 200 });
  } catch (error) {
    console.error("[PATCH_CHANNEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
