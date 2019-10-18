function draft(paste) {
    invokeCustomEvent(new CustomEvent('', { detail: JSON.stringify(['paste', [paste]]) }))
}
function input(input) {
    invokeCustomEvent(new CustomEvent('', { detail: JSON.stringify(['input', [input]]) }))
}
const store = {}
function hijack(key) {
    store[key] = new Set()
}
function isEnabled(key) {
    return key in store
}

function getEvent(x, mocks = {}) {
    const mockTable = {
        target: document.activeElement,
        srcElement: document.activeElement,
        // Since it is bubbled to the document.
        currentTarget: document,
        // ! Why?
        _inherits_from_prototype: true,
        ...mocks
    }
    return new Proxy(x, {
        get(target, key) {
            return mockTable[key] || target[key]
        }
    })
}

const hacks = {
    paste(text) {
        const e = new ClipboardEvent('paste', { clipboardData: new DataTransfer() })
        e.clipboardData.setData('text/plain', text)
        return getEvent(e, { defaultPrevented: false, preventDefault() {} })
    },
    input(text) {
        // Cause react hooks the input.value getter & setter
        const proto = document.activeElement.constructor.prototype
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(document.activeElement, text)
        return getEvent(new window.InputEvent('input', { inputType: 'insertText', data: text }))
    }
}
Object.keys(hacks)
    .concat(['keyup', 'input'])
    .forEach(hijack)
const invokeCustomEvent = e => {
    const ev = e
    const [eventName, param] = JSON.parse(ev.detail)

    for (const f of store[eventName] || []) {
        try {
            const hack = hacks[eventName]
            if (hack) f(hack(...param))
            else f(param)
        } catch (e) {
            console.error(e)
        }
    }
}
// document.addEventListener(CustomEventId, invokeCustomEvent)
document.addEventListener = new Proxy(document.addEventListener, {
    apply(target, thisRef, [event, callback, ...args]) {
        if (isEnabled(event)) store[event].add(callback)
        return Reflect.apply(target, thisRef, [event, callback, ...args])
    }
})
document.removeEventListener = new Proxy(document.removeEventListener, {
    apply(target, thisRef, [event, callback, ...args]) {
        if (isEnabled(event)) store[event].delete(callback)
        return Reflect.apply(target, thisRef, [event, callback, ...args])
    }
})
