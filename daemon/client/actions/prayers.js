import $ from 'jquery'

export const receive_prayers = (msg) => {
    return {
        type: 'RECEIVE_PRAYERS',
        msg
    }
}

export const fetch_prayers = () => {
    return dispatch => {
        $.get('/today', function(json) {
            dispatch(receive_prayers(json))
        })
        .fail(function() {
            alert( "error, kon gebedstijden niet ophalen" );
        })
    }
}
