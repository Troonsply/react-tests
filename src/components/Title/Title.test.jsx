import {render, screen} from '@testing-library/react';
import {Title} from './Title';

const text = 'Hello, world!';

describe('Title', () => {
    it('should render title with children', () => {
        render(<Title>{text}</Title>);
        expect(screen.getByText(text)).toBeInTheDocument();
    })
    it('should render title with correct tag', () => {
        const {container} = render(<Title level={2}>{text}</Title>);
        expect(container.querySelector('h2')).toBeInTheDocument();
    })
    it('should render title with correct classNames', () => {
        render(<Title className="test-class">{text}</Title>);
        const element = screen.getByText(text);
        expect(element).toBeInTheDocument('test-class');
        expect(element).toHaveClass('test-class');
        expect(element).toHaveClass('title');
    })

})