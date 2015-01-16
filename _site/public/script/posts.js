$(function() { 
    $(".post").on("click", function() { 
        console.log("click");
        var url = $(this).find("a").attr("href");
        window.location = url;
    });
});