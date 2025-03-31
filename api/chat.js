export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const body = req.body;

    if (!body || !body.messages) {
      return res.status(400).json({ error: "Bad request: 'messages' is missing in body." });
    }

    const { messages } = body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message || "Щось пішло не так на сервері 😢" });
  }
}
