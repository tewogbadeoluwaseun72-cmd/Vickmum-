
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic, style, number } = req.body;

  const prompt = `
You are my AI Idea Generator.
Create beginner-friendly, simple and practical content ideas.
Topic: ${topic}
Style: ${style}
Number of ideas: ${number}
Make them short, clear, and actionable.
Format as a numbered list.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    const result =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "No response from AI";

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed to respond" });
  }
}
