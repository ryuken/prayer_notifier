import $ from 'jquery'

export const receive_config = (msg) => {
    return {
        type: 'RECEIVE_CONFIG',
        msg
    }
}

export const fetch_config = () => {
    return dispatch => {
        $.get('/config', function(json) {
            dispatch(receive_config(json))
        })
        .fail(function() {
            alert( "error, kon instellingen niet ophalen" );
        })
    }
}
