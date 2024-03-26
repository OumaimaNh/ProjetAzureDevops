import React, {useEffect ,useContext, useState } from "react";
import axios from "axios";

import { useNavigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const AjouterTontine = () => {
    const navigate = useNavigate();
    const [tontineData, setTontineData] = useState({
        libelle:"",
        description:"",
        montant: "",
        nbrParticipants:"",
        periode:"",
        montantTotal:"0",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTontineData({ ...tontineData, [name]: value });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8085/Tontines/AddTontine", tontineData);
           
            console.log("User registered successfully:", response.data);
         

            navigate("/Tontine");
        }catch (error) {
            console.error('Error', error);
            console.log('Error response data:', error.response.data);
        }
    };
    
    
    const nom = localStorage.getItem("nomUser");
    const prenom =localStorage.getItem("prenomUser");
    const id =localStorage.getItem("userId");
    console.log(localStorage.getItem("nomUser"));
    console.log(localStorage.getItem("prenomUser"));
    useEffect(() => {
       
        if (!id) {
         
          navigate("/loginUser");
        }
      }, [navigate]);
      const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("prenomUser");
        localStorage.removeItem("nomUser");
        console.log("User logged out");
        navigate('/loginUser')
       
      }; const confirmLogout = () => {
            const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
        
            if (confirmLogout) {
                handleLogout();
            }
        };
return(
    <html lang="en">
    
    <head>
    
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="description" content=""/>
        <meta name="author" content=""/>
    
        <title>SB Admin 2 - Dashboard</title>
    
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
        <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet"/>
    
        <link href="css/sb-admin-2.min.css" rel="stylesheet"/>
    
    </head>
    
    <body id="page-top">
    
        <div id="wrapper">
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                       
                    </div>
                    <div img src="img/logo.png"  class="sidebar-brand-text mx-3"> <Link to="/tontine" style={{color:"white"}}>TONTINE <sup> $</sup></Link></div>
                </a>
                <li class="nav-item active">
                    <a class="nav-link" href="">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Ajouter Tontine</span></a>
                </li>
    
           
                <div class="sidebar-heading">
                    Interface
                </div>
    
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-user fa-cog"></i>
                        <span>Users</span>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Users Components:</h6>
                            <a class="collapse-item" href="Clients.html">Clients</a>
                            <a class="collapse-item" href="Supervisors.html">Supervisors</a>
                        </div>
                    </div>
                </li>
    
                <li class="nav-item">
                    <a class="nav-link collapsed" href="/Tontine" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-money-bill fa-cog"></i>
                        <span>Tontine</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Tontines Components:</h6>
                            <a class="collapse-item" href="Clients.html">Lists</a>
                            <a class="collapse-item" href="Supervisors.html">Statistics</a>
                        </div>
                    </div>
                </li>
              
                <div class="sidebar-heading">
                     
                </div>
                <li class="nav-item">
                    <a class="nav-link" href="/profileAdmin">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Profil</span></a>
                </li>
             
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
                <div class="sidebar-card d-none d-lg-flex">
                    <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."/>
                    <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
                </div>
    
            </ul>
            <div id="content-wrapper" class="d-flex flex-column">
    
                <div id="content">
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    
                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>
    
                        
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown no-arrow d-sm-none">
                                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-search fa-fw"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form class="form-inline mr-auto w-100 navbar-search">
                                        <div class="input-group">
                                            <input type="text" class="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search"
                                                aria-describedby="basic-addon2"/>
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button">
                                                    <i class="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-bell fa-fw"></i>
                        
                                    <span class="badge badge-danger badge-counter">3+</span>
                                </a>
                                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 class="dropdown-header">
                                        Alerts Center
                                    </h6>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="mr-3">
                                            <div class="icon-circle bg-primary">
                                                <i class="fas fa-file-alt text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="small text-gray-500">December 12, 2019</div>
                                            <span class="font-weight-bold">A new monthly report is ready to download!</span>
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="mr-3">
                                            <div class="icon-circle bg-success">
                                                <i class="fas fa-donate text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="small text-gray-500">December 7, 2019</div>
                                            $290.29 has been deposited into your account!
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="mr-3">
                                            <div class="icon-circle bg-warning">
                                                <i class="fas fa-exclamation-triangle text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="small text-gray-500">December 2, 2019</div>
                                            Spending Alert: We've noticed unusually high spending for your account.
                                        </div>
                                    </a>
                                    <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                </div>
                            </li>
    
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-envelope fa-fw"></i>
                                    <span class="badge badge-danger badge-counter">7</span>
                                </a>
                                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="messagesDropdown">
                                    <h6 class="dropdown-header">
                                        Message Center
                                    </h6>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="dropdown-list-image mr-3">
                                            <img class="rounded-circle" src="img/undraw_profile_1.svg"
                                                alt="..."/>
                                            <div class="status-indicator bg-success"></div>
                                        </div>
                                        <div class="font-weight-bold">
                                            <div class="text-truncate">Hi there! I am wondering if you can help me with a
                                                problem I've been having.</div>
                                            <div class="small text-gray-500">Emily Fowler · 58m</div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="dropdown-list-image mr-3">
                                            <img class="rounded-circle" src="img/undraw_profile_2.svg"
                                                alt="..."/>
                                            <div class="status-indicator"></div>
                                        </div>
                                        <div>
                                            <div class="text-truncate">I have the photos that you ordered last month, how
                                                would you like them sent to you?</div>
                                            <div class="small text-gray-500">Jae Chun · 1d</div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="dropdown-list-image mr-3">
                                            <img class="rounded-circle" src="img/undraw_profile_3.svg"
                                                alt="..."/>
                                            <div class="status-indicator bg-warning"></div>
                                        </div>
                                        <div>
                                            <div class="text-truncate">Last month's report looks great, I am very happy with
                                                the progress so far, keep up the good work!</div>
                                            <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="dropdown-list-image mr-3">
                                            <img class="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                alt="..."/>
                                            <div class="status-indicator bg-success"></div>
                                        </div>
                                        <div>
                                            <div class="text-truncate">Am I a good boy? The reason I ask is because someone
                                                told me that people say this to all dogs, even if they aren't good...</div>
                                            <div class="small text-gray-500">Chicken the Dog · 2w</div>
                                        </div>
                                    </a>
                                    <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                </div>
                            </li>
    
                            <div class="topbar-divider d-none d-sm-block"></div>
    
                            <li class="nav-item dropdown no-arrow">
                            <div class="nav-link dropdown-toggle"  id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">  {(nom && prenom) ? (
                           <a href="/profileAdmin"><span class="ms-2">{nom} {prenom}</span></a> 
                        ) : (
                            <span class="ms-2">rien</span>
                        )}</span>
                                        <img class="img-profile rounded-circle"
                                            src="img/undraw_profile.svg"/>
                                             <span class="ms-2"> <i class="fas fa-sign-out-alt"  onClick={confirmLogout}> Déconnexion</i></span>
                                    </div>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
    
                        </ul>
    
                    </nav>
        
                    <div class="container-fluid">
    
                        
                        <main>
                            <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                                <div class="container-xl px-4">
                                    <div class="page-header-content">
                                        <div class="row align-items-center justify-content-between pt-3">
                                            <div class="col-auto mb-3">
                                                <h1 class="page-header-title">
                                                <i class="fas fa-fw fa-plus-circle"></i>
                                                    Ajouter nouvelle tontine
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div class="container-xl px-4 mt-4">
                               
                                <div class="row">
                                  
                                    <div class="col-xl-10">
                                            <div class="card shadow mb-4">
                                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                    <h6 class="m-0 font-weight-bold text-primary">Tontine Details</h6></div>
                                            <div class="card-body">
                                                <form method="POST" id="login-form" onSubmit={handleFormSubmit}>
                                                    <div class="mb-3">
                                                        <label class="" for="inputUsername">Libelle tontine</label>
                                                        <input class="form-control" name="libelle" id="libelle" type="text" placeholder="Entrer libelle" onChange={handleInputChange} />
                                                    </div>
                                                    <div class="row gx-3 mb-3">
                                                        <div class="col-md-6">
                                                            <label class="" for="inputFirstName">Description</label>
                                                            <textarea class="form-control" name="description" id="description" type="text" placeholder="Enrer description" onChange={handleInputChange} />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="" for="inputLastName">Montant</label>
                                                            <input class="form-control" id="montant" name="montant" type="number" placeholder="Entrer le montant " onChange={handleInputChange}/>
                                                        </div>
                                                    </div>
                                                    <div class="row gx-3 mb-3">
                                                        <div class="col-md-6">
                                                            <label class="" for="inputOrgName">Nombre participants</label>
                                                            <input class="form-control" id="nbrParticipants" name="nbrParticipants" type="number" placeholder="Entrer nombre des participants" onChange={handleInputChange} />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label class="" for="inputLocation">Période</label>
                                                            <input class="form-control" id="periode" name="periode" type="number" placeholder="Enter la duree de ctte tontine" onChange={handleInputChange}/>
                                                        </div>
                                                    </div>
                                                   
                                                    
                                                    <button class="btn btn-primary" type="submit">Save changes</button>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </main>
                    </div>
              
    
                </div>
    
            </div>
    
    
        </div>
    
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    
        <script src="js/sb-admin-2.min.js"></script>
    
        <script src="vendor/chart.js/Chart.min.js"></script>
    
        <script src="js/demo/chart-area-demo.js"></script>
        <script src="js/demo/chart-pie-demo.js"></script>
    
    </body>
    
    </html>
);
};
export default  AjouterTontine;