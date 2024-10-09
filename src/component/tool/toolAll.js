import { parseISO, format } from 'date-fns';

export const castDate = (dateString) => {
    if (dateString === null)
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
        if (listCondition[i] === 0)
            newData[listKey[i]] = listValue[i];
        if (listCondition[i] === 1) {
            if (listValue[i] === "")
                newData[listKey[i]] = [];
            else
                // newData[listKey[i]] = data[listKey[i]] ? data[listKey[i]].map(r => r[listValue[i]]) : [];
                newData[listKey[i]] = data[listKey[i]] ? data[listKey[i]].map(r => ({
                    label: r["description"],
                    value: r[listValue[i]]
                })) : [];
        }
    }
    return newData;
};

// listkey : những key muốn thay đổi khác không muốn map từ data
// listCondition : những điều kiện map (0: thay đổi giá trị, 1: lấy key "name" trong list của key đó)
// listValue : những giá trị để thay đổi key
// data : keyNames
export const initModule = (data, listKey, listCondition, listValue, nameKeyId) => {

    if (!data)
        return {};
    let newData = {};
    // data : ["id","userName","passWord","fullName","birthDate","roles"]
    // listkey : ["passWord", "roles"]
    // listCondition : [0,1]
    // listValue : ["12345678",""] truyền "" => []

    // newUser.passWord = "12345678";  // Thêm thuộc tính passWord
    // newUser.roles = data.roles ? data.roles.map(role => role.name) : []; 
    for (let i = 0; i < data.length; i++) {
        const keyN = data[i];
        if (keyN === nameKeyId) {
            newData[keyN] = null;
            continue;
        }
        newData[keyN] = "";
    }
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

// ép từ value db sang value để hiển thị
export const castModule = (module) => {
    if (Array.isArray(module) && module)
        return module.map(r => r.value).join(' - ');
    return module;
}

// ép kiểu dữ liệu trả từ form eidt để lưu db
export function castModuleEdit(obj) {
    debugger;
    // Kiểm tra từng thuộc tính của đối tượng
    if (!obj)
        return obj;
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            // Nếu thuộc tính là mảng
            obj[key] = obj[key].map(item => {
                // Kiểm tra nếu item là đối tượng và có thuộc tính 'value' { label: 'Option 1', value: 'option1' }
                if (typeof item === 'object' && item !== null && 'value' in item) {
                    return item.value;
                }
                return item; // Nếu không, giữ nguyên item
            });
        }
    }
    return obj;
}

export function convertVnd(price) {
    const formattedNumber = price.toLocaleString('vi-VN') + ' đ';
    return formattedNumber;
}

