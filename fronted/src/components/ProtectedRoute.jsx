import {Navigate, Outlet} from 'react-router-dom';

/**
 * A component that renders a protected route.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.redirectTo - The path to redirect if the user is not allowed.
 * @param {boolean} props.isAllowed - Indicates whether the user is allowed to access the route.
 * @param {ReactNode} props.children - The content to render if the user is allowed.
 * @returns {ReactNode} - The protected route component.
 */
export const ProtectedRoute = ({redirectTo, isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />
    }

    return children ? children : <Outlet />;
};