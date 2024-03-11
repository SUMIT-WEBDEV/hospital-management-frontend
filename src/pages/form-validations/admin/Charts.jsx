import React from "react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    activateDtChart,
    activateForm,
    deactivateDtChart,
    deactivateForm,
    getAllDietChart,
} from "../../../action/AdminAction";
import { getForms } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import {
    ACTIVATE_DTCHART_RESET,
    ACTIVATE_FORM_RESET,
    DEACTIVATE_DTCHART_RESET,
    DEACTIVATE_FORM_RESET,
} from "../../../constant.js/AdminConstant";

const Charts = () => {
    const dispatch = useDispatch();
    const getFomrsList = useSelector((state) => state.patientFormList);
    const { loading, error, forms } = getFomrsList;
    const deitChartList = useSelector((state) => state.deitChartList);
    const { loading: loadingDiet, error: errorDiet, dietchart } = deitChartList;

    const activateFormVariables = useSelector((state) => state.activateform);
    const {
        loading: loadingFormAc,
        error: errorFormAc,
        success: successFormAc,
    } = activateFormVariables;
    const deactivateFormVariables = useSelector(
        (state) => state.deactivateform
    );
    const {
        loading: loadingFormDe,
        error: errorFormDe,
        success: successFormDe,
    } = deactivateFormVariables;

    const activateDtChartVariables = useSelector(
        (state) => state.activateDtChart
    );
    const {
        loading: loadingChartAc,
        error: errorChartAc,
        success: successChartAc,
    } = activateDtChartVariables;
    const deactivateDtChartVariables = useSelector(
        (state) => state.deactivateDtChart
    );
    const {
        loading: loadingChartDe,
        error: errorChartDe,
        success: successChartDe,
    } = deactivateDtChartVariables;

    useEffect(() => {
        dispatch(getForms("admin"));

        if (successFormAc) {
            dispatch({ type: ACTIVATE_FORM_RESET });
            Swal.fire({
                icon: "success",
                text: "activated successfully",
            });
        }
        if (successFormDe) {
            dispatch({ type: DEACTIVATE_FORM_RESET });
            Swal.fire({
                icon: "success",
                text: "deactivated successfully",
            });
        }
    }, [successFormAc, successFormDe, ,]);

    const truncate = (str, n) => {
        return str.length > n ? str.substr(0, n - 1) : str;
    };

    useEffect(() => {
        dispatch(getAllDietChart());
        if (successChartAc) {
            dispatch({ type: ACTIVATE_DTCHART_RESET });
            Swal.fire({
                icon: "success",
                text: "activated successfully",
            });
        }
        if (successChartDe) {
            dispatch({ type: DEACTIVATE_DTCHART_RESET });
            Swal.fire({
                icon: "success",
                text: "deactivated successfully",
            });
        }
    }, [successChartDe, successChartAc]);

    // const deActivateForms=(id)=>{

    // }
    const activateForms = (state, id) => {
        if (state === "Active") {
            Swal.fire({
                title: "Do you want to deactivet forms?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(deactivateForm(id));
                    // Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        } else if (state === "De-Active") {
            Swal.fire({
                title: "Do you want to activate forms?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(activateForm(id));
                    // Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };

    // const deActivateDietCharts=(id)=>{

    // }
    const acttivateDietCharts = (state, id) => {
        if (state === "Active") {
            Swal.fire({
                title: "Do you want to deactivet diet Chart?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(deactivateDtChart(id));
                    // Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        } else if (state === "De-Active") {
            Swal.fire({
                title: "Do you want to activate diet chart?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(activateDtChart(id));
                    // Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };

    return (
        <>
            <div className="my-10">
                <table className="table__Container">
                    <thead className="table__Head">
                        <tr>
                            <th className="table__Head--Text">Sl No.</th>
                            <th className="table__Head--Text">Form Name</th>
                            <th className="table__Head--Text">Created By</th>
                            <th className="table__Head--Text">Created Date</th>
                            <th className="table__Head--Text">Access</th>
                            <th className="table__Head--Text">Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox>{error}</MessageBox>
                    ) : (
                        forms.map((frm, index) => (
                            <tbody key={frm._id}>
                                <tr className="table__Body--Row">
                                    <td className="table__Body--Row_Data">
                                        {index + 1}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        {frm.form_title}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        {frm.doctorId ? frm.doctorId.name : ""}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        {truncate(frm.createdAt, 11)}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        <select
                                            id="status"
                                            name="status"
                                            autoComplete="status-name"
                                            className="form__Select"
                                            onChange={() =>
                                                activateForms(
                                                    frm.status,
                                                    frm._id
                                                )
                                            }
                                        >
                                            <option value={frm.status}>
                                                {frm.status}
                                            </option>
                                            {frm.status === "Active" ? (
                                                <option>De-Active</option>
                                            ) : frm.status === "De-Active" ? (
                                                <option>Active</option>
                                            ) : (
                                                ""
                                            )}
                                        </select>
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        <FiEdit className="table__Body--Status_Icons" />
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    )}
                </table>
            </div>
            <div className="my-10">
                <table className="table__Container">
                    <thead className="table__Head">
                        <tr>
                            <th className="table__Head--Text">Sl No.</th>
                            {/* <th className="table__Head--Text">
                Diet Chart Name
              </th> */}
                            <th className="table__Head--Text">Created By</th>
                            <th className="table__Head--Text">Created Date</th>
                            <th className="table__Head--Text">Access</th>
                            <th className="table__Head--Text">Actions</th>
                        </tr>
                    </thead>
                    {loadingDiet ? (
                        <LoadingBox></LoadingBox>
                    ) : errorDiet ? (
                        <MessageBox>{error}</MessageBox>
                    ) : (
                        dietchart &&
                        dietchart.map((dt, index) => (
                            <tbody key={dt._id}>
                                <tr className="table__Body--Row">
                                    <td className="table__Body--Row_Data">
                                        {index + 1}
                                    </td>
                                    {/* <td className="table__Body--Row_Data">
                Burn Calories
              </td> */}
                                    <td className="table__Body--Row_Data">
                                        {dt.doctorId ? dt.doctorId.name : ""}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        {truncate(dt.createdAt, 11)}
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        <select
                                            id="status"
                                            name="status"
                                            autoComplete="status-name"
                                            className="form__Select"
                                            onChange={() =>
                                                acttivateDietCharts(
                                                    dt.status,
                                                    dt._id
                                                )
                                            }
                                        >
                                            <option>{dt.status}</option>
                                            {dt.status === "Active" ? (
                                                <option>De-Active</option>
                                            ) : dt.status === "De-Active" ? (
                                                <option>Active</option>
                                            ) : (
                                                ""
                                            )}
                                        </select>
                                    </td>
                                    <td className="table__Body--Row_Data">
                                        <FiEdit className="table__Body--Status_Icons" />
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    )}
                </table>
            </div>
        </>
    );
};

export default Charts;
