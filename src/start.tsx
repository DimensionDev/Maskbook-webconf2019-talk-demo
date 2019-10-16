/// <reference path="./global.d.ts" />
const { LiveSelector, MutationObserverWatcher, DOMProxy } = HoloflowsKit
LiveSelector.enhanceDebugger()
MutationObserverWatcher.enhanceDebugger()
DOMProxy.enhanceDebugger()
namespace demo {
    export function start() {
        new demo.JSXRender(
            (
                <>
                    <div style={{ fontSize: '1.5em' }}>演示</div>
                    <div onClick={() => demo.RunGenerator(demo.LiveSelectorDemo)}>👉 LiveSelector 演示</div>
                    <div onClick={() => demo.RunGenerator(demo.WatcherDemo)}>👉 Watcher 演示</div>
                    <div>👉 DOMProxy 演示</div>
                </>
            )
        ).render()
    }
}
