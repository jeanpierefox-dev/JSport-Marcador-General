import { GoogleGenAI } from "@google/genai";
import { Match, Team, MatchEvent } from "../types";

// Helper to simulate commentary based on match state
export const generateAICommentary = async (
  match: Match,
  homeTeam: Team,
  awayTeam: Team,
  lastEvent: MatchEvent | undefined
): Promise<string> => {
  
  // Safe access to process.env to prevent runtime crashes in browser
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';

  if (!apiKey) {
    console.warn("API Key missing for AI Commentary");
    return "Comentario de IA no disponible (Configurar API Key)";
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const scoreStr = match.sets.map((s, i) => `Set ${i+1}: ${s.home}-${s.away}`).join(', ');
  const eventDesc = lastEvent ? `Última acción: ${lastEvent.description} por el equipo ${lastEvent.teamId === homeTeam.id ? homeTeam.name : awayTeam.name}` : "El partido está por comenzar.";

  const prompt = `
    Eres un comentarista deportivo profesional de Voleibol estilo VNL.
    Analiza brevemente la situación actual del partido en 1 o 2 frases emocionantes en Español.
    
    Contexto:
    Partido: ${homeTeam.name} vs ${awayTeam.name}
    Marcador Sets: ${scoreStr}
    Set Actual: ${match.currentSet + 1}
    Puntos Set Actual: ${match.sets[match.currentSet]?.home || 0} - ${match.sets[match.currentSet]?.away || 0}
    ${eventDesc}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "¡Qué partido estamos viviendo!";
  } catch (error) {
    console.error("Error generating commentary:", error);
    return "Conexión con comentarista IA inestable.";
  }
};