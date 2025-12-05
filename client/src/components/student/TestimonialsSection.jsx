import React from 'react';
import Slider from "react-slick";
import { assets, dummyTestimonial } from '../../assets/assets';

// Import css files for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {

  // Custom Arrow Components to fix visibility in Light Theme
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !text-brand-dark dark:!text-white [&::before]:!text-brand-dark dark:[&::before]:!text-white`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} !text-brand-dark dark:!text-white [&::before]:!text-brand-dark dark:[&::before]:!text-white`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 px-8 md:px-20 bg-background w-full overflow-hidden transition-colors duration-300">
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Testimonials
        </h2>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {dummyTestimonial.map((testimonial, index) => (
            <div key={index} className="px-3 pb-8 pt-4"> {/* Padding creates gap between slides */}
              <div className="h-full bg-card border border-border rounded-2xl shadow-custom-card p-8 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group">
                
                {/* Decorative Quote Icon */}
                <div className="absolute top-6 left-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                  </svg>
                </div>

                <img 
                  className="h-20 w-20 rounded-full border-4 border-background shadow-md mb-4 object-cover z-10" 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                />
                
                <h3 className="text-xl font-bold text-foreground">{testimonial.name}</h3>
                <p className="text-sm font-medium text-primary mb-4">{testimonial.role}</p>
                
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <img 
                      key={i} 
                      className="h-4 w-4" 
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                      alt="star" 
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-base leading-relaxed line-clamp-4">
                  "{testimonial.feedback}"
                </p>
                
                <div className="mt-6 w-full pt-4 border-t border-border">
                   <a href="#" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      Read Story
                   </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;