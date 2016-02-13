function isIE() { //ie?
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1) return true;
    else return false;
}
var _ie = isIE();
(function() {
    var row = $$("mainContent"),
        total = row.getElementsByTagName("img").length,
        cells = [];
    for (var i = 0, n = total; i < n; i++) {
        var img = row.getElementsByTagName("img")[i];
        if (img) {
            //图片地址添加随机数避免缓存，可删除
            img.setAttribute("_lazysrc", img.getAttribute("_lazysrc") + "?" + Math.random());
            cells.push(img);
        }
    }
    var lazy = new ImagesLazyLoad({
        container: window,
        mode: "vertical",
        holder: "images/s.gif",
        onLoad: function(img) {
            img.onload = function() {
                showPic(this);
            }
        }
    });

    function showPic(img) {
        var t = setInterval(function() {
            var opacity = _ie ? img.filters.alpha.opacity : img.style.opacity * 100
            if (opacity < 100) {
                (_ie ? img.filters.alpha.opacity += 10 : img.style.opacity = (opacity + 10) / 100);
            } else {
                clearInterval(t);
            }
        }, 15);
    }
})();