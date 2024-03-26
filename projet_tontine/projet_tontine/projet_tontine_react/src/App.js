import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/Connexion/RegisterUser";
import LoginAdmin from "./pages/Connexion/LoginAdmin";
import LoginUser from "./pages/Connexion/LoginUser";
import LoginResponsable from "./pages/Connexion/LoginResponsable";
import Tontine from "./pages/Tontine/Tontine";
import AddUser from "./pages/user/ajouterUser";
import ConsulterTontine from "./pages/Tontine/consulterTontine";
import HomeUser from  "./pages/user/HomeUser";
import AjouterTontine from "./pages/Tontine/AjouterTontine";
import ModifierTontine from "./pages/Tontine/ModifierTontine";
import ProfileAdmin from "./pages/admin/profileAdmin";
import VoirUsers from "./pages/admin/voirUsers";
import VoirResponsables from "./pages/admin/VoirResponsables";
import VoirTontine from "./pages/Responsable/VoirTontine";
import VoirUsersRe from "./pages/Responsable/VoirUsersRe";
import EnvoyerDemandePart from "./pages/user/EnvoyerDemandePart";
import VoirDemandes from "./pages/Responsable/VoirDemandes";
import ChooseCoparticipant from "./pages/user/ChooseCoparticipant";
import AccepterCop from "./pages/user/AccepterCop";
import MesTontines from "./pages/user/MesTontines";
import Payer from "./pages/user/Payer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/loginResponsable" element={<LoginResponsable />} />
        <Route path="/tontine" element={<Tontine />} />
        <Route path="/AjouterUser" element={<AddUser />} />
        <Route path="/ajouterTontine" element={<AjouterTontine />} />
        <Route path="/modifierTontine" element={<ModifierTontine />} />
        <Route path="/ConsulterTontineAdmin" element={<ConsulterTontine />} />
        <Route path="/profileAdmin" element={<ProfileAdmin />} />
        <Route path="/homeUser" element={<HomeUser />} />
        <Route path="/voirUsers" element={<VoirUsers />} />
        <Route path="/VoirResponsables" element={<VoirResponsables />} />
        <Route path="/VoirTontines" element={<VoirTontine />} />
        <Route path="/VoirUsersRe" element={<VoirUsersRe />} />
        <Route path="/EnvoyerDemandePart" element={<EnvoyerDemandePart/>} />
        <Route path="/VoirDemandes" element={<VoirDemandes/>}/>
        <Route path="/ChooseCoparticipant" element={<ChooseCoparticipant/>}/>
        <Route path="/AccepterCop" element={<AccepterCop/>}/>
        <Route path="/MesTontines" element={<MesTontines/>}/>
        <Route path="/Payer" element={<Payer/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
