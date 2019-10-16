/// <reference path="../node_modules/jsx-jsonml-devtools-renderer/out/index.d.ts" />
namespace demo {
    export class JSXRender {
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
        render() {
            console.log(this)
        }
    }
}
