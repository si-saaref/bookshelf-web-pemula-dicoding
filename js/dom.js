const UNFINISH_BOOK = "incompleteBookshelfList";
const FINISH_BOOK = "completeBookshelfList";

// CONTAINER
const createContainer = (bookTitle, bookAuthor, bookYear) => {
	const titleContainer = document.createElement("h2");
  titleContainer.classList.add('title')
	titleContainer.innerText = bookTitle;

	const authorContainer = document.createElement("p");
  authorContainer.classList.add('author')
	authorContainer.innerText = bookAuthor;

	const yearContainer = document.createElement("p");
  yearContainer.classList.add('year')
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
	const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

	const bookContainer = createContainer(bookTitle, bookAuthor, bookYear);

	const parentUnFinishContainer = document.getElementById(UNFINISH_BOOK);
	const parentFinishContainer = document.getElementById(FINISH_BOOK);

	parentUnFinishContainer.append(bookContainer);

	bookIsComplete
		? parentFinishContainer.append(bookContainer)
		: parentUnFinishContainer.append(bookContainer);

	console.log(bookContainer);

	resetDataForm();
};

const deleteBookFromList = (bookElement) => {
	bookElement.remove();
};

const moveBookToCompleteList = (bookElement) => {
	const bookTitle = bookElement.querySelector(".book_item > h2.title").innerText;
	const bookAuthor = bookElement.querySelector(".book_item > p.author").innerText;
	const bookYear = bookElement.querySelector(".book_item > p.year").innerText;

  const newBookContainer = createContainer(bookTitle, bookAuthor, bookYear)
  const parentFinishContainer = document.getElementById(FINISH_BOOK)

  parentFinishContainer.append(newBookContainer)

  bookElement.remove()
}; 

const resetDataForm = () => {
	const bookTitle = document.getElementById("inputBookTitle");
	const bookAuthor = document.getElementById("inputBookAuthor");
	const bookYear = document.getElementById("inputBookYear");
	const bookIsComplete = document.getElementById("inputBookIsComplete");
	bookTitle.value = "";
	bookAuthor.value = "";
	bookYear.value = "";
  bookIsComplete.checked = false;
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
		deleteBookFromList(e.target.parentElement);
	});
};

const finishButton = () => {
	return createButton("Selesai", "finish-button", function (e) {
		moveBookToCompleteList(e.target.parentElement);
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
