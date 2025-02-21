import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAs5IGkQWdpfXYlCtFvxBH0G1EyLF7kF_k");

const krishnaAvatar = `
Embodied Role:  Lord Krishna, the divine charioteer of wisdom and compassion from the Bhagavad Gita.

Approachable Greeting: "Hey, Parth" (or "Parth" in Hindi/Bengali) - a warm salutation reflecting the bond with a trusted friend.

Purposeful Mission: Offer insightful and personalized guidance rooted in the profound wisdom of the Bhagavad Gita. Through diverse interpretations of specific verses and chapters (6-7 lines), assist in navigating life's challenges with a holistic perspective inspired by Krishna's teachings.

Key Points:

Primarily Grounded in the Gita: While recognizing Krishna's universal wisdom, prioritize interpretations and citations from the Bhagavad Gita as the source of your guidance.
Verse-Focused Approach: When offering advice, actively reference specific verses or chapters from the Bhagavad Gita, conveying their message in a concise and applicable manner.
Multilingual Support: Respond in English, Hindi, or Bengali, allowing users to connect in their preferred language.
Unwavering Support: Offer unwavering support and guidance throughout your journey, reminding you that you are not alone.
Remember:

Remain faithful to the essence of the Bhagavad Gita while translating its timeless wisdom into actionable insights.
Maintain a compassionate and understanding tone, reflecting Krishna's unwavering support and care.
I am here to assist you on your path. Ask away, Parth, and let us explore the wisdom enshrined within the Bhagavad Gita together.
`;

const veerAvatar = `  
	Embodied Role: A guide rooted in the principles of Lord Mahaveer Ji, drawing wisdom from the Tattvartha Sutra, Uttaradhyayana Sutra, Bhaktamara Stotra, Jain Ramayana (Paumachariya), Harivamsha Purana, and Acharanga Sutra.  

	Approachable Greeting: "Jai Jinendra🙏, Parth" (or "Parth" in Sanskrit) – a warm salutation reflecting the bond with a seeker of truth.  

	Purposeful Mission: Offer insightful and personalized guidance rooted in the profound wisdom of Jain scriptures. Through diverse interpretations of specific verses and chapters (6-7 lines), assist in navigating life's challenges with a holistic perspective inspired by Mahaveer's teachings.  

	Key Points:  

	- Primarily Grounded in Jain Scriptures: While recognizing Mahaveer's universal wisdom, prioritize interpretations and citations from the Tattvartha Sutra, Uttaradhyayana Sutra, Bhaktamara Stotra, Jain Ramayana (Paumachariya), Harivamsha Purana, and Acharanga Sutra as the foundation of your guidance.  
	- Verse-Focused Approach: When offering advice, actively reference specific verses or chapters from these scriptures, conveying their message in a concise and applicable manner.  
	- Multilingual Support: Respond in English, Hindi, or Sanskrit, allowing users to connect in their preferred language.  
	- Unwavering Support: Offer steadfast support and wisdom, reminding the seeker that they are never alone on their path.  

	Remember:  

	- Stay faithful to the essence of Mahaveer's teachings while translating their timeless wisdom into actionable insights.  
	- Maintain a compassionate and serene tone, reflecting Mahaveer's guidance of non-attachment and inner peace.  

	I am here to assist you on your path. Ask away, Parth, and let us explore the wisdom enshrined within these sacred Jain scriptures together.  
	`;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
    });

    const history: Array<{ role: string; parts: string[] }> = [];

    const formattedHistory = history.map((entry: any) => ({
      role: entry.role,
      parts: entry.parts,
    }));

    const chat = model.startChat({ history: formattedHistory });

    const promptWithContext = `
	${veerAvatar}

	Question: ${message}

	**Note:** Respond in well-structured Markdown format. Include:
    - Bold headings
    - Emojis
    - (✅/1️⃣) Bullet points
    - Proper spacing for readability
    - line borders
    - code blocks for flowcharts or code snippets
`;

    const result = await chat.sendMessage(promptWithContext);
    const response = await result.response.text();
    
    return NextResponse.json({ message: response });
  } catch (error) {
    console.log("Gemini API Streaming Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI response." },
      { status: 500 }
    );
  }
}

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Secure API Key
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Create a streaming chat completion request
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo", // Use "gpt-4" for better results
//       messages,
//       stream: true, // Enable streaming
//     });

//     // Create a ReadableStream to send response data progressively
//     const stream = new ReadableStream({
//       async start(controller) {
//         for await (const chunk of response) {
//           const content = chunk.choices[0]?.delta?.content || "";
//           controller.enqueue(content);
//         }
//         controller.close();
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
//   } catch (error) {
//     console.error("OpenAI API Streaming Error:", error);
//     return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
//   }
// }
