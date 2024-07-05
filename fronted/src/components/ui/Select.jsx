import { forwardRef } from 'react'

export const SelectOption = forwardRef((props, ref) => {
    return (
        <select
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
            ref={ref}
            {...props}
        >
            {props.children}
        </select>
    );
});

SelectOption.displayName = 'SelectOption';

export default SelectOption;