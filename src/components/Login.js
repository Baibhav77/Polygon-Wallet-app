import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { magicEthereum } from "../magic";
import companyLogo from './forweb.png';

export default function Login() {
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      await magicEthereum.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });
      history.push("/");
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="containerlogin">
      <img src={companyLogo} width="60%" />
      <h1>Get a wallet with just an email</h1>
      <input
        className="password"
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email"
        onChange={handleInputOnChange}
        disabled={isLoggingIn}
      />
      <button className="loginator" onClick={login} disabled={isLoggingIn}>Send</button>
    </div>
  );
}

