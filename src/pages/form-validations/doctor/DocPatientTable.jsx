import React, { useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { PatientInfo, PatientGrid } from "../../../Data/Data_Info";
import { updateSampleSection } from "../../shared/SampleBase";
import { useDispatch, useSelector } from "react-redux";
import { listPatients } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { useNavigate } from "react-router-dom";

const DocPatientTable = () => {
  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const {  doctorInfo } = doctorSignin;
  useEffect(() => {
    updateSampleSection();
    if(doctorInfo){
    dispatch(listPatients())

    }
  },[dispatch,doctorInfo]);
  // console.log(patients,'pt');

  const selectionsettings = { persistSelection: false };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: false, allowEditing: false };
  const rowSelected=(args)=>{
    // console.log(args.data._id,'arg');
    navigate('/patient',{state:{id:args.data._id}})
  }

  return (
    <>
      <>
        <div className="py-16 bg-white rounded-3xl">
          {loading ? <LoadingBox></LoadingBox>:
          error ? <MessageBox>{error}</MessageBox>:(
            <GridComponent
            dataSource={patients}
            enableHover={false}
            allowPaging
            pageSettings={{ pageCount: 10 }}
            selectionSettings={selectionsettings}
            toolbar={toolbarOptions}
            editSettings={editing}
            allowSorting
            rowSelected={rowSelected}
            // onClick={()=>navigate('/')}
          >
            <ColumnsDirective>
              {PatientGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Page, Selection, Edit, Toolbar, Sort, Filter]} />
          </GridComponent>
          )}
          
        </div>
      </>
    </>
  );
};

export default DocPatientTable;
