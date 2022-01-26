window.addEventListener("load", function () {
	const submitForm = document.getElementById("inputBook");

	submitForm.addEventListener("submit", function (e) {
		e.preventDefault();
		addBookToList();
	});

	const buttonSearch = document.getElementById("searchBook");

	buttonSearch.addEventListener("submit", function (e) {
		e.preventDefault();
		searchBookFunction();
	});

	if (isStorageExist()) {
		getBookFromLocalStorage();
	}
});

document.addEventListener("onPostBook", function () {
	console.log("Berhasil mengubah data");
});

document.addEventListener("onGetBook", function () {
	refreshDataBookFromBooks();
});
