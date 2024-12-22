
const backgrounds = [
    'url("IMG/BG1.jpg")',
    'url("IMG/BG2.png")',
    'url("IMG/BG3.jpg")',
    'url("IMG/BG4.jpg")'
];

let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % backgrounds.length; // Переключение индекса
    document.body.style.backgroundImage = backgrounds[currentIndex];
},5000)


function sendMSG(){
    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;
    if (text !== '') {
        $.ajax({
            url: 'http://gruzilkins.com.swtest.ru/PHP/send.php',
            method: 'post',
            dataType: 'html',
            data: { name : name, text : text.toString() },
            success: function (data) {
                //alert(data);
                alert("Спасибо за отзыв!");window.location.reload();
            },
            error: function (jqXHR, exception) {
                if (jqXHR.status === 0) { alert('Not connect. Verify Network.'); }
                else if (jqXHR.status === 404) { alert('Requested page not found (404).'); }
                else if (jqXHR.status === 500) { alert('Internal Server Error (500).'); }
                else if (exception === 'parsererror') { alert('Requested JSON parse failed.'); }
                else if (exception === 'timeout') { alert('Time out error.'); }
            else if (exception === 'abort') { alert('Ajax request aborted.'); }
                else {
                    //alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        });
    }
}

CommentsUpdate();
function CommentsUpdate() {
    const commentsDiv = document.getElementById('commentsDiv');
    commentsDiv.innerHTML = '';
    fetch('http://gruzilkins.com.swtest.ru/PHP/get_comments.php') // Запрос к PHP-скрипту для получения комментариев
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.comments.forEach(comment => {
                    console.log(comment.date + comment.name + ': ' + comment.text);
                    commentsDiv.innerHTML += '<div class="comment">\n' +
                        '                    <div class="comment-header">\n' +
                        '                        <span class="comment-author">'+comment.name+'</span>\n' +
                        '                        <span class="comment-date">'+comment.date+'</comm></span>\n' +
                        '                    </div>\n' +
                        '                    <p class="comment-text">'+comment.text+'</p>\n' +
                        '                </div>';

                })
            } else {
                //console.error('Ошибка при получении комментариев:', data.message);
            }
        })
        .catch(error => {
            //console.error('Ошибка:', error);
            // Можно отобразить сообщение об ошибке пользователю
        });
}
