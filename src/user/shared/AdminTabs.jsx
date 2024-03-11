import React, { Component } from "react";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import {
  Summaryinfo,
  AccessControl,
  FormDietUI,
  DataCollection,
} from "../../pages/form-validations/admin/index";

export class AdminTabs extends Component {
  constructor() {
    super(...arguments);
    this.headerText = [
      { text: "Summary" },
      { text: "Access Controls" },
      { text: "Forms & Diet Charts" },
      { text: "Data Collection" },
    ];
  }

  content0() {
    return (
      <div className="py-5">
        <Summaryinfo />
      </div>
    );
  }

  content1() {
    return (
      <div className="py-5">
        <AccessControl />
      </div>
    );
  }

  content2() {
    return (
      <div className="py-5">
        <FormDietUI />
      </div>
    );
  }

  content3() {
    return (
      <div className="py-5">
        <DataCollection />
      </div>
    );
  }

  render() {
    return (
      <>
        <>
          <TabComponent heightAdjustMode="Auto">
            <TabItemsDirective>
              <TabItemDirective
                header={this.headerText[0]}
                content={this.content0}
              />
              <TabItemDirective
                header={this.headerText[1]}
                content={this.content1}
              />
              <TabItemDirective
                header={this.headerText[2]}
                content={this.content2}
              />
              <TabItemDirective
                header={this.headerText[3]}
                content={this.content3}
              />
            </TabItemsDirective>
          </TabComponent>
        </>
      </>
    );
  }
}

export default AdminTabs;
