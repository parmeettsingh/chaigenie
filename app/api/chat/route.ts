import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MENU_ITEMS = [
  { id: "m1", name: "Masala Chai", price: 20 },
  { id: "m2", name: "Kesar Pista Chai", price: 25 },
  { id: "m3", name: "Samosa", price: 15 },
  { id: "m4", name: "Bun Maska", price: 30 }
];

export async function POST(req: Request) {
  try {
    const { message, history, userData } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: `You are the ChaiGenie, a mystical and tea-loving assistant. 
      
      USER CONTEXT:
      - Name: ${userData?.name || "Guest"}
      - Past Orders: ${userData?.pastOrders || "None yet"}
      
      MENU DATA: ${JSON.stringify(MENU_ITEMS)}

      PERSONALIZATION & CART RULES:
      1. Always greet the user by name if known.
      2. When asked for the menu, list the names and prices (₹) clearly.
      3. If they have past orders, occasionally suggest their "usual" or a perfect pairing.
      4. If a user wants to "add", "order", or "choose" an item, you MUST include this exact hidden signal at the end of your message: [ADD_TO_CART: ITEM_NAME]
      5. ONLY talk about items on the menu. If they ask for something else, remind them you only brew what's on the list.`
    });

    const cleanedHistory = (history || []).filter((item: any) => 
      item.role === 'user' || item.role === 'model'
    ).slice(-6);

    const chat = model.startChat({ history: cleanedHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return NextResponse.json({ reply: response.text() });

  } catch (error: any) {
    console.error("GEMINI ERROR:", error.message);
    return NextResponse.json({ reply: "The lamp is flickering... try again!" }, { status: 500 });
  }
}