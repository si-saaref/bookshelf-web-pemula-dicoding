const UNFINISH_BOOK = "incompleteBookshelfList";
const FINISH_BOOK = "completeBookshelfList";
const BOOK_ID = "bookId";

let isUpdate = false;
let toDeleteUpdate = false;
let dataBookForUpdate;

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

	updateDataBook();
	resetDataForm();
	goToBookSection(composedBookContainer.id)
};

const deleteBookFromList = (bookElement) => {
	const bookIndexPosition = findBookIndex(bookElement[BOOK_ID]);
	books.splice(bookIndexPosition, 1);
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

	const { id } = dataBookForUpdate;

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
	dataBookForUpdate = null;

	goToBookSection(id)
};

const handleUpdate = (bookElem) => {
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

	console.log("handle update", detailBook);
	dataBookForUpdate = detailBook;
};;

const searchBookFunction = () => {
	console.log(dataBookForUpdate);
	let inputSearch = document.getElementById("searchBookTitle");
	const searchedBook = searchBook(inputSearch.value);
	const allContainer = document.querySelectorAll(".book_item");
	console.log(allContainer);
	let filteredBook = [];
	allContainer.forEach((e) => {
		searchedBook.forEach((book) => {
			e.classList.remove("scaleX2");
			return e[BOOK_ID] === book.id && filteredBook.push(e);
		});
	});
	filteredBook.forEach((e) => {
		e.scrollIntoView();;
		e.classList.add("scaleX2");
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
	console.log(allContainer);
	let filteredBook = [];
	allContainer.forEach((e) => {
		searchedBook.forEach((book) => {
			e.classList.remove("scaleX2");
			return e[BOOK_ID] === book.id && filteredBook.push(e);
		});
	});
	resetDataForm();
	e.target.remove();
};

const goToBookSection = (id) => {
	const allContainer = document.querySelectorAll(".book_item")
	allContainer.forEach((e) => {
		if (e[BOOK_ID] === id) {
			e.scrollIntoView()
		}
	})
}


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
		deleteBookFromList(e.target.parentElement.parentElement);
	});
};

const finishButton = () => {
	return createButton("Selesai", "finish-button", function (e) {
		moveBookToCompleteList(e.target.parentElement.parentElement);
	});
};

const updateButton = () => {
	return createButton("Update", "update-button", function (e) {
		handleUpdate(e.target.parentElement.parentElement);
	});
};

const undoButton = () => {
	return createButton("Undo", "undo-button", function (e) {
		undoBookFromCompleteList(e.target.parentElement.parentElement);
	});
};

const removeButtonInput = () => {
	return createButton("X", "clear-button", function (e) {
		handleCleanSearchedBook(e);
	});
};
