import React, {useEffect ,useContext, useState } from "react";
import axios from "axios";

import { Link, useNavigate,useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const VoirDemandes = () => {
    const navigate = useNavigate();
    const [tontines, setTontines] = useState([]);
    const [demandes, setDemandes] = useState([]);
    const [Alldemandes, setAllDemandes] = useState([]);
    const [allTontines, setAllTontines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    //const {T} = useParams();
    const nom = localStorage.getItem("nomUser");
    const prenom =localStorage.getItem("prenomUser");
    const id =localStorage.getItem("userId");
    const T =localStorage.getItem("tnn");
    console.log(id);
    const idd = parseInt(localStorage.getItem("userId"), 10);


    console.log(localStorage.getItem("nomUser"));
    console.log(localStorage.getItem("prenomUser"));
    useEffect(() => {
        if (!id) {
            navigate("/loginUser");
          }
          else{
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/Tontines/GetTontineById/${T}`);
                const tontinesData = response.data;
             console.log("icccccccccccci",idd);

               
             console.log("données:",tontinesData);
             
             
                setTontines(tontinesData);
                setAllTontines(tontinesData);

                const responseParticipations = await axios.get('http://localhost:8085/Participation/listParticipation');
                const participationsData = responseParticipations.data;
                console.log("Participations:", participationsData);
    console.log("oooooooooooooo:", tontinesData.idTontine );
    console.log("3333333333333333333:", T );
                const filteredParticipations = participationsData.filter( participation => participation.tontine.idTontine === tontinesData.idTontine  && participation.statutParticipation !=="en attente de coparticipant"
                && participation.statutParticipation !=="En attente de coparticipation"
                && participation.statutParticipation !=="Refusée par Coparticipant"
                && participation.statutParticipation !=="Refusée"
                )
                
                setDemandes(filteredParticipations);
                setAllDemandes(filteredParticipations);
                 console.log("Participations filtrées:", filteredParticipations);

            } catch (error) {
                console.error('Error', error);
            }
        };
 
        fetchData();
 } }, [], [tontines,navigate]); 
 const handleSearch = () => {
    const filtereddemandess = Alldemandes.filter(demandess => {
        const lowerSearchTerm = searchTerm.toLowerCase();

        return (
            (demandess.idParticipation && demandess.idParticipation.toString().includes(lowerSearchTerm)) ||
            (demandess.dateParticipation && demandess.dateParticipation.toString().includes(lowerSearchTerm)) ||
            (demandess.montantParticipant && demandess.montantParticipant.toString().includes(lowerSearchTerm)) ||
            (demandess.nomBanque && demandess.nomBanque.toString().includes(lowerSearchTerm)) ||
            (demandess.rib && demandess.rib.toString().includes(lowerSearchTerm)) ||
            (demandess.tontine.idTontine && demandess.tontine.idTontine.toString().includes(lowerSearchTerm)) ||
            (demandess.statutParticipation && demandess.statutParticipation.toLowerCase().includes(lowerSearchTerm))
        );
    });

    setDemandes(filtereddemandess);
};
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("prenomUser");
        localStorage.removeItem("nomUser");
        console.log("User logged out");
        navigate('/loginUser')

      };
      const confirmLogout = () => {
        const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    
        if (confirmLogout) {
            handleLogout();
        }
    };

    const handleRefreshh = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/Tontines/GetTontineById/${T}`);
            const tontinesData = response.data;
               
            console.log("données:",tontinesData);
               setTontines(tontinesData);
               setAllTontines(tontinesData);
               const responseParticipations = await axios.get('http://localhost:8085/Participation/listParticipation');
               const participationsData = responseParticipations.data;
   
               const filteredParticipations = participationsData.filter( participation => participation.tontine.idTontine === tontinesData.idTontine && participation.statutParticipation !=="en attente de coparticipant"
               && participation.statutParticipation !=="En attente de coparticipation"  
               && participation.statutParticipation !=="Refusée par Coparticipant"             
                 && participation.statutParticipation !=="Refusée"

               )
   
               setDemandes(filteredParticipations);
               setAllDemandes(filteredParticipations);

               console.log("Participations filtrées:", filteredParticipations);
             
        } catch (error) {
            console.error('Error', error);
        }
    };
    const RefuserDemande = async (idP) => {
        try {
            const response = await axios.put(`http://localhost:8085/Participation/refuserDemandeParticipation/${id}/${idP}`);
           
                handleRefreshh();
          
                } catch (error) {
            console.error('Error', error);
        }
    };
    const AccepterDemande = async (idP) => {
        try {
            const response = await axios.put(`http://localhost:8085/Participation/accepterDemandeParticipation/${id}/${idP}`);
           
                handleRefreshh();
          
                } catch (error) {
            console.error('Error', error);
        }
    };
    const AccepterDemandeDouble = async (idP) => {
        try {
            const response = await axios.put(`http://localhost:8085/Participation/accepterDemandeDoubleParticipation/${idP}`);
           
                handleRefreshh();
          
                } catch (error) {
            console.error('Error', error);
        }
    };
  
    return (
       
        <html lang="en">
        
        <head>
        
            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content=""/>
            <meta name="author" content=""/>
        
            <title>SB Admin 2 - Tables</title>
            <link href="../../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"/>
        
            <link href="../../css/sb-admin-2.min.css" rel="stylesheet"/>
        
            <link href="../../vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet"/>
        
        </head>
        
        <body id="page-top">
        
            <div id="wrapper">
        
                 <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="">
                        <div class="sidebar-brand-icon rotate-n-15">
                           
                        </div>
                        <div img src="../../img/logo.png"  class="sidebar-brand-text mx-3">  <Link to="/VoirTontines" style={{color:"white"}}> TONTINE <sup> $</sup></Link></div>
                    </a>
        
                    <hr class="sidebar-divider my-0"/>
        
                    <li class="nav-item active">
                        <a class="nav-link" href="">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Les Demandes</span></a>
                    </li>
        
                    <hr class="sidebar-divider"/>
                    <div class="sidebar-heading">
                        Interface
                    </div>
                    <li class="nav-item">
                        <a class="nav-link collapsed" href="/voirUsersRe" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-user fa-cog"></i>
                            <span>Users</span>
                        </a>
                        <a class="nav-link collapsed" href="/VoirTontines" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i class="fas fa-user fa-cog"></i>
                            <span>Tontines</span>
                        </a>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div class="bg-white py-2 collapse-inner rounded">
                                <h6 class="collapse-header">Users Components:</h6>
                                <a class="collapse-item" href="Clients.html">Clients</a>
                                <a class="collapse-item" href="Supervisors.html">Supervisors</a>
                            </div>
                        </div>
                    </li>
                    
                   
                    <hr class="sidebar-divider"/>
        
                    <div class="sidebar-heading">
                         
                    </div>
                   
                    <hr class="sidebar-divider d-none d-md-block"/>
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
        
                            <form class="form-inline">
                                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                                    <i class="fa fa-bars"></i>
                                </button>
                            </form>
                            <form
                                class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div class="input-group">
                                <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
                                </div>
                            </form>
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
                            <h1 class="h3 mb-2 text-gray-800"><span class="fas fa-money-bill"></span>Les Demandes</h1>
                            
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">Tontine :{tontines.libelle}</h6> 
                                    <h6 class="m-0 font-weight-bold text-primary">période :{tontines.periode} Mois</h6> 
                                    <h6 class="m-0 font-weight-bold ">montant de participation :{tontines.montant} DH</h6> 
                                    <h6 class="m-0 font-weight-bold ">Nombre de participation :{tontines.nbrParticipants} </h6> 
                                    <h6 class="m-0 font-weight-bold ">Reste :{tontines.periode-tontines.nbTourActuel} </h6> 
                                    {tontines.statutTontine === 'Activé' && (
    <div className="alert alert-warning mt-2" role="alert">
        La tontine est démarrer. Vous ne pouvez pas Accepter plus de demandes.
    </div>
)}
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>idUser</th>
                                                    <th>Montant participation</th>
                                                    <th>Banque</th>
                                                    <th>rib</th>
                                                    <th>Tontine</th>
                                                    <th>Statut</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                             
                                             <tbody> 
                                             {demandes.map((demande, index) => (
                                                <tr key={index}>
                                                    <th>{demande.idParticipation}</th>
                                                    <th>{demande.participant.id_user}</th>
                                                    {/*<th>{new Date(demande.dateParticipation).toLocaleDateString()}</th>*/}
                                                    <th>{demande.montantParticipant}</th>
                                                    <th>{demande.nomBanque}</th>
                                                    <th>{demande.rib}</th>
                                                    <th>{demande.tontine.idTontine}</th>

                                                    {/*<th>{demande.tontine.nbTourActuel}</th>*/}
                                                    <th>
                                                    <div className={`badge ${
    demande.statutParticipation=== 'Demande en attente' ? 'bg-warning' :
    demande.statutParticipation === 'Refusée' ? 'bg-danger' :
    demande.statutParticipation === 'Acceptée' ? 'bg-success' :
    'bg-warning'
} rounded-pill text-white text-center`}>
    {demande.statutParticipation}
</div>
                                                    </th>
                                                    <td>
                                
                                <button className="btn btn-danger btn-circle" onClick={() => RefuserDemande(demande.idParticipation)} 
                                disabled={tontines.statutTontine === 'Activé'}>
                                    <i className="fas fa-trash"></i>
                                </button>
                                <button 
    className="btn btn-success btn-circle" 
    onClick={() => {
        if (demande.statutParticipation === 'Double demande en attente' && tontines.periode-tontines.nbTourActuel != 1) {
          AccepterDemandeDouble(demande.idParticipation);
        } else if(demande.statutParticipation === 'Demande en attente'){
            AccepterDemande(demande.idParticipation);
        }
       
      }}
    disabled={demande.statutParticipation === 'Acceptée' ||tontines.statutTontine === 'Activé'|| demande.statutParticipation === 'Double demande en attente' && tontines.periode-tontines.nbTourActuel == 1 }
>
    <i className="fas fa-edit"></i>
</button>
                                
                            </td>                                           

  
                                                </tr> 
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
        
                        </div>
        
                    </div>
                    <footer class="sticky-footer bg-white">
                        <div class="container my-auto">
                            <div class="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>
        
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
            <script src="../../vendor/jquery/jquery.min.js"></script>
            <script src="../../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../../vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="../../js/sb-admin-2.min.js"></script>
            <script src="../../vendor/datatables/jquery.dataTables.min.js"></script>
            <script src="../../vendor/datatables/dataTables.bootstrap4.min.js"></script>
            <script src="../../js/demo/datatables-demo.js"></script>
        
        </body>
        
        </html>
    );
};
export default VoirDemandes;
