import "./UserLayout.css";
import { router } from "@inertiajs/react";

export default function UserLayout({ children, items = [], showLogout = true }) {
    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <>
            <div className="Header">
                <nav className="navbar">
                    <div className="logo">Nishati-Venues</div>

                    <ul className="nav-links">
                        {items.map((item, index) => (
                            <li>
                                <a key={item.label} href={(route = item.href)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}

                        {showLogout && (
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            <main>{children}</main>

            <footer>
                <p>nishati_venue_booking_site_©_since_2025</p>
            </footer>
        </>
    );
}
