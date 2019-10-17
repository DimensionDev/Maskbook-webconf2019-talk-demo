/// <reference path="./global.d.ts" />

namespace demo {
    let lastResult: IteratorResult<any> = { done: false, value: undefined }
    let iterator: Generator<undefined, void, unknown> | undefined = undefined
    export function showDemo(generator: () => Generator<undefined, void, unknown>) {
        if (typeof iterator === 'undefined') iterator = generator()
        console.clear()
        lastResult = iterator.next()
        const back = () => {
            console.clear()
            iterator = undefined
            start()
        }
        JSXRender.render(
            <>
                <div onClick={back}>❌返回主菜单</div>
                {lastResult.done ? <div>演示结束</div> : <div onClick={() => showDemo(generator)}>⏭下一步</div>}
            </>
        )
    }
}
