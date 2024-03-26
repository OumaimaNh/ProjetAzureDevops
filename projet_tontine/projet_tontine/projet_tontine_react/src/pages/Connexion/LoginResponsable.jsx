import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginResponsable = () => {
    return (
       
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>Sign Up Form by Colorlib</title>
        
       
            <link rel="stylesheet" href="../../fonts/material-icon/css/material-design-iconic-font.min.css"/>
        
    
            <link rel="stylesheet" href="../../css1/style.css"/>
        </head>
        <body>
        
            <div class="main">
        
                <section class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <div class="signup-form">
                                <h2 class="form-title">Connection Responsable</h2>
                                <form method="POST" class="register-form" id="register-form">
                                   
                                    <div class="form-group">
                                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                                        <input type="email" name="email" id="email" placeholder="Your Email"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="pass" id="pass" placeholder="Password"/>
                                    </div>
                                   
                                    <div class="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                        <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                                    </div>
                                    <div class="form-group form-button">
                                        <input type="submit" name="signin" id="signin" class="form-submit" value="Login"/>
                                    </div>
                                </form>
                            </div>
                            <div class="signup-image">
                                <figure><img src="img/money.jpg" alt="sing up image"/></figure>
                                <a href="#" class="signup-image-link">I am already member</a>
                            </div>
                        </div>
                    </div>
                </section>
              
        
            </div>
        
          
            <script src="../../vendor1/jquery/jquery.min.js"></script>
            <script src="../../js1/main.js"></script>
        </body>
        </html>
    );
};
export default LoginResponsable;
