namespace demo {
    export function* DOMProxyDemo() {
        JSXRender.render(
            <>
                先创建一个 DOMProxy 对象, <span variant={['bigint']}>DOMProxy</span>()
                <br />
                然后把它指向某个元素
            </>
        )
        console.log(DOMProxy())
        const x = document.createElement('span')
        x.innerText = '额外内容'
        console.log('接下来把右边这个元素插入到 DOMProxy 里', x)
    }
}
