function useScript(){
  React.useEffect(()=>{
    // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });
  },[]);
}

function AppWidget({ area }) {
  
  async function verifyLogin(setIsLoggedIn, setCurrentUser, error) {
    try {
      const response = await fetch("/user/verifylogin", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
  
        if (user && user.username) {
          // Save user information to localStorage
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          // Update React state
          setIsLoggedIn(true);
          setCurrentUser(user.username);
  
          // Update UI with username
          document.getElementById("user").innerHTML = `<a role="button" id="logoutBtn">
            <span className="text-gray-600 small" id="userMsg">Welcome ${user.username} / Logoff</span>
          </a>`;
          document.getElementById("logoutBtn").addEventListener("click", logoutUser);
          // Force react to re-render
          //window.forceUpdate();
        } else {
          // Update React state
          setIsLoggedIn(false);
          setCurrentUser(null);
          const userElement = document.getElementById("user");
          if (userElement) {
            userElement.innerHTML = `<a href="login.html" role="button">
              <span className="text-gray-600 small" id="userMsg">Login</span>
            </a>`;
          }
        }
      } else {
        console.error("Error during login verification:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Login error: ${error.message}`);
    }
  }
  

  async function logoutUser() {
    const response = await fetch(`/user/logout`, {
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
  }

  if (area == "sidebar") {
    return (
      <div>
        <SideBar />
      </div>
    );
  } else if (area == "topbar") {
    return (
      <div>
        <TopBar verifyLogin={verifyLogin} />
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

function handleLogin(username, password) {
  const loginDetails = { username, password };
  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  })
  .then(response => {
    console.log(response);
    return response.json();
})
  .then((data) => {
    console.log("Login API response:", data);
      if (data.error) {
          throw new Error(data.error);
      }
      // Update local storage 
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      // Redirect the user
      window.location.href = localStorage.getItem('redirectUrl') || '/';
      localStorage.removeItem('redirectUrl')
  })
  .catch((error) => {
      console.error('Error during login:', error);
      alert(`Login error: ${error.message}`);
  });
}

function SideBar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Dev Ops</div>
      </a>

      <hr className="sidebar-divider my-0"/>

      <li className="nav-item active">
          <a className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Main Page</span></a>
      </li>

      <hr className="sidebar-divider"/>

      <li className="nav-item">
        <a className="nav-link" href="/public/pois.html">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>All Poi's</span></a>
    </li>

    <hr className="sidebar-divider"/>

      <li className="nav-item">
        <a className="nav-link" href="/public/users.html">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Users</span></a>
    </li>
    <hr className="sidebar-divider"/>
    <div className="text-center d-none d-md-inline" id="sidebarButtonToggleSideBar">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
  </ul>
  );
}

function TopBar({ verifyLogin }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setCurrentUser(user.username);
    } else {
      // If user information is not found, verify login
      verifyLogin(setIsLoggedIn, setCurrentUser, error);
    }
  }, [verifyLogin]);
  

  /*React.useEffect(() => {
    // Call verifyLogin on component mount
    verifyLogin().then(user => {
      if (user && user.username) {
        setIsLoggedIn(true);
        setCurrentUser(user.username);
      }
    })
  }, [verifyLogin]);*/
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById("logUsername").value;
    const password = document.getElementById("logPassword").value;

    // STore the current URL redirecting to the login
    localStorage.setItem('redirectUrl', window.location.href);

    handleLogin(username, password);
  };

  const handleSignUp = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const data = { username, email, password };

    // Send a POST request to the server user validation
    fetch("/user/checkusername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // If the username is available, send a POST request to the server to create a new user
          fetch("/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                // If the user was created successfully, redirect to the login page
                window.location.href = "/verify";
              }
            })
            .then(() => {
              // Handle successful signup
              setError("");
            })
            .catch((error) => {
              setError(error.message);
            });
        } else {
          setError("Username is already taken!");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const logoutUser = async () => {
    const response = await fetch(`/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200){
      setIsLoggedIn(false);
      setCurrentUser(null);
      alert("Logged out!");
      window.location.reload();
    } else {
      alert(`Undifined error: ${response}`);
    }
    
  };
  //verifyLogin()
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <div id="topbarToggleButtonSidebar">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
      </div>

      <ul className="navbar-nav ml-auto">
      {isLoggedIn ? (
        // If the user is logged in, display user inforation and logout button
          <div>
            <li className="nav-item dropdown no-arrow mx-1">
              <a
                className="nav-link dropdown-toggle text-black-50"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  Welcome, {currentUser}
                </span>
                <img className="img-profile rounded-circle"></img>
              </a>

              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item" href="profile.html">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={logoutUser}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </div>
        ) : (
          // If the user is not logged in, display login and signup buttons 
          <div>
            <li className="nav-item dropdown no-arrow mx-1">
              <a
                className="nav-link dropdown-toggle text-black-50"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Log in
              </a>

              <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
                >
                <h6 className="dropdown-header">
                  Please enter your details below
                </h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <form
                    onSubmit={handleFormSubmit}
                    className="user"
                    style={{ width: `100%` }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Enter Username"
                        id="logUsername"
                        className="form-control form-control-user"
                      />
                      <input
                        type="password"
                        placeholder="Enter Password"
                        id="logPassword"
                        className="form-control form-control-user"
                      />
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </a>
                
              </div>
            </li>
          </div>
        )}
        
          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">
              Please enter your details bellow
            </h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <form
                onSubmit={handleFormSubmit}
                className="user"
                style={{ width: `100%` }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    id="logUsername1"
                    className="form-control form-control-user"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="logPassword1"
                    className="form-control form-control-user"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href="/verify"
            >
              Reset Password
            </a>
          </div>
        

        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle text-black-50"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sign up
          </a>

          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">
              Please enter your details bellow
            </h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <form
                onSubmit={handleSignUp}
                className="user"
                style={{ width: `100%` }}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control form-control-user"
                    placeholder="Enter Email Address "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control form-control-user"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control form-control-user"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Sign Up
                  </button>
                  {error && <p className="error">{error}</p>}
                </div>
              </form>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href="/verify"
            >
              Reset Password
            </a>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        {isLoggedIn && (
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
        
              Welcome, {currentUser}
            </span>
            <img className="img-profile rounded-circle"></img>
          </a>

          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item" href="profile.html">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={logoutUser}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
        )}
      </ul>
    </nav>
  );
}



function Footer() {
  useScript()
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; AE1 - Dev Ops team 2023</span>
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    
    </footer>
  );
}


const sidebar = ReactDOM.createRoot(document.getElementById("sidebar"));
const topbar = ReactDOM.createRoot(document.getElementById("topbar"));
const footer = ReactDOM.createRoot(document.getElementById("footer"));

sidebar.render(<AppWidget area="sidebar" />);
topbar.render(<AppWidget area="topbar" />);
footer.render(<AppWidget area="footer" />);

