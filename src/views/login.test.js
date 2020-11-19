// import React from "react";
// import ReactDOM from "react-dom";

// import { useAuth0 } from '@auth0/auth0-react';

// const user = {
//   email: "johndoe@me.com",
//   email_verified: true,
//   sub: "google-oauth2|12345678901234"
// };

// // intercept the useAuth0 function and mock it
// jest.mock("@auth0/auth0-react");

// describe("First test", () => {
//   beforeEach(() => {
//     // Mock the Auth0 hook and make it return a logged in state
//     useAuth0.mockReturnValue({
//       isAuthenticated: true,
//       user,
//       logout: jest.fn(),
//       loginWithRedirect: jest.fn()
//     });
//   });

// //   it("renders without crashing", () => {
// //     const div = document.createElement("div");
// //     ReactDOM.render( < TopBar / > , div);
// //   });
// });

// import React from 'react'
// import ReactDOM from 'react-dom'
// import Login from '../layouts/Login'
//   test('calls onSubmit with the username and password when submitted',() => {
//     const handleSubmit = jest.fn()
//     const container = document.createElement('div')
//     const form = container.querySelector('form')
//     const {username, password} = form.element 
//     username.value = 'Kenny'
//     passwords.value = 'pineapples'
    
//     form.dispatchEvent(new window.event('submit'))
//       expect(handleSubmit).toHaveBeenCalledTimes(1)
//       expect(handleSubmit).toHaveBeenCalledWith({
//         username: username.value,
//         password: password.value, 
//       })
//   ReactDOM.render(<Login onSubmit = {handleSubmit} />, container)
//   })

import Login from "../layouts/Login";
import mockAxios from "../mocks/axios";

it("Test retrieval of questions", async () => {
    // set up mock Axios data retrieval
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data:{
                Login: ["Johndoe@gmail.com"]
            }
        })
    );

});