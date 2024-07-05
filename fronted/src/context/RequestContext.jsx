import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { getAllRequestsRequest, deleteRequestRequest } from '../api/requests.api.js';

/**
 * The RequestContext is a context object created using the createContext() function from React.
 * It provides a way to share data between components without passing props manually at every level.
 */
/**
 * Context object for managing requests.
 * @type {React.Context}
 */
const RequestContext = createContext();

/**
 * Custom hook that provides access to the RequestContext.
 * @returns {Object} The context object.
 * @throws {Error} If the hook is not used within the RequestProvider.
 */
export const useRequests = () => {
    const context = useContext(RequestContext);
    if (!context) {
        throw new Error('useRequests must be used within the RequestProvider');
    }
    console.log('The context is', context);
    return context;
}

/**
 * Provides the request context for the application.
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The request provider component.
 */
export const RequestProvider = ({ children }) => {
    // Add prop validation for 'children'
    RequestProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [requests, setRequests] = useState([]);

    /**
     * Loads the requests from the server.
     * * It makes a request to the server to get all the requests
     * * and sets the request state with the
     * * response data
     * @async
     * @function loadRequests
     * @returns {Promise<void>} A Promise that resolves when the requests are loaded.
     */
    const loadRequests = async () => {
        const res = await getAllRequestsRequest();
        setRequests(res.data);
    };

    return (
        <RequestContext.Provider
            value={{
                requests,
                loadRequests,
            }}
        >
            {children}
        </RequestContext.Provider>
    );
};