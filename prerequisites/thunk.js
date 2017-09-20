// Thunk allows you to write action creators that return a function instead of an action. The inner function can receive the store methods dispatch and getState as parameters,

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true))
        }, 5000);
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }

                dispatch(itemsIsLoading(false))

                // dispatch(showModal(true))
                // dispatch(showChat(true))
                // dispatch ...
                // dispatch ...
                // dispatch ...
                return response;
            })
            .then((response) => {
              response.json()
                // dispatch(showModal(false))
                // dispatch(showChat(false))
                // dispatch ...
                // dispatch ...
                // dispatch ...
            )
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)))
    };
}
