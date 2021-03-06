const LOCAL_STORAGE_KEY = "BOOK_APPS";

let books = [];

const isStorageExist = () => {
	if (typeof Storage === undefined) {
		return false;
	}
	return true;
};

const postBookToLocalStorage = () => {
	const bookPost = JSON.stringify(books);
	localStorage.setItem(LOCAL_STORAGE_KEY, bookPost);
	document.dispatchEvent(new Event("onPostBook"));
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
		postBookToLocalStorage();
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

const searchBook = (inputTitle) => {
	let filterBook = [];
	for (book of books) {
		const inputTitleSplitted = inputTitle.toLowerCase().split(" ");
		const bookSplitted = book.bookTitle.toLowerCase().split(" ");
		for (splitBook of bookSplitted) {
			for (splitInputTitle of inputTitleSplitted) {
				if (splitInputTitle === splitBook) {
					filterBook.push(book);
				}
			}
		}
	}
	return filterBook ?? filterBook;
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
		newBook[BOOK_ID] = book.id;

		if (book.isComplete) {
			listFinish.append(newBook);
		} else {
			listUnfinish.append(newBook);
		}
	}
};
