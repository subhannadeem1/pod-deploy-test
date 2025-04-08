import React, { useEffect } from 'react';

declare let adsbygoogle: any;

const AdsComponentOne = (props: any) => {

    useEffect(() => {

        try {
            (adsbygoogle = (window as any).adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);

    return (
        <ins className="adsbygoogle"
            style= {{ display: "block" }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-5058851609859176"
            data-ad-slot="4646946776"></ins>
    );
};

export default AdsComponentOne;