import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin_Panel() {
    return (
        <div className="container-lg">
            <div className="table-title">
                <div><h2 className="listadmintitle">ADMIN PANEL</h2></div>
            </div>
            <div className="table-responsive">
                <div className="table-wrapper222">
                    <table className="table222">

                        <tr>
                            <td className="tdtitle">Student</td>
                            <td className="tdcreate"><Link to="/student/create"><i className="bi bi-plus-square-dotted"> </i> </Link></td>
                            <td className="tdlist"><span><Link to="/student/list"><i className="bi bi-list-stars"> </i> </Link></span></td>
                        </tr>

                        <tr>
                            <td className="tdtitle">Admin</td>
                            <td className="tdcreate"><Link to="/admin/create"><i className="bi bi-plus-square-dotted"> </i> </Link></td>
                            <td className="tdlist"><Link to="/admin/list"><i className="bi bi-list-stars"> </i> </Link></td>
                        </tr>

                        <tr>
                            <td className="tdtitle">Classroom</td>
                            <td className="tdcreate"><Link to="/classroom/create"><i className="bi bi-plus-square-dotted"> </i> </Link></td>
                            <td className="tdlist"><Link to="/classroom/list"><i className="bi bi-list-stars"> </i> </Link></td>
                        </tr>

                        <tr>
                            <td className="tdtitle">Section</td>
                            <td className="tdcreate"><Link to="/section/create"><i className="bi bi-plus-square-dotted" > </i> </Link></td>
                            <td className="tdlist"><Link to="/section/list"><i className="bi bi-list-stars"> </i> </Link></td>
                        </tr>

                        <tr>
                            <td className="tdtitle">Attendance</td>
                            <td className="tdcreate"><Link to="/attendance/today" ><i className="bi bi-plus-square-dotted"> </i> </Link></td>
                            <td className="tdlist"><Link to="/attendance/old" ><i className="bi bi-list-stars"> </i> </Link></td>
                        </tr>

                    </table>
                </div>
            </div>
        </div >
    );
}