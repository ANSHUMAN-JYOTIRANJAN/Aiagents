import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
  prompt: Annotation(),
  aiResponse: Annotation(),
  response: Annotation(),
  agent: Annotation(),
  conversationId: Annotation(),
  artifacts: Annotation(),
  images: Annotation(),
  model: Annotation(),
  file: Annotation(),
  // Ensure userId is part of the graph state so it is available to agent nodes
  userId: Annotation(),
});
