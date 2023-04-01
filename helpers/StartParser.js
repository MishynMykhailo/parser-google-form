const puppeteer = require("puppeteer");

class StartParser {
  constructor() {
    this.browser = null;
    this.page = null;
    this.allQuestion = [];
  }

  async initialize({
    headlessBool = true,
    executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe",
  }) {
    this.browser = await puppeteer.launch({
      executablePath,
      devtools: true,
      headless: headlessBool,
      args: ["--start-maximized", "--password-store=basic"],
    });
    this.page = await this.browser.newPage();
  }

  async navigateToForm(goTo) {
    await this.page.goto(goTo);
  }

  async fillLoginForm(login, pass) {
    await this.page.waitForSelector(".zHQkBf");
    await this.page.type('input[type="email"]', login);
    await this.page.click("#identifierNext");
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector("#password");
    await this.page.type('input[type="password"]', pass);
    await this.page.click("#passwordNext");
    await this.page.waitForNavigation();
    await this.page.waitForSelector(".Qr7Oae");
  }

  async findQuestion() {
    const results = await this.page.evaluate(() => {
      const foundResults = [];
      const fullQuestion = document.querySelectorAll(".Qr7Oae");
      fullQuestion.forEach((e) => {
        const question = e
          .querySelector(".M7eMe")
          .textContent.split("")
          .map((e) => {
            if (e === "\n") {
              return (e = " ");
            }
            return e;
          });
        let prevElem = null;
        for (let i = 1; i < question.length; i += 1) {
          if (question[i] == " " && question[prevElem] == " ") {
            question.splice(i, 1);
            i -= 1;
          }
          prevElem = i - 1;
        }

        const variables = Array.from(
          e.querySelectorAll(".yUJIWb").length > 0
            ? e.querySelectorAll(".yUJIWb")
            : e.querySelectorAll(".nWQGrd")
        ).map(
          (e, index) =>
            ` ${index + 1}: ${
              e.childNodes[0].childNodes[0].childNodes[1].textContent
            }`
        );

        foundResults.push({
          question: question.join(""),
          answerOptions: variables,
        });
      });

      return foundResults;
    });
    this.allQuestion.push(...results);
  }
  getResult() {
    return this.allQuestion;
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = StartParser;
