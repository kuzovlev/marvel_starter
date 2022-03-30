import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {MainPage, ComicsPage} from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <Switch>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Route  exact path={'/comics'}>
                            <ComicsPage/>
                        </Route>
                        <Route exact path={'/'}>
                            <MainPage/>
                        </Route>
                    </main>
                </div>
            </Switch>
        </Router>
    )
}

export default App;