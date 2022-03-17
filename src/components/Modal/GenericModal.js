import React from 'react';
import PropTypes from 'prop-types';

const GenericModal = ({ modal: { state, praise, points } }) => {
  return (
    <div className={'correct-modal' + (state === 'show' ? ' modal-enter' : '')}>
      <div className="praise">{praise}</div>
      <div className="points">{points}</div>
    </div>
  );
};

GenericModal.propTypes = {
  modal: PropTypes.shape({
    state: PropTypes.string.isRequired,
    praise: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired
  })
};

export default GenericModal;

/*
{
    "blockHash": "0x68477fb040d312216845f2a9c043d6b574216532bd816bb02f1f2b2a7ef1ab65",
    "blockNumber": 23331248,
    "contractAddress": null,
    "cumulativeGasUsed": 6099231,
    "effectiveGasPrice": "0x9502f90b",
    "from": "0xe14a9c71c71d3fa96f47037fb52775d6e1cd407d",
    "gasUsed": 41031,
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000100000108000000000018020010000000000000000000000000000000000000000000008020000800000000000000000000100000000000000000000000200000000000000000000000000000000000080000010000000000000000000000000000004000000000000000000000000000000080000000400200000000000000000000000000000002000000000000000000200000000024000000002000000000001000000000000000000000000800000108000000000000000000000000000000000000000000000000000020000000000000000140000",
    "status": true,
    "to": "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e",
    "transactionHash": "0x90a9890ad5313c5cd0de842462b519cb771c0a31a1e827aef82e30cace0611f2",
    "transactionIndex": 6,
    "type": "0x2",
    "events": {
        "0": {
            "address": "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
            "blockNumber": 23331248,
            "transactionHash": "0x90a9890ad5313c5cd0de842462b519cb771c0a31a1e827aef82e30cace0611f2",
            "transactionIndex": 6,
            "blockHash": "0x68477fb040d312216845f2a9c043d6b574216532bd816bb02f1f2b2a7ef1ab65",
            "logIndex": 17,
            "removed": false,
            "id": "log_fd8055fe",
            "returnValues": {},
            "signature": null,
            "raw": {
                "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x000000000000000000000000e14a9c71c71d3fa96f47037fb52775d6e1cd407d",
                    "0x00000000000000000000000065e24501453bd0398bcf205c93f6466a6366d45e"
                ]
            }
        },
        "1": {
            "address": "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
            "blockNumber": 23331248,
            "transactionHash": "0x90a9890ad5313c5cd0de842462b519cb771c0a31a1e827aef82e30cace0611f2",
            "transactionIndex": 6,
            "blockHash": "0x68477fb040d312216845f2a9c043d6b574216532bd816bb02f1f2b2a7ef1ab65",
            "logIndex": 18,
            "removed": false,
            "id": "log_a5c8a05a",
            "returnValues": {},
            "signature": null,
            "raw": {
                "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000029a2241af62c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003782dace9d900000",
                "topics": [
                    "0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4",
                    "0x0000000000000000000000003f152b63ec5ca5831061b2dccfb29a874c317502",
                    "0x000000000000000000000000e14a9c71c71d3fa96f47037fb52775d6e1cd407d",
                    "0x00000000000000000000000065e24501453bd0398bcf205c93f6466a6366d45e"
                ]
            }
        },
        "2": {
            "address": "0x0000000000000000000000000000000000001010",
            "blockNumber": 23331248,
            "transactionHash": "0x90a9890ad5313c5cd0de842462b519cb771c0a31a1e827aef82e30cace0611f2",
            "transactionIndex": 6,
            "blockHash": "0x68477fb040d312216845f2a9c043d6b574216532bd816bb02f1f2b2a7ef1ab65",
            "logIndex": 19,
            "removed": false,
            "id": "log_508bf768",
            "returnValues": {},
            "signature": null,
            "raw": {
                "data": "0x00000000000000000000000000000000000000000000000000005d4b2f730f000000000000000000000000000000000000000000000000003580be28b07201b40000000000000000000000000000000000000000000000000ba5753465483ce8000000000000000000000000000000000000000000000000358060dd80fef2b40000000000000000000000000000000000000000000000000ba5d27f94bb4be8",
                "topics": [
                    "0x4dfe1bbbcf077ddc3e01291eea2d5c70c2b422b415d95645b9adcfd678cb1d63",
                    "0x0000000000000000000000000000000000000000000000000000000000001010",
                    "0x000000000000000000000000e14a9c71c71d3fa96f47037fb52775d6e1cd407d",
                    "0x000000000000000000000000e4b8e9222704401ad16d4d826732953daf07c7e2"
                ]
            }
        }
    }
}
 */