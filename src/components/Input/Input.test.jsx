import {render, screen, fireEvent} from '@testing-library/react';
import {Input} from './Input';
import {userEvent} from "@testing-library/user-event";

const placeholder = 'test placeholder';

const value = 'test value';

describe('Input', () => {
    it('should render the input', () => {
        render(<Input placeholder={placeholder}/>)
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })
    it('should render the input with the correct type', () => {
        render(<Input type="checkbox" placeholder={placeholder}/>)
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    })
    it('should render the input with the correct class names', () => {
        const {container} = render(<Input
            type="checkbox"
            placeholder={placeholder}
            inputClassName={'inputTest'}
            containerClassName={'containerTest'}
        />)
        expect(container.querySelector('.formControl.containerTest')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(placeholder)).toHaveClass('inputTest');
        expect(screen.getByPlaceholderText(placeholder)).toHaveClass('input');
    })
    it('should render the input without label', () => {
        render(<Input type="checkbox" placeholder={placeholder}/>)
        expect(screen.queryByTestId('input-label')).not.toBeInTheDocument();
    })
    it('should render the input with correct label', () => {
        const label = 'test label';
        render(<Input type="checkbox" placeholder={placeholder} label={label}/>)
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    })
    it('should render the input with correct value', () => {
        render(<Input placeholder={placeholder} value={value} />)
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    })
    it('should invoke the onChange callback', async () => {
        const onChange = jest.fn();
        render(<Input  placeholder={placeholder} value={value} onChange={onChange}/>)
        const element = screen.getByPlaceholderText(placeholder);
        // fireEvent.change(element, {target: {value: '123456'}})
        await userEvent.type(element, '12');
        expect(onChange).toHaveBeenCalledTimes(2);
    })
})