import React from 'react';
import EncryptionImg from '@images/encryption.svg'
import Slide from '../Slide';

const Encryption = function ({ t }) {
    return (
        <Slide
            inverted
            fromColor="#8f8e8e"
            toColor="#000000"
            heading={t('tour:slides:encryption:heading')}
            description={t('tour:slides:encryption:description')}
            imgSrc={EncryptionImg}
            imgSize="350px"
        />
    );
}

export default Encryption;
