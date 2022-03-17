import React from "react";
import PropTypes from "prop-types";
import HeaderLinks from "../Header/HeaderLinks";
import {Col, Row} from "react-bootstrap";




const TestBuyBox = (test, idx, images ) => {




  //  TODO: filter somehow through tests already owned, and not owned
  console.log("item", test)

  return (
    <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={`["${test.test.group}"]`} >
      <div className="card">
        <div className="image-over">

            <img className="card-img-top" src={test.test.img} alt="" />

        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body">

              <h5 className="mb-0">{test.test.title}</h5>

            <div className="seller d-flex align-items-center my-3">
              <span>Owned</span>

                <h6 className="ml-2 mb-0">{test.test.owner}</h6>

            </div>
            <div className="card-bottom d-flex justify-content-between">
              <span>{test.test.price}</span>
              <span>{test.test.count}</span>
            </div>

            {/* <a className="btn btn-buy" onClick={() =>{BuyTestButton(test.test.title, "sdf", test.test.cost_amount, test.test.cost_amount, test.test.cost_token)}}> */}
            <a className="btn btn-buy" onClick={() =>{mint(test.test.img, test.test.title, test.test.cost_amount, test.test.price)}}>
              <Row>
                <Col xs={4} className="m-0 p-0">
                  <img src="/assets/svg/crypto/usdt.svg" alt={test.test.title} width={30} />
                </Col>
                <Col xs={8} className="m-0 p-0 pt-1">
                  {test.test.cost_amount} {test.test.cost_token}
                </Col>
              </Row>
            </a>


          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={test.test.group}>
  //     <div className="card">
  //       <div className="image-over">
  //         <a href="/item-details">
  //           <img className="card-img-top" src={test.test.img} alt="" />
  //         </a>
  //       </div>
  //       {/* Card Caption */}
  //       <div className="card-caption col-12 p-0">
  //         {/* Card Body */}
  //         <div className="card-body">
  //           <a href="/item-details">
  //             <h5 className="mb-0">{test.test.title}</h5>
  //           </a>
  //           <div className="seller d-flex align-items-center my-3">
  //             <span>Owned By</span>
  //             <a href="/author">
  //               <h6 className="ml-2 mb-0">{test.test.owner}</h6>
  //             </a>
  //           </div>
  //           <div className="card-bottom d-flex justify-content-between">
  //             <span>{test.test.price}</span>
  //             <span>{test.test.count}</span>
  //           </div>
  //           <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect"><i className="icon-handbag mr-2" />{test.test.btnText}</a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

TestBuyBox.propTypes = {
  test: PropTypes.object,
  idx: PropTypes.number,
  images: PropTypes.object,
};


export default TestBuyBox