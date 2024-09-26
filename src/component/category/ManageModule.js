import { getItems, update, remove, create, getKeys } from "../../services/serviceManage";
import React, { useEffect, useState } from 'react';
import PopupEdit from "../popup/PopupEdit";
import PopupReponse from "../popup/PopupReponse";
import Pagination from '@atlaskit/pagination';
import { castDate, mapModuleList, initModule, camelCaseToSpaces, castModule, castModuleEdit } from "../tool/toolAll";
import { useNavigate } from 'react-router-dom';

const ManageModule = ({ endpointP, nameModuleP, listKeyP, listConditionP, listValueP, listValueInitP, listKeyEditP, listKeyEditEndPointP, listTypeKeyEditP, listDisableEditP, nameKeyIdP }) => {

    // const endpoint = "users";
    // const nameModule = "User"
    // const listKey = ["passWord", "roles"];
    // const listCondition = [0, 1];
    // const listValue = ["12345678", "name"];
    // const listValueInit = ["12345678", ""];
    // // Dùng để truyền vào Popup edit và create
    // const listKeyEdit = ["userName", "fullName", "birthDate"];
    // const listTypeKeyEdit = [0, 0, 1];
    // const listDisableEdit = [true, false, false]; // chỉ disable khi tạo
    // // Dùng để truyền vào Popup edit và create

    const navigate = useNavigate();
    let createModuleData = {};
    // let totalColumnShow = 6;
    const endpoint = endpointP;
    const nameModule = nameModuleP;
    const listKey = listKeyP;
    const listCondition = listConditionP;
    const listValue = listValueP;
    const listValueInit = listValueInitP;
    // Dùng để truyền vào Popup edit và create
    const listKeyEdit = listKeyEditP;
    const listKeyEditEndPoint = listKeyEditEndPointP;
    const listTypeKeyEdit = listTypeKeyEditP;
    const listDisableEdit = listDisableEditP; // chỉ disable khi tạo
    // Dùng để truyền vào Popup edit và create
    const nameKeyId = nameKeyIdP; // tên của khóa chính

    const [keys, setKeys] = useState([]);
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });
    const [titleName, setTitleName] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Hiển thị 3 người trên mỗi trang
    const totalPages = Math.ceil(modules.length / itemsPerPage);

    // Hàm để lấy người dùng trên trang hiện tại
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return modules.slice(startIndex, endIndex);
    };

    // Hàm xử lý khi thay đổi trang
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchModules = async () => {
        try {
            if (keys.length === 0) {
                const keysNew = await getKeys(endpoint, navigate); // lấy ra các keyName của bảng module
                setKeys(keysNew);
            }
            const data = await getItems(endpoint, navigate);
            if (data && data.code === 1000 && data.result && data.result.length > 0) {
                const transformedData = mapModuleList(data.result, listKey, listCondition, listValue);
                setModules(transformedData);
            }
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    const handleUpdate = (module) => {
        console.log('module: ', module);
        setSelectedModule(module);  // Chọn người dùng cần sửa
        setIsPopupOpen(true);
        setTitleName("Update");
    };

    const handleAdd = () => {
        createModuleData = initModule(keys.result, listKey, listCondition, listValueInit, nameKeyId); // khởi tạo data rỗng để có thể thêm mới
        setSelectedModule(createModuleData);
        setIsPopupOpen(true);
        setTitleName("Create");
    };

    const handleDelete = async (id) => {
        // Xử lý xóa người dùng
        const reponse = await remove(id, endpoint, navigate);
        debugger;
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });
        setCurrentPage(1);
        fetchModules();
    };

    const handleModuleUpdate = async (updatedModule) => {
        // Xử lý cập nhật thông tin người dùng (gọi API update hoặc cập nhật state)
        let reponse = "";
        const moduleSave = castModuleEdit(updatedModule);
        debugger;
        console.log('moduleSave: ', moduleSave);
        if (moduleSave.id != null) {
            reponse = await update(moduleSave, endpoint, navigate);
        } else {
            reponse = await create(moduleSave, endpoint, navigate);
        }
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });
        fetchModules();
    };

    const handleClosePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="columns-3 my-6">
                <h1 className="text-2xl font-bold mb-4"></h1>
                <h1 className="text-4xl font-bold mb-4 text-center text-text">Manage {nameModule}</h1>
                <div>
                    <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background float-right"
                        onClick={() => handleAdd()}
                    >
                        <div>
                            <box-icon name="plus-circle" color="white">Add</box-icon>
                        </div>

                    </button>
                </div>

            </div>
            <table className="min-w-full bg-background border border-border">
                <thead>
                    <tr className="bg-background text-text uppercase text-sm">
                        {keys && keys.result ? keys.result
                            .filter(k => k !== nameKeyId)
                            .map((k, index) => (
                                <th key={index + endpoint} className={`py-3 px-4 border-b border-r `}>{camelCaseToSpaces(k)}</th>
                            )) : <></>}
                        <th className={`py-3 px-4 border-b border-r w-1/6`}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getPaginatedData().map((module, indexA) => (
                        <tr key={indexA} className="hover:bg-border">
                            {keys && keys.result ? keys.result
                                .filter(k => k !== nameKeyId)
                                .map((k, indexB) => (
                                    <td key={indexB + endpoint} className="py-3 px-4 border-b border-r">{castModule(module[k])}</td>
                                )) : <></>}
                            <td className="py-3 px-4 border-b flex space-x-2">
                                <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background"
                                    onClick={() => handleUpdate(module)}>
                                    <div>
                                        <box-icon name="edit" color="white"></box-icon>
                                    </div>
                                    Update
                                </button>
                                <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background"
                                    onClick={() => handleDelete(module[nameKeyId])}>
                                    <div>
                                        <box-icon name="trash" color="white"></box-icon>
                                    </div>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-cente my-3">
                <Pagination
                    pages={Array.from({ length: totalPages }, (_, i) => i + 1)} // Tạo danh sách các trang
                    selectedIndex={currentPage - 1} // Chọn trang hiện tại
                    onChange={handlePageChange} // Gọi khi người dùng chọn trang
                    nextLabel="Next"
                    previousLabel="Previous"
                />
            </div>

            <PopupEdit
                module={selectedModule}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onUpdate={handleModuleUpdate}
                titleName={titleName}
                moduleName={nameModule}
                listKey={listKeyEdit}
                listKeyEndPoint={listKeyEditEndPoint}
                listTypeKey={listTypeKeyEdit}
                listDisable={listDisableEdit}
                navigate={navigate}
            />
            {popup.isOpen && (
                <PopupReponse
                    type={popup.type}
                    message={popup.message}
                    onClose={handleClosePopup}
                    closeButton={popup.closeButton}
                // Quyết định có nút đóng hay không
                />
            )}
        </div>
    );
};

export default ManageModule;