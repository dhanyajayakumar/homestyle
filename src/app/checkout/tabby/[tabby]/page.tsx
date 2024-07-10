import React from 'react';

import TabbyPayment from '@/shared-pages/checkout/tabby'

export default function TabbyPaymentPage({
    params,
}: {
    params: {
        tabby: string
    };
}) {
    return (
        <TabbyPayment tabby={params.tabby} />
    )
}
