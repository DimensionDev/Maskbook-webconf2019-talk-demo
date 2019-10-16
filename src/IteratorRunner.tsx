/// <reference path="./global.d.ts" />

namespace demo {
    let lastResult: IteratorResult<any> = { done: false, value: undefined }
    let iterator: Generator<undefined, void, unknown> | undefined = undefined
    export function RunGenerator(generator: () => Generator<undefined, void, unknown>) {
        if (typeof iterator === 'undefined') iterator = generator()
        console.clear()
        lastResult = iterator.next()
        const back = () => {
            console.clear()
            iterator = undefined
            demo.start()
        }
        new demo.JSXRender(
            (
                <>
                    <div onClick={back}>❌返回主菜单</div>
                    {lastResult.done ? <div>演示结束</div> : <div onClick={() => RunGenerator(generator)}>⏭下一步</div>}
                </>
            )
        ).render()
    }
}
