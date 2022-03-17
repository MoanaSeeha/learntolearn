import React from "react"

import LoadingSvg from "../../svg/loading.svg"

/**
 * Loading icon
 * @param e
 * @returns {JSX.Element}
 * @constructor
 */
const HandleLoaderDom = (title,desc,button) => {

  console.log("HandleLoader title", title);

  //document.getElementById("generic-modal").classList.add('show');
  document.getElementById("generic-modal").classList.remove('d-none');
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerHTML = desc;
  document.getElementById("modal-button").innerText = button;
  document.getElementById("modal-spinner").classList.add('d-none');

}
export default HandleLoaderDom;
