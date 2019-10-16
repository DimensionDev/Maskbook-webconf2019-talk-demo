"use strict";
/// <reference path="./global.d.ts" />
var demo;
(function (demo) {
    let lastResult = { done: false, value: undefined };
    let iterator = undefined;
    function RunGenerator(generator) {
        if (typeof iterator === 'undefined')
            iterator = generator();
        console.clear();
        lastResult = iterator.next();
        const back = () => {
            console.clear();
            iterator = undefined;
            demo.start();
        };
        new demo.JSXRender((React.createElement(React.Fragment, null,
            React.createElement("div", { onClick: back }, "\u274C\u8FD4\u56DE\u4E3B\u83DC\u5355"),
            lastResult.done ? React.createElement("div", null, "\u6F14\u793A\u7ED3\u675F") : React.createElement("div", { onClick: () => RunGenerator(generator) }, "\u23ED\u4E0B\u4E00\u6B65")))).render();
    }
    demo.RunGenerator = RunGenerator;
})(demo || (demo = {}));
/// <reference path="./global.d.ts" />
const { LiveSelector } = HoloflowsKit;
LiveSelector.enhanceDebugger();
var demo;
(function (demo) {
    function* LiveSelectorDemo() {
        const news = new LiveSelector().querySelectorAll('table.News');
        console.log('选择所有的 table.News', news);
        yield;
        const filter = (x) => x.querySelector('tr').innerText.includes(`Page Hit Ranking`);
        const rank = news.clone().filter(filter);
        console.log('用这个函数\n', filter, '\n筛选出我们需要的 table.News', rank);
        yield;
        const items = rank.clone().querySelectorAll('tr');
        console.log('接下来再选中所有的 tr', items);
        yield;
        const headless = items.clone().slice(3);
        console.log('去掉前 3 个元素', headless);
        yield;
        const list = headless
            .clone()
            .querySelectorAll('*:nth-child(2)')
            // @ts-ignore
            .map(x => x.innerText);
        console.log('得到发行版的名称列表', list);
        yield;
        console.log(`完整写法：
    new LiveSelector()
        .querySelectorAll('table.News')
        .filter(
            x => x.querySelector('tr')
                .innerText
                .includes(\`Page Hit Ranking\`)
        )
        .querySelectorAll('tr')
        .slice(3)
        .querySelectorAll('*:nth-child(2)')
        // .querySelectorAll<HTMLElement>('*:nth-child(2)')
        // TypeScript 用户需要指定泛型
        // @ts-ignore
        .map(x => x.innerText)
        `);
    }
    demo.LiveSelectorDemo = LiveSelectorDemo;
})(demo || (demo = {}));
var demo;
(function (demo) {
    function start() {
        new demo.JSXRender((React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: '1.5em' } }, "\u6F14\u793A"),
            React.createElement("div", { onClick: () => {
                    demo.RunGenerator(demo.LiveSelectorDemo);
                } }, "\uD83D\uDC49 LiveSelector \u6F14\u793A"),
            React.createElement("div", null, "\uD83D\uDC49 Watcher \u6F14\u793A"),
            React.createElement("div", null, "\uD83D\uDC49 DOMProxy \u6F14\u793A")))).render();
    }
    demo.start = start;
})(demo || (demo = {}));
/// <reference path="../node_modules/jsx-jsonml-devtools-renderer/out/index.d.ts" />
var demo;
(function (demo) {
    class JSXRender {
        constructor(ui) {
            this.ui = ui;
            React.installCustomObjectFormatter(this);
        }
        header(obj) {
            if (obj === this)
                return this.ui;
            return null;
        }
        hasBody() {
            return false;
        }
        body() {
            return React.createElement(React.Fragment, null);
        }
        render() {
            console.log(this);
        }
    }
    demo.JSXRender = JSXRender;
})(demo || (demo = {}));
