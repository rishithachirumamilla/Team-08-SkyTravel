import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CFWButton from "../../../components/form/CFWButton";
import CInputWithIcon from "../../../components/form/CInputWithIcon";
import Logo from "../../../components/general/Logo";

import { AIRLINE_USER } from "../../../helpers/variables";
import useAuth from "../../../hooks/useAuth";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { uploadImage, registerAirline, registerUser } = useAuth();

  const isAirline = location.pathname.includes("airline");

  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });

  const submitHandler = async event => {
    event.preventDefault();

    try {
      const imgRes = await uploadImage(user.image);
      if (!imgRes) return;

      const response = await (isAirline
        ? registerAirline({ ...user, image: imgRes.file })
        : registerUser({ ...user, image: imgRes.file }));

      if (response) {
        localStorage.setItem(AIRLINE_USER, JSON.stringify(response));
        isAirline
          ? navigate("/airline/dashboard")
          : navigate("/flightschedules");
      }
    } catch (err) {
      console.log(err);
    }

    console.log("SUB");
  };
  const changeHandler = event => {
    const { name, value, files } = event.target;

    setUser(pS => ({
      ...pS,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const navigateToLogin = () =>
    navigate(
      location.pathname.includes("airline")
        ? "/auth/airline/signin"
        : "/auth/signin"
    );
  return (
    <div className='signIn'>
      <img
        src={require("../../../assets/flyingPlane.png")}
        alt=''
        className='signIn--bg'
      />

      <div className='signIn__content'>
        <div className='signIn__box'>
          <Logo />
          <form onSubmit={submitHandler} className='signIn__box__form'>
            <CInputWithIcon
              icon='fa-solid fa-fingerprint'
              placeholder='Username'
              name='username'
              id='username'
              required={true}
              type='text'
              onChange={changeHandler}
            />
            <CInputWithIcon
              icon='fa-brands fa-cuttlefish'
              placeholder='Name'
              name='name'
              id='name'
              required={true}
              type='text'
              onChange={changeHandler}
            />
            <CInputWithIcon
              icon='fa-solid fa-envelope'
              placeholder='Email'
              name='email'
              id='email'
              required={true}
              type='email'
              onChange={changeHandler}
            />
            <CInputWithIcon
              icon='fa-solid fa-phone'
              placeholder='Phone'
              name='phone'
              id='phone'
              required={true}
              type='tel'
              onChange={changeHandler}
              // pattern='[0-9]{3}[0-9]{2}[0-9]{3}'
            />
            <CInputWithIcon
              icon='fa-solid fa-image'
              placeholder='Image'
              name='image'
              id='image'
              required={true}
              type='file'
              accept='image/*'
              onChange={changeHandler}
            />
            <CInputWithIcon
              icon='fa-solid fa-lock'
              placeholder='Password'
              name='password'
              id='password'
              required={true}
              type='password'
              onChange={changeHandler}
            />
            <CFWButton
              title='Sign Up'
              type='submit'
              style={{ marginTop: "0.5rem" }}
            />

            <div className='centered signIn__box__form__text'>
              Already have an account?{" "}
              <span onClick={navigateToLogin}> Sign In Now</span>
            </div>
          </form>
        </div>
        <div className='signIn__content__right'>
          <div>
            <h1>Join Now, It's free!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
