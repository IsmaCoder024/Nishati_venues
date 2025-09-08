import "./UserLayout.css";
export default function UserLayout({ children, items = []}){
    return (
        <>
            <div className="Header">
                
                <nav className="navbar">

                    <div className="logo">Venue-Hub</div>

                    <ul className="nav-links">
                            {items.map((item, index) => (
                                <li>
                                    <a
                                    key={ item.label }
                                    href={ route =item.href } 
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </nav>
                          
            </div>


            <main>
                { children }
            </main>

            <footer>
            <p>nishati_venue_booking_site_©_2025 </p>
            </footer>
        </>
    )
} 