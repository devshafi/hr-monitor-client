const handleErrors = (error) => {
    if (error.response?.data) {
        throw new Error(error.response.data.message)
    } else {
        throw new Error(error.message)
    }
}

export default handleErrors;