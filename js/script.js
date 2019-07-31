// tampung OMDB api key
const apikey = '768264cb';

// siapkan komponen DOM
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');

// siapkan ajax request
const xhttp = new XMLHttpRequest();

// event tombol search di klik
searchButton.addEventListener('click', () => {
  // panggil fungsi searchMovie
  searchMovie();
});

// event saat input search movie di enter
searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode == 13) {
    // panggil fungsi searchMovie
    searchMovie();
  }
})

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
                <a href="${data.imdbID}" class="btn btn-primary mt-3">See Detail!</a>
              </div>
            </div>
          </div>`;
}