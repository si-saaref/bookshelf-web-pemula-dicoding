window.addEventListener('load', function () {
  const submitForm = document.getElementById('inputBook')

  submitForm.addEventListener('submit', function (e) {
    e.preventDefault()
    addBookToList()
  })
})