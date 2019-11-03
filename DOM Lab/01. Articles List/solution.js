
document.addEventListener("DOMContentLoaded", function () {
	const validateExisting = (a) => {
		if (typeof (a) === null) {
			console.log("failing");
			return new Error("unfound member: " + Object.keys(a)[0])
		}
	}

	let targetSection = document.getElementById("articles");
	let title = document.getElementById("createTitle");
	let content = document.getElementById("createContent");

	document.getElementById("#postBtn");

	document.addEventListener("keypress", function (evt) {
		if (evt.keyCode === 10) {
			appendResult(title, content, targetSection);
		}
	});

	const appendResult = function (title, content, target) {
		validateExisting(targetSection);
		validateExisting(title);
		validateExisting(content);
		if (title.value !== "" && content.value !== "") {
			let h3Element = document.createElement("h3");
			h3Element.innerHTML = title.value;
			target.appendChild(h3Element);
			let pElement = document.createElement("p");
			pElement.innerHTML = content.value;
			target.appendChild(pElement);
			title.value = "";
			content.value = "";
		}
	}


	document.getElementById("postBtn").addEventListener("click", function () {
		appendResult(title, content, targetSection);
	})
});