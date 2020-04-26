~function (window) {
    class Subscribe {
        constructor() {
            this.pond = [];

        }

        add(fn) {//fn增加的方法
            let pond = this.pond,
                isExist = false;
            pond.forEach(item => {
                item === fn ? isExist = true : null;
            })
            !isExist ? pond.push(fn) : null;
        }

        remove(fn) {
            let pond = this.pond;

            pond.forEach((item, index) => {
                if (item === fn) {
                    // pond.splice(index,1) splice删除后改变原有数组
                    //让当前项为null
                    pond[index] = null;
                }
            })
        }
        /**
         * 依次执行pond中方法，如果传递参数依次赋值
         **/
        fire(...arg) {
            let pond = this.pond;
            for (let i = 0; i < pond.length; i++) {
                let item = pond[i];
                if (item === null) {
                    pond.splice(i,1);
                    i--;
                    continue;
                }
                item(...arg);
            }
         
        }

    }

    window.Subscribe = Subscribe;
}(window)

export default Subscribe;