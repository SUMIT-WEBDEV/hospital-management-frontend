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
import { ObservedInfo, ObservationGrid } from "../../../Data/Data_Info";
import { updateSampleSection } from "../../shared/SampleBase";
import { useDispatch, useSelector } from "react-redux";
import { listObservation } from "../../../action/PatientAction";
import LoadingBox from "../../../Components/LoadingBox";
import MessageBox from "../../../Components/MessageBox";
import { CREATE_OBSERVATION_RESET } from "../../../constant.js/PatientConstant";

const PatientObservedTable = ({success}) => {
  const observationList=useSelector(state=>state.observationList)
  const {loading,error,observation}=observationList
  const dispatch=useDispatch()
  useEffect(() => {
    updateSampleSection();
    // const id='63ac1dca0a5214a53cfa87f1'
    dispatch(listObservation())
    if(success){
      dispatch({type:CREATE_OBSERVATION_RESET})
    }

  },[success]);

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <>
      <div className="py-16 bg-white rounded-3xl">
        {loading ? <LoadingBox></LoadingBox>:
        error ? <MessageBox>{error}</MessageBox>:(
          <GridComponent
          dataSource={observation}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 10 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {ObservationGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Edit, Toolbar, Sort, Filter]} />
        </GridComponent>
        )}
       
      </div>
    </>
  );
};

export default PatientObservedTable;
