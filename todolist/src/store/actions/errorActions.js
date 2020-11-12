const getErrors = (msg, status, id) => {
    return({
        type: "GET_ERRORS",
        payload: { msg, status, id }
    });
}

export default getErrors;