import { Label } from '@atlaskit/form';

import Textfield from '@atlaskit/textfield';
import { DatePicker } from '@atlaskit/datetime-picker';
import SelectCus from './SelectCus';


//
export default function TextFieldCus({ type, value, onChange, className, required, label, typeBox, disabled, keyEndPoint, navigate, onChoose, onDelete }) {

    return (
        <>
            <Label htmlFor="basic-textfield">{label}</Label>
            {typeBox === 0 ?
                <>
                    <Textfield name="basic" id="basic-textfield" onChange={onChange}
                        className={className} type={type} isRequired={required} value={value} isDisabled={disabled}
                    ></Textfield>

                </> : typeBox === 1 ?
                    <>
                        <DatePicker value={value || ''} onChange={onChange} className={className} isDisabled={disabled} />
                    </> :
                    <>
                        <SelectCus valueList={value || ''} onChoose={onChoose} onDelete={onDelete} className={className} isDisabled={disabled} keyEndPoint={keyEndPoint} navigate={navigate} nameOpionP={label} />
                    </>
            }
        </>
    );
}