const dataMap = [
    {
      _label: "Direct Transfers",
      dd: "TX",
      ddv: "1.1.0",
      d :{
        rn : "directTransfers",
        ads : [],
        ams : ["1"]
      },
      m :{
        tn : 'like',
        tt : 'user_to_user',
        td : 'Thanks for like'
      }
    },
    {
      _label: "Pay",
      dd: "TX",
      ddv: "1.1.0",
      d :{
        rn : "pay",
        ads : [],
        ams : ["1"]
      },
      m :{
        tn : 'comment',
        tt : 'company_to_user',
        td : 'Thanks for comment'
      }
    }
];

export default dataMap;
