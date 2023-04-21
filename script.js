const booksPerPage = 10;
let currentPage = 1;
let books = [];


fetch('books.json')
	.then(response => response.json())
	.then(data => {
		books = data;
		renderBooks(books);
	});
function renderBooks(books) {
	const booksList = document.getElementById('books-list');
	booksList.innerHTML = '';
	for (let i = (currentPage - 1) * booksPerPage; i < currentPage * booksPerPage && i < books.length; i++) {
		const book = books[i];
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.subject}</td>
			<td>${book.publishDate}</td>
		`;
		booksList.appendChild(tr);
	}
	renderPagination(books);
}

function renderPagination(books) {
	const pagination = document.getElementById('pagination');
	pagination.innerHTML = '';
	const totalPages = Math.ceil(books.length / booksPerPage);
	for (let i = 1; i <= totalPages; i++) {
		const page = document.createElement('div');
		page.classList.add('page');
		if (i === currentPage) {
			page.classList.add('active');
		}
		page.innerText = i;
		page.addEventListener('click', () => {
			currentPage = i;
			renderBooks(books);
		});
		pagination.appendChild(page);
	}
}


function filterBooks() {
	const searchInput = document.getElementById('search').value.toLowerCase();
	const titleFilter = document.getElementById('title-filter').value.toLowerCase();
	const authorFilter = document.getElementById('author-filter').value.toLowerCase();
	const subjectFilter = document.getElementById('subject-filter').value.toLowerCase();
	const publishFilter = document.getElementById('publish-filter').value;
	const filteredBooks = books.filter(book => {
		if (searchInput && !book.title.toLowerCase().includes(searchInput) && !book.author.toLowerCase().includes(searchInput) && !book.subject.toLowerCase().includes(searchInput)) {
			return false;
		}
		if (titleFilter && !book.title.toLowerCase().includes(titleFilter)) {
			return false;
		}
		if (authorFilter && !book.author.toLowerCase().includes(authorFilter)) {
			return false;
		}
		if (subjectFilter && !book.subject.toLowerCase().includes(subjectFilter)) {
			return false;
		}
		if (publishFilter && book.publishDate !== publishFilter) {
			return false;
		}
		return true;
	}
	);
	renderBooks(filteredBooks);
	renderCounts(filteredBooks);
}


function renderCounts(books) {
	const titleCount = document.getElementById('title-count');
	titleCount.innerText = `(${books.filter(book => book.title.toLowerCase().includes(document.getElementById('title-filter').value.toLowerCase())).length})`;
	const authorCount = document.getElementById('author-count');
	authorCount.innerText = `(${books.filter(book => book.author.toLowerCase().includes(document.getElementById('author-filter').value.toLowerCase())).length})`;
	const subjectCount = document.getElementById('subject-count');
	subjectCount.innerText = `(${books.filter(book => book.subject.toLowerCase().includes(document.getElementById('subject-filter').value.toLowerCase())).length})`;
	const publishCount = document.getElementById('publish-count');
	publishCount.innerText = `(${books.filter(book => book.publishDate === document.getElementById('publish-filter').value).length})`;
}


document.getElementById('search-btn').addEventListener('click', filterBooks);
document.getElementById('search-filter').addEventListener('keyup', filterBooks);
document.getElementById('title-filter').addEventListener('keyup', filterBooks);
document.getElementById('author-filter').addEventListener('keyup', filterBooks);
document.getElementById('subject-filter').addEventListener('keyup', filterBooks);
document.getElementById('publish-filter').addEventListener('change', filterBooks);

fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const availableBooks = data.filter(book => book.available);

  })
  .catch(error => console.error(error));


const searchInput = document.getElementById('searchInput');


searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();


  fetch('books.json')
    .then(response => response.json())
    .then(data => {

      const filteredData = data.filter(book => {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.subject.toLowerCase().includes(searchTerm) ||
          book.publishDate.toLowerCase().includes(searchTerm)
        );
      });


    })
    .catch(error => console.error(error));
});


const bookCountElement = document.getElementById('book_count');

// Load books data from JSON file
fetch('books.json')
  .then(response => response.json())
  .then(data => {
    const bookCount = data.books.length;
    bookCountElement.textContent = bookCount;
  })
  .catch(error => {
    console.error('Error fetching books data:', error);
  });
