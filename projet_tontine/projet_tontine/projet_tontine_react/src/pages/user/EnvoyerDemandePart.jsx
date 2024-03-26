
import React, {useEffect ,useContext, useState } from "react";
import axios from "axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const EnvoyerDemandePart= () => {
    const navigate = useNavigate();
    
    const [selectedOption, setSelectedOption] = useState("1");
    const [showMiniPage, setShowMiniPage] = useState(false);
    const [chequeFilePath, setChequeFilePath] = useState("");
    const isUserLoggedIn = !!localStorage.getItem("userId");
    const us=localStorage.getItem("userId");
    const nom = localStorage.getItem("nomUser");
    const prenom =localStorage.getItem("prenomUser");
    console.log(localStorage.getItem("nomUser"));
    console.log(localStorage.getItem("prenomUser"));
    console.log(us);

    const handleOptionChange = (value) => {
      setSelectedOption(value);
      //setShowMiniPage(value === "1/2");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      
    const handleCloseMiniPage = () => {
        setShowMiniPage(false);
      };
    
   
      const [formData, setFormData] = useState({
        chequeParticipation: null,
        selectedOption: "1",
        nomBanque: "",
        rib: ""
      });
      
    
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFormData({
          ...formData,
          chequeParticipation: file,
        });
      };
      
      
    
      const sendParticipationRequest = async (event) => {
        event.preventDefault();
      
        let apiEndpoint;
        let montantParticipant;
       
        let requestData = {
          chequeParticipation: formData.cheque,
          selectedOption: formData.selectedOption,
          nomBanque: formData.nomBanque,
          rib: formData.rib,
          montantParticipant:tontines.montantTotal,
        };
      
        if (selectedOption === "1") {
          montantParticipant = tontines.montantTotal;
          apiEndpoint = `http://localhost:8085/Participation/demande/${idTn}/${us}`;
        } else if (selectedOption === "1/2") {
          apiEndpoint = `http://localhost:8085/Participation/demandeDemi/${idTn}/${us}`;
        } else if (selectedOption === "2") {
          apiEndpoint = `http://localhost:8085/Participation/demanderDouble/${idTn}/${us}`;
        }
      
        try {
          const response = await axios.post(apiEndpoint, requestData);
          navigate("/homeUser");
          console.log(response.data);
        } catch (error) {
          console.error("Erreur lors de l'envoi de la demande de participation", error);
          // Handle error responses
        }
        }
      
    const sectionStyle = {
        backgroundImage: `url(/img/t4.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '',
      };
      const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("prenomUser");
        localStorage.removeItem("nomUser");
        console.log("User logged out");
        navigate("/HomeUser")
      };
      

      const [tontines, setTontines] = useState([]);
      const [allUsers, setAllUsers] = useState([]);
      const [users, setUsers] = useState([]);
      const [allTontines, setAllTontines] = useState([]);
      const [searchParams] = useSearchParams();
      const idTn = searchParams.get('id');
      const userm=localStorage.getItem("userId");
      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/Tontines/GetTontineById/${idTn}`);
                const allTontinesData = response.data;
    
                console.log("données:", allTontinesData);
                
                setTontines(allTontinesData);
                setAllTontines(allTontinesData);
              
            } catch (error) {
                console.error('Error', error);
            } 
            try {
                const response = await axios.get('http://localhost:8085/utilisateurs/tousUtilisateurs');
                const usersData = response.data;
                console.log("waaaaaaaaaaaaaaaa:",userm);

                const filteredUsers = usersData.filter(user =>  user.id_user != userm && user.statut_user ==="active" && user.role.id_role=== 1  );
             console.log("role:",filteredUsers);
                setUsers(filteredUsers);
                setAllUsers(filteredUsers);
            } catch (error) {
                console.error('Error', error);
            }
        };
    
        fetchData();
    }, [navigate]);  
  
