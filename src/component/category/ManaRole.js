import React from 'react';
import ManageModule from './ManageModule';

const endpoint = "roles";
const nameModule = "Role"
const listKey = ["permissions"];
const listCondition = [1];
const listValue = ["name"];
const listValueInit = [""];
// Dùng để truyền vào Popup edit và create
const listKeyEdit = ["name", "description"];
const listTypeKeyEdit = [0, 0];
const listDisableEdit = [true, false]; // chỉ disable khi tạo
// Dùng để truyền vào Popup edit và create
const nameKeyId = "name";

const ManaUser = () => {
    return (
        <div>
            <ManageModule
                endpointP={endpoint}
                nameModuleP={nameModule}
                listKeyP={listKey}
                listConditionP={listCondition}
                listValueP={listValue}
                listValueInitP={listValueInit}
                listKeyEditP={listKeyEdit}
                listTypeKeyEditP={listTypeKeyEdit}
                listDisableEditP={listDisableEdit}
                nameKeyIdP={nameKeyId}
            ></ManageModule>
        </div>
    );
};

export default ManaUser;