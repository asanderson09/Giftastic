$(document).ready(function () {
    displayButtons();
    console.log("linked");
// searchArr, 'searchButton', '#buttonArea'
});

var searchArr = ['Code', 'Is', 'Life'];
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
// click event listener that applies to all elements with a class of gif-btn
$(document).on('click', '.gif-btn', function () {
   // clears gifs before displaying new ones
    $('#searches').empty();
    event.preventDefault();
    // makes data type specific to the name of the button for the search 
    var type = $(this).data('type');
    console.log(type);
    // my APIKey for giphy.com
    var APIKey = 'w7h5RI5lk9DoYlu3bdcQyxHopOWWdxhz'
    
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=` + type + `&api_key=${APIKey}&limit=20`
    
    // ajax call where all the magic happens(asynchronously to be specific) 

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // once response comes 
        .then(function (response) {
            console.log(response);
            //for 
            for (var i = 0; i < response.data.length; i++) {
                //creating a new div to hold searched iteams
                var searchDiv = $('<div class="search-item">');
                //storing the rating data
                var rating = response.data[i].rating;
                //creating an element to have the rating displayed
                var p = $('<p>').text('Rating: ' + rating);
                // storing the animated gif data
                var animated = response.data[i].images.fixed_height.url;
                // storing the still gif data
                var still = response.data[i].images.fixed_height_still.url;
                // creating div for img
                var image = $('<img>');
                
                // generates still image of gif
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

// animate or still gifs   

$(document).on('click','.searchImage', function(){
    var state = $(this).attr('data-state');
    // if the state of the image is still, then the click will animate it
    if (state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } 
    // if the state of the image is animated, the click will cause it to still
    else  {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');

    }
})

























