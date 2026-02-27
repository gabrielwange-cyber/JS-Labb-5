
// This file contain the most importent part for the remove function to even work it gets the two values witch is category and the book itself 
// It then uses these to easily locate the json file and remove the coresponding book from that file


function Remove_json() {
    var category = document.getElementById('category').value;
    var book = document.getElementById('books').value;

    if (!category || !book) {
        alert('Please select a category and a book before removing.');
        return;
    }

    var form = new FormData();
    form.append('category', category);
    form.append('book', book);

    fetch('/removejson', { method: 'DELETE', body: form })
        .then(response => {
            if (response.ok) {
                // clear the selections
                document.getElementById('books').innerHTML = '';

                alert('Book removed successfully');
            } else {
                return response.json().then(data => { throw data; });
            }
        })
        .catch(error => {
            console.error('Error removing JSON:', error);
            alert('Failed to remove book: ' + (error.error || error));
        });
}


async function Get_Catagory_list() {
    // fetch the list of category names from the json files 
    // We use the endpoint to executed lines of python to get the information we wish to use
    var response = await fetch('/categories');
    var data = await response.json();
    console.log('categories:', data);

    var select = document.getElementById("category");
    data.forEach(name => {
        var option = document.createElement("option");
        option.text = name;
        option.value = name;
        select.add(option);
    });
}

async function Get_Book_list() {
    // determine which category is selected
    var categorySelect = document.getElementById("category");
    var chosen = categorySelect.value;
    if (!chosen) {
        // nothing selected yet, clear books list
        document.getElementById('books').innerHTML = '';
        return;
    }


    var form = new FormData();
    form.append('category', chosen);
    var response = await fetch('/BooksinCatagory', { method: 'POST', body: form });
    var data = await response.json();

    var booksSelect = document.getElementById('books');
    booksSelect.innerHTML = ''; // clear previous options
    if (data.books && Array.isArray(data.books)) {
        data.books.forEach(book => {
            var option = document.createElement('option');
            option.text = book.title;
            option.value = book.title;
            booksSelect.add(option);
        });
    }
}


// auto‑populate categories on page load
window.addEventListener('DOMContentLoaded', Get_Catagory_list);