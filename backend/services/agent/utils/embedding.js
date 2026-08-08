import { InferenceClient } from "@huggingface/inference";
import { Embeddings } from "@langchain/core/embeddings";

const client = new InferenceClient(process.env.HUGGINGFACEHUB_API_KEY);

class HuggingFaceEmbeddings extends Embeddings {
  constructor() {
    super({});
    this.model = "sentence-transformers/all-MiniLM-L6-v2";
  }

  async embedDocuments(texts) {
    const result = await client.featureExtraction({
      model: this.model,
      inputs: texts,
    });

    return this.normalizeResult(result);
  }

  async embedQuery(text) {
    const result = await client.featureExtraction({
      model: this.model,
      inputs: text,
    });

    const normalized = this.normalizeResult(result);

    return normalized[0];
  }

  normalizeResult(result) {
    // HF may return [number[]] or number[][] depending on input/model
    if (
      Array.isArray(result) &&
      result.length > 0 &&
      Array.isArray(result[0])
    ) {
      return result;
    }

    return [result];
  }
}

export const embeddings = new HuggingFaceEmbeddings();
