/// <reference path="../node_modules/jsx-jsonml-devtools-renderer/out/index.d.ts" />
namespace demo {
    export class JSXRender {
        static render(ui: JSX.Element) {
            console.log(new this(ui))
        }
        constructor(public ui: JSX.Element) {
            React.installCustomObjectFormatter(this)
        }
        header(obj: unknown) {
            if (obj === this) return this.ui
            return null
        }
        hasBody() {
            return false
        }
        body() {
            return <></>
        }
    }
}
