import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirect = setTimeout(() => navigate('/'), 2000);

        return (() => clearTimeout(redirect))
    });

    return (
        <>
            <div>
                <h1>Page Not Found</h1>
            </div>
        </>
    )
}

export default PageNotFound;
