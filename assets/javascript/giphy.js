$(document).ready(function () {
     displayButtons(searchArr, 'searchButton', '#buttonArea');
     console.log("linked");
   
});
    var searchArr = ['Dog', 'Cat', 'Bird'];

    function displayButtons(searchArr, classToAdd, areaToAddTo) {
       
        $(areaToAddTo).empty();
        for ( i = 0; i < searchArr.length; i++) {
            var a = $('<button>');
            a.addClass(classToAdd);
            a.attr('data-type', searchArr[i]);
            a.text(searchArr[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on('click', '.searchButton', function () {
        var type = $(this).data('type');
        console.log(type);
        var APIKey = 'w7h5RI5lk9DoYlu3bdcQyxHopOWWdxhz'
        var queryURL = `http://api.giphy.com/v1/gifs/search?q=` + type + `&api_key=${APIKey}&limit=20`
        $.ajax ({ 
            url: queryURL, 
            method: 'GET' })
            .then(function (response) {
                console.log(response);
                for(var i = 0; i<response.data.length;i++){
                    var searchDiv = $('<div class="search-item">');
                    var rating =response.data[i].rating;
                    var p = $('<p>').text('Rating: '+rating);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url;
                    var image = $('<img>');
                    image.attr('src',still);;
                    image.attr('data-still',still);
                    image.attr('data-animated',animated);
                    image.attr('data-state', 'still');
                    image.addClass('searchImage');
                    searchDiv.append(p);
                    searchDiv.append(image);
                    $('#searches').append(searchDiv);
                }

            })

    })


































