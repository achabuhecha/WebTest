/*
    懒加载方式1
*/
/*
window.onload = function () {

    var scrollTop = window.scrollY;
    var imgs = Array.from(document.querySelectorAll('img'));
    lazyLoad();
    let canRun = true; //开关变量用于函数节流
    window.addEventListener('scroll', throttle(lazyLoad, 500));



    //定义懒加载函数 , 从上到下懒加载 , 从下到上也是懒加载
    function lazyLoad() {
        imgs.forEach((item, index) => {
            if (scrollTop === 0 && item.dataset.src !== '' && item.offsetTop < window.innerHeight +
                scrollTop) {
                // alert()
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            } else if (item.dataset.src !== '' && item.offsetTop < window.innerHeight + scrollTop &&
                item.offsetTop > scrollTop) {
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            }
        })
    }


    //定义函数节流函数
    function throttle(fun, delay) {
        return function () {
            // fun();
            if (!canRun) {
                return
            }
            console.log('!!!')
            canRun = false;
            setTimeout(() => {
                scrollTop = window.scrollY;
                fun(imgs);
                canRun = true
            }, delay)
        }
    }

}
*/
/*
    懒加载方式2
*/
/*
window.onload = function () {
    var scrollTop = window.scrollY;
    var imgs = Array.from(document.querySelectorAll('img'));
    lazyLoad();

    window.onscroll = () => {
        scrollTop = window.scrollY;
        lazyLoad();
    }

    function lazyLoad() {
        imgs.forEach((item, index) => {
            if (item.offsetTop < window.innerHeight + scrollTop) {
                console.log(item.offsetTop)
                item.setAttribute('src', item.dataset.src)
            }
        })
    }
}
*/

/*
懒加载方式3
*/
window.onload = function () {

    var scrollTop = window.scrollY;
    var imgs = Array.from(document.querySelectorAll('img'));
    lazyLoad();
    // 采用了节流函数
    window.addEventListener('scroll', throttle(lazyLoad, 50, 1000));

    function throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {

            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            console.log(curTime - startTime)
            if (curTime - startTime >= time) {
                fun();
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(fun, delay);
            }
        };
    };
    // 实际想绑定在 scroll 事件上的 handler
    // 需要访问到imgs ,  scroll 
    function lazyLoad() {
        scrollTop = window.scrollY;
        imgs.forEach((item, index) => {
            if (scrollTop === 0 && item.dataset.src !== '' && item.offsetTop < window.innerHeight +
                scrollTop) {
                // alert()
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            } else if (item.dataset.src !== '' && item.offsetTop < window.innerHeight + scrollTop &&
                item.offsetTop > scrollTop) {
                item.setAttribute('src', item.dataset.src)
                item.setAttribute('data-src', '')
            }
        })
    }

}