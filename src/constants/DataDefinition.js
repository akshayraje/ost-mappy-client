const dataMap = [
    {
      data_defination: "transaction",
      rule_name: "Direct Transfer",
      token_id: "1053",
      rule_method_name: "directTransfers",
      rule_parameters: {
        amounts: ["1"]
      }
    },
    {
      data_defination: "transaction",
      rule_name: "Pay",
      token_id: "1053",
      rule_method_name: "pay",
      rule_parameters: {
        amounts: ["1"]
      }
    }
];

export default dataMap;
