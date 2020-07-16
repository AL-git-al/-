$(document).ready(function () {
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic);
            $('.user_info>span').text('欢迎  ' + backData.data.nickname)
        }
    });

    $('.logout').click(function () {
        localStorage.clear()
        location.href = 'login.html'
    })

})