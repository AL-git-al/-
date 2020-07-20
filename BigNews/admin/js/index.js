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

    $('.level01').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.level02>li').removeClass('active')
        if ($(this).index() == 1) {
            $('.level01:eq(1)>a>b').toggleClass('active')
            $('.level02').slideToggle()
            $('.level02>li').click(function () {
                $(this).addClass('active').siblings().removeClass('active')
            })
            $('.level02>li:eq(0) a')[0].click()
        }
    })

    $('.user_center_link>a:eq(0)').click(function () {
        $('.level01:eq(3) a')[0].click()
    })
})