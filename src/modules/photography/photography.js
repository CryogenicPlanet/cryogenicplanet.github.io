// Asset Imports
import "./assets/css/main.css"
import "./assets/js/util.js"
import "./assets/js/main.js"
import $ from 'jquery'; 

import React, { Component } from 'react'
import data from "./data"

class Photography extends Component {
    footerClick = event => {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "#footer"
    }
    render(){
        return(
            <div id="wrapper">

					<header id="header">
						<h1><a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a></h1>
						<nav>
							<ul>
								<li><a onClick={this.footerClick} class="icon solid fa-info-circle">About</a></li>
							</ul>
						</nav>
					</header>
                    <div id="main">
                        {data.map((photo,index) => {
                            return(
                            <article class="thumbs">
                                <a href={`./images/fulls/${photo.img}.jpg`} class="image"><img src={`./images/thumbs/${photo.img}_tn.jpg`} alt="" /></a>
                                <h2>{photo.title ?  photo.title : "Untitled"}</h2>
                                <p>{photo.description ? photo.description : "" } - Shot on Lumix</p>
                            </article>
                            );
                        })}
                       
                    </div>
					<footer id="footer" class="panel">
						<div class="inner split">
							<div>
								<section>
									<h2>Hi, I'm Rahul Tarak</h2>
									<p>Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum eget quis orci mattis aliquet. Maecenas fringilla et ante at lorem et ipsum. Dolor nulla eu bibendum sapien. Donec non pharetra dui. Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum.</p>
								</section>
								<section>
									<h2>Follow me on ...</h2>
									<ul class="icons">
										<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
										<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
										<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
										<li><a href="#" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
										<li><a href="#" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
									</ul>
								</section>
								<p class="copyright">
									&copy; CryogenicPlanet. Design: <a href="http://html5up.net">HTML5 UP</a>.
								</p>
							</div>
							<div>
								<section>
									<h2>Get in touch</h2>
									<form method="post" action="#">
										<div class="fields">
											<div class="field half">
												<input type="text" name="name" id="name" placeholder="Name" />
											</div>
											<div class="field half">
												<input type="text" name="email" id="email" placeholder="Email" />
											</div>
											<div class="field">
												<textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
											</div>
										</div>
										<ul class="actions">
											<li><input type="submit" value="Send" class="primary" /></li>
											<li><input type="reset" value="Reset" /></li>
										</ul>
									</form>
								</section>
							</div>
						</div>
					</footer>

			</div>
        );
    }
}

export default Photography