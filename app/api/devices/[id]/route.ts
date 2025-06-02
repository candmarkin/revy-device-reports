import { NextResponse } from "next/server"
import { getDeviceById } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const device = await getDeviceById(id)

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 })
    }

    return NextResponse.json(device)
  } catch (error) {
    console.error("Error in device API route:", error)
    return NextResponse.json({ error: "Failed to fetch device data" }, { status: 500 })
  }
}
