/*

UNDER CONSTRUCTION // FINISH ONCE URL SET UP

const userId = 'nolanjenkinson'; // User ID of the Instagram account you want to fetch photos from
const accessToken = 
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
