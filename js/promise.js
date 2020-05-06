class myPromise {
    constructor(excutor) {
        this.status = "pending";
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== "pending") return;
                this.status = "fulfilled";
                this.value = result;
                this.fulfilledAry.forEach(item => {
                    item(this.value)
                })
            }, 0)

        }
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== "pending") return;
                this.status = "rejected";
                this.value = reason;
                this.rejectedAry.forEach(item => {
                    item(this.value)
                })
            }, 0)
        }
        try {
            excutor(resolveFn, rejectFn);
        } catch (error) {
            rejectFn(error)
        }

    }
    //执行then，返回新的promise实例
    then(fulfilledCallBack, rejectedCallBack) {
        //=>处理不传递的状况
        typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = result => result : null;
        typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;

        return new myPromise((resolve, reject) => {

            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);
                    x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    catch(rejectedCallBack) {
        return this.then(null, rejectedCallBack);
    }

    static all(promiseAry = []) {//=>Promise.all()
        return new Promise((resolve, reject) => {
            //=>INDEX:记录成功的数量 RESULT:记录成功的结果
            let index = 0,
                result = [];
            for (let i = 0; i < promiseAry.length; i++) {
                //=>promiseAry[i]:
                //每一个需要处理的PROMISE实例
                promiseAry[i].then(val => {
                    index++;
                    result[i] = val;//=>索引需要和promiseAry对应上，保证结果的顺序和数组顺序一致
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reject);
            }
        });
    }

}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Math.random() < 0.5 ? resolve(100) : reject(-100);
        resolve(100);
    }, 1000);
});
let p2 = p1.then(result => {

    return result + 100;
});
let p3 = p2.then(null, reason => {
    console.log(reason+"p2");
});
p3.then(result => {
    console.log(result+"p3");
})
console.log(3);
// export default Promise;


