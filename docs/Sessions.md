## Session Management Technologies

### Technologies Used:
- **express-session:** Utilized for creating session objects in the application.
- **MySQLStore (from express-mysql-session):** Deployed for storing session data.
- **MySQL:** Database system used for persisting session information.

### Implementation Details:
1. **Session Creation:** Sessions are created using `express-session`. This facilitates the management of user states within the application.
2. **Session Storage:** The sessions are stored in the MySQL database in a table named "sessions", managed through `MySQLStore`.
3. **Session Contents:**
   - Each session contains the username of the logged-in user.
   - Sessions have an expiration date to ensure security and manage lifecycle.
4. **Access Control:**
   - **Admin Users:** Granted full access to all application features.
   - **Regular Users:** Limited access to the main page and functionality to add points of interest (POIs).
   - **Non-Logged-In Users:** Access restricted to the main page only.
