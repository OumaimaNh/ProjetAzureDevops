import React, {useEffect ,useContext, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const AccepterCop= () => {
    const [selectedDemandeId, setSelectedDemandeId] = useState(null);

    const navigate = useNavigate();
    const handleCloseMiniPage = () => {
        setShowMiniPage(false);
      };

      const handleOptionChange = (value) => {
        setSelectedOption(value);
        setShowMiniPage(value === "Choose");
      };
      
      
    const sectionStyle = {
        backgroundImage: `url(/img/t4.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '',
      };
      const handleLogout = () => {
        // Détruire la session en supprimant l'ID utilisateur
        localStorage.removeItem("userId");
        localStorage.removeItem("prenomUser");
        localStorage.removeItem("nomUser");
        console.log("User logged out");
        navigate("/HomeUser")
      };
      const isUserLoggedIn = !!localStorage.getItem("userId");
      const nom = localStorage.getItem("nomUser");
      const prenom =localStorage.getItem("prenomUser");
      console.log(localStorage.getItem("nomUser"));
      console.log(localStorage.getItem("prenomUser"));
      const [demandes, setDemandes] = useState([]);
      const [demandesss, setDemandesss] = useState([]);
      const [Alldemandesss, setAllDemandesss] = useState([]);
      const [Alldemandes ,setAllDemandes] = useState([]);
      const [tontines, setTontines] = useState([]);
      const [allTontines, setAllTontines] = useState([]);
      const userm=localStorage.getItem("userId");
      const [allUsers, setAllUsers] = useState([]);
      const [users, setUsers] = useState([]);
      const [showMiniPage, setShowMiniPage] = useState(false);
      const [selectedOption, setSelectedOption] = useState("1");
      const[a,setA]=useState();
      useEffect(() => {
        const fetchData = async () => {
            
            try {
                
                    const res = await axios.get(`http://localhost:8085/utilisateurs/infoUser/${userm}`);
                    const ut = res.data.id_user;
                    setA(ut);
                   
                const responseParticipations = await axios.get('http://localhost:8085/Participation/listParticipation');
                const participationsData = responseParticipations.data;
                console.log("Participations:", participationsData);
                console.log("userrrrrrrrrrrrrrr:", ut);
                 
                const filteredParticipations = participationsData.filter( participation => 
                    participation.statutParticipation === "En attente de coparticipation" &&
                  participation.coparticipant.id_user === ut );

                  const demandesWithUserInfo = [];

                  for (const participation of filteredParticipations) {
                    const idUser = participation.participant.id_user;
            
                    const userResponse = await axios.get(
                      `http://localhost:8085/utilisateurs/infoUser/${idUser}`
                    );
                    const userInfo = userResponse.data;
            
                    const demandeWithUser = {
                      ...participation,
                      userInfo: userInfo,
                    };
            
                    demandesWithUserInfo.push(demandeWithUser);
                  }
            
                  setDemandes(demandesWithUserInfo);
                  setAllDemandes(demandesWithUserInfo);
            
                
const tontines = filteredParticipations.map(participation => {
    const idTontine = participation.tontine.idTontine; 
    return axios.get(`http://localhost:8085/Tontines/GetTontineById/${idTontine}`);

   

  });


  const tontineResponses = await Promise.all(tontines);
  
  const tontineData = tontineResponses.map(response => response.data);
  console.log("Tontines associées:", tontineData);
            } catch (error) {
                console.error('Error', error);
            }
        };
 
       
        fetchData();
    }, [navigate]);  
  
    const AccepterCoparticipation = async (idParticipation) => {
        try {
          const response = await axios.put(
            `http://localhost:8085/Participation/accepterDemandeCoParticipation/${idParticipation}`
          );
          navigate("/HomeUser");
          console.log('Demande de coparticipation réussie', response.data);
        } catch (error) {
          console.error('Erreur lors de la demande de coparticipation', error);
        }
      };
      const RefuserCoparticipation = async (idParticipation) => {
        try {
          const response = await axios.put(
            `http://localhost:8085/Participation/refuserDemandeCoParticipation/${idParticipation}`
          );
          navigate("/HomeUser");
          console.log('Demande de coparticipation refuseé', response.data);
        } catch (error) {
          console.error('Erreur lors de la demande de coparticipation', error);
        }
      };
      
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
    
    {/*
    
    Tooplate 2132 Clean Work
    
    https://www.tooplate.com/view/2132-clean-work
    
    Free Bootstrap 5 HTML Template
    
    */}
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
                                <a class="nav-link active" href="">Demandes cooparticipation</a>
                            </li>
    
                            <li class="nav-item">
                                <a class="nav-link" href="/HomeUser">Home</a>
                            </li>
    
                            
    
                            <li class="nav-item">
                                <a class="nav-link" href="/ChooseCoparticipant">Choisr Cooparticipant</a>
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
    
                <section style={sectionStyle} class="hero-section hero-section-full-height d-flex justify-content-center align-items-center">
                
                    <div class="section-overlay"></div>
                   =
                    <div class="container">
                        <div class="row">
    
                            <div class="col-lg-7 col-12 text-center mx-auto">
                                <h1 class="cd-headline rotate-1 text-white mb-4 pb-2">
                                    <span>Accepter les demandes    </span>
                                    <span class="cd-words-wrapper">
                                        <b class="is-visible">de Coparticipations</b>
                                        <b>Office</b>
                                        <b>Kitchen</b>
                                    </span>
                                </h1>
    
                              
                                <a class="custom-btn custom-border-btn custom-btn-bg-white btn button button--pan smoothscroll" href="#services-section">
                                    <span>Voir les demandes </span>
                                </a>
                            </div>
    
                        </div>
                    </div>
    
                   
                     </section>
    
    
                <section class="intro-section" id="intro-section">
                  
                </section>
    
    
                <section class="services-section section-padding section-bg" id="services-section">                
                    <div class="container">
                        <div class="row">
    
                            <div class="col-lg-12 col-12">
                                <h3 class="mb-4">accepter demande de cooparticipation </h3>
                            </div>
                            {demandes.map((demande, index) => (
                            <div key={index} class="col-lg-12 col-12">
                                <div class="services-thumb">
                                    <div class="">
                                      
    
                                        <div class="col-lg-7 col-md-7 col-12 d-flex align-items-center">
                                            <div class="services-info mt-4 mt-lg-0 mt-md-0">
                                                <h4 class="services-title mb-1 mb-lg-2">
                                               <h3> Tontine : {demande.tontine.libelle}</h3>
                                               <h4> Mensualité : {demande.tontine.montant} DH</h4>
                                               <h4> Votre part : {demande.tontine.montant /2} DH</h4>
                                                  
                                                </h4>
                                               
                                               
                                               
                                                <p class="text-black mb-0">
                                                <div>Rib : {demande.idParticipation} </div> 
                                                               
                                                               <div>Rib : {demande.rib} </div> 
                                                               <div>Banque: {demande.nomBanque}</div> 
                                                               <form >
                  <div class="table-responsive">
                      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                              <tr>
                                
                                  <th>nom</th>
                                  <th>prenom</th>
                              
                                  <th>email</th>
                                  <th>tel</th>
                                  <th>Accepter coparticipation</th>
                                  <th>Refuser coparticipation</th>
                               
                               
                              </tr>
                          </thead>
                           
                           <tbody> 
                        
                              <tr key={index}>
                            
                                  <th>{demande.userInfo.nom_user}</th>
                                  <th>{demande.userInfo.prenom}</th>
                                  <th>{demande.userInfo.email}</th>
                                  <th>{demande.userInfo.tel}</th>
                                  <th> <button
  className="custom-btn btn button button--atlas mt-2 ms-auto"
  onClick={() => AccepterCoparticipation(demande.idParticipation)}
>
  Accepter
</button>
</th>
<th> <button
  className="custom-btn btn button button--atlas mt-2 ms-auto"
  onClick={() => RefuserCoparticipation(demande.idParticipation)}
>
  Refuser
</button>
</th>

                              </tr> 
                            
                              
                          </tbody>
                      </table>
                  </div>
                  </form>
                                                         
                                                            </p>

                                                            <p class="text-black mb-0" style={{marginTop:"20px"}}>
                                                            <div>



                          
    </div>


                                                               
                                                            </p>
                                                           
                                                            <div className="mini-page-container">
                     
                </div>
              
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`mini-page ${showMiniPage ? "visible" : "hidden"}`}>



 
  <div class="card-body">
    
              </div>
</div>
                                </div>
                            </div>
                            ))}
                           
    
                        </div>
                    </div>
                </section>
             
    
                <section class="testimonial-section section-padding section-bg">
                    <div class="section-overlay"></div>
    
                    <div class="container">
                        <div class="row">
    
                            <div class="col-lg-12 col-12 text-center">
                                <h2 class="text-white mb-4">Les clients fidèles</h2>
                            </div>
    
                            <div class="col-lg-4 col-12">
                                <div class="featured-block">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-01.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Marie</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Best Cleaning Service Provider Ipsum dolor sit consectetur kengan</p>
                                </div>
    
                                <div class="featured-block mb-lg-0">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-02.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Nana</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                </div>
                            </div>
    
                            <div class="col-lg-4 col-12">
                                <div class="featured-block">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-03.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Elon</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                </div>
    
                                <div class="featured-block mb-lg-0">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-04.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Josh</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star"></i>
                                                <i class="bi-star"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                </div>
                            </div>
    
                            <div class="col-lg-4 col-12">
                                <div class="featured-block">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-05.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Katie</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                </div>
    
                                <div class="featured-block mb-lg-0">
                                    <div class="d-flex align-items-center mb-3">
                                        <img src="images/avatar/happy-customer-06.jpg" class="avatar-image img-fluid"/>
    
                                        <div class="ms-3">
                                            <h4 class="mb-0">Shai</h4>
    
                                            <div class="reviews-icons mb-1">
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star-fill"></i>
                                                <i class="bi-star"></i>
                                                <i class="bi-star"></i>
                                            </div>
                                        </div>
                                    </div>
    
                                    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </section>
    
    
                <section class="partners-section">
                    <div class="container">
                        <div class="row justify-content-center align-items-center">
    
                            <div class="col-lg-12 col-12">
                                <h4 class="partners-section-title bg-white shadow-lg">Les banques agrées</h4>
                            </div>
    
                            <div class="col-lg-2 col-md-4 col-6">
                            <a href="https://www.bankofafrica.ma/">
                                <img src="img/bmce.jpg" class="partners-image img-fluid"/>
                                </a>
                            </div>
    
                            <div class="col-lg-2 col-md-4 col-6">
                            <a href="https://bpnet.gbp.ma/">
                                <img src="img/chb.png" class="partners-image img-fluid"/>
                                </a>
                            </div>
    
                            <div class="col-lg-2 col-md-4 col-6">
                            <a href="attijariwafabank.com/fr">
                                <img src="img/at.png" class="partners-image img-fluid"/>
                                </a>                            </div>
    
                            <div class="col-lg-2 col-md-4 col-6">
                            <a href="https://www.albaridbank.ma/fr">
                                <img src="img/bard.jpg" class="partners-image img-fluid"/>
                                </a>                               </div>
    
                            <div class="col-lg-2 col-md-4 col-6">
                            <a href="https://www.alakhdarbank.ma/">
                                <img src="img/akh.png" class="partners-image img-fluid"/>
                                </a>                               </div>
    
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
export default AccepterCop;