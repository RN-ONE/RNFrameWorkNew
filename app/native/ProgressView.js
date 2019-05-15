'use strict';

import PropTypes from 'prop-types';
import {requireNativeComponent, View} from 'react-native';

module.exports = requireNativeComponent('AndroidProgressView', {
    name: 'ProgressView',
    propTypes: {
        color: PropTypes.color,
        ...View.propTypes // 包含默认的View的属性
    },
});
