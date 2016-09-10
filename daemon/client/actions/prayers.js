import $ from 'jquery'

export const receive_prayers = (msg) => {
    return {
        type: 'RECEIVE_PRAYERS',
        msg
    }
}

export const receive_next_prayer = (msg) => {
    return {
        type: 'RECEIVE_NEXT_PRAYER',
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

export const fetch_next_prayer = () => {
    return dispatch => {
        $.get('/nextPrayer', function(json) {
            dispatch(receive_next_prayer(json))
        })
        .fail(function() {
            alert( "error, kon volgend gebed niet ophalen" );
        })
    }
}
