/**
 * Created by kexiao on 16/12/7.
 */

(function (win, doc) {
    var _dest, _orgin, _cursor, _temp;

    function Drag() {

    }

    function start(e) {
        _cursor = {};
        _dest.style.cursor = 'move';
        e = e || fixEvent(window.event);
        var ex = e.pageX;
        var ey = e.pageY;
        _cursor.lastX = ex;
        _cursor.lastY = ey;
        var x = _dest.offsetLeft;
        var y = _dest.offsetTop;
        _dest.style.left = x + "px";
        _dest.style.top = y + "px";
        doc.onmouseup = end;
        doc.onmousemove = move;
    }

    function move(e) {
        e = e || Drag.fixEvent(window.event);
        var ex = e.pageX;
        var ey = e.pageY;
        var x = _dest.style.left ? parseInt(_dest.style.left) : 0;
        var y = _dest.style.top ? parseInt(_dest.style.top) : 0;
        var nx = ex - _cursor.lastX + x;
        var ny = ey - _cursor.lastY + y;
        _dest.style.left = nx > 0 ? nx > _temp.totalX ? _temp.totalX + "px" : nx + 'px' : 0;
        _dest.style.top = ny > 0 ? ny > _temp.totalY ? _temp.totalY + 'px' : ny + "px" : 0;
        _cursor.lastX = ex;
        _cursor.lastY = ey;
    }

    function end() {
        doc.onmousemove = null;
        doc.onmouseup = null;
        _dest.style.cursor = '';
        _cursor = null;
    }

    function fixEvent(e) {
        e.pageX = e.clientX + doc.documentElement.scrollLeft;
        e.pageY = e.clientY + doc.documentElement.scrollTop;
        return e;
    }

    Drag.prototype.init = function (target, root) {
        _orgin = root || doc.body;
        _dest = target;
        _dest.onmousedown = start;

        _temp = (function (_orgin, _dest) {
            var obj = {};
            obj.totalX = _orgin.offsetWidth - _dest.offsetWidth;
            obj.totalY = _orgin.offsetHeight - _dest.offsetHeight;
            return obj;
        })(_orgin, _dest);

    }
    var drag = new Drag();
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = drag;
    } else {
        win.drag = drag;
        if (typeof define === 'function' && define.amd) {
            define('drag', [], function () {
                return drag;
            });
        }
    }
})(window, document);