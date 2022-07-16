export function navigationBar() {
    return (`
        <nav>
            <a href="/">Home</a>
            <a href="/dungeon_masters">Dungeon Masters</a>
            <a href="/scenarios">Scenarios</a>
            <a href="/dungeons">Dungeons</a>
            <a href="/monsters">Monsters</a>
            <a href="/items">Items</a>
            <a href="/biomes">Biomes</a>
            <a href="/types">Types</a>
        </nav>
    `.replace(/>\s*</g, '><'))
}

export function createTable(data) {
    let table = ''
    for (let i = 0; i < data.length; i++) {
        table += '<tr>'
        for (let key in data[i]) {
            table += `<td>${data[i][key]}</td>`
        }
        table += '</tr>'
    }
    return table
}

export function createForm() {
    return '<button type="submit">Submit</button>'
}