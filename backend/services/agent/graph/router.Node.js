import { getModel } from "../utils/llmModel.js";

export const routerNode = async (state) => {
  // =====================================================
  // 1. Uploaded PDF → PDF RAG
  // =====================================================
  if (state.file?.mimetype === "application/pdf") {
    return {
      ...state,
      agent: "pdf_rag",
    };
  }

  // =====================================================
  // 2. Uploaded Image → Vision
  // =====================================================
  if (state.file?.mimetype?.startsWith("image/")) {
    return {
      ...state,
      agent: "vision",
    };
  }

  // =====================================================
  // 3. Respect explicitly selected agent
  // =====================================================
  if (state.agent && state.agent !== "auto") {
    return {
      ...state,
      agent: state.agent,
    };
  }

  // =====================================================
  // 4. Automatic routing
  // =====================================================
  const llm = getModel("router");

  const result = await llm.invoke(`
You are an AI agent router.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- image
- vision
- pdf_rag

Rules:

chat:
General conversation, explanations, learning, normal questions.

search:
Current events, latest information, news, recent developments,
or information that requires internet access.

coding:
Generate code, debug code, programming questions,
software architecture, APIs, databases, and development.

pdf:
Generate a NEW PDF/document based on the user's request.

ppt:
Generate a NEW PowerPoint presentation based on the user's request.

image:
Generate a NEW image.

vision:
Analyze an uploaded image.

pdf_rag:
Analyze, summarize, extract information, or answer questions
about an uploaded PDF.

IMPORTANT:

- If a PDF is uploaded, use pdf_rag.
- If an image is uploaded, use vision.
- If the user asks to CREATE/GENERATE a PDF, use pdf.
- If the user asks to CREATE/GENERATE a PPT/PowerPoint, use ppt.
- If the user asks to CREATE/GENERATE an image, use image.
- If the user asks to summarize or analyze a PDF, use pdf_rag.

Return ONLY one word:

chat
search
coding
pdf
ppt
image
vision
pdf_rag

User Query:
${state.prompt}
`);

  const selectedAgent = result.content
    .trim()
    .toLowerCase()
    .replace(/[^a-z_]/g, "");

  const validAgents = [
    "chat",
    "search",
    "coding",
    "pdf",
    "ppt",
    "image",
    "vision",
    "pdf_rag",
  ];

  return {
    ...state,
    agent: validAgents.includes(selectedAgent)
      ? selectedAgent
      : "chat",
  };
};