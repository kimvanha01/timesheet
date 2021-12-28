import React from 'react';
import {
    Route, Switch
} from "react-router-dom";
import NotFound from 'src/components/NotFound';
import ProjectMain from './pages/Main';
import ProjectViewPage from './pages/View';

function Project() {
    return (
        <Switch>
            <Route exact path="/home/projects">
                <ProjectMain />
            </Route>
            <Route exact path="/home/projects/:id">
                <ProjectViewPage />
            </Route>
            <Route component={NotFound} />
        </Switch>
    );
}

export default Project;