function mySolution() {
  let textArea = document.querySelector("#inputSection > textarea");
  let authorName = document.querySelector(
    "#inputSection > div > input[type=username]"
  );
  let submitButton = document.querySelector("#inputSection > div > button");

  let pendingQuestionsDiv = document.getElementById("pendingQuestions");

  let openQuestionsDiv = document.getElementById("openQuestions");

  if (
    [
      textArea,
      authorName,
      submitButton,
      pendingQuestionsDiv,
      openQuestionsDiv
    ].some(x => !x)
  ) {
    throw Error("Missing HTML element");
  }
  submitButton.addEventListener("click", handleSubmit);

  openQuestionsDiv.addEventListener("click", handleOpen);

  const appendManyChildren = function(target, children) {
    children.forEach(element => {
      target.appendChild(element);
    });
  };

  const createElementWithAtributes = function(tag, attribs) {
    let element = document.createElement(tag);
    Object.keys(attribs).forEach(key => {
      element.setAttribute(key, attribs[key]);
    });
    return element;
  };

  function handleOpen(evnt) {
    let target = evnt.target;
    if (target.nodeName !== "BUTTON") {
      return;
    }
    if (target.innerText === "Reply") {
      target.innerText = "Back";
      target.parentNode.nextSibling.style = "display:block";
    } else if (target.innerText === "Back") {
      target.innerText = "Reply";
      target.parentNode.nextSibling.style = "display:none";
    }
    if (target.innerText === "Send") {
      let content = target.previousSibling.value;
      target.previousSibling.value = "";
      if (content === "") {
        return;
      }
      let li = document.createElement("li");
      li.textContent = content;
      target.nextSibling.appendChild(li);
    }
  }

  function removeQuestionFromButton(evnt) {
    evnt.target.parentNode.parentNode.parentNode.removeChild(
      evnt.target.parentNode.parentNode
    );
  }

  function createBaseQuestion(author, text) {
    let question = document.createElement("div");

    let img = createElementWithAtributes("img", {
      src: "./images/user.png",
      width: "32",
      height: "32"
    });
    let span = document.createElement("span");
    span.textContent = author;
    let p = document.createElement("p");
    p.textContent = text;
    appendManyChildren(question, [img, span, p]);
    return question;
  }

  function createQuestionOpen(author, text) {
    let question = createBaseQuestion(author, text);
    question.classList.add("openQuestion");
    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");
    let button1 = document.createElement("button");
    button1.classList.add("reply");
    button1.textContent = "Reply";
    actionsDiv.appendChild(button1);
    //
    let replyDiv = document.createElement("div");
    replyDiv.classList.add("replySection");
    replyDiv.style = "display: none"; //hidden
    let input = createElementWithAtributes("input", {
      class: "replyInput",
      type: "text",
      placeholder: "Reply to this question here..."
    });
    let button2 = document.createElement("button");
    button2.classList.add("replyButton");
    button2.textContent = "Send";
    let ol = createElementWithAtributes("ol", { class: "reply", type: 1 });
    appendManyChildren(replyDiv, [input, button2, ol]);
    appendManyChildren(question, [actionsDiv, replyDiv]);
    return { question, replyBtn: button1, button2 };
  }

  function createQuestionPending(author, text) {
    let question = createBaseQuestion(author, text);
    question.classList.add("pendingQuestion");
    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("actions");
    let button1 = document.createElement("button");
    button1.classList.add("archive");
    button1.textContent = "Archive";
    let button2 = document.createElement("button");
    button2.classList.add("open");
    button2.textContent = "Open";
    appendManyChildren(actionsDiv, [button1, button2]);
    //
    question.appendChild(actionsDiv);
    return { question, removeBtn: button1, moveBtn: button2 };
  }

  function handleSubmit() {
    let [text, author] = [textArea.value, authorName.value];
    if (text === "") {
      return;
    }
    author = author === "" ? "Anonymous" : author;
    let newQuestion = createQuestionPending(author, text);
    pendingQuestionsDiv.appendChild(newQuestion.question);

    newQuestion.removeBtn.addEventListener("click", removeQuestionFromButton);

    newQuestion.moveBtn.addEventListener("click", function(evnt) {
      removeQuestionFromButton(evnt);
      let newQuestion = createQuestionOpen(author, text).question;
      openQuestionsDiv.appendChild(newQuestion);
    });
  }
}
