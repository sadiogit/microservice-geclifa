import React from  'react';
import { NavLink } from 'react-router-dom';

const HomePage = (props) => {
    return (<div className="jumbotron">
    <h1 className="display-4 text-warning text-center">GECLIFA</h1>
    
    <figure className="lead text-center display-6 text-info">
      <blockquote className="blockquote">
        <p className="mb-0 display-6">La meilleure solution pour vous permetre de gerer</p>
      
      </blockquote>
      <figcaption className="blockquote-footer">
      les factures  <cite title="Source Title mb-lg-4 ">de vos clients</cite>
      </figcaption>
    </figure>



    <section id="about" className="about section mt-lg-5 ">
        <div className="container">
            <h2 className="title text-center">Pourquoi choisir Geclifa?</h2>
            <p className="intro text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 10s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <div className="row">
                <div className="item col-lg-4 col-md-6 col-12">
                    <span className="icon-holder">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    <div className="content">
                        <h3 className="sub-title">Ad earum provident</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor indidunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud. </p>
                    </div>
                </div>
                <div className="item col-lg-4 col-md-6 col-12">
                    <div className="icon-holder">
                        <i className="far fa-clock"></i>
                    </div>
                    <div className="content">
                        <h3 className="sub-title">Vel quisquam error</h3>
                        <p>Sed ut perspatis unde omnis iste natus error sit voluptem accntium doremque lauantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis voluiste  vereri.</p>
                    </div>
                </div>
                <div className="item col-lg-4 col-md-6 col-12">
                    <div className="icon-holder">
                        <i className="fas fa-crosshairs"></i>
                    </div>
                    <div className="content">
                        <h3 className="sub-title">Qui ipsum eius</h3>
                        <p>At vero eos et accusamus et iusto odio digniimos ducimus qui blandtis praetium voluatum deleniti atque corrupti quos dolores et quas molstias excepturi sint occecati .</p>
                    </div>
                </div>          
                <div className="clearfix visible-md"></div>    
                <div className="item col-lg-4 col-md-6 col-12">
                    <div className="icon-holder">
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                    <div className="content">
                        <h3 className="sub-title">Sed quibusdam</h3>
                        <p>Nam libero tempore, cum soluta nobis est eligedi optio cumque nihil impedit quo minus id quod maxime placeat facere posimus, omnis voluptas asumenda est,omnis dolor repeldus.</p>
                    </div>
                </div>               
                <div className="item col-lg-4 col-md-6 col-12">
                    <div className="icon-holder">
                        <i className="fas fa-code"></i>
                    </div>
                    <div className="content">
                        <h3 className="sub-title">Et ullam non soluta</h3>
                        <p>Neque porro quisqam est, qui dolorem ipsum quia dolor sit amet, contetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.</p>
                    </div>
                </div>
                <div className="item col-lg-4 col-md-6 col-12">
                    <div className="icon-holder">
                        <i className="fas fa-coffee"></i>
                    </div>
                    <div className="content">
                        <h3 className="sub-title">Ducimus perspiciatis </h3>
                        <p>Est autem saepe qui numquam aernatur eos maxime quos ut numquam nesciunt sed quod facilis qui deserunt esse. Est nostrum necebus qui rerum iure sed rerum aspetur noibustrum.</p>
                    </div>
                </div>            
            </div>           
        </div>
    </section>



    <section className="cta-section text-center py-5 bg-primary  position-relative mt-lg-4">
	    <div className="theme-bg-shapes-right"></div>
	    <div className="theme-bg-shapes-left"></div>
	    <div className="container">
		    <h3 className="mb-2 text-white mb-3">A galisum a tempora dolores aut volutatem</h3>
		    <div className="section-intro text-white mb-3 single-col-max mx-auto"> Lorem ipsum dolor sit amet. Vel omnis nemo At animi ut eligendi odit aut consequuntur libero. In illum exercitationem et dolorem quae Et laboriosam non laboriosam dolorem sed molestias consequuntur vel quidem sunt nam officia amet!</div>
		    <div className="pt-3 text-center">
			    <NavLink className="btn btn-light" to="/">C'est Parti <i className="fas fa-arrow-alt-circle-right ml-2"></i></NavLink>
		    </div>
	    </div>
    </section>




    <footer className="footer mt-5 mb-5 ">
        <div className="container text-center ">

        <ul class="social-list list-unstyled pb-4 mb-0">
			    <li class="list-inline-item"><a href="#"><i class="fab fa-github fa-fw"></i></a></li> 
	            <li class="list-inline-item"><a href="#"><i class="fab fa-twitter fa-fw"></i></a></li>
	            <li class="list-inline-item"><a href="#"><i class="fab fa-slack fa-fw"></i></a></li>
	            <li class="list-inline-item"><a href="#"><i class="fab fa-product-hunt fa-fw"></i></a></li>
	            <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f fa-fw"></i></a></li>
	            <li class="list-inline-item"><a href="#"><i class="fab fa-instagram fa-fw"></i></a></li>
	        </ul>

            <small className="copyright"> © 2022  <i className="fas fa-heart"></i> Master CCM <a href="https://www.master-ccm.fr/" target="_blank">Insset Saint Quentin</a> UPJV</small>
        </div>
    </footer>


  </div>)
}

export default HomePage