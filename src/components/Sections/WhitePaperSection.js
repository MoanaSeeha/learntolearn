import React, {Component, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'moment-timezone';
import {Col,Container, Nav,NavDropdown} from "react-bootstrap";


const goToHash = (selectedKey) => {
  // document.getElementById("sticky-wrapper").removeAttribute("active")
  let els = document.getElementsByClassName('active')
  while (els[0]) {
    els[0].classList.remove('active')
  }
  let id = selectedKey.substring(1);
  console.log("id",id)
  let element = document.getElementById(id + '-link');
  // data-rr-ui-event-key

  console.log("element",element)
  console.log("selectedKey",selectedKey)
  element.classList.add("active");

  window.location.hash = selectedKey;
}

const WhitePaperSection = () => {

  return (
    <section className="white-paper load-more">
      <Container fluid>
        <div id="sticky-wrapper" className="row white-paper-menu">
          <Col xs={12} md={12} lg={3} xl={2}>
            <Nav
              className="sticky-sidebar"
              activeKey="#summary"
              onSelect={(selectedKey) =>{goToHash(selectedKey)}}
            >
              <Nav.Item>
                <Nav.Link href="#summary" id="summary-link">Summary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#trusted-links" id="trusted-links-link">Trusted Links</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#team" id="team-link">Team</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#test-scores" id="test-scores-link">Tests</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#accuracy" id="accuracy-link">Accuracy</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#difficulty" id="difficulty-link">Difficulty</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#time" id="tokens-link">Time</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#attention" id="attention-link">Attention</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#tokens" id="tokens-link">Tokens</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#learn" id="learn-link">LEARN</Nav.Link>
              </Nav.Item>
              <Nav.Item className="sublevel">
                <Nav.Link eventKey="#lts" id="lts-link">LTS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#network" id="network-link">Network</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#claims" id="claims-link">Claims</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#monetization" id="monetization-link">MONETIZATION</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="#games" id="games-link">GAMES</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#nft-marketplace" id="nft-marketplace-link">NFT MARKETPLACE</Nav.Link>
              </Nav.Item>
            </Nav>

          </Col>
          <Col xs={12} md={12} lg={9} xl={10}>
            <div className="intro m-0">
              <div className="intro-content">
                <span>learn to earn white paper</span>
              </div>
            </div>

            <p id="summary">Learn to Earn is a platform for earning crypto currencies while learning about programming, math and games such as chess.  Players can buy NFT tests which can be taken a number of times.    The amount of crypto currency they earn will depend on how fast and accurate they are.</p>

            <h3 id="trusted-links">Trusted Links</h3>
            <ul>
              <li><a href="https://discord.gg/teJZqhVWVU" target="_blank" rel="noreferrer">Discord</a> </li>
              <li><a href="https://www.facebook.com/Learn-to-Earn-105247712001894" target="_blank" rel="noreferrer">Facebook</a> </li>
              <li>Twitter</li>
              <li>Linked IN</li>

              <li>LTS Contract</li>
              <li>LEARN Contract</li>
              <li>NFT Test Contract</li>
            </ul>

            <h3 id="team">TEAM</h3>
            <p>   We are a group of artists, programmers and Play to Earn gamers who wanted to improve society by offering more than a video game to make money.  Our goal is to educate the next generation of programmers by giving them an incentive to learn.  Test questions are submitted by our community who are then rewarded with LTS Tokens. </p>

            <ul>
              <li>
                <h4>Amir Meshkin</h4>
                <p>Founder and CEO</p>
              </li>
              <li>
                <h4>Ann Rodriguez</h4>
                <p>Marketing Manager</p>
              </li>

              <li>
                <h4>Jae Rodriguez</h4>
                <p>Support Manager</p>
              </li>
            </ul>
            <h3 id="test-scores">TESTS</h3>
            <p>Version one of our tests are 20 multiple choice tests that are randomized each time it is taken.  Our second version will hae actual programming problems that will have to be solved within a certain timeframe.  Scores are calculated based on accuracy, number of tries, and time taken to finish the test.   A user who finishes a test in 5 minutes and answers every question correctly in the first try will earn more crypto currency than one who does not answer every question.  Points are calculated by taking into account several factors.  Points are earned for each question answered.  At the end of the test, these points are converted into LEARN tokens taking account the time taken to answer questions.</p>

            <h6 id="accuracy">ACCURACY</h6>
            <p>Users who answer correctly on the first try will earn more LEARN Tokens than users who take two or more tries.  If a user takes three attempts to answer a question then they will receive 0 points.</p>


            <h6 id="difficulty">DIFFICULTY</h6>
            <p>Each question has a difficulty rating of 1 to 5.  A question with a difficulty of 1 will only earn 1 point.  </p>

            <h6 id="time">TIME  </h6>
            <p>Each test is limited to ten minutes. A user who answers all questions in 5 minutes will earn more LEARN tokens than a user who takes 10 minutes.  The equation to calculate how much a user earns is a simple one.  The total number of points is simply divided by how long it takes to finish the test.</p>

            <strong>For example:    </strong>
            <p>If a user earns 100 points, but takes 10 minutes to finish the test, they will receive 10 EARN.  A user who finishes the test in 5 minutes will receive 20 EARN.  All numbers are rounded up since there are no decimal places in the LEARN token.</p>


            <h6 id="attention">Attention Span</h6>

            <p>Attention Span Points are much like Energy in Axie Infinity.  There is a maximum of 24 Attention Span Points in a day and they recharge one per hour.</p>



            <h3 id="tokens">TOKENS</h3>

            <h6 id="learn">LEARN TOKENS</h6>
            <p>Players will earn Learn Tokens based on correctly answering math and programming questions within a given timeframe.  The amount of Learn Tokens earned depends on the speed and accuracy of the player.  Learn tokens are always rounded up to integers and never have decimal places, much like SLP.  Tokens will be burned via NFT sales and other methods to control inflation. We have a lot of plans and practical applications for LEARN Tokens and our platform, which will be revealed in time.</p>
            <p>More information about the economy can be found in the <a href="/#tokenomics">tokenomics section of the home page</a>.</p>

            <h6 id="lts">LEARN TIME SHARDS (LTS)</h6>
            <p>LTS Tokens will be used for the purchase of tests, governance, and rewards for submitting your own questions for tests.</p>

            <h3 id="network">NETWORK</h3>

            <p>We will use Polygon (matic) to keep gas fees low.  We will also consider using other solutions in the future and may move to the main ethereum network once mining fees come down.  You can find out more about adding <a href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/" target="_blank" rel="noreferrer">Polygon to Metamask here</a>.</p>

            <h3 id="claims">CLAIMS</h3>
            Due to gas fees, we will allow a claim once every two weeks once the platform is launched.  During testing, you can claim on the Rinkeby network at any time.  We will adjust the claim time depending on which network we use and the gas fees associated with that network.

            <h3 id="monetization">MONETIZATION</h3>
            There are several business models that were considered but we wanted to keep things simple.  There is no initial investment before you can take a test.  We plan to allow our community to submit their own tests which can be sold in the NFT marketplace.  We will simply take a 3% fee every time there is a sale.  If you don’t learn, then we don’t earn. We are more concerned with educating future programmers, and the funds will be reinvested back into the game and community.

            <h3 id="games">GAMES</h3>
            <p>We plan to add educational games such as chess to our platform.  We are also planning on partnering with other companies to integrate our platform with their games.  The Play to Earn industry has changed the world and created a basic income for those who need it.  However, we wanted to create a platform where learning can earn crypto currency so that society can better itself.</p>

            <h3 id="nft-marketplace">NFT MARKETPLACE</h3>
            <p>Each "test" is an ERC-1155 NFT and can be bought from the marketplace.  We will eventually allow our community to submit their own tests for which they will be rewarded in LTS Tokens.  These users will have their approved tests minted as NFT's and sold in our marketplace.  </p>

          </Col>
        </div>
      </Container>
    </section>

  )
}
export default WhitePaperSection;
