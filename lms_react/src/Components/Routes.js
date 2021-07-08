import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';

import Home from '../Pages/Home/Home';
import Profile from '../Pages/Admin_Panel/Profile';
import Admin_Panel from '../Pages/Admin_Panel/Admin_Panel';

import Create_Student from '../Pages/Admin_Panel/Manage_Student/Create_Student';
import List_Student from '../Pages/Admin_Panel/Manage_Student/List_Student';
import Info_Student from '../Pages/Admin_Panel/Manage_Student/Info_Student';
import Edit_Student from '../Pages/Admin_Panel/Manage_Student/Edit_Student';

import Create_Admin from '../Pages/Admin_Panel/Manage_Admin/Create_Admin';
import List_Admin from '../Pages/Admin_Panel/Manage_Admin/List_Admin';
import Edit_Admin from '../Pages/Admin_Panel/Manage_Admin/Edit_Admin';

import Create_Classroom from '../Pages/Admin_Panel/Manage_Classroom/Create_Classroom';
import List_Classroom from '../Pages/Admin_Panel/Manage_Classroom/List_Classroom';
import Edit_Classroom from '../Pages/Admin_Panel/Manage_Classroom/Edit_Classroom';

import Create_Section from '../Pages/Admin_Panel/Manage_Section/Create_Section';
import List_Section from '../Pages/Admin_Panel/Manage_Section/List_Section';
import Edit_Section from '../Pages/Admin_Panel/Manage_Section/Edit_Section';

import Attendance from '../Pages/Admin_Panel/Manage_Attendance/Attendance';
import Today_Attendance from '../Pages/Admin_Panel/Manage_Attendance/Today_Attendance';
import Old_Attendance from '../Pages/Admin_Panel/Manage_Attendance/Old_Attendance';

import Personal_Statistics from '../Pages/Admin_Panel/Statistics/Personal_Statistics';
import Total_Statistics from '../Pages/Admin_Panel/Statistics/Total_Statistics';

import SessionContext from './session/SessionContext';

function PrivateRoute({ user, component, ...props }) {
    let Comp = component;
    return (
        <Route {...props} render={props => !user.token ?
            <Redirect {...props} to="/" /> :
            <Comp {...props} />
        } />
    )
}

export default function Routes({ history }) {

    let { state: { user } } = useContext(SessionContext);

    return (
        <div>
            <Sidebar history={history} view={user.token ? true : false} />
            <Switch>

                <Route exact path="/" render={props => user.token ?
                    <Redirect {...props} to="/profile" /> :
                    <Home {...props} />
                } />

                <PrivateRoute user={user} path="/profile" component={Profile} />
                <PrivateRoute user={user} path="/admin/panel" component={Admin_Panel} />

                <PrivateRoute user={user} path="/admin/create" component={Create_Admin} />
                <PrivateRoute user={user} path="/admin/list" component={List_Admin} />
                <PrivateRoute user={user} path="/admin/edit/:id" component={Edit_Admin} />

                <PrivateRoute user={user} path="/student/create" component={Create_Student} />
                <PrivateRoute user={user} path="/student/list" component={List_Student} />
                <PrivateRoute user={user} path="/student/info/:id" component={Info_Student} />
                <PrivateRoute user={user} path="/student/edit/:id" component={Edit_Student} />

                <PrivateRoute user={user} path="/classroom/create" component={Create_Classroom} />
                <PrivateRoute user={user} path="/classroom/list" component={List_Classroom} />
                <PrivateRoute user={user} path="/classroom/edit/:id" component={Edit_Classroom} />

                <PrivateRoute user={user} path="/section/create" component={Create_Section} />
                <PrivateRoute user={user} path="/section/list" component={List_Section} />
                <PrivateRoute user={user} path="/section/edit/:id" component={Edit_Section} />

                <PrivateRoute user={user} path="/attendance/panel" component={Attendance} />
                <PrivateRoute user={user} path="/attendance/today" component={Today_Attendance} />
                <PrivateRoute user={user} path="/attendance/old" component={Old_Attendance} />

                <PrivateRoute user={user} path="/statistics/personal" component={Personal_Statistics} />
                <PrivateRoute user={user} path="/statistics/total" component={Total_Statistics} />

            </Switch>
        </div>
    );
}