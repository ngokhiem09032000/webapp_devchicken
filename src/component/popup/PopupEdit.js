import React, { useState, useEffect } from 'react';
import TextFieldCus from '../element/TextFieldCus';

const PopupEdit = ({ user, isOpen, onClose, onUpdate, titleName, moduleName }) => {

    const [userUpdate, setUserUpdate] = useState({ ...user });

    useEffect(() => {
        if (user) {
            setUserUpdate({ ...user, birthDate: "2000-01-01" });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(userUpdate);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{titleName} {moduleName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextFieldCus type="text"
                            value={userUpdate.userName || ''}
                            onChange={(e) =>
                                setUserUpdate({ ...userUpdate, userName: e.target.value })
                            }
                            required
                            label="User Name"
                        ></TextFieldCus>
                    </div>
                    <div className="mb-4">
                        <TextFieldCus type="text"
                            value={userUpdate.fullName || ''}
                            onChange={(e) =>
                                setUserUpdate({ ...userUpdate, fullName: e.target.value })
                            }
                            required
                            label="Full Name"
                        ></TextFieldCus>
                    </div>
                    <div className="mb-4">
                        <TextFieldCus
                            value={userUpdate.birthDate}
                            onChange={(e) =>
                                setUserUpdate({ ...userUpdate, birthDate: e })
                            }
                            label="Birth Date"
                            isDateTime
                        ></TextFieldCus>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-button text-white px-4 py-2 rounded hover:bg-accent"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupEdit;
