export type LayerZeroMessageStatus = 'UNKNOWN' | 'CONFIRMING' | 'INFLIGHT' | 'DELIVERED' | 'FAILED' | 'PAYLOAD_STORED';

export type LayerZeroMessageResponse = {
  data: [
    {
      status: {
        name: LayerZeroMessageStatus;
      };
    },
  ];
};
