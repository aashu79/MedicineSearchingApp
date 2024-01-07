import {
  BrowserRouter as Router,
  Routes as Routee,
  Route,
 
} from "react-router-dom";
import HomePageLayout from "../layouts/HomePageLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import Authorizer from "../utils/Authorizer";
import AdminPageLayout from "../layouts/AdminPageLayout";
import AdminLandingPage from "../pages/AdminLandingPage";
import CompanyCreatingPage from "../pages/cms/company/CompanyCreatingPage";
import CompanyEditingPage from "../pages/cms/company/CompanyEditingPage";
import DivisionCreatingPage from "../pages/cms/division/DivisionCreatingPage";
import DivisionEditingPage from "../pages/cms/division/DivisionEditingPage";
import MedicineCreatingPage from "../pages/cms/medicine/MedicineCreatingPage";
import MedicineEditingPage from "../pages/cms/medicine/MedicineEditingPage";
import CompanyListingPage from "../pages/cms/company/CompanyListingPage";
import DivisionListingPage from "../pages/cms/division/DivisionListingPage";
import MedicineListingPage from '../pages/cms/medicine/MedicineListingPage';
import DivisionVIewPage from "../pages/cms/division/DivisionVIewPage";
import MedicinePage from "../pages/MedicinePage";
import DivisionPage from "../pages/DivisionPage";
import ContactUsListingPage from "../pages/cms/contacUs/ContactUsListing";
import NotFoundPage from "../pages/NotFoundPage";



const Routes = () => {

  
  return (
    // <ScrollRestoration onBeforeRestore={() => window.scrollTo(0, 0)}>
    <Router>
      <Routee>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/" element={<HomePageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/division" element={<DivisionPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <Authorizer
              
              component={<AdminPageLayout />}
            />
          }
        >
          <Route index element={<AdminLandingPage />} />

          <Route path="company" element={<CompanyListingPage />} />
          
          <Route path="company/create" element={<CompanyCreatingPage />} />
          <Route path="company/edit/:id" element={<CompanyEditingPage />} />


          <Route path="division" element={<DivisionListingPage />} />
          <Route path="division/:id" element={<DivisionVIewPage />} />
          <Route path="division/create" element={<DivisionCreatingPage />} />
          <Route path="division/edit/:id" element={<DivisionEditingPage />} />


          <Route path="medicine" element={<MedicineListingPage />} />
          <Route path="medicine/create" element={<MedicineCreatingPage />} />
          <Route path="medicine/edit/:id" element={<MedicineEditingPage />} />

          <Route path="contact" element={<ContactUsListingPage />} />

        </Route>
      </Routee>
    </Router>
    // </ScrollRestoration>
  );
};

export default Routes;
