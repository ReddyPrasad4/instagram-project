import Spinner from 'react-bootstrap/esm/Spinner'

const Loader = () => {
    return (
        <div className="pt-20 text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader