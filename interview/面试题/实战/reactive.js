function getter(target,key){
    const res=Reflect.get(target,key)
    track(target,key)  // 依赖收集
    return res
}
function setter(target,key,value){
    const res=Reflect.set(target,key,value)
    trigger(target,key)  // 触发依赖
    return res
}

function reactive(){
    const proxy=new Proxy(target,{set:setter,get:getter})
    return proxy
}
reactive({name:'bruce'})



let state=ref({
    name:'bruce'
})
let count=ref(0)

function ref(initalValue){
    let _value=isObject(initalValue) ? reactive(initalValue) : initalValue
    return {
        get value(){
            track(this,'value')
            return _value
        },
        set value(val){
            _value=val
            trigger(this,'value')
        }
    }
}