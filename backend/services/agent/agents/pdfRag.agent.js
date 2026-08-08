import { getModel } from "../utils/llmModel.js";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createVectorStore } from "../utils/vectorStore.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { QdrantClient } from "@qdrant/js-client-rest";
import fs from "fs";

export const pdfRagAgent = async (state) => {
  let collectionName = null;

  try {
    // --------------------------------------------------
    // 1. Validate uploaded file
    // --------------------------------------------------

    if (!state.file?.path) {
      throw new Error("No PDF file was uploaded.");
    }

    console.log("🔥 PDF RAG AGENT CALLED");
    console.log("PDF:", state.file.path);

    // --------------------------------------------------
    // 2. Read PDF
    // --------------------------------------------------

    const buffer = fs.readFileSync(state.file.path);

    const pdf = new PDFParse({
      data: buffer,
    });

    const result = await pdf.getText();

    const text = result.text || "";

    console.log("📄 Extracted text length:", text.length);
    console.log("📄 Preview:", text.substring(0, 500));

    if (!text.trim()) {
      return {
        ...state,
        response:
          "I couldn't extract any text from the uploaded PDF. The PDF may contain scanned images instead of selectable text.",
      };
    }

    // --------------------------------------------------
    // 3. Split PDF into chunks
    // --------------------------------------------------

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments([text]);

    console.log("📚 Number of chunks:", docs.length);

    // --------------------------------------------------
    // 4. Create unique Qdrant collection
    // --------------------------------------------------

    collectionName = `pdf-${Date.now()}`;

    console.log("🗄️ Qdrant collection:", collectionName);

    const vectorStore = await createVectorStore(collectionName, docs);

    console.log("✅ Vector store created");

    // --------------------------------------------------
    // 5. Search relevant chunks
    // --------------------------------------------------

    const relevantDocs = await vectorStore.similaritySearch(state.prompt, 5);

    console.log("🔎 Relevant documents:", relevantDocs.length);

    const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

    // --------------------------------------------------
    // 6. Ask LLM
    // --------------------------------------------------

    const llm = await getModel("pdf-rag");

    const messages = [
      new SystemMessage(`
You are CortexAI PDF Assistant.

Your job is to answer questions using ONLY the content
provided from the uploaded PDF.

Rules:

1. Answer only from the provided PDF context.
2. Never invent or assume information.
3. If the answer cannot be found in the PDF, say:
   "I couldn't find this information in the uploaded PDF."
4. For summarization requests, summarize the provided PDF context.
5. Use clear Markdown formatting.
6. Be accurate and concise.
            `),

      new HumanMessage(`
PDF Context:

${context}

User Question:

${state.prompt}
            `),
    ];

    const response = await llm.invoke(messages);

    console.log("🤖 PDF RAG RESPONSE:", response.content);

    return {
      ...state,
      docs,
      response: response.content,
    };
  } catch (error) {
    console.error("❌ PDF RAG ERROR:", error);

    return {
      ...state,
      response: "Failed to analyze the uploaded PDF. Please try again.",
    };
  } finally {
    // --------------------------------------------------
    // 7. Delete temporary uploaded PDF
    // --------------------------------------------------

    try {
      if (state.file?.path && fs.existsSync(state.file.path)) {
        fs.unlinkSync(state.file.path);

        console.log("🗑️ Temporary PDF deleted");
      }
    } catch (err) {
      console.error("PDF cleanup error:", err.message);
    }

    // --------------------------------------------------
    // 8. Delete Qdrant collection
    // --------------------------------------------------

    try {
      if (collectionName) {
        const client = new QdrantClient({
          url: process.env.QDRANT_URL,
          apiKey: process.env.QDRANT_API_KEY,
        });

        const exists = await client.collectionExists(collectionName);

        if (exists) {
          await client.deleteCollection(collectionName);

          console.log("🗑️ Qdrant collection deleted:", collectionName);
        }
      }
    } catch (err) {
      console.error("Qdrant cleanup error:", err.message);
    }
  }
};
