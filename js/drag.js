import Subscribe from "./subscribe.js"
~function (window) {
    if (typeof Subscribe === "undefined") {
        throw new SyntaxError("Subscribe没有")
    }
    class Drag extends Subscribe {
        constructor(ele) {
            super();
            this.ele = ele;
            ["startX", "startY", "startL", "startT", "curL", "curT"].forEach(item => {
                this[item] = null;
            })
            // 发布订阅
            this.subDown=new Subscribe();
            this.subMove=new Subscribe();
            this.subUp=new Subscribe();
            //drag-start
            this.DOWN = this.down.bind(this);
            this.ele.addEventListener("mousedown", this.DOWN);
        }

        down(ev) {
            let ele = this.ele;
            this.startX = ev.clientX;
            this.startY = ev.clientY;
            this.startL = parseFloat(ele.style.left);
            this.startT = parseFloat(ele.style.top);

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);

            document.addEventListener("mousemove", this.MOVE);
            document.addEventListener("mouseup", this.UP);
           
            this.subDown.fire(ele, ev);
        }

        move(ev) {

            let ele = this.ele;
            let curL = ev.clientX - this.startX + this.startL;
            let curT = ev.clientY - this.startY + this.startT;

            ele.style.left = curL + "px";
            ele.style.top = curT + "px";
            this.subMove.fire(ele, ev);
        }

        up(ev) {
            document.removeEventListener("mousemove", this.MOVE);
            document.removeEventListener("mouseup", this.UP);

            this.subUp.fire(this.ele,ev)
        }
    }

    window.Drag = Drag;
}(window)


export default Drag;