function AppWidget({ area }) {


    async function verifyLogin() {
        const loggeduser = await fetch(`http://localhost:3000/user/login`);
        const user = await loggeduser.json();
        if (user.username) {
            document.getElementById("user").innerHTML = 
        `<a  role="button" id="logoutBtn">
            <span class=" text-gray-600 small" id="userMsg">Welcome ${user.username} / Logoff</span>
            </a>`
            document.getElementById("logoutBtn").addEventListener("click", logoutUser);
        } else {
            document.getElementById("user").innerHTML = 
        `<a  href="login.html" role="button">
            <span class="text-gray-600 small" id="userMsg">Login</span>
            </a>`
        }
    };

    async function logoutUser() {
        const response = await fetch(`http://localhost:3000/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status == 400) {
            alert("ERROR!! Unable to logout please try again");
        } else if (response.status == 200) {
            alert("Logged out!");
            window.location.reload();
        } else {
            alert(`Undifined error: ${response}`);
        }
    };

    if (area == "sidebar") {
        return (
            <div>
                <SideBar />
            </div>
        );
    } else if (area == "topbar") {
        return (
            <div>
                <TopBar
                    verifyLogin={verifyLogin}
                />
            </div>
        );
    } else {
        return (
            <div>
                <Footer />
            </div>
        );
    }

}

function SideBar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Dev Ops</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Main Page</span></a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                POI Pages
            </div>
            <li className="nav-item">
                <a className="nav-link" href="/recommend.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Recommend</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/add.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Add</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/review.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Review</span></a>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    )
}

function TopBar({ verifyLogin }) {

    verifyLogin()

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                    <div id="user"></div>
            </ul>
        </nav>
    )
}

function Footer() {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; AE1 - Dev Ops team 2023</span>
                </div>
            </div>
        </footer>
    )
}

const sidebar = ReactDOM.createRoot(document.getElementById("sidebar"));
const topbar = ReactDOM.createRoot(document.getElementById("topbar"));
const footer = ReactDOM.createRoot(document.getElementById("footer"));

sidebar.render(<AppWidget area="sidebar" />);
topbar.render(<AppWidget area="topbar" />);
footer.render(<AppWidget area="footer" />);