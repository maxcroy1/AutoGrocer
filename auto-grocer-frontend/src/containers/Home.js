import React from 'react';
import NavBar from '../components/Navbar'

function Home() {
    return (
        <div>
            <NavBar />
            <div>
                <h1>AutoGrocer</h1>
                <p>Make ordering groceries from home easier than ever.</p>
            </div>
            <div>
                <h2>About</h2>
                <p>Enter copy here.</p>
            </div>
        </div>
    )
}

export default Home;