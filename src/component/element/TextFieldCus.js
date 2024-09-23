import { Label } from '@atlaskit/form';

import Textfield from '@atlaskit/textfield';
import { DatePicker } from '@atlaskit/datetime-picker';

export default function TextFieldCus({ type, value, onChange, className, required, label, isDateTime }) {

    return (
        <>{isDateTime === true ?
            <>
                <Label htmlFor="basic-textfield">{label}</Label>
                <DatePicker value={value} onChange={onChange} className={className} /> </> : <>
                <Label htmlFor="basic-textfield">{label}</Label>
                <Textfield name="basic" id="basic-textfield" onChange={onChange}
                    className={className} type={type} isRequired={required} value={value}
                ></Textfield> </>}
        </>
    );
}