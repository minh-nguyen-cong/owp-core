import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import store from 'owp/store';
import { hideMessage, showMessage } from 'owp/store/actions';

const _dispatch = throttle((action) => {
    // console.log('OwpMessage _dispatch !!!!!!');
    store.dispatch(action);
}, 1000);

const OwpMessage = ({ message, autoHideDuration, anchorOrigin, variant }) => {
    store.dispatch(hideMessage());

    debounce(() => {
        _dispatch(
            showMessage({
                message: message, //text or html
                autoHideDuration: autoHideDuration || 6000, //ms
                anchorOrigin: anchorOrigin || {
                    vertical: 'top', //top bottom
                    horizontal: 'center', //left center right
                },
                variant: variant || 'success', //success error info warning null
            })
        );
    }, 100)();
};

export default OwpMessage;
