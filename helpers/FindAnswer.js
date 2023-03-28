const axios = require("axios");
require("dotenv").config();

const { OPENAI_API_KEY, OPENAI_MODEL } = process.env;

class FindAnswer {
  constructor() {
    this.result = [];
  }
  async getOpenAi(data) {
    for (let i = 0; i < data.length; i += 1) {
      const prompt = `when you write your answer, write it in the format:
    "Question Number #...
    Answer: .... "
    Question №${i + 1}: choose the correct answer: ${data[i]["question"]}${
        data[i]["answerOptions"]
      }`;
      const result = await this.askOpenAI(prompt);
      this.result.push({ result });
    }
  }

  async askOpenAI(prompt) {
    const apiKey = OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    const data = {
      prompt: prompt,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.5,
      model: OPENAI_MODEL,
    };
    try {
      const response = await axios.post(url, data, { headers: headers });
      const answer = response.data.choices[0].text;
      console.log(answer);
      return answer;
    } catch (error) {
      console.error(error);
      return "Error: Unable to get an answer from OpenAI.";
    }
  }
  getResultAnswer() {
    return this.result;
  }
}
module.exports = FindAnswer;
