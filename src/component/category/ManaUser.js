import React from 'react';
import ManageModule from './ManageModule';

const endpoint = "users";
const nameModule = "User"
const listKey = ["passWord", "roles"];
const listCondition = [0, 1];
const listValue = ["12345678", "name"]; // "name" => muốn gán cho biến roles lấy mảng có các phần tử con với thuộc tính "name"
const listValueInit = ["12345678", ""]; // "" => Dùng để khởi tạo module giá trị mảng rỗng
// Dùng để truyền vào Popup edit và create
const listKeyEdit = ["userName", "fullName", "birthDate"];
const listTypeKeyEdit = [0, 0, 1];
const listDisableEdit = [true, false, false]; // chỉ disable khi tạo
// Dùng để truyền vào Popup edit và create
const nameKeyId = "id";

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