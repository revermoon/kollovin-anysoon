/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with safety checks
let ai: GoogleGenAI | null = null;
const key = process.env.GEMINI_API_KEY;

if (key && key !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Successfully initialized Gemini SDK with user-supplied API key.");
  } catch (error) {
    console.error("Failed to initialize Gemini SDK:", error);
  }
} else {
  console.log("No custom GEMINI_API_KEY found, or using placeholder. Running in fallback simulation mode.");
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiInitialized: !!ai
  });
});

// AI Advertising Copywriting Generator Route
app.post("/api/creatives/generate", async (req, res) => {
  const { platform, productName, productCategory, sellingPoints, tone, audience } = req.body;

  if (!productName) {
    return res.status(400).json({ error: "Product name is required" });
  }

  // Backup response if Gemini is not credentialed yet
  const fallbackResponse = {
    adTitle: `✨ 【爆款推荐】为什么所有${audience || "精明粉丝"}都在安利「${productName}」？`,
    adCopy: `🔥 铁子们！这次搞到好登西了！如果是${productCategory || "日常好物"}的重度爱好者，一定不要错过【${productName}】。\n\n💡 划重点：\n${sellingPoints ? sellingPoints.split('\n').map(p => `✔️ ${p}`).join('\n') : `✔️ 核心痛点解决：极高性价比与出色品质\n✔️ 使用简便：一键上手体验无压力\n✔️ 限时无忧CPA支持：首单CPS尊享特惠扣减70%配额`}\n\n📢 专属福利：点击下方链接购买，下单即享专属折扣。评论区抽3个铁粉送精美大礼包一份！走过路过不要错过～\n\n#${productCategory || "好物分享"} #${platform || "自媒体变现"} #KOL推广计划`,
    creativeImgPrompt: `A high-quality lifestyle influencer product photography of "${productName}" ${productCategory ? `(${productCategory})` : ''} on a sleek modern marble desk, beautiful soft branding colors, cinematic lighting, 4k, suitable for ${platform || 'Instagram/RED'} content.`,
    interactionIdeas: [
      `🎁 互动抽奖：在评论区写下你最被种草的一点，下周一揪3位宝贝送出体验装！`,
      `💬 互动提问：“你觉得买这类好物最看重什么参数？” 引导粉丝在评论区展开大辩论加权重。`,
      `👑 粉丝特权：添加文末助理私域，回复“${productName}”直接领取粉丝限时隐藏折扣券。`
    ]
  };

  if (!ai) {
    // Return mock creative after 1.2s to simulate real AI generation
    setTimeout(() => {
      return res.json({
        ...fallbackResponse,
        info: "Running in preview simulation mode. Add standard GEMINI_API_KEY in Settings > Secrets to unlock raw live AI generation."
      });
    }, 1200);
    return;
  }

  try {
    const promptString = `
      Please create highly targeted advertising copyrighting assets for a KOL post.
      - Target Social Media Platform: ${platform || "WeChat / Little Red Book"}
      - Product Name: ${productName}
      - Category: ${productCategory || "Universal"}
      - Key Selling Points: ${sellingPoints || "High performance, cost-effective"}
      - Writing Tone: ${tone || "energetic and conversational"}
      - Target Audience Segment: ${audience || "general youth consumers"}

      Give me:
      - adTitle: snappy, high click-through-rate hook designed for the platform
      - adCopy: deep conversion copywriting containing hooks, bullet-point advantages (incorporating the selling points), explicit Call To Action, and relevant hashtag keywords. Make it in Chinese unless specified.
      - creativeImgPrompt: an elegant visual prompt suggesting what image structure/aesthetic the KOL should output or generate.
      - interactionIdeas: 3 concrete creative actions the KOL can write in the comments or post to spark organic discussion, boosting views.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptString,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            adTitle: { type: Type.STRING, description: "A highly clickable title or headline" },
            adCopy: { type: Type.STRING, description: "Fully formatted social media copy writing text in Chinese language containing emojis" },
            creativeImgPrompt: { type: Type.STRING, description: "A detailed visual creative illustration description for image generation tools" },
            interactionIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three specific creative tips to boost comment rates and audience interaction"
            }
          },
          required: ["adTitle", "adCopy", "creativeImgPrompt", "interactionIdeas"]
        },
        systemInstruction: "You are an elite marketing copywriter who writes native Chinese social media ad copy for micro-KOLs on RED, Douyin, Weibo, WeChat Moments. Your goals are high-retention hook, emotional triggers, natural tone, clear call-to-action (CTA), and viral potential."
      }
    });

    const textOutput = response.text;
    if (textOutput) {
      const parsedData = JSON.parse(textOutput.trim());
      return res.json(parsedData);
    } else {
      throw new Error("Empty text returned from Gemini");
    }
  } catch (error: any) {
    console.error("Gemini creative generation error:", error);
    // Graceful fallback on error so the interface is never blank
    return res.json({
      ...fallbackResponse,
      error: error.message || "Failed to make call directly, using responsive defaults"
    });
  }
});

// Setup Vite & Static Files Hosting
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KOL Link Server] running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
