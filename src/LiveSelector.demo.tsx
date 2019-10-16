namespace demo {
    export function getLiveSelector() {
        return new LiveSelector()
            .querySelectorAll('table.News')
            .filter(x => x.querySelector('tr')!.innerText.includes(`Page Hit Ranking`))
            .querySelectorAll('tr')
            .slice(3)
            .querySelectorAll<HTMLElement>('*:nth-child(2)')
    }
    export function* LiveSelectorDemo() {
        // Let it in it own V8 vm.
        console.log('先简单看一下用法', eval(getLiveSelector.toString() + ';' + getLiveSelector.name))
        yield

        const news = new LiveSelector().querySelectorAll<HTMLElement>('table.News')
        console.log('选择所有的 table.News', news)

        yield
        const filter = (x: HTMLElement) => x.querySelector('tr')!.innerText.includes(`Page Hit Ranking`)
        const rank = news.clone().filter(filter)
        console.log('用这个函数\n', filter, '\n筛选出我们需要的 table.News', rank)

        yield
        const items = rank.clone().querySelectorAll('tr')
        console.log('接下来再选中所有的 tr', items)

        yield
        const headless = items.clone().slice(3)
        console.log('去掉前 3 个元素', headless)

        yield
        const list = headless
            .clone()
            .querySelectorAll('*:nth-child(2)')
            // @ts-ignore
            .map(x => x.innerText)
        console.log('得到发行版的名称列表', list)
    }
}
