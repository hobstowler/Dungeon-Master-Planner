import NavBar from './NavBar'

export default function Header() {
    return (
        <div className='header'>
            <h1>The Dungeon Master's Planner App</h1>
            <NavBar />
            <br/><p>Select one of the links from the navigation menu to get started.</p>
        </div>
    )
}