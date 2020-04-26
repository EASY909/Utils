~function (window) {

    let emptyFn = function emptyFn() {

    }
    class DragPlugin {
        constructor(ele, options = {}) {

            if (typeof ele === "undefined" || ele.nodeType !== 1) {
                throw new SyntaxError("第一个参数必传")
            }

            let {
                selector = ele,
                dragstart = emptyFn,
                draging = emptyFn,
                dragend = emptyFn
            } = options;
            this.ele = ele;
            this.dragTarget = selector;
            if (typeof selector === "string") {
                //传递选择器，通过selector拖拽
                this.dragTarget = ele.querySelector(selector);
            }

            this.dragstart = dragstart;
            this.draging = draging;
            this.dragend = dragend;

            //拖拽方法中的this就是当前实例
            this.dragTarget.addEventListener("mousedown", this.down.bind(this))
        }

        down(ev) {
            this.startX = ev.clientX;
            this.startY = ev.clientY;
            this.startL = parseFloat(this.ele.style.left);
            this.startT = parseFloat(this.ele.style.top);

            this.DRAG_MOVE = this.move.bind(this);
            this.DRAG_UP = this.up.bind(this);
            
            document.addEventListener("mousemove", this.DRAG_MOVE);
            document.addEventListener("mouseup", this.DRAG_UP);
            this.dragstart()
        }

        move(ev) {
            let {
                startX,
                startY,
                startL,
                startT
            } = this;
            //边界
            // let minL = 0,
            //     minT = 0,
            //     maxL = winW - boxW,
            //     maxT = winH - boxH;
            let curL = ev.clientX - startX + startL;
            let curT = ev.clientY - startY + startT;
            // curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
            // curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

            this.ele.style.left = curL + "px";
            this.ele.style.top = curT + "px";
            
            this.curL=curL;
            this.curT=curT;
            this.draging()
        }

        up() {
            document.removeEventListener("mousemove", this.DRAG_MOVE);
            document.removeEventListener("mouseup", this.DRAG_UP);
            this.dragend()
        }
    }



    window.DragPlugin = DragPlugin;
}(window)

