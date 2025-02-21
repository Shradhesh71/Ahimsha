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
    const result3 = {
      message:
        "Jai Jinendra 🙏 Parth!\n" +
        "\n" +
        "---\n" +
        "\n" +
        "**The Path of Seva: Serving Others According to Mahaveer's Teachings**\n" +
        "\n" +
        "The question of how best to serve others is central to the Jain path.  It's not merely about acts of charity, but a profound commitment to Ahimsa (non-violence) and the liberation of all beings.  Mahaveer's teachings, as enshrined in various scriptures, illuminate this path.\n" +
        "\n" +
        "Let's explore this through the lens of some key texts:\n" +
        "\n" +
        "\n" +
        "✅ **Ahimsa as the Supreme Seva (Non-Violence as the Highest Service):**\n" +
        "\n" +
        "The *Acharanga Sutra* emphasizes Ahimsa as the cornerstone of Jain Dharma.  Chapter 1, for instance, details the various forms of violence, both physical and mental, that should be avoided. Serving others authentically necessitates minimizing harm in all its aspects.\n" +
        "\n" +
        '>  "Ahimsā paramo dharmaḥ" (Ahimsa is the supreme dharma) - This succinct phrase encapsulates the essence of serving others by first committing to non-violence in thought, word, and deed.\n' +
        "\n" +
        "1️⃣ **Anuvrata – Practical Application of Ahimsa:**\n" +
        "\n" +
        "The *Uttaradhyayana Sutra* explores Anuvrata, the five minor vows, that provide a practical framework for daily life.  These vows, when diligently followed, allow for a consistent and meaningful approach to Seva.  For example, abstaining from falsehood (Satya) ensures clear and helpful communication, while abstaining from stealing (Asteya) safeguards the wellbeing of others.\n" +
        "\n" +
        '> "Ātmānam anugṛhṇāti, paraṃ cānugṛhṇāti, yam saṃyamo yaśca dharmaḥ” (Self-control and righteousness benefit both oneself and others) – Uttaradhyayana Sutra\n' +
        "\n" +
        "\n" +
        "✅ **Aparigraha –  Detaching to Serve Better:**\n" +
        "\n" +
        "The principle of Aparigraha (non-attachment) from the *Tattvartha Sutra* is crucial for selfless service. By minimizing our material attachments, we free ourselves from the anxieties and desires that hinder true compassion. Serving others becomes less about self-gratification and more about genuine concern for their welfare.  This detachment allows for impartial service, devoid of expectations.\n" +
        "\n" +
        "\n" +
        "1️⃣ **Karuna – Compassion as the Driving Force:**\n" +
        "\n" +
        "The *Bhaktamara Stotra*, through its devotional hymns, emphasizes Karuna (compassion) as a central virtue.  Serving others should be fueled by genuine empathy and a desire to alleviate suffering.  This compassion transcends boundaries of caste, creed, or species, extending to all living beings.\n" +
        "\n" +
        "\n" +
        "✅ **Example of Ideal Seva from Paumachariya:**\n" +
        "\n" +
        "The *Jain Ramayana* (Paumachariya) exemplifies ideal seva through the actions of various characters.  Consider Bharata's unwavering dedication to his mother, or Lakshmana's selfless service to Rama. These examples depict the spirit of service as a continuous and devoted act, fueled by love and duty.\n" +
        "\n" +
        "\n" +
        "---\n" +
        "\n" +
        "**In Conclusion:**\n" +
        "\n" +
        "Serving others best is accomplished by integrating Ahimsa, Anuvrata, Aparigraha and Karuna into our daily lives.  It is a continuous journey, guided by the wisdom of the Jain scriptures and the profound teachings of Bhagwan Mahaveer.  May this guidance illuminate your path of selfless service.  Remember, you are never alone on this path.\n" +
        "\n" +
        "---\n",
    };
    return NextResponse.json({ message: result3.message });

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
    console.log({ message: response });
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
