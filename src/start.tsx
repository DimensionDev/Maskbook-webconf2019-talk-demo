namespace demo {
    export function start() {
        new demo.JSXRender(
            (
                <>
                    <div style={{ fontSize: '1.5em' }}>演示</div>
                    <div
                        onClick={() => {
                            demo.RunGenerator(demo.LiveSelectorDemo)
                        }}
                    >
                        👉 LiveSelector 演示
                    </div>
                    <div>👉 Watcher 演示</div>
                    <div>👉 DOMProxy 演示</div>
                </>
            )
        ).render()
    }
}
