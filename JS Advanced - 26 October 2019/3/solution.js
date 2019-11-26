class Forum {
  constructor() {
    this.users = [];
    this.questions = [];
    this.id = 1;
  }

  register(username, password, repeatPassword, email) {
    if (Array.from(arguments).some(x => x === "")) {
      throw new Error("Input can not be empty");
    }
    if (password !== repeatPassword) {
      throw new Error("Passwords do not match");
    }
    if (this.users.some(x => x.username === username || x.email === email)) {
      throw new Error("This user already exists!");
    }
    this.users.push({ username, password, email, isLogged: false });
    return `${username} with ${email} was registered successfully!`;
  }

  _operations(messageSuccess, isLogged, username, password) {
    let user = this.users.find(x => x.username === username);
    if (typeof user === "undefined") {
      throw new Error("There is no such user");
    }
    if (user["password"] === password && user.isLogged !== isLogged) {
      user.isLogged = isLogged;
      return messageSuccess;
    }
  }

  login = this._operations.bind(
    this,
    true,
    "Hello! You have logged in successfully"
  );

  logout = this._operations.bind(
    this,
    false,
    "You have logged out successfully"
  );
  _validateUserLogedIn(username) {
    let user = this.users.find(x => x.username === username);
    if (typeof user === "undefined" || user.isLogged === false) {
      throw new Error("You should be logged in to post questions");
    }
  }

  postQuestion(username, question) {
    this._validateUserLogedIn(username);
    if (question === "") {
      throw new Error("Invalid question");
    }
    this.questions.push({ question, username, id: this.id++, answers: [] });
    return "Your question has been posted successfully";
  }

  postAnswer(username, questionId, answer) {
    this._validateUserLogedIn(username);
    if (answer === "") {
      throw new Error("Invalid answer");
    }
    let question = this.questions.find(x => x.id === questionId);
    if (typeof question === "undefined") {
      throw new Error("There is no such question");
    }

    question.answers.push({ username, answer });
    return "Your answer has been posted successfully";
  }

  showQuestions() {
    return this.questions
      .map(x => {
        let answers = x.answers
          .map(a => {
            return `---${a.username}: ${a.answer}`;
          })
          .join("\n");

        return `Question ${x.id} by ${x.username}: ${x.question}\n${answers}`;
      })
      .join("\n");
  }
}
let forum = new Forum();

forum.register("Michael", "123", "123", "michael@abv.bg");
forum.register("Michael", "123", "123", "mihael@abv.bg");

forum.register("Stoyan", "123ab7", "123ab7", "some@gmail@.com");
forum.login("Michael", "123");
forum.login("Stoyan", "123ab7");

forum.postQuestion("Michael", "Can I rent a snowboard from your shop?");
forum.postAnswer("Stoyan", 1, "Yes, I have rented one last year.");
forum.postQuestion(
  "Stoyan",
  "How long are supposed to be the ski for my daughter?"
);
forum.postAnswer("Stoyan", 1, "Testation");
forum.postAnswer("Stoyan", 1, "Testation");
forum.postAnswer("Michael", 1, "Testation");
forum.postAnswer("Stoyan", 1, "Testation");

forum.postAnswer("Michael", 2, "How old is she?");
forum.postAnswer("Michael", 2, "Tell us how tall she is.");

console.log(forum.showQuestions());
