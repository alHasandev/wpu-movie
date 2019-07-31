// tampung OMDB api key
const apikey = '768264cb';

// siapkan komponen DOM
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
const modalBody = document.getElementById('modal-body');

// siapkan object XMLHttpRequest
const xhttp = new XMLHttpRequest();

// event tombol search di klik
searchButton.addEventListener('click', () => {
  // panggil fungsi searchMovie
  searchMovie();
});

// event saat input search movie di enter
searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    // panggil fungsi searchMovie
    searchMovie();
  }
});

// event saat item dalam div movie-list di klik
movieList.addEventListener('click', (event) => {
  // reset modal body
  modalBody.innerHTML = '...';

  // siapkan properti movie
  const movie = event.target;
  const dataId = movie.getAttribute('data-id');
  const url = 'http://www.omdbapi.com/?apikey=' + apikey + '&i=' + dataId;

  // ambil response ajax jika request ajax sukses
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // tampung hasil request
      const movie = JSON.parse(this.responseText);

      // tampilkan detail movie pada modal body
      modalBody.innerHTML = getModalBody(movie);
    }
  }

  // kirim request ajax
  xhttp.open('GET', url, true);
  xhttp.send();
});


// fungsi memulai pencarian movie
const searchMovie = () => {
  // reset DOM movieList
  movieList.innerHTML = '';

  // siapkan url untuk request ke OMDB api
  const url = 'http://www.omdbapi.com?apikey=' + apikey + '&s=' + searchInput.value;

  // ambil response ajax jika request ajax sukses
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const result = JSON.parse(this.responseText);

      if (result.Response == 'True') {

        // tampung hasil pencarian
        const search = result.Search;
        search.forEach(data => {
          movieList.innerHTML += getMovie(data);
        });
      } else {
        movieList.innerHTML = '<div class="col"><h2 class="text-center">' + result.Error + '</h2></div>';
      }
    }
  }

  // kirimkan request ajax
  xhttp.open('GET', url, true);
  xhttp.send();

  // reset DOM searchInput
  searchInput.value = '';
}

// event tombol search di klik dengan ajax
// $('#search-button').on('click', function (e) {

//   $.ajax({
//     url: 'http://www.omdbapi.com',
//     type: "get",
//     data: {
//       'apikey': apikey,
//       's': $('#search-input').val()
//     },
//     dataType: "json",
//     success: function (result) {
//       const search = result.Search;

//       $('#movie-list').html('');
//       $.each(search, function (index, data) {
//         $('#movie-list').append(getMovie(data));
//       });
//     }
//   });
// });



// buat komponen movie
const getMovie = (data) => {
  return `<div class="col-lg-4 col-md-6">
            <div class="card mb-3">
              <img src="${data.Poster}" alt="No Image" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${data.Type}, ${data.Year}</h6>
                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#movie-modal" data-id="${data.imdbID}">See Detail!</a>
              </div>
            </div>
          </div>`;
}

// buat konponen modal body
const getModalBody = (data) => {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${data.Poster}" alt="No Image" class="img-fluid">
              </div>
              <div class="col-md-8">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <h3>${data.Title}</h3>
                  </li>
                  <li class="list-group-item">
                    Released : ${data.Released}
                  </li>
                  <li class="list-group-item">
                    Genre : ${data.Genre}
                  </li>
                  <li class="list-group-item">
                    Director : ${data.Director}
                  </li>
                  <li class="list-group-item">
                    Actors : ${data.Actors}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}