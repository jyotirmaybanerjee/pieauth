import React from 'react';
import $ from 'jquery';

class Home extends React.Component {
  
  componentDidMount() {
  	
	var $poster = $('.poster'),
		$shine = $('.shine'),
		$layer = $('div[class*="layer-"]'),
		w = $(window).width(),
		h = $(window).height();

	$(window).on('mousemove', function(e) {
		var offsetX = 0.5 - e.pageX / w,
			offsetY = 0.5 - e.pageY / h,
			dy = e.pageY - h / 2,
			dx = e.pageX - w / 2,
			theta = Math.atan2(dy, dx),
			angle = theta * 180 / Math.PI - 90,
			offsetPoster = $poster.data('offset'),
			transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

		if (angle < 0) {
			angle = angle + 360;
		}

		$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

		$poster.css('transform', transformPoster);

		$layer.each(function() {
			var $this = $(this),
				offsetLayer = $this.data('offset') || 0,
				transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

			$this.css('transform', transformLayer);
		});

	});
  }

  render() {

    return (
      <div className="home-main">
        <h3 className="text-center">Welcome to the wonderful world of React.</h3>
		<div className="container">
			<div className="text-center">Inspired by <a href="http://designmodo.com/apple-tv-effect/">DesignModo</a></div>
		</div>
        <div className="container">
        	<div className="col-md-6 intersteller">
		        <div className="poster">
					<div className="shine"></div>
					<div data-offset="-2" className="layer-1"></div>
					<div className="layer-2"></div>
					<div data-offset="1" className="layer-3"></div>
					<div data-offset="3" className="layer-4"></div>
					<div data-offset="10" className="layer-5"></div>
				</div>
        	</div>
        	<div className="col-md-6 deadpool">
				<div data-offset="5" className="poster">
					<div className="shine"></div>
					<div className="layer-1"></div>
					<div data-offset="-5" className="layer-2"></div>
					<div data-offset="-10" className="layer-3"></div>
					<div data-offset="-10" className="layer-4"></div>
					<div data-offset="-5" className="layer-5"></div>
				</div>
        	</div>
		</div>
      </div>
    );
  }
}

export default Home;
