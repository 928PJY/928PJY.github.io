$(document).ready(function () {
    $("button").click(function () {
        var markupRequest = {
            "markdown_content": document.getElementById("in").innerText,
            "repository_url": "https://github.com",
            "branch": "master",
            "relative_path": "index.md",
            "depot_name": "test"
        };

        $.ajax({
            type: "POST",
            url: "https://localhost/openpublishing/api/markup",
            headers: {
                "Content-Type": "application/json",
                "X-OP-BuildUserToken": "517d6ba5-48d2-47e6-9739-f1a4b69d9dcf"
            },
            data: JSON.stringify(markupRequest),
            success: function (msg) {
                console.log('succes: ' + msg);
                callRender(msg);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        })
    })
});

function callRender(markupResult){
    var rawJson = {
        "content": markupResult,
        "rawMetadata": {
            "layout": "Conceptual",
            "fileRelativePath": "index.html",
        },
        "themesRelativePathToOutputRoot": "_themes/"
    }

    var renderRequest = {
        "html_content": JSON.stringify(rawJson),
        "is_online_preview": false,
        "repository_url": "https://github.com",
        "branch": "master",
        "relative_path": "index.md",
        "depot_name": "test",
        "locale": "en-us"
    }

    $.ajax({
            type: "POST",
            url: "https://localhost/openpublishing/api/render",
            headers: {
                "Content-Type": "application/json",
                "X-OP-BuildUserToken": "517d6ba5-48d2-47e6-9739-f1a4b69d9dcf"
            },
            data: JSON.stringify(renderRequest),
            success: function (msg) {
                console.log('succes: ' + msg);
                refreshIframe(msg);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        })
}

function refreshIframe(content) {
    var doc = document.getElementById("output").contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
}