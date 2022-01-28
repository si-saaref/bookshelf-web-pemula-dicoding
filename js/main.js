window.addEventListener("load", function () {
	const submitForm = document.getElementById("inputBook");
	submitForm.addEventListener("submit", function (e) {
		e.preventDefault();
		if (isUpdate) {
			updateBookToList();
		} else {
			addBookToList();
		}
	});
	
	const buttonSearch = document.getElementById("searchSubmit");
	buttonSearch.addEventListener("click", function (e) {
		e.preventDefault();
		searchBookFunction(); 
		const inputBox = document.getElementById("input-box");
		const buttonRemoveClass = removeButtonInput()
		inputBox.append(buttonRemoveClass)
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
