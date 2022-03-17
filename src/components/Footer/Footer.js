import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Button} from "react-bootstrap"

//const { footer_data } = "/assets/data/footer.json";


const Footer = props => {

  const footer_data  = {
    "img": "/img/logo.png",
    "content": "Start getting paid for learning today. Join our community on social media to learn more.",
    "widget_1": "QUICK LINKS",
    "widget_2": "Community",
    "widget_3": "Subscribe",
    "socialData": [
      {
        "id": 1,
        "link": "facebook",
        "library": "fab",
        "icon": "facebook-f"
      },
      {
        "id": 2,
        "link": "twitter",
        "library": "fab",
        "icon": "twitter"
      },
      {
        "id": 3,
        "link": "linkedin",
        "library": "fab",
        "icon": "linkedin"
      },
      {
        "id": 4,
        "link": "discord",
        "library": "fab",
        "icon": "discord"
      }
    ],
    "widgetData_1": [
      {
        "id": 1,
        "text": "White Paper",
        "link": "https://docs.google.com/document/d/1JfwA98byEpPX5vL8Cd5rNpVEDHAPyBrGFOiQGj-vGjQ/edit?usp=sharing"
      },
      {
        "id": 3,
        "text": "Privacy Policy",
        "link": "/terms"
      },
      {
        "id": 4,
        "text": "Game Integration",
        "link": "/terms"
      },
      {
        "id": 5,
        "text": "Submit a Question",
        "link": "https://docs.google.com/forms/d/e/1FAIpQLScQFfvcxwOsx31Jp3gSzS12GASDR4emg7lzmfPh2yCDQx0ydQ/viewform?usp=sf_link"
      },
      {
        "id": 5,
        "text": "Help",
        "link": "/help"
      },
    ]
  }

  /*
        {
        "id": 4,
        "text": "Terms and Conditions",
        "link": "/terms"
      },
   */

  /*
  <script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
   */

  return (
    <footer className="footer">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 res-margin">
              {/* Footer Items */}
              <div className="footer-items">
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">{footer_data.widget_1}</h4>
                  <ul>
                    {footer_data.widgetData_1.map((item, idx) => {
                      return (
                        <li key={`wdo_${idx}`}><a href={item.link}>{item.text}</a></li>
                      );
                    })}
                  </ul>
                </div>
                <div className="social-icons d-flex">
                  {footer_data.socialData.map((item, idx) => {
                    return (
                      <a key={`sd_${idx}`} className={item.link} href="#">
                        {/*<i className={item.icon} />*/}
                        <FontAwesomeIcon size={`lg`} icon={[item.library, item.icon]} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            {/*<div className="col-12 col-sm-6 col-lg-2 res-margin">*/}
            {/*  /!* Footer Items *!/*/}
            {/*  <div className="footer-items">*/}
            {/*    /!* Footer Title *!/*/}
            {/*    <h4 className="footer-title">{footer_data.widget_1}</h4>*/}
            {/*    <ul>*/}
            {/*      {footer_data.widgetData_1.map((item, idx) => {*/}
            {/*        return (*/}
            {/*          <li key={`wdo_${idx}`}><a href={item.link}>{item.text}</a></li>*/}
            {/*        );*/}
            {/*      })}*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="col-12 col-sm-8 col-lg-8">
              {/* Footer Items */}
              <div className="footer-items">

                <div className="footer-newsletter">
                  <div className="subscribe-form-wide">
                    <form
                      action="https://dragonlord.us16.list-manage.com/subscribe/post?u=b1dc8411c707d733b79d8d2a7&amp;id=e549c35687"
                      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                      className="validate" target="_blank" noValidate>
                    <div className="footer-input">
                      <input id="mce-EMAIL" type="email" className="required form-control" placeholder="YOUR EMAIL ADDRESS" required={true} />
                    </div>
                      <div className="hide-me" aria-hidden="true">
                        <input type="text" name="b_b1dc8411c707d733b79d8d2a7_e549c35687" tabIndex="-1" />
                      </div>
                    <div className="footer-btn">
                      <Button
                        id="mc-embedded-subscribe"
                        type="submit"
                        className={"btn btn-newsletter"}
                      >
                        SUBMIT
                      </Button>
                    </div>

                    </form>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Copyright Area */}
              <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                {/* Copyright Left */}
                <div className="copyright-left">© 2022 Learn to Earn</div>
                {/* Copyright Right */}
                <div className="copyright-right"> <a href="/white-paper">White Paper</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;