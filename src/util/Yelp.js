//store yelp api key
const apiKey = process.env.REACT_APP_KEY;

const Yelp = {
  async searchYelp(term, location, sortBy) {
    //Prepend the URL path with CORS Anywhere API to bypass CORS restrictions
    //use string interpolation so parameters can be plugged into url
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse.businesses) {
      //loop through the json response
      return jsonResponse.businesses.map((business) => {
        //make and object with all the business attributes to display
        return {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          phone: business.phone,
          yelp: business.url,
        };
      });
    }
  },
};

export default Yelp;
