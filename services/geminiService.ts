
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getGeometryAssistance = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: question,
      config: {
        systemInstruction: `You are G-Math-Go AI, a friendly and expert geometry tutor for 10th-grade students. 
        Your goal is to help students understand analytical geometry concepts. 
        Keep explanations visual, concise, and encouraging. 
        If asked about triangles, mention properties like the sum of interior angles (180°) or types (Equilateral, Isosceles, Scalene).
        If asked about quadrilaterals, talk about squares, rectangles, and rhombuses.
        Use markdown for formatting.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, tuve un problema conectando con mi base de conocimientos geométricos. ¿Podrías intentar preguntar de nuevo?";
  }
};

export const analyzeStudentResponse = async (figure: string, property: string, studentText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza la siguiente respuesta de un estudiante de 10mo grado sobre la figura: ${figure}.
      Propiedad analizada: ${property}.
      Pregunta: "¿Por qué todo cuadrado es también un rectángulo?"
      Respuesta del estudiante: "${studentText}".`,
      config: {
        systemInstruction: `Eres un evaluador de geometría experto. Analiza la respuesta del estudiante.
        Debes devolver un JSON estrictamente válido con dos campos:
        1. "feedback": Una respuesta motivadora que incluya una explicación técnica y, si la respuesta es incompleta, una PISTA (hint) para mejorar. (Máximo 4 líneas).
        2. "xp": Un número entero entre 10 y 50 basado en la calidad técnica. 
        CRITERIO: Un cuadrado es un rectángulo porque tiene 4 ángulos rectos. Si el estudiante menciona esto, dale más de 40 XP. Si no, dale entre 10 y 25 XP y dale la pista.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            xp: { type: Type.INTEGER }
          },
          required: ["feedback", "xp"]
        }
      },
    });
    
    // Limpieza de respuesta para evitar errores de parseo si Gemini incluye markdown
    let rawText = response.text || "{}";
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback seguro para evitar pantalla negra
    return {
      feedback: "Tu respuesta es un buen comienzo. Recuerda que la definición clave de un rectángulo son sus ángulos. ¡Pista: Revisa el recordatorio de definiciones arriba!",
      xp: 15
    };
  }
};
