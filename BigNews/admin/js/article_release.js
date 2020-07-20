$(document).ready(function () {
    // jedate插件初始化
    jeDate("#test", {
        isinitVal: true, //初始化事件
        festival: true, //显示农历节日 
        trigger: "click", //内部触发
        format: "YYYY-MM-DD", //显示格式
        minDate: "2014-09-19 00:00:00",
        zIndex: 99999,

    })

    var E = window.wangEditor
    var editor2 = new E('#editor')
    editor2.create()




    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        let file = this.files[0];
        //1.3 将文件转为src路径
        let url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);


    })

    // 请求文章分类
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData)
            $('.category').html(template('render', backData))
        }
    });

    $('.btn-release,.btn-draft').on('click', function (e) {
        //阻止默认事件
        //preventDefault()[dom标准写法(ie678不兼容)]
        //ie678用returnValue
        //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
        e.preventDefault()
        //创建FormData对象：参数是表单dom对象

        let state = $(this).hasClass('btn-draft') ? '草稿' : '已发布'
        console.log(state);
        let fd = new FormData($('form')[0])
        // 日期
        fd.append('date', $('#test').val())
        // 内容 
        fd.append('content', $('#editor p').html())
        // 状态
        fd.append('state', state)
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('新增成功')
                    location.href = 'article_list.html'
                }
            }
        });
    });
})