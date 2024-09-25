import React from 'react';
import ManageModule from './ManageModule';

const endpoint = "permissions";
const nameModule = "Permission"
const listKey = []; // Những key muốn đổi giá trị khi lấy từ bảng dưới database
const listCondition = []; // những điều kiện map (0: thay đổi giá trị, 1: lấy key "name" trong list của key đó) => listKey

// "name" => muốn gán cho biến roles lấy mảng có các phần tử con với thuộc tính "name" // "" => Dùng để khởi tạo module giá trị mảng rỗng
const listValue = []; // listValue : những giá trị để thay đổi key => listKey, listCondition
const listValueInit = []; // listValue : những giá trị để thay đổi key => listKey, listCondition

// Dùng để truyền vào Popup edit và create
const listKeyEdit = ["name", "description"]; // lấy những trường muốn hiển thị lên popup Edit
const listTypeKeyEdit = [0, 0]; // 0: textbox ; 1: datebox => listKeyEdit
const listDisableEdit = [true, false]; // chỉ disable khi tạo => listKeyEdit
// Dùng để truyền vào Popup edit và create
const nameKeyId = "name";

const ManaPermission = () => {
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

export default ManaPermission;