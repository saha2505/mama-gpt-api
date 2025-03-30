export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { messages } = req.body;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
