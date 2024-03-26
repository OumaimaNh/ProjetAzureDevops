import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterUser = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null); 
    const [userData, setUserData] = useState({
        nom_user: "",
        prenom: "",
        email: "",
        adresse: "",
        cne: "",
        tel: "",
        password: "",
        statut_user:"active",
    });

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
     
        if (!userData.email || !userData.password ||  !userData.tel || !userData.cne) {
            setError("Veuillez remplir tous les champs.");
           return;
        }
        const telRegex = /^(06|08)\d{8}$/; 
    if (!telRegex.test(userData.tel)) {
        setError("Le numéro de téléphone doit commencer par 06 ou 08 et contenir 10 chiffres.");
        return;
    }
        try {
            const response = await axios.post("http://localhost:8085/utilisateurs/inscrire", userData);
            console.log("User registered successfully:", response.data);
            const userId = response.data.id;
            setError(null);
            navigate("/loginUser");
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
        <div className="main">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="img/money.jpg" alt="sign up image"/></figure>
                           
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleFormSubmit}>
                            {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
                                <div className="form-group">
                                    <label htmlFor="nom"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="nom_user" id="nom_user" placeholder="Nom" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="prenom"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="prenom" id="prenom" placeholder="Prénom" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email"><i class="zmdi zmdi-email"></i></label>
                                    <input type="text" name="email" id="email" placeholder="Email" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="adresse"> <i className="zmdi zmdi-pin"></i></label>
                                    <input type="text" name="adresse" id="adresse" placeholder="Adresse" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cne"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="cne" id="cne" placeholder="CNE" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Tel"> <i className="zmdi zmdi-phone"></i></label>
                                    <input type="text" name="tel" id="tel" placeholder="Téléphone" onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className={`zmdi ${showPassword ? "zmdi-eye-off" : "zmdi-eye"}`} onClick={handleTogglePassword}></i></label>
                                    <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" onChange={handleInputChange}/>
                                </div>
                               
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="S'inscrire"/>
                                </div>
                            </form>
                            <div className="social-login">
                                <a href="/LoginUser" className="social-label">J'ai dèje un compte</a>
                                
                            </div>
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

export default RegisterUser;
