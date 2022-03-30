import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {MainPage, ComicsPage, Page404} from "../pages";
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
                    <Route path="*">
                        <Page404/>
                    </Route>
                </div>
            </Switch>
        </Router>
    )
}

export default App;