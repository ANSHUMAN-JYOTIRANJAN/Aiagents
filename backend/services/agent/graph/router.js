import { getModel } from "../config/llmModel.js";

export const router = async (state) => {
  try {
    const llm = await getModel("router");
    const prompt = `
Answer the user using only the above search results.

You are CortexAI, an intelligent AI assistant.

If searchContext exists:
- Use search results to answer.
- Do not mention internal tools.

Rules:
- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown.

Formatting:
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.

User Query:
${state.prompt}
`;
    const res = await llm.invoke(prompt);
    const responseText =
      typeof res?.content === "string"
        ? res.content
        : String(res?.content ?? "chat");

    const normalizedAgent = responseText.trim().toLowerCase();
    return {
      ...state,
      agent: ["chat", "search", "coding", "ppt", "pdf", "imageGen"].includes(
        normalizedAgent,
      )
        ? normalizedAgent
        : "chat",
    };
  } catch (error) {
    console.error("router error", error);
    return {
      ...state,
      agent: "chat",
    };
  }
};
