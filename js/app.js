$(function() {
    var $mainC = $("#mainC");

    showBooks($mainC);

    $mainC.on("click", ".titleC", function() {
        var bookId = $(this).data("id");
        var $descriptionC = $(this).next();
        if ($descriptionC.css("display") == "none") {
            showBook($descriptionC, bookId);
        }
        $descriptionC.toggle(1000);
    })

    $("#formC button").on("click", function() {
        var book = {"id": "0",
                    "isbn":$("#isbn").val(),
                    "title":$("#title").val(),
                    "author":$("#author").val(),
                    "publisher":$("#publisher").val(),
                    "type":$("#type").val()}
        $.ajax({
            url: "http://localhost:8282/books",
            data: JSON.stringify(book),
            contentType: 'application/json',
            type: "post",
            dataType: "json"
        }).done(function(result) {
            console.log(result);
            showBooks($mainC);
        }).fail(function(xhr,status,err) {
            console.log(xhr + " : " + status + " : " + err);
        }).always(function(xhr,status) {
        });
        return false;
    })
})

// Pobranie listy książek
function showBooks($mainC) {
    $mainC.empty();
    $.ajax({
        url: "http://localhost:8282/books",
        data: {},
        type: "get",
        dataType: "json"
    }).done(function(result) {
        for (var i = 0; i < result.length; i++) {
            var book = result[i];
            $("<div class='titleC'>").data("id", book.id).html(book.title).appendTo($mainC);
            $("<div class='descriptionC'>").hide().appendTo($mainC);
        }
    }).fail(function(xhr,status,err) {
        console.log(xhr + " : " + status + " : " + err);
    }).always(function(xhr,status) {
    });
}

// Pobranie pojedyńczej ksiązki
function showBook($descriptionC, bookId) {
    $.ajax({
        url: "http://localhost:8282/books/"+bookId,
        data: {},
        type: "get",
        dataType: "json"
    }).done(function(book) {
        $descriptionC.html("ISBN: " + book.isbn + "<br>"
            + "Tytuł: " + book.title + "<br>"
            + "Autor: " + book.author + "<br>"
            + "Wydawca:" + book.publisher + "<br>"
            + "Kategoria: " + book.type);
    }).fail(function(xhr,status,err) {
        console.log(xhr + " : " + status + " : " + err);
    }).always(function(xhr,status) {
    });
}