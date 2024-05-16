import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      console.log(response.data);
      const { token, redirectTo, userId } = response.data;
      localStorage.setItem("token", token); // Store the token in localStorage
      localStorage.setItem("userId", userId);
      window.location.href = redirectTo; // Redirect to the appropriate page
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form onSubmit={handleSubmit} style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div className="form-outline mb-4" data-mdb-input-init>
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4" data-mdb-input-init>
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  {error && <p>{error}</p>}
                  <p className="small mb-5 pb-lg-2">
                    <a href="#!" className="text-muted">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="/cusreg" className="link-info">
                      Register here
                    </a>
                  </p>
                  <p>
                    Employee reg... meka aiyn krpn{" "}
                    <a href="/empreg" className="link-info">
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
