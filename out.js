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
var demo;
(function (demo) {
    function getLiveSelector() {
        return new LiveSelector()
            .querySelectorAll('table.News')
            .filter(x => x.querySelector('tr').innerText.includes(`Page Hit Ranking`))
            .querySelectorAll('tr')
            .slice(3)
            .querySelectorAll('*:nth-child(2)');
    }
    demo.getLiveSelector = getLiveSelector;
    function* LiveSelectorDemo() {
        // Let it in it own V8 vm.
        console.log('先简单看一下用法', eval(getLiveSelector.toString() + ';' + getLiveSelector.name));
        yield;
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
    }
    demo.LiveSelectorDemo = LiveSelectorDemo;
})(demo || (demo = {}));
var demo;
(function (demo) {
    function watchToList() {
        new MutationObserverWatcher(demo.getLiveSelector())
            .useForeach(dom => {
            let oldText = dom.innerText;
            console.log('发现新元素', oldText);
            return {
                onRemove: () => console.log(oldText, '被删除了'),
                onNodeMutation: () => {
                    console.log(oldText, '▶', dom.innerText);
                }
            };
        })
            .startWatch({ subtree: true, characterData: true, childList: true });
    }
    function* WatcherDemo() {
        const mut = new MutationObserverWatcher(demo.getLiveSelector());
        new demo.JSXRender((React.createElement(React.Fragment, null,
            "\u65B0\u5DE5\u5177\uFF1AWatcher",
            React.createElement("br", null),
            "\u7528\u4E8E\u5B9A\u65F6\u5BF9 LiveSelector \u8FDB\u884C\u810F\u68C0\u67E5\uFF0C\u53D1\u73B0 LiveSelector \u9009\u4E2D\u7684\u5185\u5BB9\u53D8\u5316\u4E4B\u540E\u4F1A\u53CA\u65F6\u901A\u77E5",
            React.createElement("br", null),
            "\u8FD9\u91CC\u6F14\u793A Watcher \u7684\u4E00\u4E2A\u5B50\u7C7B ",
            mut,
            "\uFF0C\u5B83\u57FA\u4E8E",
            ' ',
            React.createElement("span", { onClick: () => prompt('复制此链接：', 'https://mdn.io/MutationObserver'), variant: ['bigint'], style: { textDecoration: 'underline' } }, "MutationObserver"),
            ' ',
            "\u6765\u89E6\u53D1\u810F\u68C0\u67E5"))).render();
        mut.omitWarningForForgetWatch();
        yield;
        console.log('先简单看一下用法', eval(watchToList.toString() + ';' + watchToList.name));
        yield;
        console.log('测试：添加、删除、改变一些元素');
        let init = false;
        mut.useForeach(dom => {
            if (init === false) {
                console.groupCollapsed('初始元素');
                init = true;
            }
            let oldText = dom.innerText;
            console.log('发现新元素', oldText);
            return {
                onRemove: () => console.log(oldText, '被删除了'),
                onNodeMutation: () => {
                    console.log(oldText, '▶', dom.innerText);
                }
            };
        }).startWatch({ subtree: true, childList: true, characterData: true });
        setTimeout(() => console.groupEnd(), 10);
    }
    demo.WatcherDemo = WatcherDemo;
})(demo || (demo = {}));
/// <reference path="./global.d.ts" />
const { LiveSelector, MutationObserverWatcher, DOMProxy } = HoloflowsKit;
LiveSelector.enhanceDebugger();
MutationObserverWatcher.enhanceDebugger();
DOMProxy.enhanceDebugger();
var demo;
(function (demo) {
    function start() {
        new demo.JSXRender((React.createElement(React.Fragment, null,
            React.createElement("div", { style: { fontSize: '1.5em' } }, "\u6F14\u793A"),
            React.createElement("div", { onClick: () => demo.RunGenerator(demo.LiveSelectorDemo) }, "\uD83D\uDC49 LiveSelector \u6F14\u793A"),
            React.createElement("div", { onClick: () => demo.RunGenerator(demo.WatcherDemo) }, "\uD83D\uDC49 Watcher \u6F14\u793A"),
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
