$(document).ready(function () {
    displayButtons();
    console.log("linked");
// searchArr, 'searchButton', '#buttonArea'
});

var searchArr = ['Dog', 'Cat', 'Bird'];
// searchArr, classToAdd, areaToAddTo
function displayButtons() {

    $('#buttonArea').empty();
    // loopoing through array of searchArr 
    for (i = 0; i < searchArr.length; i++) {
      // dynamic creation of buttons 
        var a = $('<button>');
        // adding class of gif-btn
        a.addClass('gif-btn');
        // adding a data attribute
        a.attr('data-type', searchArr[i]);
        // initial button text
        a.text(searchArr[i]);
        // adding buttons to buttonArea div
        $('#buttonArea').append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    event.preventDefault();
    var type = $(this).data('type');
    console.log(type);
    var APIKey = 'w7h5RI5lk9DoYlu3bdcQyxHopOWWdxhz'
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=` + type + `&api_key=${APIKey}&limit=20`
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);;
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }

        })

})

$('#addGif').on('click', function () {
    event.preventDefault();
    var newSearch = $('#search-input').val().trim();
    searchArr.push(newSearch);
     displayButtons();
        console.log(searchArr); 
          

})
console.log(searchArr)


// searchArr, 'searchButton', '#buttonArea'
// return false;



























