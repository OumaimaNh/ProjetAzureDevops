import React, { useContext, useState } from "react";

import { useNavigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const ConsulterTontine = () => {
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
                    <div img src="img/logo.png"  class="sidebar-brand-text mx-3"> TONTINE <sup> $</sup></div>
                </a>
    
                               <li class="nav-item active">
                    <a class="nav-link" href="Dashboard.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
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
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
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
                    <a class="nav-link" href="ProfilAdmin.html">
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
    
                           {/* Nav Item - Messages */}
                            <li class="nav-item dropdown no-arrow mx-1">
                                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-envelope fa-fw"></i>
                                   {/* Counter - Messages */}
                                    <span class="badge badge-danger badge-counter">7</span>
                                </a>
                               {/* Dropdown - Messages */}
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
                                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    <img class="img-profile rounded-circle"
                                        src="img/undraw_profile.svg"/>
                                </a>
                             
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
    
                   
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                               </div>
    
                     
                      
                        <div class="row">
     
                            <div class="col-xl-10 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Tontines 1</div>
                                                <div class="row no-gutters align-items-center">
                                                    
                                                    <div class="col" >
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                       Nombre participants : 10 </div>
                                                    </div>
                                                    <div class="col" >
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                       Montant Total : 10000 </div>
                                                    </div>
                                                    <div class="col" >
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                       Période : 10 mois</div>
                                                    </div>
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                                <div class="col" style={{marginTop:"20px"}} >
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                       Date début :  01/01/2024</div>
                                                    </div>
                                                </div>
                                                 <div class="row no-gutters align-items-center">
                                                <div class="col" >
                                                <div style={{marginLeft:"600px"}}>
                                                    {/*
      <button
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: 'auto',
          fontSize: '26px', 
        }}
      >
        Participé
    </button>*/}
    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-clipboard-check fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-warning shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                               Closed Tontines
                                                </div>
                                                <div class="row no-gutters align-items-center">
                                                    <div class="col-auto">
                                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">30%</div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="progress progress-sm mr-2">
                                                            <div class="progress-bar bg-gradient-warning
                                                            " role="progressbar"
                                                                style={{width: "30%" ,"aria-valuenow":"50", "aria-valuemin":"0"}}
                                                                aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-times  fa-2x text-gray-300" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-info shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                    Users number</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-users fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-danger shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                                    Responsables number</div>
                                                <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fa fa-user-circle fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                       
                
                        <div class="row">
                        
            <div id="content-wrapper" class="d-flex flex-column">
    
              
                <div id="content">
    
                   
                  
                    <div class="container-fluid">
    
                      
                        <div class="row">
    
                            <div class="col-xl-8 col-lg-7">
    
                              
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Area Chart</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="chart-area">
                                            <canvas id="myAreaChart"></canvas>
                                        </div>
                                        
                                    </div>
                                </div>
    
                                 
    
                            </div>
    
                            <div class="col-xl-4 col-lg-5">
                                <div class="card shadow mb-4">
                               
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary">Donut Chart</h6>
                                    </div>
                                   
                                    <div class="card-body">
                                        <div class="chart-pie pt-4">
                                            <canvas id="myPieChart"></canvas>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
    
                            <div class="col-xl-12 col-lg-7">
    
                                 <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <h6 class="m-0 font-weight-bold text-primary"> - Last Members  </h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead class="text-center">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Name</th>
                                                        <th>Address</th>
                                                        <th>Email</th>
                                                        <th>Contact</th>
                                                        <th>Account Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                
                                                <tbody class="text-center">
                                                    <tr >
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-warning rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-success rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    <tr >
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-warning rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-success rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    <tr >
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-warning rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Name Name</th>
                                                        <th>Address Address</th>
                                                        <th>Email@email.com</th>
                                                        <th>Contact</th>
                                                        <th><div class="badge bg-success rounded-pill">Status</div></th>
                                                        <th><a href="#" class="btn btn-info btn-circle">
                                                            <i class="fas fa-info-circle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-warning btn-circle">
                                                                <i class="fas fa-exclamation-triangle"></i>
                                                            </a>
                                                            <a href="#" class="btn btn-danger btn-circle">
                                                                <i class="fas fa-trash"></i>
                                                            </a>
                                                        </th>
                                                    </tr>
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
    
                            </div>
    
                        </div>
    
                         
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
export default ConsulterTontine;