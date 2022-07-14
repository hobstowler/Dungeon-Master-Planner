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

export function createTable() {
    return(
        '<tbody>' +
        '<tr>' +
        '<td>cell 1</td>' +
        '<td>cell 2</td>' +
        '</tr>' +
        '</tbody>'
    )
}

export function createForm() {
    return '<button type="submit">Submit</button>'
}