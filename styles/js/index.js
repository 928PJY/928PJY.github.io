$(document).ready(function () {
    $("button").click(function () {
        var request = {
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
            data: JSON.stringify(request),
            success: function (msg) {
                console.log('succes: ' + msg);
                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        })
    })
});

function refreshIframe(content) {
    var doc = document.getElementById("output").contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();
}