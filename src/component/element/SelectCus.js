// import React, { useEffect, useState } from 'react';
// import { getItems } from '../../services/serviceManage';

// const SelectWithToggle = ({ value, onChange, className, isDisabled, keyEndPoint, navigate, nameOpionP }) => {
//     const [listData, setListData] = useState([]);
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         async function fetchData() {
//             if (keyEndPoint && navigate) {
//                 const listDataGet = await getItems(keyEndPoint, navigate);
//                 const options = listDataGet.result.map(role => ({
//                     label: role.description,
//                     value: role.name
//                 }));
//                 setListData(options);
//             }
//         }
//         fetchData();
//     }, [keyEndPoint, navigate]);

//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleOptionClick = (option) => {
//         const isSelected = selectedOptions.includes(option.value);
//         const newSelectedOptions = isSelected
//             ? selectedOptions.filter(selected => selected !== option.value)
//             : [...selectedOptions, option.value];

//         setSelectedOptions(newSelectedOptions);
//         onChange(newSelectedOptions);
//     };

//     return (
//         <div className={`relative ${className}`}>
//             <div
//                 id={selectId}
//                 onClick={toggleDropdown}
//                 className={`border rounded-md p-2 cursor-pointer text-left ${isDisabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
//             >
//                 {selectedOptions.length > 0
//                     ? selectedOptions.join(', ')
//                     : `Choose ${nameOpionP}`}
//                 <button
//                     onClick={toggleDropdown}
//                     className="ml-2 p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
//                 >
//                     {isOpen ? '🔼' : '🔽'}
//                 </button>
//             </div>
//             {isOpen && !isDisabled && (
//                 <ul className="absolute bg-white border rounded-md mt-1 w-full shadow-lg z-10">
//                     {listData.filter(option => !selectedOptions.includes(option.value)).map(option => (
//                         <li
//                             key={option.value}
//                             onClick={() => handleOptionClick(option)}
//                             className={`p-2 cursor-pointer hover:bg-gray-200`}
//                         >
//                             {option.label}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default SelectWithToggle;


import React, { useEffect, useRef, useState } from 'react';
import { getItems } from '../../services/serviceManage';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down'
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up'

const SelectCus = ({ valueList, onChoose, onDelete, className, isDisabled, keyEndPoint, navigate, nameOpionP }) => {

  let [isOpen, setIsOpen] = useState(false);

  let listData = useRef([]);

  async function fetchData() {
    const listDataGet = await getItems(keyEndPoint, navigate);
    const options = listDataGet.result.map(r => ({
      label: r.description,
      value: r.name
    }));
    listData.current = options;
  }

  useEffect(() => {
    fetchData();
  }, [valueList]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border border-text rounded-lg cursor-pointer" onClick={toggleDropdown}>
        {valueList && valueList.map((option, index) => (
          <div key={index} className="flex items-center bg-primary text-text rounded-full px-2 py-0">
            {option.value}
            <button type="button"
              className="ml-2 text-xs font-bold text-background"
              onClick={() => {
                onDelete(option)
              }}
            >
              &times;
            </button>
          </div>
        ))}
        <span className="text-gray-500">{valueList.length === 0 ? `Choose ${nameOpionP}` : ''}</span>
        <div className='absolute right-1'>
          {
            isOpen && <ChevronUpIcon label="" />
          }
          {
            !isOpen && <ChevronDownIcon label="" />
          }
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {listData.current.filter(itemB => !valueList.some(itemA => itemA.value === itemB.value)).map((option, index) => {
            console.log('listData.current', valueList);
            console.log('listData.current', listData.current);
            return (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  onChoose(option)
                }}
              >
                {option.label}
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default SelectCus;
