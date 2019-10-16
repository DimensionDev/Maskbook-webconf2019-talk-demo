namespace demo {
    function watchToList() {
        new MutationObserverWatcher(demo.getLiveSelector())
            .useForeach(dom => {
                let oldText = dom.innerText
                console.log('发现新元素', oldText)
                return {
                    onRemove: () => console.log(oldText, '被删除了'),
                    onNodeMutation: () => {
                        console.log(oldText, '▶', dom.innerText)
                    }
                }
            })
            .startWatch({ subtree: true, characterData: true, childList: true })
    }
    export function* WatcherDemo() {
        const mut = new MutationObserverWatcher(demo.getLiveSelector())
        new demo.JSXRender(
            (
                <>
                    新工具：Watcher
                    <br />
                    用于定时对 LiveSelector 进行脏检查，发现 LiveSelector 选中的内容变化之后会及时通知
                    <br />
                    这里演示 Watcher 的一个子类 {mut}，它基于{' '}
                    <span
                        onClick={() => prompt('复制此链接：', 'https://mdn.io/MutationObserver')}
                        variant={['bigint']}
                        style={{ textDecoration: 'underline' }}
                    >
                        MutationObserver
                    </span>{' '}
                    来触发脏检查
                </>
            )
        ).render()
        mut.omitWarningForForgetWatch()
        yield

        console.log('先简单看一下用法', eval(watchToList.toString() + ';' + watchToList.name))
        yield

        console.log('测试：添加、删除、改变一些元素')
        let init = false
        mut.useForeach(dom => {
            if (init === false) {
                console.groupCollapsed('初始元素')
                init = true
            }
            let oldText = dom.innerText
            console.log('发现新元素', oldText)
            return {
                onRemove: () => console.log(oldText, '被删除了'),
                onNodeMutation: () => {
                    console.log(oldText, '▶', dom.innerText)
                }
            }
        }).startWatch({ subtree: true, childList: true, characterData: true })
        setTimeout(() => console.groupEnd(), 10)
    }
}
