import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Hook to redirect users if their authorisation status is improper
 * for the given page.
 * 
 * @param {string} userAuthStatus The authorisation status which should trigger
 *                                a redirect - 'loggedIn' if authorised users should
 *                                be redirected, or 'loggedOut' if unauthorised users
 *                                should be redirected.
 */
export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn") {
          navigate("/general-feed/");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) { 
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut") {
          navigate("/");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};