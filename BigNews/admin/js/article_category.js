$(document).ready(function () {
    // 1.渲染
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $('table>tbody').html(template('cat_list', backData));
        }
    });

    // 点击×或者取消清除form表单内的value
    $('.btn-default,.close').click(function () {
        $('.modal-body>form')[0].reset()
    })

    // 编辑和新增
    $('#myModal').on('show.bs.modal', function (e) {
        console.log($(e.target));
        if ($(e.relatedTarget).text() == '新增分类') {
            $('#exampleModalLabel').text('新增分类')
            $('.btn-primary').text('新增')
        } else {
            $('#exampleModalLabel').text('编辑分类')
            $('.btn-primary').text('编辑')
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // 给编辑按钮设置一个data-id值
            $('.btn-primary').attr('data-id', $(e.relatedTarget).data('id'))
        }
    })

    // 删除
    $('table>tbody').on('click', '.btn-del', function () {
        let id = $(this).data('id')
        // 删除ajax请求
        add_Edit_Del_Ajax(BigNew.category_delete, id, '', '', 204)
    })

    // 点击确定发送ajax编辑请求
    $('.btn-primary').click(function () {
        // 获取name, slug的value值
        console.log($(this).text() == '编辑');
        if ($(this).text() == '编辑') {
            let [name, slug] = [$('#recipient-name').val(), $('#message-text').val()]
            add_Edit_Del_Ajax(BigNew.category_edit, $(this).data('id'), name, slug, 200)
        } else {
            let [name, slug] = [$('#recipient-name').val(), $('#message-text').val()]
            add_Edit_Del_Ajax(BigNew.category_add, '', name, slug, 201)
        }
    })


    // 新增、编辑和删除ajax请求函数封装
    function add_Edit_Del_Ajax(url, id, name, slug, code) {
        $.ajax({
            url,
            type: 'post',
            dataType: 'json',
            data: {
                id,
                name,
                slug
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == code) {
                    alert(backData.msg)
                    location.href = 'article_category.html'
                } else {
                    alert(backData.msg)
                }
            }
        });
    }

})