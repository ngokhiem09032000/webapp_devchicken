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
    const newUser = { ...data };

    // listkey : ["passWord", "roles"]
    // listCondition : [0,1]
    // listValue : ["12345678","name"]

    // newUser.passWord = "12345678";  // Thêm thuộc tính passWord
    // newUser.roles = data.roles ? data.roles.map(role => role.name) : []; 

    for (let i = 0; i < listKey.lenght; i++) {
        if (listCondition[i] == 0)
            newUser[listKey[i]] = listValue[i];
        if (listCondition[i] == 1)
            newUser[listKey[i]] = data[listKey[i]] ? data[listKey[i]].map(r => r[listValue[i]]) : [];
    }



    return newUser;
};