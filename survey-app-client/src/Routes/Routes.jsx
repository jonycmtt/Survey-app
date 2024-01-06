import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorElement from "../Components/ErrorElement/ErrorElement";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home/Home";
import SurveysContainer from "../Pages/Home/RecentSurvey/Surveys/SurveysContainer";
import SurveyDetails from "../Pages/Home/RecentSurvey/Surveys/SurveyDetails";
import Dashboard from "../Layout/Admin/Dashboard";
import SurveyCreation from "../Pages/Dashboard/SurveyUser/SurveyCreation";
import SurveyResponse from "../Pages/Dashboard/SurveyUser/SurveyResponse";
import SurveyHome from "../Pages/Dashboard/SurveyUser/SurveyHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import SurveyRequest from "../Pages/Dashboard/Admin/SurveyRequest";
import Payments from "../Pages/Dashboard/Admin/Payments";
import MySurvey from "../Pages/Dashboard/SurveyUser/MySurvey";
import PrivateAdmin from "./PrivateAdmin";
import AdminFeedback from "../Pages/Dashboard/Admin/AdminFeedback";
import SurveyReport from "../Pages/Home/RecentSurvey/Surveys/SurveyReport";
import ProUser from "../Pages/ProUser/ProUser";
import PaymentsBoard from "../Pages/ProUser/PaymentsBoard";
import PrivateRoute from "./PrivateRoute";
import UpdatedSurvey from "../Pages/Dashboard/SurveyUser/UpdatedSurvey";
import SurveyResponseAdmin from "../Pages/Dashboard/Admin/SurveyResponseAdmin";
import PrivateSurveyor from "./PrivateSurveyor";
import About from "../Pages/About";
import Contact from "../Pages/Contact/Contact";

const Routes = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        errorElement : <ErrorElement></ErrorElement>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'register',
                element : <Register></Register>
            },
            {
                path : 'surveys',
                element : <SurveysContainer></SurveysContainer>
            },
            {
                path : 'proUser',
                element : <ProUser></ProUser>
            },
            {
                path : 'payment/:id',
                element : <PrivateRoute><PaymentsBoard></PaymentsBoard></PrivateRoute>,
                loader : ({params}) => fetch(`https://survey-app-server-six.vercel.app/proUser/${params.id}`)
            },
            {
                path : 'surveys/:id',
                element : <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>,
                loader : ({params}) => fetch(`https://survey-app-server-six.vercel.app/survey/${params.id}`)
            },
            {
                path : 'report/:id',
                element : <SurveyReport></SurveyReport>,
                loader : ({params}) => fetch(`https://survey-app-server-six.vercel.app/survey/${params.id}`)
            },
            {
                path : 'about',
                element : <About/>
            },
            {
                path : 'contact',
                element : <Contact></Contact>
            }
        ]
    },
    // admin
    {
        path : 'dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            // survey dashboard
            {
                path : 'surveyHome',
                element : <PrivateSurveyor><SurveyHome></SurveyHome></PrivateSurveyor>
            },
            {
                path : 'surveyCreation',
                element : <PrivateSurveyor><SurveyCreation></SurveyCreation></PrivateSurveyor>
            },
            {
                path : 'response',
                element : <PrivateSurveyor><SurveyResponse></SurveyResponse></PrivateSurveyor>
            },
            {
                path : 'mySurvey',
                element : <PrivateSurveyor><MySurvey></MySurvey></PrivateSurveyor>
            },
            {
                path : 'update/:id',
                element : <UpdatedSurvey></UpdatedSurvey>,
                loader : ({params}) => fetch(`https://survey-app-server-six.vercel.app/survey/${params.id}`)
            },

            // admin dashboard
            {
                path : 'adminHome',
                element : <PrivateAdmin><AdminHome></AdminHome></PrivateAdmin>
            },
            {
                path : 'manageUsers',
                element : <PrivateAdmin><ManageUsers></ManageUsers></PrivateAdmin>
            },
            {
                path : 'surveyRequest',
                element : <PrivateAdmin><SurveyRequest></SurveyRequest></PrivateAdmin>
            },
            {
                path : 'feedback/:id',
                element : <AdminFeedback></AdminFeedback>,
                loader : ({params}) => fetch(`https://survey-app-server-six.vercel.app/survey/${params.id}`),
            },
            {
                path : 'payments',
                element : <PrivateAdmin><Payments></Payments></PrivateAdmin>
            },
            {
                path : 'adminResponse',
                element : <PrivateAdmin><SurveyResponseAdmin></SurveyResponseAdmin></PrivateAdmin>
            },
        ]
    }
]);

export default Routes;
