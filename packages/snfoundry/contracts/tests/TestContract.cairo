use contracts::Counter::{ICounterDispatcher, ICounterDispatcherTrait};
use openzeppelin_utils::serde::SerializedAppend;
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::{ContractAddress};


fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract_class = declare(name).unwrap().contract_class();
    let mut calldata = array![];
    let init_value = 29;
    calldata.append_serde(init_value);
    let (contract_address, _) = contract_class.deploy(@calldata).unwrap();
    contract_address
}

#[test]
fn test_get_counter() {
    let contract_address = deploy_contract("Counter");
    let dispatcher = ICounterDispatcher { contract_address };
    let current_counter = dispatcher.get_counter();
    let expected_counter = 29;
    assert(current_counter == expected_counter, 'Should have the right counter');
}
#[test]
fn test_increase_counter() {
    let contract_address = deploy_contract("Counter");
    let dispatcher = ICounterDispatcher { contract_address };
    dispatcher.increase_counter();
    let current_counter = dispatcher.get_counter();
    let expected_counter = 30;
    assert(current_counter == expected_counter, 'Should have the right counter');
}

