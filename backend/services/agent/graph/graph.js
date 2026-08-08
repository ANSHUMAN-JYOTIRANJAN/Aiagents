import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { routerNode } from "./router.Node.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { imageGenAgent } from "../agents/imageGen.agent.js";
import { pdfRagAgent } from "../agents/pdfRag.agent.js";
import { visionAgent } from "../agents/vision.agent.js";
const workflow = new StateGraph(agentState);
workflow.addNode("router", routerNode);
workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("imageGen", imageGenAgent);
workflow.addNode("pdf_rag", pdfRagAgent);
workflow.addNode("vision", visionAgent);
workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "search":
        return "search";
      case "coding":
        return "coding";
      case "ppt":
        return "ppt";
      case "image":
        return "imageGen";
      case "vision":
        return "vision";
      case "pdf":
        return "pdf";
      case "pdf_rag":
        return "pdf_rag";
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    search: "search",
    coding: "coding",
    ppt: "ppt",
    pdf: "pdf",
    imageGen: "imageGen",
    vision: "vision",
    pdf_rag: "pdf_rag",
  },
);

workflow.addEdge("search", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("imageGen", "__end__");
workflow.addEdge("vision", "__end__");

workflow.addEdge("pdf_rag", "__end__");

export const graph = workflow.compile();
