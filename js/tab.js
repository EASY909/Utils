//检测当前元素是否包括某个样式名
let hasClass = function hasClass(ele, strclass) {
    let curClass = ele.className;
    let ary = curClass.trim().split(/ +/);
    return ary.indexOf(strclass) >= 0
}
let addClass=function addClass(ele,str){
    let isExit=hasClass(ele,str);
    if(isExit) return;
 
    ele.className+=` ${str}`;
   
}   

let removeClass=function removeClass(ele,str){
  
    let isExit=hasClass(ele,str);
    if(!isExit) return;
    let ary=ele.className.trim().split(/ +/);

    ary=ary.filter(item=>{
        return item!==str;
    })
    
    ele.className=ary.join(" ");
}
//获取元素
let taBox = document.querySelector("#tabBox"),
    childAry = [...taBox.children],
    option = null,
    conList = null,
    optionList=null;

option = childAry.filter((item, index) => {
    return hasClass(item, "option");
})
option = option.length > 0 ? option[0] : null;

conList=childAry.filter((item)=>{
    return hasClass(item,"con")
})
optionList=[].filter.call(option.children,(item)=>{
    return item.tagName=="LI"
})

//绑定事件
let lastIndex=0;//上一个选中的li索引

optionList.forEach((item,index)=>{
    item.onmouseover=function (){
        if( lastIndex===index) return;
        addClass(this,"active");
        removeClass(optionList[lastIndex],"active");

        addClass(conList[index],"active");
        removeClass(conList[lastIndex],"active");

        lastIndex=index;
    }
})



