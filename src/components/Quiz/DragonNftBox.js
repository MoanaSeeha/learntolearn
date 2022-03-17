import React from "react";
import PropTypes from "prop-types";
import HeaderLinks from "../Header/HeaderLinks";

// const DragonNftBox = ( {item}, idx ) => {
const DragonNftBox = ( item, idx ) => {


  // FIXME: why is metadata not available birthday: "1629395283668"
  let metadata = JSON.parse(item.item.metadata)

  //console.log("metadata", metadata['name'])
  // console.log("metadata", metadata.name)
  console.log("metadata")
  console.dir(metadata)
  //console.log("metadata", metadata.birthday) // why not? ncaught TypeError: Cannot read properties of null (reading 'birthday')


  // console.log("item")
  // console.dir( item)
  // console.dir("item.amount", item.item.amount)
  // console.dir("item.contract_type", item.item.contract_type)



  // birthday: "1629395283668"

  return (
    <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
      <div className="card">
        <div className="image-over">
          <a href="/item-details">

          </a>
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body">
            <a href="/item-details">
              <h5 className="mb-0">{item.item.symbol}</h5>
            </a>
            <div className="seller d-flex align-items-center my-3">
              <span>Owned By</span>
              <a href="/author">
                <h6 className="ml-2 mb-0">{item.item.description}</h6>
              </a>
            </div>
            <div className="card-bottom d-flex justify-content-between">
              <span>{item.price}</span>
              <span>{item.count}</span>
            </div>
            <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />{item.btnText}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

DragonNftBox.propTypes = {
  item: PropTypes.object,
  idx: PropTypes.number,
};


export default DragonNftBox