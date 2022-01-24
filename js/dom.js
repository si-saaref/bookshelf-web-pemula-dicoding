const UNFINISH_BOOK = "incompleteBookshelfList";
const FINISH_BOOK = "completeBookshelfList";

// CONTAINER
const createContainer = (bookTitle, bookAuthor, bookYear) => {
	const titleContainer = document.createElement("h2");
	titleContainer.innerText = bookTitle;
	const authorContainer = document.createElement("p");
	authorContainer.innerText = bookAuthor;
	const yearContainer = document.createElement("p");
	yearContainer.innerText = bookYear;
	const Container = document.createElement("article");
	Container.classList.add("book_item");

	const buttonTrash = removeButton();
	const buttonFinish = finishButton();
	Container.append(
		titleContainer,
		authorContainer,
		yearContainer,
		buttonFinish,
		buttonTrash
	);

	return Container;
};

//  ACTION
const addBookToList = () => {
	const bookTitle = document.getElementById("inputBookTitle").value;
	const bookAuthor = document.getElementById("inputBookAuthor").value;
	const bookYear = document.getElementById("inputBookYear").value;
	const bookIsComplete = document.getElementById("inputBookIsComplete").value;

	const bookContainer = createContainer(bookTitle, bookAuthor, bookYear);

	const parentContainer = document.getElementById(UNFINISH_BOOK);

	parentContainer.append(bookContainer);
	console.log(bookContainer);

	resetDataForm();
};

const resetDataForm = () => {
	const bookTitle = document.getElementById("inputBookTitle");
	const bookAuthor = document.getElementById("inputBookAuthor");
	const bookYear = document.getElementById("inputBookYear");
	bookTitle.value = "";
	bookAuthor.value = "";
	bookYear.value = "";
};

// BUTTON
const createButton = (buttonText, buttonClassName, buttonEventListener) => {
	const button = document.createElement("button");
	button.classList.add(buttonClassName);
	button.innerText = buttonText;
	button.addEventListener("click", function (e) {
		buttonEventListener(e);
	});
	return button;
};

const removeButton = () => {
	return createButton("Hapus", "remove-button", function (e) {
		alert("REMOVE BOOK");
	});
};

const finishButton = () => {
	return createButton("Selesai", "finish-button", function (e) {
		alert("FINISH BOOK");
	});
};

const updateButton = () => {
	return createButton("Update", "update-button", function (e) {
		alert("Update BOOK");
	});
};

const undoButton = () => {
	return createButton("Undo", "undo-button", function (e) {
		alert("Undo Book");
	});
};
