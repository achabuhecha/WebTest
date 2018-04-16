$(function () {
    /**
     * 我的/音乐馆/发现--导航
     */
    $("header .divOfALink a").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(".bodyer").empty();
        $(".bodyer").load($(this).attr("data-src"));
    })
})