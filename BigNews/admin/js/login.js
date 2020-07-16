$(document).ready(function () {
    $('.input_sub').click(function (e) {
        e. //阻止默认事件
        //preventDefault()[dom标准写法(ie678不兼容)]
        //ie678用returnValue
        //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
        preventDefault()
        let username = $('.input_txt').val()
        let password = $('.input_pass').val()

        if (username.length == 0 || password.length == 0) {
            $('.modal-body>p').text('用户名或密码不能为空')
            $('#myModal').modal()
        }
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username,
                password
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    $('.modal-body>p').text('登录成功')
                    $('#myModal').modal()
                    localStorage.setItem('token', backData.token)
                    $('.btn-success').click(function () {
                        location.href = 'index.html'
                    })
                } else if (backData.code == 400) {
                    $('.modal-body>p').text('用户名或密码输入错误')
                    $('#myModal').modal()
                }

            }
        });

    })
})