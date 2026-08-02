import axios from "axios";
import { getModel } from "../utils/llmModel.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getDownloadUrl } from "../utils/getDownloadUrl.js";

export const imageGenAgent = async (state) => {
  try {
    const llm = await getModel("image");
    const promptResponse = await llm.invoke(`

You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:

- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:

${state.prompt}

`);
    const prompt = promptResponse.content.trim();

    const seed = Math.floor(Math.random() * 1000000);
    let finalImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt,
    )}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true&enhance=true`;

    if (
      process.env.AWS_BUCKET_NAME &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY
    ) {
      try {
        const imageRes = await axios.get(finalImageUrl, {
          responseType: "arraybuffer",
        });
        const imageBuffer = Buffer.from(imageRes.data);
        const fileName = `image-${Date.now()}.png`;

        await uploadToS3(imageBuffer, fileName, "image/png");
        finalImageUrl = await getDownloadUrl(fileName, 24 * 60 * 60);
      } catch (s3Error) {
        console.warn(
          "S3 Upload failed, falling back to direct image URL:",
          s3Error.message,
        );
      }
    }

    return {
      ...state,
      images: [finalImageUrl],
      artifacts: [],
      response: `
# 🖼️ Image Generated Successfully

📥 [Download Full HD Image](${finalImageUrl})
`,
    };
  } catch (error) {
    console.log("Image Agent Error:", error);

    return {
      ...state,
      images: [],
      artifacts: [],
      response: "❌ Failed to generate image.",
    };
  }
};
