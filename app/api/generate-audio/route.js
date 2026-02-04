export async function POST(req) {
  try {
    const { text, id } = await req.json();

    const res = await fetch(
      "https://preview.tts.speechmatics.com/generate/sarah",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.SPEECHMATICS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return Response.json({ error: errorText }, { status: 500 });
    }

    const audioBuffer = await res.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav", 
      },
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
