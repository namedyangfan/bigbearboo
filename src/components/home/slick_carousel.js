import  React from "react";
import  Slider from "react-slick";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    >
      <i class="material-icons">arrow_forward_ios</i>
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    >
      <i class="material-icons">arrow_back_ios</i>
    </div>
  );
}

export default class SlickCarousel extends React.Component {
  renderFirstSlide = () => {
    return(
      <div>
        <img className=" " src={'https://www.bhldn.com/resources/bhldn/images/gateways/2018-06-11_hpg/slide_01.jpg'} />
      </div>
    )
  }

  renderSecondSlide = () => {
    return(
      <div>
        <img className=" " src={'https://www.bhldn.com/resources/bhldn/images/gateways/2018-06-11_hpg/slide_02.jpg'} />
      </div>
    )
  }

  renderThirdSlide = () => {
    return(
      <div>
        <img className=" " src={'https://www.bhldn.com/resources/bhldn/images/gateways/2018-06-11_hpg/slide_03.jpg'} />
      </div>
    )
  }

  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className='section container'>
        <div className='slick-carousel'>
          <Slider {...settings}>
            {this.renderFirstSlide()}
            {this.renderSecondSlide()}
            {this.renderThirdSlide()}
          </Slider>
        </div>
      </div>
    );
  }
}