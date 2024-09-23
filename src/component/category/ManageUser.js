import { getItems, updateUser, deleteUser, createUser } from "../../services/serviceUser";
import React, { useEffect, useState } from 'react';
import PopupEdit from "../popup/PopupEdit";
import { parseISO, format } from 'date-fns';
import PopupReponse from "../popup/PopupReponse";
import Pagination from '@atlaskit/pagination';

const castDate = (dateString) => {
    if (dateString == null)
        return "";
    const parsedDate = parseISO(dateString); // Phân tích chuỗi ngày
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
}

const mapUserList = (data) => {
    // Kiểm tra nếu data là mảng, thì sử dụng map, nếu là object, chuyển thành mảng 1 phần tử
    const dataMap = Array.isArray(data)
        ? data.map(user => mapUser(user)) // Nếu là mảng, dùng map
        : [mapUser(data)]; // Nếu là object, chuyển thành mảng 1 phần tử

    return dataMap;
}

const mapUser = (user) => {
    return {
        id: user.id,
        userName: user.userName,
        passWord: "12345678",
        fullName: user.fullName,
        birthDate: user.birthDate,
        roles: user.roles ? user.roles.map(role => role.name) : [] // Kiểm tra và chuyển đổi roles
    };
}

const createUserData = () => {
    return {
        id: null,
        userName: "",
        passWord: "12345678",
        fullName: "",
        birthDate: "2000-01-01",
        roles: []
    };
}

const ManageUser = () => {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popup, setPopup] = useState({ isOpen: false, message: "", type: "" });
    const [titleName, setTitleName] = useState("");
    const [moduleName, setModuleName] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Hiển thị 3 người trên mỗi trang
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Hàm để lấy người dùng trên trang hiện tại
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return users.slice(startIndex, endIndex);
    };

    // Hàm xử lý khi thay đổi trang
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchUsers = async () => {
        try {
            const data = await getItems();
            if (data && data.code === 1000 && data.result && data.result.length > 0) {
                const transformedData = mapUserList(data.result);
                setUsers(transformedData);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdate = (user) => {
        setSelectedUser(user);  // Chọn người dùng cần sửa
        setIsPopupOpen(true);
        setTitleName("Update");
        setModuleName("User");    // Mở popup
    };

    const handleAdd = (user) => {
        setSelectedUser(createUserData);  // Chọn người dùng cần sửa
        setIsPopupOpen(true);
        setTitleName("Create");
        setModuleName("User");    // Mở popup
    };

    const handleDelete = async (id) => {
        // Xử lý xóa người dùng
        await deleteUser(id);
        setPopup({
            isOpen: true,
            message: "Delete successful!",
            type: "success",
            closeButton: false,
        });
        setCurrentPage(1);
        fetchUsers();
    };

    const handleUserUpdate = async (updatedUser) => {
        // Xử lý cập nhật thông tin người dùng (gọi API update hoặc cập nhật state)
        let reponse = "";
        if (updatedUser.id != null) {
            reponse = await updateUser(updatedUser);
        } else {
            reponse = await createUser(updatedUser);
        }
        setPopup({
            isOpen: true,
            message: reponse.message ? reponse.message : "Success!",
            type: reponse.message ? "error" : "success",
            closeButton: false,
        });
        fetchUsers();
    };

    const handleClosePopup = () => {
        setPopup({ ...popup, isOpen: false });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="columns-3 my-6">
                <h1 className="text-2xl font-bold mb-4"></h1>
                <h1 className="text-4xl font-bold mb-4 text-center text-text">Manage User</h1>
                <div>
                    <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background float-right"
                        onClick={() => handleAdd()}
                    >
                        <div>
                            <box-icon name="user-plus" color="white">Add</box-icon>
                        </div>

                    </button>
                </div>

            </div>
            <table className="min-w-full bg-background border border-border">
                <thead>
                    <tr className="bg-background text-text uppercase text-sm">
                        <th className="py-3 px-4 border-b border-r w-1/4">User Name</th>
                        <th className="py-3 px-4 border-b border-r w-1/4">Full Name</th>
                        <th className="py-3 px-4 border-b border-r w-1/4">Birth Date</th>
                        <th className="py-3 px-4 border-b w-1/4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getPaginatedData().map(user => (
                        <tr key={user.id} className="hover:bg-border">
                            <td className="py-3 px-4 border-b border-r">{user.userName}</td>
                            <td className="py-3 px-4 border-b border-r">{user.fullName}</td>
                            <td className="py-3 px-4 border-b border-r">{castDate(user.birthDate)}</td>
                            <td className="py-3 px-4 border-b flex space-x-2">
                                <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background"
                                    onClick={() => handleUpdate(user)}>
                                    <div>
                                        <box-icon name="edit" color="white"></box-icon>
                                    </div>
                                    Update
                                </button>
                                <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background"
                                    onClick={() => handleDelete(user.id)}>
                                    <div>
                                        <box-icon name="trash" color="white"></box-icon>
                                    </div>
                                    Delete
                                </button>
                                <button className="bg-button text-text px-4 py-2 rounded hover:bg-accent hover:text-background"
                                    onClick={() => handleDelete(user.id)}>
                                    <div>
                                        <box-icon name="grid" color="white"></box-icon>
                                    </div>
                                    Edit Roles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-cente">
                <Pagination
                    pages={Array.from({ length: totalPages }, (_, i) => i + 1)} // Tạo danh sách các trang
                    selectedIndex={currentPage - 1} // Chọn trang hiện tại
                    onChange={handlePageChange} // Gọi khi người dùng chọn trang
                    nextLabel="Next"
                    previousLabel="Previous"
                />
            </div>

            <PopupEdit
                user={selectedUser}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onUpdate={handleUserUpdate}
                titleName={titleName}
                moduleName={moduleName}
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

export default ManageUser;