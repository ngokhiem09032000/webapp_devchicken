import React, { useState, useEffect } from 'react';
import TextFieldCus from '../element/TextFieldCus';
import { camelCaseToSpaces, castModule } from "../tool/toolAll";
import SelectCus from '../element/SelectCus';
import { de } from 'date-fns/locale';


// listKey : là những key của module muốn tạo hoặc cập nhật ( ["userName","fullName","birthDate"] )
// listTypeKey : là những loại component của từng key ([0,0,1]) 0: là Textfield ; 1 là DatePicker ; 2 là Select ( cần truyền thêm 1 list option)
// listDisable : là những loại disable của từng key ([true,false,false]) false: là not disable ; true là disable
const PopupEdit = ({ module, isOpen, onClose, onUpdate, titleName, moduleName, listKey, listKeyEndPoint, listTypeKey, listDisable, navigate }) => {

    const [moduleUpdate, setModuleUpdate] = useState({ ...module });

    useEffect(() => {
        if (module) {
            setModuleUpdate({ ...module });
        }
        console.log('module1', module);
    }, [module]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(moduleUpdate);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">{titleName} {moduleName}</h2>
                <form onSubmit={handleSubmit}>
                    {listKey ? listKey.map((item, index) => {

                        if (listTypeKey[index] === 1
                            && (moduleUpdate[item] === '' || moduleUpdate[item] === null)) {
                            setModuleUpdate({ ...moduleUpdate, [item]: '2000-01-01' });
                        }
                        return (
                            <div key={index} className="mb-4">
                                <TextFieldCus
                                    type={listTypeKey[index] === 0 ? "text" : ""}
                                    disabled={listDisable[index] && titleName !== "Create"}
                                    value={moduleUpdate[item] || ''}
                                    onChange={listTypeKey[index] === 0 ?
                                        (e) => setModuleUpdate({ ...moduleUpdate, [item]: e.target.value }) :
                                        (e) => setModuleUpdate({ ...moduleUpdate, [item]: e })
                                    }
                                    onChoose={(e) => {
                                        setModuleUpdate(prevState => ({
                                            ...prevState,
                                            [item]: [...prevState[item], e]
                                        }));
                                    }}
                                    onDelete={(e) => {
                                        console.log('onDelete={(module)', e);
                                        setModuleUpdate(prevState => ({
                                            ...prevState,
                                            [item]: prevState[item].filter(itemB => e.value !== itemB.value)
                                        }));

                                    }}
                                    required
                                    label={camelCaseToSpaces(item)}
                                    typeBox={listTypeKey[index]}
                                    keyEndPoint={listKeyEndPoint[index]}
                                    navigate={navigate}
                                ></TextFieldCus>
                            </div>
                        )
                    }) : <></>}
                    <div className="flex justify-end space-x-2 mt-10">
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
