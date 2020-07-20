$(document).ready(function () {

    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData)
            $('#selCategory').html(template('render', backData))
        }
    });


    $('.btn-shaixuan').click(function (e) {
        //阻止默认事件
        //preventDefault()[dom标准写法(ie678不兼容)]
        //ie678用returnValue
        //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
        e.preventDefault()
        console.log($('#selCategory').val());
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: 22,
                perpage: 10
            },
            success: function (backData) {
                console.log(backData);
                $('.mp20>tbody').html(template('article', backData))

                $('#pagination').twbsPagination('destroy');
                // 加载分页插件
                $('#pagination').twbsPagination({
                    totalPages: backData.data.totalPage,
                    startPage: 1,
                    visiblePages: 7,
                    first: '首页',
                    prev: '上一页',
                    next: '下一页',
                    last: '尾页',
                    onPageClick: function (event, page) {
                        $('#page-content').text('Page ' + page);
                        getArticleList(page)
                    }
                });


            }
        });
    })

    $('.btn-shaixuan').click()

    // 页码点击事件:点击页码,请求对应页的数据
    function getArticleList(currentPage) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                console.log(backData);
                //模板引擎渲染页面
                $('table>tbody').html(template('article', backData));
            }
        });
    };


    // 删除
    $('table>tbody').on('click', '.btn-delete', function () {
        let id = $(this).data('id')

        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 204) {
                    alert('删除成功');
                    location.reload()
                }
            }
        });
    })


    $('#release_btn').click(function () {
        window.parent.$('.menu .level02 li').eq(1).addClass('active').siblings().removeClass('active')
    })
})