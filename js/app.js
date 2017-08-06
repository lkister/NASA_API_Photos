$(function() {
    var sectionOne = $(".section-one");
    var sectionTwo = $(".section-two");
    var background = $("#background");
    var loader = $(".section-one-loader");
    var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=mWZ0yH6G7iAdrnzep1CMSK6TwMSdLd0e4Ul7g32a";
    var marsPhotos = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=mWZ0yH6G7iAdrnzep1CMSK6TwMSdLd0e4Ul7g32a";

    $.ajax({
        url: nasaUrl,
    }).done(function(resp) {
        background.attr("src", resp.hdurl);
        $(".apod-description h3").text(resp.title);
        $(".apod-p").text(resp.explanation);
        $(".apod-description span").text(resp.date);
        var showDesc = $(".show-desc");
        showDesc.show();
        sectionOne.show();
        loader.hide();
        showDesc.on("click", function(event) {
            $(".apod-p").toggle("slow");
        })
    }).fail(function(error) {
        var errorMessage = $("<p>Loading failed. Check your Internet connection and try again</p>");
        loader.hide();
        sectionOne.before(errorMessage);
        console.log(error);
    })

    $.ajax({
        url: marsPhotos,
    }).done(function(resp) {
        var counter = 6;
        var container = $(".container");
        var imageSmall = $(".image-small img");
        for (var i = 0; i < 6; i++) {
            imageSmall.eq(i).attr("src", resp.photos[i].img_src);
            $(".image-small-loader").hide();
            $(".image-small").show();
        }
        var button = $("<a class='btn btn-primary btn-lg show-more'>Show more</a>");
        container.append(button);
        container.on("click", ".btn", function() {
            $(this).remove();
            // var imageSmallLoader = $("<div class='section-one-loader'></div>");
            // var loaderSmall = $("<div class='loader'></div>");
            // imageSmallLoader.append(loaderSmall);
            // container.append(imageSmallLoader);
            var rows = $("<div class='row'></div>");
            for (var i = 0; i < 3; i++) {
                var columns = $("<div class='col-md-4 col-xs-12'></div>");
                for (var j = 0; j < 2; j++) {
                    var imageSmallCreate = $("<div class='image-small-visible thumbnail'></div>");
                    var imageCreate = $("<img>");
                    imageCreate.attr("src", resp.photos[counter].img_src);
                    counter++;
                    imageSmallCreate.append(imageCreate);
                    imageSmallCreate.show();
                    columns.append(imageSmallCreate);
                }
                rows.append(columns);
            }
            container.append(rows);
            container.append(button);
            $(".section-one-loader").hide("slow");
        }).on("click", "img", function() {
            var url = $(this).attr("src");
            var imageFullScreen = $(".image-full-screen");
            imageFullScreen.children().attr("src", url);
            imageFullScreen.fadeIn("slow");
            imageFullScreen.on("click", function() {
                imageFullScreen.fadeOut("slow");
            })
        });
    })
});