import './App.css';
import Main from "./Pages/Main/Main";
import {Route, Switch, withRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import About from "./Pages/About/About";
import {compose} from "redux";
import {connect} from "react-redux";
import DashBoard from './Pages/DashBoard/DashBoard'
import Police from "./Pages/Police/Police";
import Tf from "./Pages/Tf/Tf";
import Brain from "./Pages/Brain/Brain";
import Zoom from "./Pages/Zoom/Zoom";

function App(props) {
  return (
    <>
        <Switch>
            <Route path="/about" component={About}/>
            <Route path="/dashboard" component={DashBoard}/>
            <Route path="/police" component={Police}/>
            <Route path="/tf" component={Tf}/>
            <Route path="/brain" component={Brain}/>
            <Route path="/zoom" component={Zoom}/>
            <Route path="/" component={Main}/>
            <Route render={() => <div>404 NOT FOUND</div>}/>
        </Switch>
    </>
  );
}

let mapStateToProps = (state) => {
    return {    }
}

let mapDispatchToPropsLite = {}

let AppConnect = compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter,
)(App)

export default AppConnect
