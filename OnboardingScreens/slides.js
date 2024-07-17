// import image1 from '../assets/about-mission3.jpg'
// import image2 from '../assets/about-vision1.jpg'
// import image3 from '../assets/about-vision2.jpg'

import Login from "../Components/Authentication/Login.jsx";
import SplashScreen from "../Components/SplashScreen.jsx";

export default [
    {
        id:'1',
        component: <SplashScreen />
    },
    {
        id:'2',
        image: require("../assets/about-vision1.jpg")
    },
    {
        id:'3',
        component: <SplashScreen />
    },
    {
        id:'4',
        component: <Login />
        
    }
    
]

