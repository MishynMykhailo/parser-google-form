require("dotenv").config();
const { FindAnswer, StartParser } = require("./helpers");
const { P_KEY, P_LOGIN, P_LINK } = process.env;

async function main() {
  const parser = new StartParser();
  const answer = new FindAnswer();
  await parser.initialize({
    headlessBool: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  await parser.navigateToForm(P_LINK);
  if (P_LOGIN && P_KEY) {
    try {
      await parser.fillLoginForm(P_LOGIN, P_KEY);
      await parser.findQuestion();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await parser.findQuestion();
    } catch (error) {
      console.log(error);
    }
  }
  const data = parser.getResult();
  await parser.closeBrowser();
  await answer.getOpenAi(data);
  answer.getResultAnswer();
}
main();
