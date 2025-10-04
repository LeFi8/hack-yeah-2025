import {Outlet} from "react-router";

function Layout() {
    return <main className="min-h-dvh p-2 bg-btp">
        <div className="h-full w-full">
            <div className="bg-amber-200">
                Navbar
            </div>
            <Outlet/>
            <p>Layout end</p>
        </div>
    </main>
}

export default Layout;