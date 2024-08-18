class EventBus{
    events = {};
    on(eventName,cb){
        if(!this.eventName){
            this.events[eventName] = new Set();
        }
        this.events[eventName].add(cb);

        // (this.events[eventName] ??= new Set()).add(cb);
    }
    emit(eventName,...args){
        this.events[eventName]?.forEach(cb => {
            cb(...args);
        });
    }
    off(eventName,cb){
        this.events[eventName]?.delete(cb);
    }
    once(eventName,cb){
        const handler = (...args)=>{
            cb(...args);
            this.off(eventName,handler);
        }
        this.on(eventName,handler);
    }
}

function singleton(className){
    let instance = null;
    let proxy =  new Proxy(className,{
        construct(target,args){
            if(!instance){
                instance = Reflect.construct(target,args);
            }
            return instance;
        }
    })
    className.prototype.constructor = proxy;
    return proxy;
}





export function useEventBus(){
    const singleEventBus = singleton(EventBus);
    const bus = new singleEventBus();
    return bus;
};