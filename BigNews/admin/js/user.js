$(document).ready(function () {
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $('.user_pic').attr('src', backData.data.userPic);
            for (let i in backData.data) {
                $('.' + i).val(backData.data[i])
            }
        }
    });

    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        let file = this.files[0];
        //1.3 将文件转为src路径
        let url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    $('.btn-edit').click(function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        let fd = new FormData($('form')[0])
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功')
                    window.parent.location.reload()
                } else {
                    alert(backData.msg);
                }

            }
        });
    });
})