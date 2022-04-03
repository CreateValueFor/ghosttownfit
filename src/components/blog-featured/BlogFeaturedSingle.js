import PropTypes from "prop-types";
import React from "react";


const BlogFeaturedSingle = ({ singlePost }) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="blog-wrap mb-30 scroll-zoom">
        <div className="blog-img">
          <a target="_blank" href={singlePost.url}>
            <div style={{ width: "100%", paddingBottom: "100%", overflow: "hidden", height: 0 }}
            ><img style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%" }} src={process.env.PUBLIC_URL + singlePost.image} alt="" /></div>
          </a>

        </div>
      </div>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.object
};

export default BlogFeaturedSingle;
