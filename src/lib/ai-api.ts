export async function generateInterestsFromBio(bio: string): Promise<string[]> {
  try {
    // You would replace this with your actual API endpoint and key
    const response = await fetch('/api/generate-interests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate interests');
    }

    const data = await response.json();
    return data.interests;
  } catch (error) {
    console.error('Error generating interests:', error);
    return [];
  }
}
