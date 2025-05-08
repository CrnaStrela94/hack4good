// pages/api/generate-interests.ts

import { NextResponse } from 'next/server';
import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

export async function POST(request: Request) {
  try {
    const { bio } = await request.json();

    if (!bio || bio.trim().length < 10) {
      return NextResponse.json({ error: 'Bio text is too short for analysis' }, { status: 400 });
    }

    const interests = await callDeepSeekService(bio);
    return NextResponse.json({ interests });
  } catch (error) {
    console.error('Error in generate-interests API:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

async function callDeepSeekService(bio: string): Promise<string[]> {
  try {
    const response = await generateText({
      model: deepseek('deepseek-chat'),
      prompt: `Extract 3-5 interests/hobbies from the following bio text. Return only a JSON array of strings.\n\nBio: ${bio}`,
    });

    const content = response.text ?? '[]';
    console.log('AI Response:', content);

    // Try to parse the response as JSON
    try {
      // If it's already a JSON array, parse it directly
      if (content.trim().startsWith('[')) {
        return JSON.parse(content);
      }

      // If it's a JSON object with an interests field
      if (content.includes('"interests"')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed.interests)) {
          return parsed.interests;
        }
      }

      // If it's plain text, try to extract anything that looks like an array
      const arrayMatch = content.match(/\[(.*?)\]/);
      if (arrayMatch) {
        try {
          return JSON.parse(arrayMatch[0]);
        } catch {
          // If we can't parse it as JSON, continue to fallback
        }
      }

      // Fallback: Split by commas or new lines if nothing else works
      return content
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0 && !item.includes('[') && !item.includes(']'));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return [];
    }
  } catch (error) {
    console.error('Error calling AI service:', error);
    return [];
  }
}
