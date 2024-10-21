import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import BidsTab from "./BidsTab";
import General from "./General";

function Profile() {
  //default active key suggest whic to render when opening first
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key={1}>
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key={2}>
          <BidsTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key={3}>
          <General />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
