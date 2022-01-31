const UNFINISH_BOOK = "incompleteBookshelfList";
const FINISH_BOOK = "completeBookshelfList";
const BOOK_ID = "bookId";

let isUpdate = false;
let toDeleteUpdate = false;
let dataBook;

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

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("action");

	const buttonTrash = removeButton();
	const buttonFinish = finishButton();
	const buttonUndo = undoButton();
	const buttonUpdate = updateButton();

	if (!isComplete) {
		buttonContainer.append(buttonFinish, buttonTrash, buttonUpdate);
		Container.append(titleContainer, authorContainer, yearContainer, buttonContainer);
	} else {
		buttonContainer.append(buttonUndo, buttonTrash);
		Container.append(titleContainer, authorContainer, yearContainer, buttonContainer);
	}

	return Container;
};

const createModalPrompt = () => {
	const bookName = dataBook.querySelector(".book_item > h2.title").innerText;
	const mainContainer = document.querySelector("body");
	const outerContainer = document.createElement("div");
	outerContainer.classList.add("outer-modal");

	const container = document.createElement("div");
	container.classList.add("active-modal");

	const question = document.createElement("h2");
	question.innerText = `Apakah anda yakin ingin menghapus buku ${bookName}?`;

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("button-modal-container");

	const acceptButton = acceptPromptButton();
	const declineButton = declinePromptButton();

	buttonContainer.append(acceptButton, declineButton);
	container.append(question, buttonContainer);
	outerContainer.append(container);
	mainContainer.append(outerContainer);
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

	updateDataBook();
	resetDataForm();
	goToBookSection(composedBookContainer.id);
};

const deleteBookFromList = (modalContainer) => {
	const bookIndexPosition = findBookIndex(dataBook[BOOK_ID]);
	books.splice(bookIndexPosition, 1);
	dataBook.remove();
	modalContainer.remove();
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
	goToBookSection(bookContainer[BOOK_ID]);
};

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

const updateBookToList = () => {
	let bookTitle = document.getElementById("inputBookTitle").value;
	let bookAuthor = document.getElementById("inputBookAuthor").value;
	let bookYear = document.getElementById("inputBookYear").value;
	let isComplete = document.getElementById("inputBookIsComplete").checked;

	const { id } = dataBook;

	const allContainer = document.querySelectorAll(".book_item");
	allContainer.forEach((e) => {
		e[BOOK_ID] === id && e.parentNode.removeChild(e);
	});

	const newBookContainer = createContainer(bookTitle, bookAuthor, bookYear, isComplete);
	const newComposedDataBook = { id, bookTitle, bookAuthor, bookYear, isComplete };
	books.push(newComposedDataBook);
	newBookContainer[BOOK_ID] = id;

	const parentUnFinishContainer = document.getElementById(UNFINISH_BOOK);
	const parentFinishContainer = document.getElementById(FINISH_BOOK);
	if (isComplete) {
		parentFinishContainer.append(newBookContainer);
	} else {
		parentUnFinishContainer.append(newBookContainer);
	}

	const bookIndexPosition = findBookIndex(id);
	books.splice(bookIndexPosition, 1);

	toDeleteUpdate = false;
	updateDataBook();
	resetDataForm();
	dataBook = null;

	goToBookSection(id);
};

const handleUpdate = (bookElem) => {
	bookElem.classList.add("highlight-book");
	let bookInputTitle = document.getElementById("inputBookTitle");
	let bookInputAuthor = document.getElementById("inputBookAuthor");
	let bookInputYear = document.getElementById("inputBookYear");

	const detailBook = findBook(bookElem[BOOK_ID]);
	const { bookTitle, bookAuthor, bookYear } = detailBook;

	bookInputTitle.value = bookTitle;
	bookInputAuthor.value = bookAuthor;
	bookInputYear.value = bookYear;

	isUpdate = true;

	const mainFormDiv = document.querySelector("main .input_section");
	mainFormDiv.scrollIntoView();

	dataBook = detailBook;
};

const searchBookFunction = () => {
	let inputSearch = document.getElementById("searchBookTitle");
	const searchedBook = searchBook(inputSearch.value);
	const allContainer = document.querySelectorAll(".book_item");
	let filteredBook = [];
	allContainer.forEach((e) => {
		searchedBook.forEach((book) => {
			e.classList.remove("highlight-book");
			return e[BOOK_ID] === book.id && filteredBook.push(e);
		});
	});
	filteredBook.forEach((e) => {
		e.scrollIntoView();
		e.classList.add("highlight-book");
	});
};

const resetDataForm = () => {
	const bookTitle = document.getElementById("inputBookTitle");
	const bookAuthor = document.getElementById("inputBookAuthor");
	const bookYear = document.getElementById("inputBookYear");
	const bookIsComplete = document.getElementById("inputBookIsComplete");
	const inputSearch = document.getElementById("searchBookTitle");
	bookTitle.value = "";
	bookAuthor.value = "";
	bookYear.value = "";
	bookIsComplete.checked = false;
	inputSearch.value = "";
};

const handleCleanSearchedBook = (e) => {
	e.preventDefault();
	let inputSearch = document.getElementById("searchBookTitle");
	const allContainer = document.querySelectorAll(".book_item");
	const searchedBook = searchBook(inputSearch.value);
	let filteredBook = [];
	allContainer.forEach((e) => {
		searchedBook.forEach((book) => {
			e.classList.remove("highlight-book");
			return e[BOOK_ID] === book.id && filteredBook.push(e);
		});
	});
	resetDataForm();
	e.target.remove();
};

const goToBookSection = (id) => {
	const allContainer = document.querySelectorAll(".book_item");
	allContainer.forEach((e) => {
		if (e[BOOK_ID] === id) {
			e.scrollIntoView();
		}
	});
};

const handleChaneIsComplete = () => {
	const isComplete = document.getElementById("inputBookIsComplete").checked;
	const bookDest = document.getElementById("bookDestination");
	if (isComplete) {
		bookDest.innerText = "Selesai dibaca";
	} else {
		bookDest.innerText = "Belum selesai dibaca";
	}
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
	return createButton("Hapus", "red-button", function (e) {
		dataBook = e.target.parentElement.parentElement;
		createModalPrompt();
	});
};

const finishButton = () => {
	return createButton("Selesai", "green-button", function (e) {
		moveBookToCompleteList(e.target.parentElement.parentElement);
	});
};

const updateButton = () => {
	return createButton("Update", "green-button", function (e) {
		handleUpdate(e.target.parentElement.parentElement);
	});
};

const undoButton = () => {
	return createButton("Undo", "green-button", function (e) {
		undoBookFromCompleteList(e.target.parentElement.parentElement);
	});
};

const removeButtonInput = () => {
	return createButton("X", "clear-button", function (e) {
		handleCleanSearchedBook(e);
	});
};

const acceptPromptButton = () => {
	return createButton("Sure", "green-button", function (e) {
		deleteBookFromList(e.target.parentElement.parentElement.parentElement);
	});
};

const declinePromptButton = () => {
	return createButton("Cancel", "red-button", function (e) {
		e.target.parentElement.parentElement.parentElement.remove();
	});
};
