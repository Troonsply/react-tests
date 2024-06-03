import {render,screen,fireEvent,act} from "@testing-library/react";
import App from "./App";
import * as waitMock from './helpers/wait';

const waitSpy = jest.spyOn(waitMock, 'wait')

describe('App', () => {
    it('should render App with form elements and a title', () => {
        const {container} = render(<App />);
        expect(screen.getByTestId('app')).toBeInTheDocument();
        const userName = screen.getByLabelText(/User name/);
        const password = screen.getByLabelText(/Password/);
        const submit = screen.getByRole('button', {name: /Create user/});
        const title = container.querySelector('h1');

        expect(title).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
    });
    it('should render error message when form was submit with a weak password', async () => {
        render(<App />);
        const userName = screen.getByLabelText(/User name/);
        const password = screen.getByLabelText(/Password/);
        const submit = screen.getByRole('button', {name: /Create user/});
        const successMessage = screen.queryByText(/created with password/);
        const errorMessage = screen.queryByText(/Password must be at least 8 characters long/);
        expect(successMessage).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();
        act(() => {
            fireEvent.change(userName, {target: {value: 'Ivan'}});
            fireEvent.change(password, {target: {value: '1234567'}});
            fireEvent.click(submit);
        })
        const errorMessageAfterSubmit = await screen.findByText(/Password must be at least 8 characters long/);
        expect(errorMessageAfterSubmit).toBeInTheDocument();
    });
    it('should render success message after successful submit', async () => {
        render(<App />);
        const userName = screen.getByLabelText(/User name/);
        const password = screen.getByLabelText(/Password/);
        const submit = screen.getByRole('button', {name: /Create user/});
        const successMessage = screen.queryByText(/created with password/);
        const errorMessage = screen.queryByText(/Password must be at least 8 characters long/);
        expect(successMessage).not.toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        const promise = Promise.resolve();
        waitSpy.mockImplementationOnce(() => promise)
        act(() => {
            fireEvent.change(userName, {target: {value: 'Ivan'}});
            fireEvent.change(password, {target: {value: 'Qwer12345@11'}});
            fireEvent.click(submit);
        });
        const successMessageAfterSubmit = await screen.findByText(/User Ivan created/);
        expect(successMessageAfterSubmit).toBeInTheDocument();
    });
})