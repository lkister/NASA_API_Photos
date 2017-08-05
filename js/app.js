$(function() {
    var sectionOne = $(".section-one");
    var sectionTwo = $(".section-two");
    var background = $("#background");
    var loader = $(".section-one-loader");
    var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=mWZ0yH6G7iAdrnzep1CMSK6TwMSdLd0e4Ul7g32a";
    var marsPhotos = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=mWZ0yH6G7iAdrnzep1CMSK6TwMSdLd0e4Ul7g32a";
    $.ajax({
        url: marsPhotos,
    }).done(function(resp) {
        var index = Math.floor(Math.random() * resp.photos.length);
        background.attr("src", resp.photos[index].img_src);
        sectionOne.show();
        loader.hide();
    }).fail(function(error) {
        var errorMessage = $("<p>Loading failed. Check your Internet connection and try again</p>");
        loader.hide();
        sectionOne.before(errorMessage);
        console.log(error);
    })

    // $.ajax({
    //     url: nasaUrl,
    // }).done(function(resp) {
    //     background.attr("src", resp.hdurl);
    // })

    $.ajax({
        url: marsPhotos,
    }).done(function(resp) {
        var counter = 6;
        for (var i = 0; i < 6; i++) {
            var image = $("<image class='mars-photo'>");
            image.attr("src", resp.photos[i].img_src);
            sectionTwo.append(image);
        }
        var button = $("<a class='btn btn-primary btn-lg'>Show more</a>");
        sectionTwo.append(button);
        sectionTwo.on("click", ".btn", function() {
            console.log("działa");
            $(this).remove();
            for (var i = counter; i < counter + 6; i++) {
                var image = $("<image class='mars-photo'>");
                image.attr("src", resp.photos[i].img_src);
                sectionTwo.append(image);
            }
            counter += 6;
            sectionTwo.append(button);
        })
    })
});