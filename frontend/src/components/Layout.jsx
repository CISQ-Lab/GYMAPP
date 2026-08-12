import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-400">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;