/**
 * @param {object} errors- Will include all errors thrown during the fetch to the API and display them to the screen
 * Includes validation errors set up on the api
 * @returns errors for the user to maker right changes
 */
const ErrorsDisplay = ({ errors }) => {

    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </>
        )
    }
    return errorsDisplay;

}

export default ErrorsDisplay;