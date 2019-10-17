/// <reference path="./global.d.ts" />
const { LiveSelector, MutationObserverWatcher, DOMProxy } = HoloflowsKit
LiveSelector.enhanceDebugger()
MutationObserverWatcher.enhanceDebugger()
DOMProxy.enhanceDebugger()
namespace demo {
    export function start() {
        JSXRender.render(
            <>
                <div style={{ fontSize: '1.5em' }}>演示</div>
                <div onClick={() => showDemo(LiveSelectorDemo)}>🔎 LiveSelector 演示</div>
                <div onClick={() => showDemo(WatcherDemo)}>🙈 Watcher 演示</div>
                <div onClick={() => showDemo(DOMProxyDemo)}>🧙‍♂️ DOMProxy 演示</div>
            </>
        )
    }
}