return(
   
    <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
            <meta name="description" content=""/>
            <meta name="author" content=""/>
    
            <title>Clean Work HTML CSS Template</title>
    
            {/* CSS FILES */}      
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet"/>
    
            <link href="css/bootstrap.min.css" rel="stylesheet"/>
    
            <link href="css/bootstrap-icons.css" rel="stylesheet"/>
    
            <link href="css/tooplate-clean-work.css" rel="stylesheet"/>
    
            <style>
          {`
            input[type="radio"] {
              width: 1.5em;
              height: 1.5em;
            }
            .mini-page-container {
              display: ${showMiniPage ? "flex" : "none"};
              justify-content: center;
              align-items: center;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.9);
            }
            .mini-page {
              width: 100%;
              max-width: 800px;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              border-radius: 5px;
            }
          `}
        </style>
        </head>
        
        <body>
    
            <nav style={{"marginTop":"-55px"}} class="navbar navbar-expand-lg">
                <div class="container">
                    <div class="navbar-brand" href="">
                        <img src="img/money.jpg" class="logo img-fluid" alt=""/>
    
                        {(nom && prenom) ? (
                            <span class="ms-2">{nom} {prenom}</span>
                        ) : (
                            <span class="ms-2">Connectez-vous et participer</span>
                        )}
                    </div>
    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="index.html">Home</a>
                            </li>
    
                            <li class="nav-item">
                                <a class="nav-link" href="about.html">About Us</a>
                            </li>
    
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#section_5" id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
    
                                <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                                    <li><a class="dropdown-item" href="services.html">Our Services</a></li>
    
                                    <li><a class="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
    
                                    <li><a class="dropdown-item" href="page-404.html">Page 404</a></li>
                                </ul>
                            </li>
    
                            <li class="nav-item">
                                <a class="nav-link" href="contact.html">Contact</a>
                            </li>
    
                            <li class="nav-item ms-3">
                            {isUserLoggedIn ? (
                    <a
                      className="nav-link custom-btn custom-border-btn custom-btn-bg-white btn"
                      href=""
                      onClick={handleLogout}
                    >
                      Déconnecter
                    </a>
                  ) : (
                    <a
                      className="nav-link custom-btn custom-border-btn custom-btn-bg-white btn"
                      href="/loginUser"
                     
                    >
                      Connectez Vous
                    </a>
                  )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    
            <main>
    
    
                
    
    
    
    
                <section class="testimonial-section section-padding section-bg">
                    <div class="section-overlay"></div>
    
                    <div class="container">
                        <div class="row">
    
                            <div class="col-lg-12 col-12 text-center">
                                <h2 class="text-white mb-4">Envoyer Demande de participation</h2>
                            </div>
    
                           
    
                            <div class="col-lg-12 col-12">
                            <form onSubmit={sendParticipationRequest} method="POST">
                                <div class="featured-block">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="img/money.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">{tontines.libelle}</h4>
                                            
    
                                           <h5>Montant :{tontines.montant} DH</h5>
                                        </div>
                                    </div>
    
                                    <div className="upload-container">
                                    <label htmlFor="cheque">Sélectionner votre chèque PDF:</label>
<input
  type="file"
  id="cheque"
  name="cheque"
  accept=".pdf"
  onChange={handleFileUpload}
/>

                 </div>



                              <div class="d-flex align-items-center mb-2" style={{"marginLeft":"280px","marginTop":"50px"}}>
                                
                              <div className="ms-3">
                        <h4 className="mb-0" style={{color:"black"}}>Mode de participation:</h4>
                        <label  style={{"marginTop":"30px"}}>
                          <input   style={{"marginLeft":"60px"}}
                            type="radio"
                            name="options"
                            value="1"
                            checked={selectedOption === "1"}
                            onChange={() => handleOptionChange("1")}
                          />
                          1
                        </label>

                        <label>
                          <input style={{"marginLeft":"60px"}}
                            type="radio"
                            name="options"
                            value="1/2"
                            checked={selectedOption === "1/2"}
                            onChange={() => handleOptionChange("1/2")}
                          />
                          1/2
                        </label>

                        <label>
                          <input style={{"marginLeft":"60px"}}
                            type="radio"
                            name="options"
                            value="2"
                            checked={selectedOption === "2"}
                            onChange={() => handleOptionChange("2")}
                          />
                          2
                        </label>

                        
                       
                      </div>

                    </div> 
                    <div className="ms-3">
                    <label htmlFor="nomBanque">Nom de la banque :</label>
<input
  type="text"
  id="nomBanque"
  name="nomBanque"
  value={formData.nomBanque}
  onChange={(e) => handleInputChange(e)}
/>

<label htmlFor="rib">RIB :</label>
<input
  type="text"
  id="rib"
  name="rib"
  value={formData.rib}
  onChange={(e) => handleInputChange(e)}
/>

                    </div>
                    <button type="submit" className="custom-btn btn button" style={{ "marginLeft": "350px", "marginTop": "50px" }}>
              <div class="marquer">
                <div class="">
                  <span>Envoyer la Demande</span>
                </div>
              </div>
            </button>


                  </div>
                </form>
                </div>
                <div className="mini-page-container">
                  <div className={`mini-page ${showMiniPage ? "visible" : "hidden"}`}>
                  <button
                      type="button"
                      className="close-btn"
                      onClick={handleCloseMiniPage}
                      style={{marginLeft:"700px"}}
                    >
                      &times;
                    </button>
                   
                    <h4 style={{marginLeft:"80px", color:"blue"}}>Les utilisateurs suggérer</h4>
                    <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                  
                                                    <th>nom</th>
                                                    <th>prenom</th>
                                                
                                                    <th>email</th>
                                                    <th>tel</th>
                                                    <th>Demander coparticipation</th>
                                                 
                                                 
                                                </tr>
                                            </thead>
                                             
                                             <tbody> 
                                             {users.map((user, index) => (
                                                <tr key={index}>
                                                    <th>{user.nom_user}</th>
                                                    <th>{user.prenom}</th>
                                                    <th>{user.email}</th>
                                                    <th>{user.tel}</th>
                                                    <th><button className="custom-btn btn button button--atlas mt-2 ms-auto">Envoyer</button></th>

                                                </tr> 
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                  </div>
                </div>
              
              </div>
            </div>
          </section>

            </main>
    
    
            <footer class="site-footer">
                <div class="container">
                    <div class="row">
    
                        <div class="col-lg-12 col-12 d-flex align-items-center mb-4 pb-2">
                            <div>
                                <img src="images/bubbles.png" class="logo img-fluid" alt=""/>
                            </div>
    
                            <ul class="footer-menu d-flex flex-wrap ms-5">
                                <li class="footer-menu-item"><a href="#" class="footer-menu-link">About Us</a></li>
    
                                <li class="footer-menu-item"><a href="#" class="footer-menu-link">Blog</a></li>
    
                                <li class="footer-menu-item"><a href="#" class="footer-menu-link">Reviews</a></li>
    
                                <li class="footer-menu-item"><a href="#" class="footer-menu-link">Contact</a></li>
                            </ul>
                        </div>
    
                        <div class="col-lg-5 col-12 mb-4 mb-lg-0">
                            <h5 class="site-footer-title mb-3">Our Services</h5>
    
                            <ul class="footer-menu">
                                <li class="footer-menu-item">
                                    <a href="#" class="footer-menu-link">
                                        <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                        House Cleaning
                                    </a>
                                </li>
    
                                <li class="footer-menu-item">
                                    <a href="#" class="footer-menu-link">
                                        <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                        Car Washing
                                    </a>
                                </li>
    
                                <li class="footer-menu-item">
                                    <a href="#" class="footer-menu-link">
                                        <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                        Laundry
                                    </a>
                                </li>
    
                                <li class="footer-menu-item">
                                    <a href="#" class="footer-menu-link">
                                        <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                        Office Cleaning
                                    </a>
                                </li>
    
                                <li class="footer-menu-item">
                                    <a href="#" class="footer-menu-link">
                                        <i class="bi-chevron-double-right footer-menu-link-icon me-2"></i>
                                        Toilet Cleaning
                                    </a>
                                </li>
                            </ul>
                        </div>
    
                        <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                            <h5 class="site-footer-title mb-3">Office</h5>
    
                            <p class="text-white d-flex mt-3 mb-2">
                                <i class="bi-geo-alt-fill me-2"></i>
                                Akershusstranda 20, 0150 Oslo, Norway
                            </p>
    
                            <p class="text-white d-flex mb-2">
                                <i class="bi-telephone-fill me-2"></i>
    
                                <a href="tel: 110-220-9800" class="site-footer-link">
                                    110-220-9800
                                </a>
                            </p>
    
                            <p class="text-white d-flex">
                                <i class="bi-envelope-fill me-2"></i>
    
                                <a href="mailto:info@company.com" class="site-footer-link">
                                    info@company.com
                                </a>
                            </p>
    
                            <ul class="social-icon mt-4">
                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link button button--skoll">
                                        <span></span>
                                        <span class="bi-twitter"></span>
                                    </a>
                                </li>
    
                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link button button--skoll">
                                        <span></span>
                                        <span class="bi-facebook"></span>
                                    </a>
                                </li>
    
                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link button button--skoll">
                                        <span></span>
                                        <span class="bi-instagram"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
    
                        <div class="col-lg-3 col-md-6 col-6 mt-3 mt-lg-0 mt-md-0">
                            <div class="featured-block">
                                <h5 class="text-white mb-3">Service Hours</h5>
    
                                <strong class="d-block text-white mb-1">Mon - Fri</strong>
    
                                <p class="text-white mb-3">8:00 AM - 5:30 PM</p>
    
                                <strong class="d-block text-white mb-1">Sat</strong>
    
                                <p class="text-white mb-0">6:00 AM - 2:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="site-footer-bottom">
                    <div class="container">
                        <div class="row">
    
                            <div class="col-lg-6 col-12">
                                <p class="copyright-text mb-0">Copyright © 2036 Clean Work Co., Ltd.</p>
                            </div>
                            
                            <div class="col-lg-6 col-12 text-end">
                                <p class="copyright-text mb-0">
                                // Designed by <a href="https://www.tooplate.com" target="_parent">Tooplate</a> //</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </footer>
    
            {/* JAVASCRIPT FILES */}
            <script src="js/jquery.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="js/jquery.backstretch.min.js"></script>
            <script src="js/counter.js"></script>
            <script src="js/countdown.js"></script>
            <script src="js/init.js"></script>
            <script src="js/modernizr.js"></script>
            <script src="js/animated-headline.js"></script>
            <script src="js/custom.js"></script>
    
        </body>
    </html>
    
);
};
export default EnvoyerDemandePart;
