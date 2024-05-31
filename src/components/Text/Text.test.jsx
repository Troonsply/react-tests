import {render, screen} from '@testing-library/react';
import {Text} from './Text';

const text = 'Hello, world!';

describe('Text', () => {
    it('should render text with children', () => {
        render(<Text>{text}</Text>);
        expect(screen.getByText(text)).toBeInTheDocument();
    })

    it('should render text with correct classNames', () => {
        render(<Text className="test-class">{text}</Text>);
        const element = screen.getByText(text);
        expect(element).toBeInTheDocument('test-class');
        expect(element).toHaveClass('test-class');
        expect(element).toHaveClass('text');
    })
    it('should render text correct class with isError', () => {
        render(<Text isError>{text}</Text>);
        const element = screen.getByText(text);
        expect(element).toHaveClass('error');
    })
    it('should render text correct class with isSuccess', () => {
        render(<Text isSuccess>{text}</Text>);
        const element = screen.getByText(text);
        expect(element).toHaveClass('success');
    })
})