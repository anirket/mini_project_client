import React from 'react'
import Moment from 'react-moment';
const FormatDate = ({dateToFormat}) => {
    return (
        <Moment format="DD/MM - hh:mm">{dateToFormat}</Moment>
    );
}

export default FormatDate
