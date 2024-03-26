import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginUser = () => {
    const navigate = useNavigate();


    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null); 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleFormSubmit = async (e) => {
        
    
        e.preventDefault();
        if (!userData.email || !userData.password) {
            setError("Veuillez remplir tous les champs.");
           return;
        }
        try {
            const response = await axios.post("http://localhost:8085/utilisateurs/login", userData);
            console.log("User registered successfully:", response.data);
            const userId = response.data.id;
          

            const response2 = await axios.get(`http://localhost:8085/utilisateurs/infoUser/${userId}`);
            const nom_user = response2.data.nom_user;
            const prenom = response2.data.prenom;
            localStorage.setItem("userId", userId);
            localStorage.setItem("nomUser", nom_user);
            localStorage.setItem("prenomUser", prenom);
            console.log("User ID in session:", localStorage.getItem("userId"));
            console.log("User nom:", localStorage.getItem("nomUser"));
            console.log("User prenom:", localStorage.getItem("prenomUser"));
            
            const role = response2.data.role.id_role; 
            console.log("Role:", role);

            if (role === 2) {
                navigate("/VoirTontines");
                
              } else if (role === 3) {
                navigate("/tontine");
              } else {
                navigate("/homeUser");
              }

              setError(null);
       
        } catch (error) {
            console.error("Error logging in:", error);

            if (error.response) {
                setError(error.response.data.message); 
            }  else {
                setError("An unexpected error occurred");
            }
        }
    };
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
                            <h2 className="form-title">Login</h2>
                            <form method="POST" className="register-form" id="register-form" onSubmit={handleFormSubmit}>
                            {error && <p className="error-message" style={{color:"red"}}>{error}</p>} 
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email" onChange={handleInputChange} />
                                </div>
                              
                                <div className="form-group">
    <label htmlFor="password"> <i className={`zmdi ${showPassword ? "zmdi-eye-off" : "zmdi-eye"}`} onClick={handleTogglePassword}></i></label>
    <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleInputChange}
       
    />
   
</div>

                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Login" />
                                </div>
                            </form>
                            <div className="social-login">
                                <a href="/registerUser" className="social-label">J'ai pas un compte ,S'inscrire</a>
                                
                            </div>
                        </div>
                        <div class="signup-image">
                                <figure><img src="img/money.jpg" alt="sing up image"/></figure>
                            </div>
                    </div>
                </div>
            </section>
            <script src="../../vendor1/jquery/jquery.min.js"></script>
            <script src="../../js1/main.js"></script>
        </div>
        <script src="../../vendor1/jquery/jquery.min.js"></script>
            <script src="../../js1/main.js"></script>
        </body>
        </html>
    );
};
        
          
     
    
export default LoginUser;
