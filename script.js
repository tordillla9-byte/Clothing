// server.js
require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/generate-image', async (req, res) => {
  try {
    const prompt = req.query.prompt;

    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;
    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
