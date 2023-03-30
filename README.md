# parser-google-form
This is a Google Forms parser that collects questions and answer choices and uses the `OpenAI API` to get more detailed and accurate answers. 

The application works as follows:

- You load your google account data into a `.env` file, data such as:
  - `P_LOGIN` - <i>User login</i>;
  - `P_Key` - <i>User password</i>;
  - `OPENAI_API_KEY` - <i>OpenAI API key</i>;
  - `P_LINK` - <i>Link to the form itself</i>;
  - `OPENAI_MODEL` - <i>The ChatGPT model you want to use</i>;

- The data is extracted using `puppetter`

- The application processes the data and sends it to the `OpenAI API` for analysis.

- The `OpenAI API` analyzes the data and generates responses based on the given parameters.

- After receiving the answers from the `OpenAI API`, the application provides them to the user.

You can use the answers to take the tests, but at your own risk, as the `OpenAI API` may be wrong.

This app can be useful for students who study online and want to take tests a little faster. 
