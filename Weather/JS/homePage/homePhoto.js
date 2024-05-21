/*

UNDER CONSTRUCTION // FINISH ONCE URL SET UP

const userId = 'nolanjenkinson'; // User ID of the Instagram account you want to fetch photos from
const accessToken = 'EAANu0jZB86bkBOw2LCQrd0Tqb4WnGr0MvVRrvBUyI2DIiMuo76g6NRZAqZAfXB6E1q0uCRmEGvIkkVIZBlZBFcyScwasZBJwUrrE4HkAU2CaSZAnNd0ZByR80AZBiDbfqnlqUCGXfZAsBP2425nFpYcc1ZAo4LijKEK0TUvIeZAaHh5PvcXJZAZAxIkkhayJa7OVX3hTBIbL5TAlZBkZBoZAf0H7TMAZDZD'; // Access token obtained after authentication

fetch(`https://graph.instagram.com/${userId}/media?fields=id,media_url,caption&access_token=${accessToken}`)
  .then(response => response.json())
  .then(data => {
    // Process the fetched photos
    data.data.forEach(photo => {
      // Access photo data such as media_url, caption, etc.
      console.log(photo.media_url);
    });
  })
  .catch(error => {
    console.error('Error fetching photos:', error);
  });





  https://api.instagram.com/oauth/authorize?client_id=1476208909956831&redirect_uri=https://socialsizzle.herokuapp.com/auth/&scope=user_profile,user_media&response_type=code
  */