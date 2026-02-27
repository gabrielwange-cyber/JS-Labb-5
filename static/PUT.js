function Updatebook() {
    var new_cata = document.getElementById('new_cata').value;
    var new_title = document.getElementById('new_title').value;
    var new_rating = document.getElementById('new_rating').value;
    var new_thumbnail = document.getElementById('new_thumbnail').value;
    var new_price_gbp = document.getElementById('new_price_gbp').value;
    var new_price_sek = document.getElementById('new_price_sek').value;

    if (!new_cata || !new_title || !new_rating || !new_thumbnail || !new_price_gbp || !new_price_sek) {
        alert("Please ensure that you inputted everything correctly")
        return;
    }
    var form = new FormData();
    form.append('new_cata', new_cata);
    form.append('new_title', new_title);
    form.append('new_rating', new_rating);
    form.append('new_thumbnail', new_thumbnail)
    form.append('new_price_gbp', new_price_gbp)
    form.append('new_price_sek', new_price_sek)

    fetch('/putjson', { method: 'PUT', body: form })
        .then(response => {
            if (response.ok) {
                document.getElementById('new_cata').innerHTML = '';
                document.getElementById('new_title').innerHTML = '';
                document.getElementById('new_rating').innerHTML = '';
                document.getElementById('new_tumbnail').innerHTML = '';
                document.getElementById('new_price_gdp').innerHTML = '';
                document.getElementById('new_price_sek').innerHTML = '';

                alert('Book has been successfuly updated');
            } else {
                alert("Failed to send infromation");
                return response.json().then(data => { throw data; });
                
            }
        })
        .catch(error => {
            console.error('Error removing JSON:', error);
            alert('Failed to remove book: ' + (error.error || error));
        });

}

