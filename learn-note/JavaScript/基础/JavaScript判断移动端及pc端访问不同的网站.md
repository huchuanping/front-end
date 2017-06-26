
现在很多网站都是分为两个版本，一个pc端的一个移动端的(响应式除外)，针对这两个版本，就需要对访问的设备进行判断，如果是pc，就直接访问pc网站，否则就访问移动端网站。

对于这个问题可以通过判断UA来解决，前端js可以判断，后端判断也行，这里我们主要讨论的是如何通过js来处理。

假如我们有一个网站，pc端通过www.test.com访问，而移动端通过m.test.com来访问。我们需要做的就是当移动端访问www.test.com时可以直接跳转到m.test.com。此时我们只需这样处理就可以了，在页面头部加入如下js代码：
`
(function () {
    var url = location.href;
    // replace www.test.com with your domain
    if ( (url.indexOf('www.test.com') != -1) && navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i) ) {
        location.href = 'http://m.test.com';
    }
})();
`
但是，多数情况下不止这么简单地直接从www.test.com跳转到m.test.com。我们网站除了主机名部分，后面跟的还有，比如：www.test.com/list/98/，对于这样一个url，PC就直接这样访问了，对于移动端，需要通过m.test.com/list/98/才可以呈现出比较好的效果。

那么，此时就可以用正则来处理，当移动端访问时，我们把“http：//www”替换为“http：//m”(冒号为英文冒号)，然后更新页面就可以看到页面在移动端上呈现的效果了。具体代码如下：
    `
    (function () {
        var url = location.href;
        // replace www.test.com with your domain
        if ( (url.indexOf('www.test.com') != -1) && navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i) ) {
            var newUrl = url.replace('http://www', 'http://m');
            location.href = newUrl;
        }
    })();`