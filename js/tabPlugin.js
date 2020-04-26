(function (window) {

    class TabPlugin {
        constructor(container, options = {}) {

            if (typeof container === "undefined" || container.nodeType !== 1) {
                throw new SyntaxError("第一个参数必传")
            }

            /**es6
             *  let {
                lastIndex=0,//默认页
                eventType="mouseover",//默认事件
                customPageClass="option",//默认option样式
                customContentClass="con",//默认con样式
                changeEnd
            }=options;
            ['lastIndex','eventType','customPageClass'
            ,'customContentClass','changeEnd'].forEach(item=>{
                //箭头函数中this为上下文this，此时也就是类中this本身
                //item是字符串，而我们想让其为变量 用eval
                this[item]=eval(item);
            })
             */

            //es5
            let _default = {
                lastIndex: 0,//默认页
                eventType: "mouseover",//默认事件
                customPageClass: "option",//默认option样式
                customContentClass: "con",//默认con样式
                changeEnd: null
            };

            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    _default[key] = options[key]
                }
            }

            for (const key in _default) {
                if (_default.hasOwnProperty(key)) {
                    this[key] = _default[key]
                }
            }


            //挂载
            this.container = container;

            let childs = [...container.children],
                option = null,
                conList = null,
                optionList = null;

            option = childs.find((item, index) => {
                return this.hasClass(item, this.customPageClass);
            })


            this.conList = childs.filter((item) => {
                return this.hasClass(item, this.customContentClass)
            })
            this.optionList = [...option.children];

            this.optionList.forEach((item,index)=>{      
                if(index===this.lastIndex){
                    this.addClass(this.optionList[index],"active");
                    this.addClass(this.conList[index],"active");
                    return;
                }
                this.removeClass(this.optionList[index],"active")
                this.removeClass(this.conList[index],"active")
            })
            //实现选项卡
            this.changeTab();
        }
        /** 公共方法 */
        hasClass(ele, strclass) {
            let curClass = ele.className;
            let ary = curClass.trim().split(/ +/);
            return ary.indexOf(strclass) >= 0
        }

        addClass(ele, str) {
            let isExit = this.hasClass(ele, str);
            if (isExit) return;
            ele.className += ` ${str}`;
        }
        removeClass(ele, str) {
            let isExit = this.hasClass(ele, str);
            if (!isExit) return;
            let ary = ele.className.trim().split(/ +/);

            ary = ary.filter(item => {
                return item !== str;
            })
            ele.className = ary.join(" ");
        }

        changeTab() {
            this.optionList.forEach((item, index) => {
                let _this = this;
                item[`on${this.eventType}`] = function () {
                    if (_this.lastIndex === index) return;
                    _this.addClass(this, "active");
                    _this.removeClass(_this.optionList[_this.lastIndex], "active");
                    _this.addClass(_this.conList[index], "active");
                    _this.removeClass(_this.conList[_this.lastIndex], "active");
                    _this.lastIndex = index;
                    _this.changeEnd && _this.changeEnd(this, _this.conList[index],
                        index, _this.lastIndex);
                }
            })
        }
    }

    window.TabPlugin = TabPlugin;
})(window)
