const LOCAL_STORAGE_KEY = "BOOK_APPS";

let books = [];

const isStorageExist = () => {
	if (typeof Storage === undefined) {
		return false;
	}
	return type;
};

const addBookToLocalStorage = () => {
	const bookPost = JSON.stringify(books);
	localStorage.setItem(LOCAL_STORAGE_KEY, bookPost);
	document.dispatchEvent(new Event("onAddBook"));
};

const getBookFromLocalStorage = () => {
	const bookGet = localStorage.getItem(LOCAL_STORAGE_KEY);
	let data = JSON.parse(bookGet);
	if (data !== null) {
		books = data;
	}
	document.dispatchEvent(new Event("onGetBook"));
};

const updateDataBook = () => {
	if (isStorageExist()) {
		addBookToList();
	}
};

const composedDataBook = (bookTitle, bookAuthor, bookYear, isComplete) => {
	return {
		id: +new Date(),
		bookTitle,
		bookAuthor,
		bookYear,
		isComplete,
	};
};

const findBook = (bookId) => {
	for (book of books) {
		if (book.id === bookId) {
			return book;
		}
	}
	return null;
};

const findBookIndex = (bookId) => {
	let index = 0;
	for (book of books) {
		if (book.id === bookId) {
			return index;
		}
		index++;
	}
	return -1;
};

const refreshDataBookFromBooks = () => {
	let listUnfinish = document.getElementById(UNFINISH_BOOK);
	let listFinish = document.getElementById(FINISH_BOOK);

	for (book of books) {
		const newBook = createContainer(
			book.bookTitle,
			book.bookAuthor,
			book.bookYear,
			book.isComplete
		);
		newBook[BOOK_ITEM_ID] = book.id;

		if (book.isComplete) {
			listFinish.append(newBook);
		} else {
			listUnfinish.append(newBook);
		}
	}
};
