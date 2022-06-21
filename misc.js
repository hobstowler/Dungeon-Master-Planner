export function navigationBar() {
    return (
        '<a href="/">Home</a>' +
        '<a href="/scenarios">Scenarios</a>' +
        '<a href="/biomes">Biomes</a>' +
        '<a href="/dungeons">Dungeons</a>' +
        '<a href="/monsters">Monsters</a>' +
        '<a href="/loot">Loot</a>'
    )
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