import { parseISO, format } from 'date-fns';

export const castDate = (dateString) => {
    if (dateString == null)
        return "";
    const parsedDate = parseISO(dateString); // Phân tích chuỗi ngày
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
}

export const mapModuleList = (data, listKey, listCondition, listValue) => {
    // Kiểm tra nếu data là mảng, thì sử dụng map, nếu là object, chuyển thành mảng 1 phần tử
    const dataMap = Array.isArray(data)
        ? data.map(dt => mapModule(dt, listKey, listCondition, listValue)) // Nếu là mảng, dùng map
        : [mapModule(data, listKey, listCondition, listValue)]; // Nếu là object, chuyển thành mảng 1 phần tử

    return dataMap;
}

// listkey : những key muốn thay đổi khác không muốn map từ data
// listCondition : những điều kiện map (0: thay đổi giá trị, 1: lấy key "name" trong list của key đó)
// listValue : những giá trị để thay đổi key
export const mapModule = (data, listKey, listCondition, listValue) => {
    const newData = { ...data };

    // listkey : ["passWord", "roles"]
    // listCondition : [0,1]
    // listValue : ["12345678","name"]

    // newData.passWord = "12345678";  // Thêm thuộc tính passWord
    // newData.roles = data.roles ? data.roles.map(role => role.name) : []; 

    for (let i = 0; i < listKey.length; i++) {
        if (listCondition[i] == 0)
            newData[listKey[i]] = listValue[i];
        if (listCondition[i] == 1) {
            if (listValue[i] == "")
                newData[listKey[i]] = [];
            else
                newData[listKey[i]] = data[listKey[i]] ? data[listKey[i]].map(r => r[listValue[i]]) : [];
        }
    }
    return newData;
};

// listkey : những key muốn thay đổi khác không muốn map từ data
// listCondition : những điều kiện map (0: thay đổi giá trị, 1: lấy key "name" trong list của key đó)
// listValue : những giá trị để thay đổi key
// data : keyNames
export const initModule = (data, listKey, listCondition, listValue, nameKeyId) => {

    if (data == undefined)
        return {};
    let newData = {};
    // data : ["id","userName","passWord","fullName","birthDate","roles"]
    // listkey : ["passWord", "roles"]
    // listCondition : [0,1]
    // listValue : ["12345678",""] truyền "" => []

    // newUser.passWord = "12345678";  // Thêm thuộc tính passWord
    // newUser.roles = data.roles ? data.roles.map(role => role.name) : []; 
    debugger;
    for (let i = 0; i < data.length; i++) {
        const keyN = data[i];
        if (keyN == nameKeyId) {
            newData[keyN] = null;
            continue;
        }
        newData[keyN] = "";
    }
    console.log(newData);
    const rs = mapModule(newData, listKey, listCondition, listValue);

    return rs;
}

export function camelCaseToSpaces(str) {
    // Chèn khoảng trắng trước mỗi ký tự viết hoa, rồi chuyển tất cả về chữ hoa đầu tiên
    return str
        .replace(/([A-Z])/g, ' $1') // Chèn khoảng trắng trước các ký tự viết hoa
        .trim() // Loại bỏ khoảng trắng ở đầu và cuối
        .replace(/^./, (match) => match.toUpperCase()); // Chữ cái đầu tiên thành chữ hoa
}
