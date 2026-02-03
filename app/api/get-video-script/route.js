import { NextResponse } from "next/server";
import { generateScript } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const result = await generateScript(prompt);

    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}
