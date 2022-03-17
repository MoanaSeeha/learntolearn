import React from "react"

import LoadingSvg from "../../svg/loading.svg"

/**
 * Loading icon
 * @param e
 * @returns {JSX.Element}
 * @constructor
 */
const HandleLoader = (e) => {

  console.log("HandleLoader e", e);

  return <div className="main-spinner vertical-center"><LoadingSvg /></div>
}
export default HandleLoader;
