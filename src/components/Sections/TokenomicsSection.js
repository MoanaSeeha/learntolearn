import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useSelector} from "react-redux"
import {Row, Col} from "react-bootstrap"



const TokenomicsSection = () => {

  return (

    <section className="tokenomics-section p-0" id="tokenomics">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro m-0">
              <div className="intro-content">
                <span>Governance and Utility Tokens</span>
                <h3 className="mt-3 mb-0">Tokenomics</h3>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Col xs={12}>
            <div className="tokenomics-comparison">
              <div className="gradient-box-sides text-center">
                <div className="column-one">
                  <p>Blockchain</p>
                  <p>Token Name</p>
                  <p>Use</p>
                  <p>Token Decimals</p>
                  <p>Token Type</p>
                  <p>Total Supply</p>
                </div>
              </div>
              <div className="gradient-box-full text-center">
                <div className="column-title">
                  <h3>LEARN</h3>
                  <div className="token-wrapper">
                    <img src="/assets/img/learn-144.png" className="game-token-icon" alt="Game Token" />
                  </div>
                </div>
                <div className="column-description">
                  <p>Polygon (Matic) Chain</p>
                  <p>LEARN TOKEN</p>
                  <p>Utility and Reward</p>
                  <p>0</p>
                  <p>ERC-20</p>
                  <p>Uncapped Reward Token</p>
                </div>
              </div>
              <div className="gradient-box-sides text-center">
                <div className="column-title">
                  <h3>LTS</h3>
                  <div className="token-wrapper">
                    <img src="/assets/img/learn-144.png" className="game-token-icon" alt="Game Token" />
                  </div>
                </div>
                <div className="column-description">
                  <p>Polygon (Matic) Chain</p>
                  <p>Learn Time Shards</p>
                  <p>Governance</p>
                  <p>18</p>
                  <p>ERC-20</p>
                  <p>1 Billion LTS</p>

                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/*<div className="row">*/}

        {/*  <Col xs={12} md={6} lg={6}>*/}
        {/*    <h3>LEARN</h3>*/}
        {/*  </Col>*/}
        {/*  */}
        {/*  <Col xs={12} md={6} lg={6}>*/}
        {/*    <h3>LEARN</h3>*/}
        {/*  </Col>*/}

        {/*  <Col xs={12} md={6} lg={6}>*/}
        {/*    <h3>LTS</h3>*/}
        {/*  </Col>*/}
        {/*</div>*/}
      </div>
    </section>

  )
}
export default TokenomicsSection;