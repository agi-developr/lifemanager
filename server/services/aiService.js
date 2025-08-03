const axios = require('axios');

class AIService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
  }

  async generateResponse(message, module, userContext = {}) {
    try {
      const systemPrompt = this.buildSystemPrompt(module, userContext);
      const messages = this.buildMessageHistory(message, module);
      
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      const insights = this.extractInsights(aiResponse, module);
      
      return {
        content: aiResponse,
        insights,
        suggestions: this.generateSuggestions(module, insights)
      };
    } catch (error) {
      console.error('AI API Error:', error.response?.data || error.message);
      
      // Fallback responses if AI service is unavailable
      return this.getFallbackResponse(module, message);
    }
  }

  buildSystemPrompt(module, userContext) {
    const basePrompt = `You are a wise, empathetic life coach helping users discover their passions, identify strengths, and manage their lives. Be encouraging, insightful, and adaptive.

User Context: ${JSON.stringify(userContext)}

Current Module: ${module}

Guidelines:
- Ask follow-up questions to dig deeper
- Provide specific, actionable advice
- Use encouraging language with occasional emojis
- Suggest relevant resources when appropriate
- Keep responses conversational but concise
- Adapt your approach based on user's personality and goals
- Use the user's name when appropriate
- Reference previous conversations when relevant`;

    const moduleSpecificPrompts = {
      passions: `Focus on helping the user discover what truly excites them. Ask about childhood interests, activities that make time fly, and dreams they've had. Use questions like "What activities make you lose track of time?" or "If money wasn't an issue, what would you do all day?"`,
      strengths: `Help identify both technical and soft skills. Look for patterns in their experiences and achievements. Ask about compliments they receive, situations where they excel, and what comes naturally to them.`,
      upskill: `Provide practical learning recommendations. Consider their current skill level, learning style, and available time. Suggest specific courses, books, or resources. Ask about their preferred learning methods.`,
      money: `Provide practical financial advice while being sensitive to their current situation. Focus on budgeting, saving, and smart financial habits. Be encouraging but realistic about financial goals.`,
      career: `Help explore career paths that align with their passions and skills. Consider both traditional and non-traditional paths. Ask about their ideal work environment and values.`,
      events: `Suggest relevant events, workshops, and networking opportunities. Consider their location, interests, and goals. Ask about their preferred event types and networking style.`,
      goals: `Help set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals. Break down large goals into smaller steps. Ask about their timeline and potential obstacles.`,
      community: `Help identify communities that align with their interests and values. Consider both online and offline communities. Ask about what they hope to give and receive from community involvement.`
    };

    return basePrompt + '\n\n' + (moduleSpecificPrompts[module] || '');
  }

  buildMessageHistory(message, module) {
    // For now, just use the current message
    // In a full implementation, you'd include conversation history
    return [
      { role: 'user', content: message }
    ];
  }

  extractInsights(response, module) {
    const insights = {};
    
    // Simple keyword-based insight extraction
    const patterns = {
      passions: /(?:passion|love|enjoy|excited|motivated).*?(?:for|about|in)\s+([^.!?]+)/gi,
      strengths: /(?:strength|good at|excel|skilled).*?(?:in|at)\s+([^.!?]+)/gi,
      skills: /(?:skill|ability|proficiency).*?(?:in|with)\s+([^.!?]+)/gi
    };

    if (patterns[module]) {
      const matches = [...response.matchAll(patterns[module])];
      insights[module] = matches.map(match => match[1].trim());
    }

    // Extract goals mentioned
    const goalMatches = response.match(/(?:goal|aim|target|objective).*?(?:is|to)\s+([^.!?]+)/gi);
    if (goalMatches) {
      insights.goals = goalMatches.map(match => match.trim());
    }

    return insights;
  }

  generateSuggestions(module, insights) {
    const suggestions = [];
    
    switch (module) {
      case 'passions':
        if (insights.passions) {
          suggestions.push({
            type: 'course',
            title: 'Explore Your Passions',
            description: 'Based on your interests, here are some courses to consider',
            items: insights.passions.map(passion => ({
              name: `Introduction to ${passion}`,
              platform: 'Coursera',
              url: `https://coursera.org/search?query=${encodeURIComponent(passion)}`
            }))
          });
        }
        break;
      
      case 'upskill':
        if (insights.skills) {
          suggestions.push({
            type: 'resource',
            title: 'Skill Development Resources',
            description: 'Here are some resources to help you develop your skills',
            items: insights.skills.map(skill => ({
              name: `${skill} Mastery Course`,
              platform: 'Udemy',
              url: `https://udemy.com/search/?q=${encodeURIComponent(skill)}`
            }))
          });
        }
        break;
    }

    return suggestions;
  }

  getFallbackResponse(module, message) {
    const fallbackResponses = {
      passions: [
        "That's fascinating! What specifically about that excites you? 🤔",
        "I can see your passion shining through! What would you do if money wasn't an issue? 💭",
        "That's a great insight! How do you feel when you're doing that activity? ✨"
      ],
      strengths: [
        "That's a wonderful strength! How do you think you could leverage that more? 💪",
        "I can see that coming through in your response! What situations bring out this strength? 🌟",
        "That's definitely a valuable skill! How do you think others benefit from this strength? 🤝"
      ],
      upskill: [
        "Great choice! What's your current experience level with that skill? 📊",
        "That's a valuable skill to develop! What's motivating you to learn this? 🎯",
        "Excellent! What resources do you think would work best for your learning style? 📚"
      ],
      money: [
        "That's a common challenge! What's your biggest financial goal right now? 🎯",
        "I understand that concern! What's your current approach to managing money? 💡",
        "That's important to address! What would financial freedom look like to you? 🚀"
      ],
      career: [
        "That sounds exciting! What aspects of that job appeal to you most? 🎯",
        "Great vision! What skills do you think you'd need to get there? 📚",
        "That's ambitious! What's the first step you could take toward that goal? 🚀"
      ],
      events: [
        "That's a great interest! What type of events would help you grow in that area? 🌱",
        "Excellent! What's your preferred way to network and connect? 🤝",
        "That sounds fun! What would make an event truly valuable for you? ⭐"
      ],
      goals: [
        "That's a meaningful goal! What's your timeline for achieving it? 📅",
        "Great ambition! What obstacles do you think you might face? 🚧",
        "That's inspiring! What's the first small step you could take today? 🎯"
      ],
      community: [
        "That's wonderful! What values are most important to you in a community? 🤝",
        "Great choice! What would you hope to contribute to that community? 💫",
        "That sounds perfect! What would make you feel truly connected? ❤️"
      ]
    };

    const responses = fallbackResponses[module] || [
      "That's interesting! Tell me more about that.",
      "I'd love to hear more about your thoughts on this.",
      "That's a great point! What else comes to mind?"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      content: randomResponse,
      insights: {},
      suggestions: []
    };
  }
}

module.exports = new AIService(); 