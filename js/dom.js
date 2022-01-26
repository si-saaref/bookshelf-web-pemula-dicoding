const UNFINISH_BOOK = "incompleteBookshelfList";
const FINISH_BOOK = "completeBookshelfList";
const BOOK_ID = "bookId";

let isUpdate = false;
let toDeleteUpdate = false;

// CONTAINER
const createContainer = (bookTitle, bookAuthor, bookYear, isComplete) => {
	const titleContainer = document.createElement("h2");
	titleContainer.classList.add("title");
	titleContainer.innerText = bookTitle;

	const authorContainer = document.createElement("p");
	authorContainer.classList.add("author");
	authorContainer.innerText = bookAuthor;

	const yearContainer = document.createElement("p");
	yearContainer.classList.add("year");
	yearContainer.innerText = bookYear;

	const Container = document.createElement("article");
	Container.classList.add("book_item");

	const buttonTrash = removeButton();
	const buttonFinish = finishButton();
	const buttonUndo = undoButton();
	const buttonUpdate = updateButton();

	if (!isComplete) {
		Container.append(
			titleContainer,
			authorContainer,
			yearContainer,
			buttonFinish,
			buttonTrash,
			buttonUpdate
		);
	} else {
		Container.append(titleContainer, authorContainer, yearContainer, buttonUndo, buttonTrash);
	}

	return Container;
};

//  ACTION
const addBookToList = () => {
	const bookTitle = document.getElementById("inputBookTitle").value;
	const bookAuthor = document.getElementById("inputBookAuthor").value;
	const bookYear = document.getElementById("inputBookYear").value;
	const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

	const bookContainer = createContainer(bookTitle, bookAuthor, bookYear, bookIsComplete);
	const composedBookContainer = composedDataBook(bookTitle, bookAuthor, bookYear, bookIsComplete);
	bookContainer[BOOK_ID] = composedBookContainer.id;
	books.push(composedBookContainer);

	const parentUnFinishContainer = document.getElementById(UNFINISH_BOOK);
	const parentFinishContainer = document.getElementById(FINISH_BOOK);

	parentUnFinishContainer.append(bookContainer);
	bookIsComplete
		? parentFinishContainer.append(bookContainer)
		: parentUnFinishContainer.append(bookContainer);

	console.log(bookContainer);
	console.log(composedBookContainer);
	// console.log("isUpdate ", isUpdate);
	// console.log("toDelete ", isUpdate);

	toDeleteUpdate = true;

	updateDataBook();
	resetDataForm();
};

const deleteBookFromList = (bookElement) => {
	const bookIndexPosition = findBookIndex(bookElement[BOOK_ID]);
	books.splice(bookIndexPosition, 1);
	console.log(bookIndexPosition);
	bookElement.remove();
	updateDataBook();
};

const moveBookToCompleteList = (bookElement) => {
	const bookTitle = bookElement.querySelector(".book_item > h2.title").innerText;
	const bookAuthor = bookElement.querySelector(".book_item > p.author").innerText;
	const bookYear = bookElement.querySelector(".book_item > p.year").innerText;

	const bookContainer = createContainer(bookTitle, bookAuthor, bookYear, true);
	const newBookContainer = findBook(bookElement[BOOK_ID]);
	bookContainer[BOOK_ID] = newBookContainer.id;
	newBookContainer.isComplete = true;

	const parentFinishContainer = document.getElementById(FINISH_BOOK);

	parentFinishContainer.append(bookContainer);

	bookElement.remove();
	updateDataBook();
	// deleteBookFromList(bookElement);
};;

const undoBookFromCompleteList = (bookElement) => {
	const bookTitle = bookElement.querySelector(".book_item > h2.title").innerText;
	const bookAuthor = bookElement.querySelector(".book_item > p.author").innerText;
	const bookYear = bookElement.querySelector(".book_item > p.year").innerText;

	const bookContainer = createContainer(bookTitle, bookAuthor, bookYear, false);
	const newBookContainer = findBook(bookElement[BOOK_ID]);
	newBookContainer.isComplete = false;
	bookContainer[BOOK_ID] = newBookContainer.id;

	const parentUnFinishContainer = document.getElementById(UNFINISH_BOOK);

	parentUnFinishContainer.append(bookContainer);

	bookElement.remove();
	updateDataBook();
};

const updateDetailBook = (bookElement) => {
	let bookInputTitle = document.getElementById("inputBookTitle");
	let bookInputAuthor = document.getElementById("inputBookAuthor");
	let bookInputYear = document.getElementById("inputBookYear");
	
	const {  bookTitle, bookAuthor, bookYear, id, isComplete  } = findBook(bookElement[BOOK_ID]);
	
	bookInputTitle.value = bookTitle;
	bookInputAuthor.value = bookAuthor;
	bookInputYear.value = bookYear;
	
	const newBookContainer = createContainer(bookInputTitle, bookInputAuthor, bookInputYear, isComplete);
	newBookContainer[BOOK_ID] = id

	const parentUnFinishContainer = document.getElementById(UNFINISH_BOOK)
	parentUnFinishContainer.append(newBookContainer)

	isUpdate = true;

	// console.log("toDelete out block", toDeleteUpdate);
	if (toDeleteUpdate === true) {
		bookElement.remove();
		// console.log("toDelete isnide block", toDeleteUpdate);
	}
	// toDeleteUpdate = false;
	updateDataBook()
};

const searchBookFunction = () => {
	const inputSearch = document.getElementById("searchBookTitle").value;
	console.log(inputSearch.replace(/ /g, ""));
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
		updateDetailBook(e.target.parentElement);
	});
};

const undoButton = () => {
	return createButton("Undo", "undo-button", function (e) {
		undoBookFromCompleteList(e.target.parentElement);
	});
};
